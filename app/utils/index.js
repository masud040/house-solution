export function removeMongoId(arr) {
  return arr.map((item) => {
    const { _id, ...rest } = item;
    return { id: _id.toString(), ...rest };
  });
}
