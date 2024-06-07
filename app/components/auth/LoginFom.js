export default function LoginForm() {
  return (
    <form action="#" method="post" autocomplete="off">
      <div className="space-y-2">
        <div>
          <label for="email" className="block mb-2 text-gray-600">
            Email address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="block w-full px-4 py-3 text-sm text-gray-600 placeholder-gray-400 border border-gray-300 rounded focus:ring-0 focus:border-primary"
            placeholder="youremail.@domain.com"
          />
        </div>
        <div>
          <label for="password" className="block mb-2 text-gray-600">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="block w-full px-4 py-3 text-sm text-gray-600 placeholder-gray-400 border border-gray-300 rounded focus:ring-0 focus:border-primary"
            placeholder="*******"
          />
        </div>
      </div>
      <div className="flex items-center justify-between mt-6">
        <div className="flex items-center">
          <input
            type="checkbox"
            name="remember"
            id="remember"
            className="rounded-sm cursor-pointer text-primary focus:ring-0"
          />
          <label for="remember" className="ml-3 text-gray-600 cursor-pointer">
            Remember me
          </label>
        </div>
        <a href="#" className="text-primary">
          Forgot password
        </a>
      </div>
      <div className="mt-4">
        <button
          type="submit"
          className="block w-full py-2 font-medium text-center text-white uppercase transition border rounded bg-primary border-primary hover:bg-transparent hover:text-primary font-roboto"
        >
          Login
        </button>
      </div>
    </form>
  );
}
