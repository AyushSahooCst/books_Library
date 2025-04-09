import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

const AddBook = () => {
    const [Data, setData] = useState({
        title: "",
        author: "",
        price: "",
        desc: "",
        language: "",
        image: null, // Store the image file
    });

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    const change = (e) => {
        const { name, value } = e.target;
        setData({ ...Data, [name]: value });
    };

    const handleFileChange = (e) => {
        setData({ ...Data, image: e.target.files[0] });
    };

    const submit = async () => {
        if (!Data.image || !Data.title || !Data.author || !Data.price || !Data.desc || !Data.language) {
            return toast.error("All fields are required");
        }

        const formData = new FormData();
        formData.append("image", Data.image);
        formData.append("title", Data.title);
        formData.append("author", Data.author);
        formData.append("price", Data.price);
        formData.append("desc", Data.desc);
        formData.append("language", Data.language);

        try {
            const res = await axios.post("http://localhost:1000/api/v1/add-book", formData, { headers });
            setData({
                title: "",
                author: "",
                price: "",
                desc: "",
                language: "",
                image: null,
            });
            toast.success(res.data.message);
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred");
        }
    };

    return (
        <div className="h-[100%] p-0 md:p-4">
            <h1 className="text-3xl md:text-4xl font-semibold text-zinc-500 mb-8">Add Book</h1>

            <div className="p-4 bg-zinc-800 rounded">
                <div>
                    <label className="text-zinc-400">Image</label>
                    <input type="file"
                        className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                        onChange={handleFileChange}
                    />
                </div>

                <div className="mt-4">
                    <label className="text-zinc-400">Title of book</label>
                    <input type="text"
                        className="w-full mt-2 text-zinc-100 p-2 outline-none bg-zinc-900"
                        name="title"
                        value={Data.title}
                        onChange={change}
                    />
                </div>

                <div className="mt-4">
                    <label className="text-zinc-400">Author of book</label>
                    <input type="text"
                        className="w-full mt-2 text-zinc-100 p-2 outline-none bg-zinc-900"
                        name="author"
                        value={Data.author}
                        onChange={change}
                    />
                </div>

                <div className="mt-4 flex gap-3">
                    <div className="w-3/6">
                        <label className="text-zinc-400">Language</label>
                        <input type="text"
                            className="w-full mt-2 text-zinc-100 p-2 outline-none bg-zinc-900"
                            name="language"
                            value={Data.language}
                            onChange={change}
                        />
                    </div>

                    <div className="w-3/6">
                        <label className="text-zinc-400">Price</label>
                        <input type="text"
                            className="w-full mt-2 text-zinc-100 p-2 outline-none bg-zinc-900"
                            name="price"
                            value={Data.price}
                            onChange={change}
                        />
                    </div>
                </div>

                <div className="mt-4">
                    <label className="text-zinc-400">Description of book</label>
                    <textarea name="desc"
                        rows="5"
                        className="w-full mt-2 text-zinc-100 p-2 outline-none bg-zinc-900"
                        value={Data.desc}
                        onChange={change}
                    ></textarea>
                </div>

                <button className="mt-4 px-3 bg-blue-500 text-white font-semibold py-2 rounded-xl hover:bg-blue-600 transition-all duration-200" onClick={submit}>
                    Add Book
                </button>
            </div>
        </div>
    );
};

export default AddBook;
