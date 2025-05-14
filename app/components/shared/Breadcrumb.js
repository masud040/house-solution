import Link from "next/link";

const Breadcrumb = ({ nameWithPath, name1, name2 }) => {
  return (
    <div className="gap-3 pb-5 ps-6 md:ps-0 flex-start">
      <Link href="/" className="text-base text-primary">
        <i className="fa-solid fa-house"></i>
      </Link>
      {nameWithPath?.name && (
        <>
          <span className="text-sm">
            <i className="fa-solid fa-chevron-right"></i>
          </span>
          <Link
            href={nameWithPath?.path}
            className="transition-colors duration-500 ease-in-out hover:text-primary"
          >
            <p className="font-medium paragraph-lg-base">
              {nameWithPath?.name}
            </p>
          </Link>
        </>
      )}

      {name1 && (
        <>
          {" "}
          <span className="text-sm">
            <i className="fa-solid fa-chevron-right"></i>
          </span>
          <p className="font-medium paragraph-lg-base">{name1}</p>
        </>
      )}
      {name2 && (
        <>
          {" "}
          <span className="text-sm">
            <i className="fa-solid fa-chevron-right"></i>
          </span>
          <p className="font-medium paragraph-lg-base">{name2}</p>
        </>
      )}
    </div>
  );
};

export default Breadcrumb;
