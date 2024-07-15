export const ShippingAddress = () => {
  return (
    <div className="px-4 pt-6 pb-8 bg-white rounded shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-800">Shipping address</h3>
        <a href="#" className="text-primary">
          Edit
        </a>
      </div>
      <div className="space-y-1">
        <h4 className="font-medium text-gray-700">John Doe</h4>
        <p className="text-gray-800">Medan, North Sumatera</p>
        <p className="text-gray-800">20371</p>
        <p className="text-gray-800">0811 8877 988</p>
      </div>
    </div>
  );
};
