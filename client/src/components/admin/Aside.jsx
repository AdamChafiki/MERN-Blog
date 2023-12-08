import { Link } from "react-router-dom";

const Aside = () => {
  return (
    <aside className="side_bar_admin border-r-2 min-w-[300px] h-[calc(100vh-82px)] p-4   ">
      <Link to="/admin/dashboard" className="flex items-center space-x-3 mb-10">
        <span className="material-symbols-outlined">dashboard</span>
        <h1 className="font-bold">Dashboard</h1>
      </Link>
      <div>
        <ul className="flex flex-col space-y-6">
          <li>
            <Link
              to="/admin/dashboard/users"
              className="flex items-center space-x-3 p-2 hover:bg-gray-300 rounded-md"
            >
              <span className="material-symbols-outlined">groups</span>
              <h1>Users</h1>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/dashboard/posts"
              className="flex items-center space-x-3 p-2 hover:bg-gray-300 rounded-md"
            >
              <span className="material-symbols-outlined">full_coverage</span>
              <h1>Posts</h1>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/dashboard/categories"
              className="flex items-center space-x-3 p-2 hover:bg-gray-300 rounded-md"
            >
              <span className="material-symbols-outlined">sell</span>
              <h1>Categories</h1>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/dashboard/comments"
              className="flex items-center space-x-3 p-2 hover:bg-gray-300 rounded-md"
            >
              <span className="material-symbols-outlined">chat</span>
              <h1>Comments</h1>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Aside;
