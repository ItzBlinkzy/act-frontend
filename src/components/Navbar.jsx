const Navbar = () => {
  return (
    <div className="flex w-full items-center justify-between bg-green-300 p-4">
      <div className="font-bold">ACT App Logo</div>
      <div className="flex gap-2">
        <a href="#" className="hover:text-green-800">
          Home
        </a>
        <a href="/dashboard" className="hover:text-green-800">
          Dashboard
        </a>
        <a href="/login" className="hover:text-green-800">
          Login
        </a>
      </div>
    </div>
  );
};

export default Navbar;
