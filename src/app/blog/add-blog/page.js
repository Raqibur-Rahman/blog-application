"use client";
import React, { useState } from "react";
import { useRef } from "react";
import Loader from "../../../components/Loader/Loader.jsx";
import Swal from "sweetalert2";

const postBlog = async ({ title, category, content }) => {
  const response = await fetch("http://localhost:3000/api/blog", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, category, content }),
  });

  // You can handle the response here as needed, such as checking for success or displaying messages.
  if (response.ok) {
    // Display a success alert
    Swal.fire({
      icon: "success",
      title: "Success",
      text: "Blog post was successful!",
    });
  } else {
    console.error("Blog post failed.");
    // Display an error alert
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Blog post failed.",
    });
  }

  return response;
};

const AddBlog = () => {
  const titleRef = useRef(null);
  const categoryRef = useRef(null);
  const contentRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const title = titleRef.current?.value;
    const category = categoryRef.current?.value;
    const content = contentRef.current?.value;

    // You can add your logic here to handle the form submission, such as sending the data to your API.
    console.log({ title, category, content });

    await postBlog({ title: title, category: category, content: content });

    setIsLoading(false);

    // Clear form inputs
    titleRef.current.value = "";
    categoryRef.current.value = "";
    contentRef.current.value = "";
  };

  return (
    <div>
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg content-center">
        <h2 className="text-2xl font-semibold mb-4 text-center">Add Blog</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block font-semibold mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              ref={titleRef}
              placeholder="Enter the blog title"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="block font-semibold mb-2">
              Category
            </label>
            <input
              type="text"
              id="category"
              ref={categoryRef}
              placeholder="Enter the blog category"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="block font-semibold mb-2">
              Content
            </label>
            <textarea
              id="content"
              ref={contentRef}
              placeholder="Enter the blog content"
              rows="4"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 block mx-auto"
          >
            Submit
          </button>
        </form>
      </div>

      {isLoading && (
        <div className="mt-4 flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
    </div>
  );
};

export default AddBlog;
