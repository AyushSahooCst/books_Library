import React from "react";
import { Link } from "react-router";
import { useSelector } from "react-redux";

const MobileNav = () => {
  const role = useSelector((state) => state.auth.role);

  return (
    <>
      {role === "user" && (
        <div className="w-full flex items-center justify-between  my-4  md:hidden ">
          <Link
            to="/profile"
            className="text-zinc-100 font-semibold w-full  text-center hover:bg-zinc-900 rounded transition-all duration-300"
          >
            Favorites
          </Link>

          <Link
            to="/profile/orderHistory"
            className="text-zinc-100 font-semibold w-full  text-center hover:bg-zinc-900 rounded transition-all duration-300"
          >
            Order History
          </Link>
          <Link
            to="/profile/settings"
            className="text-zinc-100 font-semibold w-full  text-center hover:bg-zinc-900 rounded transition-all duration-300"
          >
            Settings{" "}
          </Link>
        </div>
      )}

      {role === "admin" && (
        <div className="w-full flex items-center justify-between    md:hidden  h-[10rem]">
          <Link
            to="/profile"
            className="text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300"
          >
            All Orders
          </Link>

          <Link
            to="/profile/addbook"
            className="text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300"
          >
            Add book
          </Link>
        </div>
      )}
    </>
  );
};

export default MobileNav;
