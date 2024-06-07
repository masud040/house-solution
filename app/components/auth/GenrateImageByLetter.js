export default function GenerateImageByLetter({ name }) {
  const firstLetter = name.charAt(0).toUpperCase();
  return (
    <div className="flex items-center justify-center w-8 h-8 mx-auto font-medium bg-indigo-500 rounded-full text-md">
      <p> {firstLetter}</p>
    </div>
  );
}
