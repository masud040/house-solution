export const ProductDetails = () => {
  return (
    <div>
      <h2 className="mb-2 text-3xl font-medium uppercase">
        Italian L Shape Sofa
      </h2>
      <div className="flex items-center mb-4">
        <div className="flex gap-1 text-sm text-yellow-400">
          <span>
            <i className="fa-solid fa-star"></i>
          </span>
          <span>
            <i className="fa-solid fa-star"></i>
          </span>
          <span>
            <i className="fa-solid fa-star"></i>
          </span>
          <span>
            <i className="fa-solid fa-star"></i>
          </span>
          <span>
            <i className="fa-solid fa-star"></i>
          </span>
        </div>
        <div className="ml-3 text-xs text-gray-500">(150 Reviews)</div>
      </div>
      <div className="space-y-2">
        <p className="space-x-2 font-semibold text-gray-800">
          <span>Availability: </span>
          <span className="text-green-600">In Stock</span>
        </p>
        <p className="space-x-2">
          <span className="font-semibold text-gray-800">Brand: </span>
          <span className="text-gray-600">Apex</span>
        </p>
        <p className="space-x-2">
          <span className="font-semibold text-gray-800">Category: </span>
          <span className="text-gray-600">Sofa</span>
        </p>
        <p className="space-x-2">
          <span className="font-semibold text-gray-800">SKU: </span>
          <span className="text-gray-600">BE45VGRT</span>
        </p>
      </div>
      <div className="flex items-baseline mt-4 mb-1 space-x-2 font-roboto">
        <p className="text-xl font-semibold text-primary">$45.00</p>
        <p className="text-base text-gray-400 line-through">$55.00</p>
      </div>

      <p className="mt-4 text-gray-600">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos eius eum
        reprehenderit dolore vel mollitia optio consequatur hic asperiores
        inventore suscipit, velit consequuntur, voluptate doloremque iure
        necessitatibus adipisci magnam porro.
      </p>

      <div className="mt-4">
        <h3 className="mb-1 text-sm text-gray-800 uppercase">Quantity</h3>
        <div className="flex text-gray-600 border border-gray-300 divide-x divide-gray-300 w-max">
          <div className="flex items-center justify-center w-8 h-8 text-xl cursor-pointer select-none">
            -
          </div>
          <div className="flex items-center justify-center w-8 h-8 text-base">
            4
          </div>
          <div className="flex items-center justify-center w-8 h-8 text-xl cursor-pointer select-none">
            +
          </div>
        </div>
      </div>

      <div className="flex gap-3 pt-5 pb-5 mt-6 border-b border-gray-200">
        <a
          href="#"
          className="flex items-center gap-2 px-8 py-2 font-medium text-white uppercase transition border rounded bg-primary border-primary hover:bg-transparent hover:text-primary"
        >
          <i className="fa-solid fa-bag-shopping"></i> Add to cart
        </a>
        <a
          href="#"
          className="flex items-center gap-2 px-8 py-2 font-medium text-gray-600 uppercase transition border border-gray-300 rounded hover:text-primary"
        >
          <i className="fa-solid fa-heart"></i> Wishlist
        </a>
      </div>

      <div className="flex gap-3 mt-4">
        <a
          href="#"
          className="flex items-center justify-center w-8 h-8 text-gray-400 border border-gray-300 rounded-full hover:text-gray-500"
        >
          <i className="fa-brands fa-facebook-f"></i>
        </a>
        <a
          href="#"
          className="flex items-center justify-center w-8 h-8 text-gray-400 border border-gray-300 rounded-full hover:text-gray-500"
        >
          <i className="fa-brands fa-twitter"></i>
        </a>
        <a
          href="#"
          className="flex items-center justify-center w-8 h-8 text-gray-400 border border-gray-300 rounded-full hover:text-gray-500"
        >
          <i className="fa-brands fa-instagram"></i>
        </a>
      </div>
    </div>
  );
};
