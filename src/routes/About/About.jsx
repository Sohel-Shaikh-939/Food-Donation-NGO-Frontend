import { useEffect } from "react";

const About = () => {

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  },[]);

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-20 pb-16 bg-green-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl mb-4">
            Our Mission: Food for All, Smiles All Around
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            We bridge the gap between **surplus food** and **people in need**.
            Every day, we connect donors with recipients to ensure that good
            food doesn't go to waste and no one goes hungry.
          </p>
          <div className="mt-8">
            <a
              href="#imp" 
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 transition duration-150 ease-in-out"
            >
              See Our Impact
            </a>
          </div>
        </div>
      </div>

      <div className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
                The Story Behind **Food4All**
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                It started with a simple observation: perfectly good food was
                being discarded while local community shelters struggled to meet
                demand. Founded in 2023, Food4All was built on the belief that
                **technology could solve this logistical challenge**.
              </p>
              <p className="mt-4 text-lg text-gray-600">
                We're a non-profit organization powered by a dedicated team of
                volunteers and advanced logistics software. Our platform makes
                donating and claiming food as easy as a few clicks, fostering a
                more sustainable and compassionate community.
              </p>
            </div>
            <div className="mt-10 lg:mt-0">
              <div className="bg-green-100 p-8 rounded-lg shadow-xl">
                <p className="text-xl font-semibold text-green-700">
                  "Waste not, want not. We turn a problem into a promise."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 bg-green-50" id="imp">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-10">
            Our Impact So Far
          </h2>
          <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div className="bg-white overflow-hidden shadow rounded-lg px-4 py-5 sm:p-6 border-t-4 border-green-500">
              <dt className="text-sm font-medium text-gray-500 truncate">
                Meals Recovered
              </dt>
              <dd className="mt-1 text-5xl font-extrabold text-green-600">
                450K+
              </dd>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg px-4 py-5 sm:p-6 border-t-4 border-green-500">
              <dt className="text-sm font-medium text-gray-500 truncate">
                Active Donors
              </dt>
              <dd className="mt-1 text-5xl font-extrabold text-green-600">
                2,100+
              </dd>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg px-4 py-5 sm:p-6 border-t-4 border-green-500">
              <dt className="text-sm font-medium text-gray-500 truncate">
                Cities Served
              </dt>
              <dd className="mt-1 text-5xl font-extrabold text-green-600">
                15
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Join the movement. Every meal counts.
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Whether you're a business with surplus or someone looking to
            volunteer, your contribution makes a difference.
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <a
              href="#" 
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 transition duration-150 ease-in-out"
            >
              Become a Donor
            </a>
            <a
              href="#" 
              className="inline-flex items-center justify-center px-6 py-3 border border-green-600 text-base font-medium rounded-md text-green-600 bg-white hover:bg-green-50 transition duration-150 ease-in-out"
            >
              Volunteer
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
