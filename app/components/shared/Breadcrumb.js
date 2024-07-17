import Link from "next/link";

const Breadcrumb = ({ name1, name2 }) => {
  return (
    <div className="container flex items-center gap-3 py-4">
      <Link href="/" className="text-base text-primary">
        <i className="fa-solid fa-house"></i>
      </Link>
      <span className="text-sm text-gray-400">
        <i className="fa-solid fa-chevron-right"></i>
      </span>
      <p className="font-medium text-gray-600">{name1}</p>

      {name2 && (
        <>
          {" "}
          <span className="text-sm text-gray-400">
            <i className="fa-solid fa-chevron-right"></i>
          </span>
          <p className="font-medium text-gray-600">{name2}</p>
        </>
      )}
    </div>
  );
};

export default Breadcrumb;
