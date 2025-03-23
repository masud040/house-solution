import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

let defaultLocale = "en";
let locales = ["en", "bn"];
const protectedRoutes = [
  "/wishlist",
  "/cart",
  "/account",
  "/add",
  "/edit",
  "/checkout",
];
const adminRoutes = ["/dashboard"];
const publicRoutes = [
  "/login",
  "/signup",
  "/en",
  "/shop",
  "/about-us",
  "/contact-us",
];
const allowedOrigins = [
  "https://sokher-corner.vercel.app",
  "http://localhost:3000",
];

const corsOptions = {
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};
function getLocale(request) {
  const acceptedLanguage = request.headers.get("accept-language") ?? undefined;
  const headers = { "accept-language": acceptedLanguage };
  let languages = new Negotiator({ headers }).languages();
  return match(languages, locales, defaultLocale);
}

export async function middleware(request) {
  let redirectUrl = request.nextUrl;
  const { pathname, searchParams } = request.nextUrl;
  const origin = request.headers.get("origin") ?? "";
  const isAllowedOrigin = allowedOrigins.includes(origin);
  const isPreflight = request.method === "OPTIONS";
  const exactRoute = `/${pathname.split("/")[pathname.split("/").length - 1]}`;
  const isProtectedRoute = protectedRoutes.includes(exactRoute);
  const isPublicRoute = publicRoutes.includes(exactRoute);
  const isAdminRoute = adminRoutes.includes(exactRoute);

  if (isPreflight) {
    const preflightHeaders = {
      ...(isAllowedOrigin && { "Access-Control-Allow-Origin": origin }),
      ...corsOptions,
    };
    return NextResponse.json({}, { headers: preflightHeaders });
  }
  const response = NextResponse.next();

  // Set CORS Headers for Allowed Origins
  if (allowedOrigins.includes(origin)) {
    response.headers.set("Access-Control-Allow-Origin", origin);
  }
  Object.entries(corsOptions).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  // Locale Handling
  const pathnameIsMissingLocale = locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}`) && !pathname.startsWith(`/${locale}/`)
  );
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    redirectUrl = new URL(`/${locale}${pathname}`, request.url);
    redirectUrl.search = searchParams.toString();
  }
  const session = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });
  console.log("Auth Secret", process.env.AUTH_SECRET);
  console.log("Session is", session?.jti);
  console.log("Procted Route", isProtectedRoute);
  // redirect login when not authenticated user trying to access protected routes
  if (isProtectedRoute && !session?.email) {
    const callbackUrl = encodeURIComponent(redirectUrl.pathname);
    redirectUrl = new URL(`/login?callbackUrl=${callbackUrl}`, request.nextUrl);
  } else if (
    session?.email &&
    (exactRoute === "/login" || exactRoute === "/register")
  ) {
    redirectUrl = new URL("/", request.nextUrl);
  } else if (
    session?.email === "masud@gmail.com" &&
    (isPublicRoute || isProtectedRoute)
  ) {
    redirectUrl = new URL("/dashboard", request.nextUrl);
  } else if (isAdminRoute && session?.email !== "masud@gmail.com") {
    redirectUrl = new URL("/", request.nextUrl);
  }

  if (redirectUrl !== request.nextUrl) {
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|assets|.*\\..*|_next).*)"],
};
