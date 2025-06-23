import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-6">
      <h1 className="text-4xl font-bold mb-4">Welcome to Personalized Content Aggregator</h1>
      <p className="mb-8 text-gray-700 max-w-xl">
        Get personalized news recommendations based on your preferences. Stay updated with the latest in Technology, Sports, Business, Health, and more.
      </p>
      <div className="flex gap-4">
        <Link to="/login" className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Login</Link>
        <Link to="/register" className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700">Register</Link>
      </div>
    </div>
  );
}
