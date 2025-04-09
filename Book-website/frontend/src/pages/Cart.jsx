import { React, useState, useEffect } from 'react';
import Loder from '../Layouts/Loder/Loder';
import axios from 'axios';
import { RiDeleteBin5Line } from "react-icons/ri";
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';

const Cart = () => {
  const navigate = useNavigate();
  const [Cart, setCarts] = useState([]); // Initialize as empty array
  const [Total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true); // Track loading state

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  // Fetch cart data
  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:1000/api/v1/get-user-cart", { headers });
        setCarts(response.data.data || []);
      } catch (error) {
        toast.error("Failed to load cart items");
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  // Delete item function
  const deleteItem = async (bookid) => {
    try {
      
      setCarts(prevCart => prevCart.filter(item => item._id !== bookid));

      // Send delete request to API
      const response = await axios.put(`http://localhost:1000/api/v1/remove-to-cart/${bookid}`, {}, { headers });

      // Update state with API response if necessary
      if (response.data.data) {
        setCarts(response.data.data);
      }

      toast.success("Item removed from cart");
    } catch (error) {
      toast.error("Failed to remove item");
    }
  };

  // Calculate total price when Cart updates
  useEffect(() => {
    let total = Cart.reduce((sum, item) => sum + item.price, 0);
    setTotal(total);
  }, [Cart]);

  // Place Order function
  const PlaceOrder = async () => {
    try {
      const res = await axios.post(`http://localhost:1000/api/v1/place-order`, { order: Cart }, { headers });
      toast.success(res.data.message);
      navigate("/profile/orderHistory");
    } catch (error) {
      toast.error("Order placement failed");
    }
  };

  return (
    <div className="bg-zinc-900 px-12 h-auto py-8">
      {/* Show Loader if Data is Still Loading */}
      {loading ? (
        <div className="h-screen w-full flex items-center justify-center bg-zinc-900">
          <Loder />
        </div>
      ) : Cart.length === 0 ? (
        <div className="h-screen flex items-center justify-center flex-col bg-zinc-900 ">
          <h1 className="text-5xl font-semibold text-zinc-700">Empty Cart</h1>
        </div>
      ) : (
        <>
          <h1 className="text-4xl font-semibold text-zinc-700 p-3">Your Cart</h1>
          {Cart.map((item, i) => (
            <div key={i} className="w-full my-4 rounded flex flex-col md:flex-row p-5 bg-zinc-800 justify-between items-center">
              <img src={item.url} alt="/" className="h-[20vh] md:h-[10vh] object-cover" />
              <div className="w-full md:w-auto pl-3 lg:text-xl md:text-sm text-base">
                <h1 className="font-semibold text-zinc-100 text-start mt-2">{item.title}</h1>
                <p className="text-zinc-300 mt-2 hidden lg:block">{item.desc.slice(0, 80)}...</p>
              </div>
              <div className="flex mt-4 w-full md:w-auto items-center justify-center">
                <h2 className="text-zinc-100 text-xl">₹ {item.price}</h2>
                <button
                  className="bg-red-100 text-red-700 border-red-700 rounded-full p-2 ms-12"
                  onClick={() => deleteItem(item._id)}
                >
                  <RiDeleteBin5Line />
                </button>
              </div>
            </div>
          ))}
          <div className="mt-4 w-full flex items-center justify-end">
            <div className="p-4 bg-zinc-800 rounded">
              <h1 className="text-2xl text-zinc-200 font-semibold">Total Amount</h1>
              <div className="mt-3 flex items-center justify-between text-xl text-zinc-200">
                <h2>{Cart.length} Books - ₹{Total}</h2>
              </div>
              <div className="w-full mt-3">
                <button
                  onClick={PlaceOrder}
                  className="bg-zinc-100 rounded-full px-4 py-2 flex justify-center w-full font-semibold hover:bg-zinc-900 hover:text-white transition-all duration-300"
                >
                  Place your order
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;  