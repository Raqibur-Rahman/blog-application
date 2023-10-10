import Link from "next/link";

async function LoadAllBlogs() {
    const res = await fetch("http://localhost:3000/api/blog", {
        next: {
            revalidate: 10,
        },
    });
    const data = await res.json();
    // console.log(data.posts);
    return data.posts;
}



export default async function AllBlogs() {
    const posts = await LoadAllBlogs();
    // console.log(posts);
    return (
        <main>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {posts?.map((post) => {
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
                                    {post.content.slice(0, 90)}...
                                    <span className="text-blue-600 font-bold ml-2">Read More</span>
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>




        </main>
    );
}
