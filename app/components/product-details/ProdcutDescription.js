export const ProdcutDescription = ({ description }) => {
  return (
    <div className="container pb-16 mt-8">
      <h3 className="pb-3 font-medium text-gray-800 border-b border-gray-200 font-roboto">
        Product details
      </h3>
      <div className="w-3/5 pt-6">
        <div className="text-gray-600">
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};
