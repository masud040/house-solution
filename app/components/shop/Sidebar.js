export default function Sidebar() {
  return (
    <div class="hidden col-span-1 px-4 pb-6 bg-white rounded shadow overflow-hiddenb md:block">
      <div class="space-y-5 divide-y divide-gray-200">
        <div>
          <h3 class="mb-3 text-xl font-medium text-gray-800 uppercase">
            Categories
          </h3>
          <div class="space-y-2">
            <div class="flex items-center">
              <input
                type="checkbox"
                name="cat-1"
                id="cat-1"
                class="rounded-sm cursor-pointer text-primary focus:ring-0"
              />
              <label for="cat-1" class="ml-3 text-gray-600 cusror-pointer">
                Bedroom
              </label>
              <div class="ml-auto text-sm text-gray-600">(15)</div>
            </div>
            <div class="flex items-center">
              <input
                type="checkbox"
                name="cat-2"
                id="cat-2"
                class="rounded-sm cursor-pointer text-primary focus:ring-0"
              />
              <label for="cat-2" class="ml-3 text-gray-600 cusror-pointer">
                Sofa
              </label>
              <div class="ml-auto text-sm text-gray-600">(9)</div>
            </div>
            <div class="flex items-center">
              <input
                type="checkbox"
                name="cat-3"
                id="cat-3"
                class="rounded-sm cursor-pointer text-primary focus:ring-0"
              />
              <label for="cat-3" class="ml-3 text-gray-600 cusror-pointer">
                Office
              </label>
              <div class="ml-auto text-sm text-gray-600">(21)</div>
            </div>
            <div class="flex items-center">
              <input
                type="checkbox"
                name="cat-4"
                id="cat-4"
                class="rounded-sm cursor-pointer text-primary focus:ring-0"
              />
              <label for="cat-4" class="ml-3 text-gray-600 cusror-pointer">
                Outdoor
              </label>
              <div class="ml-auto text-sm text-gray-600">(10)</div>
            </div>
          </div>
        </div>

        <div class="pt-4">
          <h3 class="mb-3 text-xl font-medium text-gray-800 uppercase">
            Price
          </h3>
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

        <div class="pt-4">
          <h3 class="mb-3 text-xl font-medium text-gray-800 uppercase">size</h3>
          <div class="flex items-center gap-2">
            <div class="size-selector">
              <input type="radio" name="size" id="size-xs" class="hidden" />
              <label
                for="size-xs"
                class="flex items-center justify-center w-6 h-6 text-xs text-gray-600 border border-gray-200 rounded-sm shadow-sm cursor-pointer"
              >
                XS
              </label>
            </div>
            <div class="size-selector">
              <input type="radio" name="size" id="size-sm" class="hidden" />
              <label
                for="size-sm"
                class="flex items-center justify-center w-6 h-6 text-xs text-gray-600 border border-gray-200 rounded-sm shadow-sm cursor-pointer"
              >
                S
              </label>
            </div>
            <div class="size-selector">
              <input type="radio" name="size" id="size-m" class="hidden" />
              <label
                for="size-m"
                class="flex items-center justify-center w-6 h-6 text-xs text-gray-600 border border-gray-200 rounded-sm shadow-sm cursor-pointer"
              >
                M
              </label>
            </div>
            <div class="size-selector">
              <input type="radio" name="size" id="size-l" class="hidden" />
              <label
                for="size-l"
                class="flex items-center justify-center w-6 h-6 text-xs text-gray-600 border border-gray-200 rounded-sm shadow-sm cursor-pointer"
              >
                L
              </label>
            </div>
            <div class="size-selector">
              <input type="radio" name="size" id="size-xl" class="hidden" />
              <label
                for="size-xl"
                class="flex items-center justify-center w-6 h-6 text-xs text-gray-600 border border-gray-200 rounded-sm shadow-sm cursor-pointer"
              >
                XL
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
