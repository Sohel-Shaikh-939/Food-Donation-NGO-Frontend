import { useState, useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LocationIcon from "../../components/LocationIcon";
import axios from "axios";
import { Image } from "lucide-react";

const FormInput = ({
  label,
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  unit,
  key,
  ref,
  min,
}) => (
  <div className="flex flex-col space-y-1">
    <label htmlFor={id} className="text-sm font-medium text-gray-700 cursor-pointer">
      {label}
      {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative flex">
      <input
        id={id}
        key={key}
        type={type}
        onChange={onChange}
        placeholder={placeholder}
        defaultValue={value}
        required={required}
        ref={ref}
        min={min}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
        className="block w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 shadow-sm focus:border-green-500 focus:ring-green-500 transition duration-150 ease-in-out sm:text-sm"
      />
      {unit && (
        <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 text-sm pointer-events-none">
          {unit}
        </span>
      )}
    </div>
  </div>
);

const FormSelect = ({ label, id, value, options, required = false, ref }) => (
  <div className="flex flex-col space-y-1">
    <label htmlFor={id} className="text-sm font-medium text-gray-700 cursor-pointer">
      {label}
      {required && <span className="text-red-500">*</span>}
    </label>
    <select
      id={id}
      required={required}
      ref={ref}
      className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 shadow-sm focus:border-green-500 focus:ring-green-500 transition duration-150 ease-in-out sm:text-sm appearance-none"
    >
      <option value="" disabled>
        Select an option
      </option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

const Donate = () => {
  const donorNameRef = useRef();
  const donorTypeRef = useRef();
  const emailAddressRef = useRef();
  const phoneNumberRef = useRef();
  const physicalAddressRef = useRef();

  const foodNameRef = useRef();
  const foodCategoryRef = useRef();
  const itemDescriptionRef = useRef();
  const quantityRef = useRef();
  const quantityUnitRef = useRef();
  const expirationDateRef = useRef();
  const packagingTypeRef = useRef();
  const storageRequirementRef = useRef();

  const imgRef = useRef();

  const { authenticated, user } = useSelector((store) => store.Home);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("donorName",donorNameRef.current.value);
    formData.append("donorType", donorTypeRef.current.value);
    formData.append("email", emailAddressRef.current.value);
    formData.append("phone", phoneNumberRef.current.value);
    formData.append("physicalAddress", physicalAddressRef.current.value);
    formData.append("foodName", foodNameRef.current.value);
    formData.append("foodCategory", foodCategoryRef.current.value);
    formData.append("storageRequirement", storageRequirementRef.current.value);
    formData.append("quantity", quantityRef.current.value);
    formData.append("unit", quantityUnitRef.current.value);
    formData.append("expiryDate", expirationDateRef.current.value);
    formData.append("packagingType", packagingTypeRef.current.value);
    formData.append("tip", itemDescriptionRef.current.value);
    formData.append("foodImg", imgRef.current.files[0]);
    if (!authenticated) return navigate("/login");

    const res = await axios.post(
      "http://localhost:3000/donate",
      formData,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    
    if(res.data.status) {
      navigate("/donationlist");
    }

    setIsSubmitting(true);
  };

  const handleLocation = (e) => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      try {
        const { latitude, longitude } = position.coords;
        const response = await axios.post("http://localhost:3000/location", {
          longitude,
          latitude,
        });

        if (response.status) {
          physicalAddressRef.current.value = response.data.loc;
        }
      } catch (err) {
        console.log(err);
      }
    });
  };

  const options = useMemo(
    () => ({
      donorTypes: [
        "Restaurant",
        "Caterer",
        "Grocery Store",
        "Farm",
        "Individual",
        "Other Business",
      ],
      foodCategories: [
        "Fresh Produce",
        "Prepared Meals",
        "Meat",
        "Baked Goods",
        "Other",
      ],
      packagingTypes: [
        "Original Sealed Packaging",
        "Bulk Container (Sealed)",
        "Individual Servings",
      ],
      storageRequirements: ["Ambient (Shelf-Stable)", "Refrigerated", "Frozen"],
      quantityUnits: ["lbs", "kg", "boxes", "cases", "servings"],
    }),
    []
  );

  const Section = ({ title, children }) => (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-100 mb-8">
      <h2 className="text-2xl font-bold text-green-700 mb-6 border-b pb-3 border-green-100">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{children}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 font-inter">
      <style>{`
        /* Custom font import for Inter (if not already system-wide) */
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
        .font-inter {
          font-family: 'Inter', sans-serif;
        }
      `}</style>

      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-10 p-6 bg-green-50 rounded-xl shadow-md">
          <h1 className="text-4xl font-extrabold text-green-800 mb-2">
            Donate Food, Spread Smiles
          </h1>
          <p className="text-gray-600 text-lg">
            Thank you for helping us connect surplus food with people in need.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-8">
          <Section title="I. Donor Identification">
            <FormInput
              label="Donor Name (Individual or Business)"
              id="donorName"
              placeholder="Food4All Catering Co."
              value={user.name}
              ref={donorNameRef}
              required
            />

            <FormSelect
              label="Donor Type"
              id="donorType"
              options={options.donorTypes}
              ref={donorTypeRef}
              required
            />

            <FormInput
              label="Email Address"
              id="emailAddress"
              type="email"
              placeholder="contact@example.com"
              ref={emailAddressRef}
              value={user.email}
              required
            />
            <FormInput
              label="Phone Number"
              id="phoneNumber"
              type="tel"
              placeholder="(123) 456-7890"
              ref={phoneNumberRef}
              value={user.phone}
              required
            />
            <div className="flex items-center md:col-span-2">
              <div className="w-full relative">
                <FormInput
                  label="Physical Address (for Pickup/Coordination)(browser may give wrong location verify before submitting)"
                  id="physicalAddress"
                  placeholder="123 Main St, Anytown, USA"
                  ref={physicalAddressRef}
                  required
                />
                <div
                  className="border-1 border-black p-3 ml-2 absolute -right-15 bottom-0 rounded-2xl flex justify-center items-center cursor-pointer hover:scale-110 transition"
                  onClick={handleLocation}
                >
                  <LocationIcon />
                </div>
              </div>
              <div className="ml-5 p-4"></div>
            </div>
          </Section>

          <Section title="II. Donation Details">
            <FormInput
              label="Food Name"
              id="foodname"
              type="text"
              ref={foodNameRef}
              placeholder="Briyani"
              required
            />
            <FormSelect
              label="Food Category"
              id="foodCategory"
              options={options.foodCategories}
              ref={foodCategoryRef}
              required
            />
            <FormSelect
              label="Storage Requirement"
              id="storageRequirement"
              options={options.storageRequirements}
              ref={storageRequirementRef}
              required
            />
            <div className="flex space-x-4">
              <div className="w-2/3">
                <FormInput
                  label="Quantity"
                  id="quantity"
                  type="number"
                  placeholder="50"
                  ref={quantityRef}
                  required
                />
              </div>
              <div className="w-1/3">
                <FormSelect
                  label="Unit"
                  id="quantityUnit"
                  options={options.quantityUnits}
                  ref={quantityUnitRef}
                  required
                />
              </div>
            </div>
            <FormInput
              label="Expiration/Best-By Date"
              id="expirationDate"
              type="date"
              min={new Date().toISOString().split("T")[0]}
              ref={expirationDateRef}
              required
            />
            <FormSelect
              label="Packaging Type"
              id="packagingType"
              options={options.packagingTypes}
              ref={packagingTypeRef}
              required
            />
            <textarea
              id="itemDescription"
              ref={itemDescriptionRef}
              rows="3"
              placeholder="E.g., 50 lbs of fresh carrots, 10 sealed trays of chicken lasagna, 2 boxes of canned beans."
              required
              className="md:col-span-2 block w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 shadow-sm focus:border-green-500 focus:ring-green-500 transition duration-150 ease-in-out sm:text-sm"
            ></textarea>
          </Section>

          <Section title="III. Food Image">
            <div className="flex items-center justify-between md:col-span-2">
              <label
                htmlFor="img"
                className="text-sm font-medium text-gray-700 cursor-pointer"
              >
                Add sample image for food
              </label>
              <div className="relative flex">
                <input
                  id="img"
                  type="file"
                  accept="image/*"
                  name="img"
                  ref={imgRef}
                  className="opacity-0 bg-transparent w-full z-10 cursor-pointer"
                />
                <Image className="absolute right-15 items-center -z-0 hover:scale-125 cursor-pointer" />
              </div>
            </div>
          </Section>

          <div className="text-center pt-4 pb-12">
            <button
              type="submit"
              disabled={!authenticated}
              className="w-full sm:w-auto inline-flex justify-center items-center px-8 py-3 border border-transparent text-lg font-bold rounded-full shadow-xl text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-offset-2 transition duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {!authenticated ? "Login to donate" : "Submit Donation Request"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Donate;
