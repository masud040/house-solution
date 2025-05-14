export default function Greetings({ name, isSidebarOpen }) {
  return (
    <div className="w-full px-6 py-[22px] text-indigo-500 bg-white drop-shadow-sm flex-end h5-medium">
      Welcome Back | {name}
    </div>
  );
}
