import Link from "next/link";

const NotFound = () => {
  return (
    <div className="relative">
      <div className="flex-column absolute inset-0 h-[calc(100vh-155px)] w-screen items-center justify-center overflow-hidden bg-[#192438]">
        <h1 className="shadow-text text-[12rem] font-bold text-[#192438] lg:text-[20rem]">
          404
        </h1>

        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-white">
          <h3 className="text-2xl font-semibold lg:text-4xl">Oops!!!</h3>
          <p className="text-sm lg:text-lg">
            Your requested page was not found.
          </p>
          <Link
            href="/"
            className="rounded-full bg-gradient-to-r from-pink-500 to-purple-500 p-2.5 text-sm font-semibold uppercase text-white transition-transform hover:scale-105 hover:shadow-lg lg:px-6 lg:text-lg"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};
export default NotFound;
