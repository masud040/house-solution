const Breadcrumb = ({ name }) => {
  return (
    <div className="container flex items-center gap-3 py-4">
      <a href="../index.html" className="text-base text-primary">
        <i className="fa-solid fa-house"></i>
      </a>
      <span className="text-sm text-gray-400">
        <i className="fa-solid fa-chevron-right"></i>
      </span>
      <p className="font-medium text-gray-600">{name}</p>
    </div>
  );
};

export default Breadcrumb;
