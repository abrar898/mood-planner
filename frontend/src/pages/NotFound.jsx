import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-blue-100 to-purple-200 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-lg w-full text-center">
        <h1 className="text-6xl font-extrabold text-red-500">404</h1>
        <p className="mt-4 text-lg text-gray-700">Oops! The page you're looking for doesn't exist.</p>
        <Link
          to="/"
          className="inline-block mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md transition"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}
