import { Link } from "react-router-dom";

const Pagination = ({ pages, currentPage, setCurrentPage }) => {
  const generatePages = [];
  for (let i = 1; i <= pages; i++) {
    generatePages.push(i);
  }

  return (
    <>
      <div className="pagination py-5">
        <ul className="flex items-center justify-center -space-x-px h-8 text-xl">
          <li>
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 ${
                currentPage === 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              }`}
              disabled={currentPage === 1}
            >
              Previous
            </button>
          </li>
          {generatePages?.map((page, index) => (
            <li key={index}>
              <button
                onClick={() => setCurrentPage(page)}
                className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 ${
                  currentPage === page
                    ? "bg-blue-500 text-white cursor-not-allowed"
                    : "bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                }`}
                disabled={currentPage === page}
              >
                {page}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 ${
                currentPage === pages
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              }`}
              disabled={currentPage === pages}
            >
              Next
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Pagination;
