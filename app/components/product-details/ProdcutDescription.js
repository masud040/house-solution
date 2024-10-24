export const ProdcutDescription = ({ description }) => {
  return (
    <div className="container pb-16 mt-8">
      <h3 className="pb-3 font-semibold capitalize text-secondary-dark border-b-light-default_dark-tertiary font-roboto">
        Product details
      </h3>
      <div className="w-3/5 pt-6">
        <div className="text-secondary-dark">
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};
