export default function GenerateImageByLetter({ name }) {
  const firstLetter = name.charAt(0).toUpperCase();
  return (
    <div className="flex items-center justify-center mb-0.5 w-7 h-7 mx-auto text-sm font-medium bg-secondary text-white rounded-full">
      <p> {firstLetter}</p>
    </div>
  );
}
