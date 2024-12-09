export function removeMongoId(arr) {
  return arr.map((item) => {
    const { _id, ...rest } = item;
    return { id: _id.toString(), ...rest };
  });
}

export function removeMongoIdFromObj(obj) {
  const { _id, ...rest } = obj;
  return { ...rest, id: _id.toString() };
}

export async function getDeleveryCost(cartItems) {
  const shippingCost = 5;
  const totalshippingCost = cartItems.reduce(
    (total, item) => total + item.quantity * shippingCost,
    0
  );
  return totalshippingCost;
}

export function getApproximateDeliveryDate() {
  const today = new Date();
  const start = new Date(today);
  const end = new Date(today);

  // Add 5 days for the range
  end.setDate(end.getDate() + 5);

  const startDay = String(start.getDate()).padStart(2, "0"); // Ensure 2-digit day
  const endDay = String(end.getDate()).padStart(2, "0"); // Ensure 2-digit day
  const month = start.toLocaleDateString("en-US", { month: "short" }); // Get the month in 'MMM' format

  // Combine into the desired format
  return `Guaranteed by ${startDay}-${endDay} ${month}`;
}
