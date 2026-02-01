import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const DonationField = ({ label, value }) => (
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-3 border-b border-gray-100 last:border-b-0">
    <span className="text-sm font-medium text-gray-500 mb-1 sm:mb-0">
      {label}:
    </span>
    <span className="text-base font-semibold text-gray-800 break-words text-right sm:text-left">
      {value}
    </span>
  </div>
);

const Food = () => {
  // const { donor, donation } = donationData;
  const { id } = useParams();
  const [data, setData] = useState();
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const [reserved, setReserved] = useState(false);
  const {authenticated} = useSelector(store => store.Home);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`http://localhost:3000/food?id=${id}`);
        if (res.data.status) {
          setData(res.data.data);
          setLoaded(true);
        } else {
          navigate("/foodlist");
        }
      } catch (err) {
        console.error(err);
      }
    })();
  }, [reserved]);

  const handleReserve = async (id) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/reserve",
        { id },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      if (res.data.status) {
        setReserved(true);
      } else {
        alert("Unable to reserve");
      }
    } catch (err) {
      console.error(err);
    }
  };

  function getDaysUntilExpiry(expiryString) {
    const expiryDate = new Date(expiryString);
    const today = new Date();
    const diffTime = expiryDate - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans p-4 sm:p-8">
      {loaded && (
        <main className="max-w-4xl mx-auto bg-white shadow-2xl rounded-xl overflow-hidden transform transition duration-500 hover:scale-[1.01]">
          <div className="p-6 sm:p-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8 text-center border-b-4 border-green-500/50 pb-4">
              Donation Listing for Pickup
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1 flex flex-col items-center">
                <h2 className="text-xl font-bold text-green-700 mb-4 border-b-2 border-green-300 pb-1 w-full text-center">
                  III. Food Image
                </h2>
                <div className="w-full max-w-xs h-64 bg-gray-100 rounded-lg overflow-hidden shadow-lg border-4 border-green-500/20 relative">
                  <img
                    src={data.foodImg}
                    alt="Sample of donated food item"
                    className="w-full h-full object-cover transition duration-300 hover:opacity-90"
                  />
                  {data.status == "Reserved" ||
                  data.status == "Claimed" ||
                  getDaysUntilExpiry(data.expiryDate) < 0 ? (
                    <img
                      src={
                        getDaysUntilExpiry(data.expiryDate) < 0
                          ? "../../../public/expired.png"
                          : data.status == "Reserved"
                          ? "../../../public/reserved.png"
                          : data.status == "Claimed"
                          ? "../../../public/claimed.png"
                          : ""
                      }
                      className="w-[70%] h-[70%] bg-cover absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
                    />
                  ) : (
                    ""
                  )}
                </div>
                <p className="mt-3 text-sm text-gray-500 italic text-center">
                  {data.quantity} {data.unit} of {data.foodCategory}
                </p>
              </div>

              <div className="md:col-span-2 space-y-8">
                <section className="p-4 bg-green-50 rounded-lg shadow-inner">
                  <h2 className="text-2xl font-bold text-green-700 mb-4 border-b border-green-300 pb-2">
                    II. Donation Details
                  </h2>
                  <DonationField label="Food Name" value={data.foodName} />
                  <DonationField
                    label="Food Category"
                    value={data.foodCategory}
                  />
                  <DonationField
                    label="Quantity"
                    value={`${data.quantity} ${data.unit}`}
                  />
                  <DonationField
                    label="Expiration Date"
                    value={new Date(data.expiryDate).toDateString()}
                  />
                  <DonationField
                    label="Storage Requirement"
                    value={data.storageRequirement}
                  />
                  <DonationField
                    label="Packaging Type"
                    value={data.packagingType}
                  />
                </section>

                <section className="p-4 bg-blue-50 rounded-lg shadow-inner">
                  <h2 className="text-2xl font-bold text-blue-700 mb-4 border-b border-blue-300 pb-2">
                    I. Donor Identification
                  </h2>
                  <DonationField label="Donor Name" value={data.donorName} />
                  <DonationField label="Donor Type" value={data.donorType} />
                  <DonationField
                    label="Physical Address"
                    value={data.physicalAddress}
                  />
                </section>
              </div>
            </div>
          </div>

          <div className="bg-gray-100 p-6 flex justify-center sm:justify-end">
            <button
              className="bg-green-600 hover:bg-green-700 text-white font-extrabold py-3 px-8 rounded-full transition duration-300 shadow-xl w-full sm:w-auto transform hover:translate-y-[-2px] cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
              disabled={
                reserved ||
                data.status == "Reserved" ||
                getDaysUntilExpiry(data.expiryDate) < 0 || !authenticated
              }
              onClick={() => {
                handleReserve(data.id);
              }}
            >
              {reserved || data.status == "Reserved"
                ? "Reserved"
                : "Reserve food for claim"}
            </button>
          </div>
        </main>
      )}
    </div>
  );
};

export default Food;
