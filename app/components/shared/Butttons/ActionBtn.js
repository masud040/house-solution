export default function ActionBtn({ form, productId }) {
  return (
    <button className="px-6 py-2 text-sm font-medium text-center text-white uppercase transition border rounded bg-primary border-primary hover:bg-transparent hover:text-primary font-roboto">
      {form === "cart" ? "Remove form cart" : "add to cart"}
    </button>
  );
}
