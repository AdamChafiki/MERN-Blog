import { Link } from "react-router-dom"; 

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">404 Not Found</h1>
      <p className="text-gray-600 mb-8">
        The page you are looking for doesn&apos;t exist.
      </p>
      <Link to="/" className="bg-blue-500 text-white py-2 px-4 rounded">
        Go Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
