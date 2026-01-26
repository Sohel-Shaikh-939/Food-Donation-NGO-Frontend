import React, { useState, useEffect } from "react";
import {
  Package,
  Clock,
  Refrigerator,
  Edit,
  Trash2,
  PlusCircle,
  CheckCircle,
  IdCard,
  Phone,
  Mail,
} from "lucide-react";
import axios, { formToJSON } from "axios";
import { useNavigate } from "react-router-dom";
import { homeSliceAction } from "../Home/homeSlice";
import { useDispatch } from "react-redux";

const DonationList = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const res = await axios.get("http://localhost:3000/donations", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      setListings(res.data.data);
      setLoading(false);
    })();
  }, []);

  function getDaysUntilExpiry(expiryString) {
    const expiryDate = new Date(expiryString);
    const today = new Date();
    const diffTime = expiryDate - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  const Otp = ({ setMarkClaimed, id }) => {
    const [otp, setOtp] = useState("");
    const dispatch = useDispatch();

    const handleVerifyOtp = async (e) => {
      e.preventDefault();

      try {
          const res = await axios.post(
            "http://localhost:3000/verifyotp",
            { id: id, otp: e.target.otp.value },
            {
              headers: {
                Authorization: localStorage.getItem("token"),
              },
            }
          );
          if (res.data.status) {
            setListings((prevListings) =>
              prevListings.filter((listing) => listing.id !== id)
            );
            dispatch(homeSliceAction.setRepaint());
          } else {
            e.target.otp.value = "";
            e.target.otp.placeholder = "Wrong OTP";
          }
        } catch (error) {
          console.log(error);
        }
    }

    return (
      <div className="p-6">
        <div className="text-center mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-1">
            Enter Verification Code
          </h3>
          <p className="text-sm text-gray-500">
            To proceed with the claim, please enter the OTP sent to the claimant
            email.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleVerifyOtp}>
          <div>
            <label
              htmlFor="otpInput"
              className="block text-sm font-medium text-gray-700 sr-only"
            >
              One-Time Password
            </label>
            <input
              id="otpInput"
              type="tel"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              name="otp"
              placeholder="— — — — — —"
              onChange={(e) => setOtp(e.target.value)}
              className={`w-full py-1 text-3xl tracking-widest text-center font-mono border-2 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition duration-150 ease-in-out ${
                otp.length > 0 && otp.length < 6
                  ? "border-red-500 text-red-600"
                  : "border-gray-300"
              }`}
              required
              autoFocus
            />
            {otp.length > 0 && otp.length < 6 && (
              <p className="mt-2 text-sm text-red-600 text-center">
                OTP must be exactly 6 digits.
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={otp.length != 6}
            className={`w-full flex justify-center py-2 border border-transparent rounded-xl shadow-sm text-lg font-medium text-white transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2  bg-green-600 hover:bg-green-700 focus:ring-indigo-500 disabled:cursor-not-allowed
            }`}
          >
            Verify Code
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setMarkClaimed(false)}
            className="text-sm text-gray-500 hover:text-gray-700 font-medium focus:outline-none"
          >
            Cancel Verification
          </button>
        </div>
      </div>
    );
  };

  const ListingCard = ({ listing, setListings }) => {
    const [markClaimed, setMarkClaimed] = useState(false);

    const handleMarkClaimed = async () => {
      const res = confirm("Do you really want to mark it claimed!");
      if (res) {
        try {
          const res = await axios.post(
            "http://localhost:3000/sendotp",
            {id: listing.id},
            {
              headers: {
                Authorization: localStorage.getItem("token"),
              },
            }
          );
          if (res.data.status) setMarkClaimed(true);
        } catch (error) {
          console.log(error);
        }
      }
    };

      const handleDelete = async (id, name) => {
        if (
          window.confirm(
            `Are you sure you want to delete food item ${name}? This action cannot be undone.`
          )
        ) {
          try {
            const res = await axios.delete(
              `http://localhost:3000/canceldonation?id=${id}`,
              {
                headers: {
                  Authorization: localStorage.getItem("token"),
                },
              }
            );
            if (res.data.status) {
              setListings((prevListings) =>
                prevListings.filter((listing) => listing.id !== id)
              );
            }
          } catch (error) {
            console.log(error);
          }
        }
      };

    const statusColor =
      listing.status == "Active"
        ? "bg-green-50 text-green-700 border-green-300"
        : listing.status == "Reserved"
        ? "bg-yellow-100 text-yellow-800 border-yellow-300"
        : listing.status == "Claimed"
        ? "bg-orange-100 text-orange-800 border-orange-300"
        : getDaysUntilExpiry(listing.expiryDate) < 0
        ? "bg-red-100 text-red-800 border-red-300"
        : "bg-green-50 text-green-700 border-green-300";
    return (
      <div className="h-fit bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
        <div
          className={`p-2 text-xs font-semibold uppercase ${statusColor} flex items-center justify-between `}
        >
          <div className="flex items-center space-x-1">
            {!listing.claimed ? (
              <Clock className="w-4 h-4" />
            ) : (
              <CheckCircle className="w-4 h-4" />
            )}
            <span>{listing.status}</span>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => handleDelete(listing.id, listing.foodName)}
              className="p-1 text-gray-500 hover:text-red-600 rounded-md transition duration-150 focus:outline-none"
              title="Delete Listing"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {!markClaimed && (
            <>
              <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2">
                {listing.foodName}
              </h3>

              <div className="grid grid-cols-2 gap-4 text-gray-700 text-sm">
                <div className="flex items-center space-x-2">
                  <Package className="h-5 w-5 text-gray-500" />
                  <p>
                    <strong>Quantity:</strong> {listing.quantity} {listing.unit}
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <Refrigerator className="h-5 w-5 text-gray-500" />
                  <p>
                    <strong>Storage:</strong>{" "}
                    {listing.storageRequirement.split(" ")[0]}
                  </p>
                </div>

                <div className="flex items-center space-x-2 col-span-2">
                  <Clock className="h-5 w-5 text-gray-500" />
                  <p>
                    <strong>Expires By:</strong>{" "}
                    {new Date(listing.expiryDate).toDateString()}
                  </p>
                </div>
              </div>
            </>
          )}
          {listing.status == "Reserved" ? (
            <>
              {!markClaimed && (
                <>
                  <div className="w-full h-0 my-2 border border-b-gray-200"></div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2">
                    Claimer Details
                  </h3>
                  <div className="col-span-1 gap-4 space-y-2.5 text-gray-700 text-sm ">
                    <div className="flex items-center space-x-2">
                      <IdCard className="h-5 w-5 text-gray-500" />
                      <p>
                        <strong>Name:</strong> {listing.claimer.name}
                      </p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Phone className="h-5 w-5 text-gray-500" />
                      <p>
                        <strong>Phone: </strong>
                        {listing.claimer.phone}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 col-span-2">
                      <Mail className="h-5 w-5 text-gray-500" />
                      <p>
                        <strong>Mail: </strong>
                        {listing.claimer.email}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </>
          ) : (
            <></>
          )}
          {!markClaimed ? (
            <>
              {listing.status == "Reserved" && (
                <div className="mt-5 gap-3">
                  <button
                    className="w-full bg-green-600 text-white py-2 px-3 rounded-md hover:bg-green-700 transition duration-150 text-sm font-semibold cursor-pointer"
                    onClick={handleMarkClaimed}
                  >
                    Mark Claimed
                  </button>
                </div>
              )}
            </>
          ) : (
            <Otp setMarkClaimed={setMarkClaimed} id={listing.id}/>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className=" mx-auto bg-white shadow-xl rounded-xl p-6 sm:p-10">
        <header className="mb-8 flex justify-between items-center border-b pb-4">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Your Active Donations
          </h1>
          <button
            onClick={() => {
              navigate("/donate");
            }}
            className="flex items-center space-x-2 bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-green-700 transition duration-200"
          >
            <PlusCircle className="w-5 h-5" />
            <span>New Donation</span>
          </button>
        </header>

        {loading ? (
          <p className="text-center text-gray-600">
            Loading your donation listings...
          </p>
        ) : !listings || listings.length == 0 ? (
          <div className="text-center p-10 bg-gray-50 border border-dashed border-gray-300 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-700">
              No Active Listings
            </h3>
            <p className="mt-2 text-gray-500">
              You currently have no food listed for pickup. Click the button
              above to create a new donation!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} setListings={setListings}/>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DonationList;
