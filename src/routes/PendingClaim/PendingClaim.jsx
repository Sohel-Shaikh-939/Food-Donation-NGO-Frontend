import React, { useState, useEffect } from "react";
import axios from "axios";
import { Clock, MapPin, Phone, User, XCircle, RefreshCcw } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PendingClaim = () => {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:3000/pendingclaim", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        if (res.data.status) {
          setClaims(res.data.data);
        }
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const handleManualRefresh = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  const handleGetDirections = (address) => {
    console.log("here")
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        address
      )}`,
      "_blank"
    );
  };

  const handleCancelClaim = async (claimId, title) => {
    if (
      confirm(
        `Are you sure you want to cancel your claim for "${title}"? This item will immediately become available for other claimers.`
      )
    ) {
      try {
        setLoading(true);
        const res = await axios.patch(
          "http://localhost:3000/cancelclaim",
          { id: claimId },
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        if (res.data.status) {
          setClaims((prevClaims) =>
            prevClaims.filter((claim) => claim.id !== claimId)
          );
           alert(`Claim for "${title}" has been successfully cancelled.`);
        }
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="mx-auto bg-white shadow-lg rounded-xl p-6 sm:p-8">
        <header className="mb-6 flex justify-between items-center border-b pb-4">
          <h1 className="text-3xl font-bold text-gray-800">
            Your Pending Pickups
          </h1>
          <button
            onClick={handleManualRefresh}
            className="flex items-center space-x-2 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
            disabled={loading}
          >
            <RefreshCcw
              className={`w-5 h-5 ${loading ? "animate-spin" : ""}`}
            />
            <span>{loading ? "Loading..." : "Refresh"}</span>
          </button>
        </header>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-md shadow-sm">
          <div className="flex items-center">
            <Clock className="h-6 w-6 text-yellow-400 mr-3" />
            <p className="text-yellow-800 text-sm font-medium">
              **Awaiting Pickup:** Please ensure you pick up the food before the
              **Expiration Date**. If you cannot make the pickup, please
              **Cancel Claim** immediately.
            </p>
          </div>
        </div>

        {error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : claims.length === 0 ? (
          <div className="text-center p-10 bg-gray-50 border border-dashed border-gray-300 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-700">
              No Pending Pickups
            </h3>
            <p className="mt-2 text-gray-500">
              You currently have no food donations reserved.
            </p>
            <p
              onClick={() => navigate("/claim")}
              className="text-green-600 hover:text-green-700 font-medium mt-1 inline-block cursor-pointer"
            >
              Find new listings to claim food!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {claims.map((claim) => (
              <div
                key={claim.id}
                className="bg-white border border-gray-200 rounded-lg shadow-md p-5 transform hover:scale-[1.01] transition duration-300 ease-in-out"
              >
                <h3 className="text-xl font-semibold text-green-700 mb-2">
                  {claim.foodName} {claim.foodCategory}
                </h3>
                <div className="space-y-1 text-gray-700 mb-4 border-b pb-4">
                  <p className="flex items-center space-x-2">
                    <span className="font-medium text-gray-600">Quantity:</span>{" "}
                    <span>{claim.quantity}</span>
                  </p>
                  <p className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="font-medium text-gray-600">
                      Expires:
                    </span>{" "}
                    <span>{new Date(claim.expiryDate).toDateString()}</span>
                  </p>
                </div>

                <div className="mt-2 space-y-2">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2 flex items-center space-x-2">
                    <User className="w-5 h-5 text-gray-500" />
                    <span>Donor Details</span>
                  </h4>
                  <p className="text-gray-700 ml-7">
                    {claim.donorName || "N/A"}
                  </p>

                  <p className="text-gray-700 flex items-start space-x-2">
                    <MapPin className="w-5 h-5 text-gray-500" />
                    <span className="flex-1">
                      {claim.physicalAddress || "Contact donor for details"}
                    </span>
                  </p>
                  <p className="text-gray-700 flex items-center space-x-2">
                    <Phone className="w-5 h-5 text-gray-500" />
                    <span>{claim.phone || "N/A"}</span>
                  </p>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleGetDirections(claim.physicalAddress)}
                    className="w-full bg-green-600 text-white py-2 px-3 rounded-md hover:bg-green-700 transition duration-150 text-sm font-semibold cursor-pointer"
                    disabled={!claim?.physicalAddress}
                  >
                    Get Directions
                  </button>

                  <button
                    onClick={() => handleCancelClaim(claim.id, claim.foodName)}
                    className="w-full flex items-center justify-center space-x-1 border border-red-500 text-red-600 py-2 px-3 rounded-md hover:bg-red-50 transition duration-150 text-sm font-semibold cursor-pointer"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>Cancel Claim</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PendingClaim;
