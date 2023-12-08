import { Link } from "react-router-dom";

const Analytic = ({ icon, title, count, link }) => {
  return (
    <div className="p-2 bg-white shadow-lg flex flex-col space-y-3 rounded-md">
      <a className="flex items-center space-x-3">
        <span className="material-symbols-outlined">{icon}</span>
        <h1>{title}</h1>
      </a>
      <span className="font-bold">{count}</span>
      <Link to={`/admin/dashboard/${link}`} className="bg-gray-500 text-white p-2 rounded-md w-1/2 hover:bg-gray-600">
        See all {title}
      </Link>
    </div>
  );
};

export default Analytic;
