import axios from "axios";
import React, { useEffect, useState } from "react";
import Loder from "../Layouts/Loder/Loder";
import { FaUser } from "react-icons/fa6";
import { Link } from "react-router";
import { FaCheck } from "react-icons/fa";
import toast from "react-hot-toast";
import { IoOpenOutline } from "react-icons/io5";
import Userdata from "./userdata";

const AllorderHistory = () => {
  const [Allorders, setAllorders] = useState();
  const [Options, setOptions] = useState(-1);
  const [Values, setValues] = useState({ status: "" });
  const [userDiv, setuserDiv] = useState("hidden");
  const [userDivData, setuserDivData] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fatch = async () => {
      const res = await axios.get(
        "http://localhost:1000/api/v1/get-all-orders",
        { headers }
      );

      setAllorders(res.data.data);
    };
    fatch();
  }, [Allorders]);
  const change = (e) => {
    const { value } = e.target;
    setValues({ status: value });
  };

  const submitChanges = async (i) => {
    const id = Allorders[i]._id;

    const res = await axios.put(
      `http://localhost:1000/api/v1/update-status/${id}`,
      Values,
      { headers }
    );
    toast(res.data.message);
  };

  // Allorders && Allorders.splice(Allorders.length -1 ,1);
  return (
    <>
      {!Allorders && (
        <div className="h-[100%] flex items-center justify-center">
          <Loder />
        </div>
      )}

      {Allorders && Allorders.length > 0 && (
        <div className=" p-0  md:p-4 text-zinc-100">
          <h1>Your Order History</h1>

          <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2">
            <div className=" w-[1rem]">
              <h1 className="text-center">Sl.</h1>
            </div>
            <div className="w-[10rem] md:w-[13rem] lg:w-[15rem]">
              <h1 className="">Book</h1>
            </div>
            <div className="w-[12rem] hidden md:block lg:w-[19rem]">
              <h1 className="">Description</h1>
            </div>

            <div className="w-[4rem] md:w-[7rem] lg:w-[14rem]">
              <h1 className="">Price</h1>
            </div>
            <div className="w-[6rem] md:w-[7rem] lg:w-[14rem]">
              <h1 className="">Status</h1>
            </div>
            <div className="w-[1rem]  hidden md:block ">
              <h1 className="">
                <FaUser />
              </h1>
            </div>
          </div>

          {Allorders.map((items, i) => (
            <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2">
              <div className=" w-[3%] md:w-[.3rem] lg:w-[1rem]">
                <h1
                  className="text-center text-[.8rem]  md:text-xs lg:text-base "
                  key={i}
                >
                  {i + 1}
                </h1>
              </div>

              <div className="w-[12rem] md:w-[13rem] lg:w-[15rem]">
                <h1 className="hover:text-blue-300 text-[.8rem] md:text-xs lg:text-base ">
                  <Link to={`/view-book-details/${items.book._id}`}>
                    {" "}
                    {items.book.title}
                  </Link>
                </h1>
              </div>
              <div className="hidden md:block w-[12rem] text-[.8rem] md:text-xs lg:text-base lg:w-[19rem]">
                <h1 className="">{items.book.desc.slice(0, 50)}</h1>
              </div>

              <div className="w-[4rem] md:w-[6rem] text-[.8rem] md:text-xs lg:text-base lg:w-[13rem]">
                <h1 className="">₹{items.book.price}</h1>
              </div>

              <div className="w-[6rem] md:w-[7rem] text-[.8rem] md:text-xs lg:text-base lg:w-[15rem]">
                <h1 className="font-semibold ">
                  <button
                    className="hover:scale-105 transition-all duration-300 text-green-500"
                    onClick={() => setOptions(i)}
                  >
                    {items.status === "Order placed" ? (
                      <div className="text-green-500"> {items.status}</div>
                    ) : items.status === "Canceled" ? (
                      <div className="text-red-500">{items.status}</div>
                    ) : (
                      items.status
                    )}
                  </button>
                  <div
                    className={`${Options === i ? "block" : "hidden "} mt-3`}
                  >
                    <select
                      name="status"
                      id=""
                      className="bg-gray-800"
                      onChange={change}
                      value={Values.status}
                    >
                      {[
                        "Order placed",
                        "Out for delivery",
                        "Deliverded",
                        "Canceled",
                      ].map((items, i) => (
                        <option value={items} key={i}>
                          {items}
                        </option>
                      ))}
                    </select>
                    <button
                      className="text-green-500 hover:text-purple-600 mx-2 "
                      onClick={() => {
                        setOptions(-1);
                        submitChanges(i);
                      }}
                    >
                      <FaCheck />
                    </button>
                  </div>
                </h1>
              </div>

              <div className="w-[1rem] ">
                <button
                  className="text-[.8rem] md:text-xs lg:text-base hover:text-orange-500"
                  onClick={() => {
                    setuserDiv("fixed");
                    setuserDivData(items.user);
                  }}
                >
                  <IoOpenOutline />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {userDivData && (
        <Userdata
          userDivData={userDivData}
          userDiv={userDiv}
          setuserDiv={setuserDiv}
        />
      )}
    </>
  );
};

export default AllorderHistory;
