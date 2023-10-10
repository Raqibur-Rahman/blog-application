
"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Loader from '../Loader/Loader';

async function LoadAllBlogs(limit) {
    const res = await fetch(`http://localhost:3000/api/blog?limit=${limit}`, {
        next: {
            revalidate: 10,
        },
    });
    const data = await res.json();
    return data.posts.reverse(); // Reverse the order of posts
}

export default function AllBlogs() {
    const [isLoading, setIsLoading] = useState(false);
    const [showAll, setShowAll] = useState(false);
    const [loadedPosts, setLoadedPosts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All'); // Default category is All
    const initialLimit = 10;

    const loadPosts = async () => {
        setIsLoading(true);
        const posts = await LoadAllBlogs(showAll ? 0 : initialLimit);
        setLoadedPosts(posts);
        setIsLoading(false);
    };

    // Load the first 10 blogs by default
    useEffect(() => {
        loadPosts();
    }, []);

    // Only show the "View All Blogs" button if there are more than 10 blogs
    const showViewAllButton = loadedPosts.length > 10;

    // Display all of the blog posts when the user clicks on the "View All Blogs" button
    const handleShowAllBlogs = async () => {
        setShowAll(true);
        const posts = await LoadAllBlogs(0);
        setLoadedPosts(posts);
    };

    // Filter posts by category
    const filterPostsByCategory = async (category) => {
        setSelectedCategory(category);
        setIsLoading(true);
        const posts = await LoadAllBlogs(showAll ? 0 : initialLimit);
        if (category !== 'All') {
            // Filter posts by selected category
            const filteredPosts = posts.filter((post) => post.category === category);
            setLoadedPosts(filteredPosts);
        } else {
            setLoadedPosts(posts);
        }
        setIsLoading(false);
    };

    return (
        <main>
            <div className="mb-4 mt-4 flex justify-center items-center">

                <button
                    className={`mr-4 ${
                        selectedCategory === 'All' ? 'bg-blue-500' : 'bg-gray-300'
                    } text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300`}
                    onClick={() => filterPostsByCategory('All')}
                >
                    All
                </button>
                <button
                    className={`mr-4 ${
                        selectedCategory === 'Technology' ? 'bg-blue-500' : 'bg-gray-300'
                    } text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300`}
                    onClick={() => filterPostsByCategory('Technology')}
                >
                    Technology
                </button>
                <button
                    className={`mr-4 ${
                        selectedCategory === 'Leisure Time' ? 'bg-blue-500' : 'bg-gray-300'
                    } text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300`}
                    onClick={() => filterPostsByCategory('Leisure Time')}
                >
                    Leisure Time
                </button>
                <button
                    className={`mr-4 ${
                        selectedCategory === 'Literature' ? 'bg-blue-500' : 'bg-gray-300'
                    } text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300`}
                    onClick={() => filterPostsByCategory('Literature')}
                >
                    Literature
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {loadedPosts.map((post) => {
                    const postDate = new Date(post.date);
                    const formattedDate = postDate.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    });
                    const formattedTime = postDate.toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                    });

                    return (
                        <div key={post.id} className="p-4 rounded-md bg-slate-300 hover:bg-slate-400 hover:shadow-md transition duration-300">
                            <div className="my-3">
                                <h3 className="font-semibold text-lg">{post.title}</h3>
                                <div className="flex flex-row text-gray-600 text-sm mb-2">
                                    <span className="mr-2">{formattedDate}</span>
                                    <span>{formattedTime}</span>
                                </div>
                                <p className="text-gray-600 mb-4 text-base">
                                    {post.content.slice(0, 111)}...
                                    <button>
                                        <Link href={`/blog/all-blogs/${post.id}`}>
                                            <span className="text-blue-600 font-bold ml-2">Read More</span>
                                        </Link>
                                    </button>
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

        

            {isLoading && (
                <div className="text-center mt-4">
                    <Loader></Loader>
                </div>
            )}
        </main>
    );
}
