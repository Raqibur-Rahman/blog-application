"use client";
import Loader from "@/components/Loader/Loader";
import React, { useEffect, useState } from "react";

const getBlogById = async (id) => {
  const res = await fetch(`http://localhost:3000/api/blog/${id}`);
  const data = await res.json();
  return data.post;
};

const SingleBlog = ({ params }) => {
  const [post, setPost] = useState(null);

  useEffect(() => {
    const getBlogById = async (id) => {
      try {
        const res = await fetch(`http://localhost:3000/api/blog/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch blog post");
        }
        const data = await res.json();
        setPost(data.post);
      } catch (error) {
        console.error(error);
        // Handle the error, e.g., display an error message
      }
    };

    if (params.id) {
      getBlogById(params.id);
    }
  }, [params.id]);

  // Function to format the date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "en-US",
      options
    );
    return formattedDate;
  };

  return (
    <div>
      {post ? (
        <>
          <div className="my-6 border border-gray-300 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
            <p className="text-gray-600 text-sm mb-2">
              <span className="text-blue-500">{formatDate(post.date)}</span>
            </p>
            <p className="text-gray-700 text-base">{post.content}</p>
          </div>
        </>
      ) : (
        <p>
          <Loader></Loader>
        </p>
      )}
    </div>
  );
};

export default SingleBlog;
