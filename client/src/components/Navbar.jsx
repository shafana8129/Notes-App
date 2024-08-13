import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex justify-center items-center  w-full">
      <div className="flex justify-between items-center w-3/4">
        <Link to={"/"}>
          {" "}
          <h1 className="my-5 ml-2 text-4xl font-semibold">Notes</h1>{" "}
        </Link>

        <Link to={"/create"}>
          {" "}
          <button
            type="submit"
            className="px-5 py-2 bg-blue-300 rounded-md shadow-md font-semibold"
          >
            Add Note
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
