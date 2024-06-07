export default function GenerateImageByLetter({ name }) {
  const firstLetter = name.charAt(0).toUpperCase();
  return (
    <div className="flex items-center justify-center mx-auto text-sm font-medium bg-indigo-500 rounded-full h-7 w-7">
      <p> {firstLetter}</p>
    </div>
  );
}
