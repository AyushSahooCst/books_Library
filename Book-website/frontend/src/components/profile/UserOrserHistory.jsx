import axios from "axios";
import React, { useState, useEffect } from "react";
import Loder from "../../Layouts/Loder/Loder";
import { Link } from "react-router";

const UserOrserHistory = () => {
  const [OrderHistory, setOrderHistory] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fatch = async () => {
      const res = await axios.get(
        "http://localhost:1000/api/v1/get-order-history",
        { headers }
      );
      setOrderHistory(res.data.data);
    };
    fatch();
  }, []);
  return (
    <>
      {!OrderHistory && (
        <div className="h-[100%] flex items-center justify-center bg-zinc-900">
          {" "}
          <Loder />
        </div>
      )}

      {OrderHistory && OrderHistory.length === 0 && (
        <div className="h-[100%] p-0 md:p-4 text-zinc-100 ">
          <h1 className=" text-3xl font-semibold text-zinc-500 mb-8">
            No Such History
          </h1>
        </div>
      )}

      {OrderHistory && OrderHistory.length > 0 && (
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
            <div className="w-[6rem] md:w-[7rem] lg:w-[13rem]">
              <h1 className="">Status</h1>
            </div>
            <div className="w-[1rem]  hidden md:block ">
              <h1 className="">Model</h1>
            </div>
          </div>
        </div>
      )}

      {OrderHistory &&
        OrderHistory.map((items, i) => (
          <div className=" bg-zinc-800 w-full rounded py-2 px-4 flex gap-2 hover:bg-zinc-900 transition-all duration-300">
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
              <h1 className="font-semibold text-green-500">
                {items.status === "Order placed" ? (
                  <div className=""> {items.status}</div>
                ) : items.status === "Canceled" ? (
                  <div className="text-red-500">{items.status}</div>
                ) : (
                  items.status
                )}
              </h1>
            </div>
            <div className="md:w-[5%] w-none hidden md:block ">
              <h1 className="text-sm text-zinc-400">COD</h1>
            </div>
          </div>
        ))}
    </>
  );
};

export default UserOrserHistory;
