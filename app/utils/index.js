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
