import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  },[]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">

      <section className="flex flex-col md:flex-row items-center px-8 py-16">
        <section className="container mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-24 grid grid-cols-1 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
              Donate Food, <br />
              <span className="text-green-600">Spread Smiles</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-lg">
              Connect surplus food with people in need.
            </p>
            <div className="flex space-x-4 pt-4">
              <Link to="/donate" className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg text-lg shadow-xl shadow-green-500/50 transition duration-300 transform hover:scale-105">
                Donate Now
              </Link>
              <Link to="/claim" className="border-2 border-green-600 text-green-600 hover:bg-green-50 font-bold py-3 px-8 rounded-lg text-lg transition duration-300 transform hover:scale-105">
                Claim Food
              </Link>
            </div>
          </div>
        </section>
        <div className="md:w-1/2 mt-10 md:mt-0">
          <img
            src="./hero.png"
            alt="Food Donation"
            className="w-full max-w-md mx-auto"
          />
        </div>
      </section>

      <section className="px-8 py-16 bg-white text-center">
        <h3 className="text-3xl font-bold mb-8">How It Works</h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 shadow rounded-lg">
            <span className="text-4xl">🥗</span>
            <h4 className="mt-4 font-semibold">List Food</h4>
            <p className="text-gray-600">Donors add surplus food details.</p>
          </div>
          <div className="p-6 shadow rounded-lg">
            <span className="text-4xl">🤝</span>
            <h4 className="mt-4 font-semibold">Claim Food</h4>
            <p className="text-gray-600">
              People in need request available food.
            </p>
          </div>
          <div className="p-6 shadow rounded-lg">
            <span className="text-4xl">🚚</span>
            <h4 className="mt-4 font-semibold">Deliver / Pickup</h4>
            <p className="text-gray-600">
              Food gets delivered or picked up safely.
            </p>
          </div>
        </div>
      </section>


      <section className="bg-green-600 text-white text-center py-12">
        <h3 className="text-2xl font-bold mb-4">
          Join the movement. Every meal counts.
        </h3>
        <button className="bg-white text-green-600 px-6 py-3 rounded-lg shadow">
          Become a Donor
        </button>
      </section>

      <footer className="bg-gray-900 text-white py-6 text-center">
        <p>© 2025 Food4All. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
