export const FilterByPrice = () => {
  return (
    <div class="pt-4">
      <h3 class="mb-3 text-xl font-medium text-gray-800 uppercase">Price</h3>
      <div class="flex items-center mt-4">
        <input
          type="text"
          name="min"
          id="min"
          class="w-full px-3 py-1 text-gray-600 border-gray-300 rounded shadow-sm focus:border-primary focus:ring-0"
          placeholder="min"
        />
        <span class="mx-3 text-gray-500">-</span>
        <input
          type="text"
          name="max"
          id="max"
          class="w-full px-3 py-1 text-gray-600 border-gray-300 rounded shadow-sm focus:border-primary focus:ring-0"
          placeholder="max"
        />
      </div>
    </div>
  );
};
