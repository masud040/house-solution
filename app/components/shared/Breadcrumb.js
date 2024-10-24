import Link from "next/link";

const Breadcrumb = ({ name1, name2 }) => {
  return (
    <div className="gap-3 py-4 flex-start">
      <Link href="/" className="text-base text-primary">
        <i className="fa-solid fa-house"></i>
      </Link>
      <span className="text-sm">
        <i className="fa-solid fa-chevron-right"></i>
      </span>
      <p className="font-medium">{name1}</p>

      {name2 && (
        <>
          {" "}
          <span className="text-sm">
            <i className="fa-solid fa-chevron-right"></i>
          </span>
          <p className="font-medium">{name2}</p>
        </>
      )}
    </div>
  );
};

export default Breadcrumb;
