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
