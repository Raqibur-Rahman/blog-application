import LoadBlogs from "../components/LoadBlogs/LoadBlogs";
const HomePage = () => {
  return (
    <main>
      <h2 className="text-3xl font-bold text-center my-6">Latest Blog Posts</h2>

      <LoadBlogs></LoadBlogs>
    </main>
  );
};
export default HomePage;
