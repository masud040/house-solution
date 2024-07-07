export default function FilterBySize() {
  return (
    <div class="pt-4">
      <h3 class="mb-3 text-xl font-medium text-gray-800 uppercase">size</h3>
      <div class="flex items-center gap-2">
        <div class="size-selector">
          <input type="radio" name="size" id="size-xs" class="hidden" />
          <label
            htmlFor="size-xs"
            class="flex items-center justify-center w-6 h-6 text-xs text-gray-600 border border-gray-200 rounded-sm shadow-sm cursor-pointer"
          >
            XS
          </label>
        </div>
        <div class="size-selector">
          <input type="radio" name="size" id="size-sm" class="hidden" />
          <label
            htmlFor="size-sm"
            class="flex items-center justify-center w-6 h-6 text-xs text-gray-600 border border-gray-200 rounded-sm shadow-sm cursor-pointer"
          >
            S
          </label>
        </div>
        <div class="size-selector">
          <input type="radio" name="size" id="size-m" class="hidden" />
          <label
            htmlFor="size-m"
            class="flex items-center justify-center w-6 h-6 text-xs text-gray-600 border border-gray-200 rounded-sm shadow-sm cursor-pointer"
          >
            M
          </label>
        </div>
        <div class="size-selector">
          <input type="radio" name="size" id="size-l" class="hidden" />
          <label
            htmlFor="size-l"
            class="flex items-center justify-center w-6 h-6 text-xs text-gray-600 border border-gray-200 rounded-sm shadow-sm cursor-pointer"
          >
            L
          </label>
        </div>
        <div class="size-selector">
          <input type="radio" name="size" id="size-xl" class="hidden" />
          <label
            htmlFor="size-xl"
            class="flex items-center justify-center w-6 h-6 text-xs text-gray-600 border border-gray-200 rounded-sm shadow-sm cursor-pointer"
          >
            XL
          </label>
        </div>
      </div>
    </div>
  );
}
