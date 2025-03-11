import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CustomLink({ title, Icon, target, newTab }) {
  const pathname = usePathname();
  const split = pathname.split("/");
  const path = split[split.length - 1];

  return (
    <li>
      <Link
        href={`/${target}`}
        className={`${
          path === target &&
          "bg-indigo-400 text-background-light hover:bg-indigo-400"
        } flex-start gap-2 rounded-lg px-4 py-2 transition-all duration-300 hover:bg-indigo-200 hover:text-background-dark`}
        target={newTab ? "_blank" : undefined}
      >
        <p>
          <Icon className="text-2xl" />
        </p>
        {title}
      </Link>
    </li>
  );
}
