import React, { useEffect, useState } from "react";
import {
  User,
  LogOut,
  Mail,
  Phone,
  Users,
  CheckCircle,
  Package,
  Edit3,
  X,
  Save,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { homeSliceAction } from "../Home/homeSlice";

const Profile = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const { user, authenticated } = useSelector((store) => store.Home);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    pledges: user.claimed,
    mealsImpact: user.donated,
  });

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    if (!authenticated) navigate("/");
  }, []);

  const [editingName, setEditingName] = useState(userData.name);
  const [editingEmail, setEditingEmail] = useState(userData.email);
  const [editingPhone, setEditingPhone] = useState(userData.phone);

  const handleLoginToggle = () => {
    setIsLoggedIn(!isLoggedIn);
    setIsEditing(false);
  };

  const handleEditToggle = () => {
    if (isEditing) {
      setEditingName(userData.name);
      setEditingEmail(userData.email);
      setEditingPhone(userData.phone);
    } else {
      setEditingName(userData.name);
      setEditingEmail(userData.email);
      setEditingPhone(userData.phone);
    }
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setUserData({
      ...userData,
      name: editingName,
      email: editingEmail,
      phone: editingPhone,
    });

    setIsEditing(false);
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await axios.patch(
        "http://localhost:3000/editprofile",
        {
          name: e.target.name.value,
          phone: e.target.phone.value,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      if(res.data.status) {
        setIsEditing(false);
        dispatch(homeSliceAction.setNewUserDetails(res.data.data));
        setUserData({
          ...userData,
          ...res.data.data
        });
      }
      setSaving(false);
    } catch (error) {
      console.log(error);
      setSaving(false);
      setIsEditing(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800 text-center md:text-left">
          Your Donor Profile
        </h1>
      </div>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-green-600 p-8 text-white flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <div className="rounded-full bg-white p-4">
            <User className="h-10 w-10 text-green-600" />
          </div>
          <div>
            <p className="text-2xl font-bold">
              {userData.name}
            </p>
            <p className="text-green-200 font-medium">{userData.role}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-200 p-6">
          <div className="p-4 text-center">
            <CheckCircle className="size-6 text-green-500 mx-auto mb-2" />
            <p className="text-3xl font-extrabold text-green-700">
              {userData.mealsImpact}
            </p>
            <p className="text-sm text-gray-500">Food Donated</p>
          </div>
          <div className="p-4 text-center">
            <Package className="size-6 text-green-500 mx-auto mb-2" />
            <p className="text-3xl font-extrabold text-green-700">
              {userData.pledges}
            </p>
            <p className="text-sm text-gray-500">Food Claimed</p>
          </div>
          <div className="p-4 text-center">
            <Users className="size-6 text-green-500 mx-auto mb-2" />
            <p className="text-3xl font-extrabold text-green-700">
              {new Date().getFullYear() -
                new Date(user.createdAt).getFullYear()}
            </p>
            <p className="text-sm text-gray-500">Years Active</p>
          </div>
        </div>

        <form className="p-8 space-y-6" onSubmit={handleEdit}>
          <h2 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
            Contact Details{" "}
            {isEditing && (
              <span className="text-sm font-normal text-gray-500">
                (Editing Mode)
              </span>
            )}
          </h2>

          <div className="flex items-center space-x-4">
            <User className="size-5 text-gray-500 shrink-0" />
            <span className="text-gray-500 font-normal w-24">Full Name:</span>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={editingName}
                onChange={(e) => setEditingName(e.target.value)}
                className="w-full border-b border-green-500 focus:outline-none focus:border-green-700 p-1 font-medium text-gray-700"
              />
            ) : (
              <span className="text-gray-700 font-medium">{userData.name}</span>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <Mail className="size-5 text-gray-500 shrink-0" />
            <span className="text-gray-500 font-normal w-24">Email:</span>
            {
              <span className="text-gray-700 font-medium flex gap-2 items-center justify-start">
                {userData.email}
                {isEditing && (
                  <span className="text-red-700 text-sm">
                    Note : You can't update email as it is linked to your
                    account
                  </span>
                )}
              </span>
            }
          </div>

          <div className="flex items-center space-x-4">
            <Phone className="size-5 text-gray-500 shrink-0" />
            <span className="text-gray-500 font-normal w-24">Phone:</span>
            {isEditing ? (
              <input
                type="tel"
                value={editingPhone}
                pattern="[0-9]{10}"
                minLength={10}
                maxLength={10}
                name="phone"
                onChange={(e) => setEditingPhone(e.target.value)}
                className="w-full border-b border-green-500 focus:outline-none focus:border-green-700 p-1 font-medium text-gray-700"
              />
            ) : (
              <span className="text-gray-700 font-medium">
                {userData.phone}
              </span>
            )}
          </div>

          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mt-8 pt-4 border-t">
            {isEditing && (
              <button
                onClick={handleEditToggle}
                className="w-full sm:w-1/2 flex items-center justify-center bg-gray-400 hover:bg-gray-500 text-white font-semibold py-3 px-6 rounded-xl transition duration-300 shadow-md"
              >
                <X className="size-5 mr-2" />
                Cancel Edit
              </button>
            )}
            {isEditing ? (
              <button
                // onClick={isEditing ? handleSave : handleEditToggle}
                type="submit"
                className={`
                                ${
                                  isEditing
                                    ? "w-full sm:w-1/2 bg-green-700 hover:bg-green-800"
                                    : "w-full bg-green-500 hover:bg-green-600"
                                } 
                                flex items-center justify-center text-white font-semibold py-3 px-6 rounded-xl transition duration-300 shadow-md disabled:cursor-not-allowed
                            `}
                            disabled={saving}
              >
                <Save className="size-5 mr-2" />
                Save Changes
              </button>
            ) : (
              <div
                onClick={isEditing ? handleSave : handleEditToggle}
                className={`
                                ${
                                  isEditing
                                    ? "w-full sm:w-1/2 bg-green-700 hover:bg-green-800"
                                    : "w-full bg-green-500 hover:bg-green-600"
                                } 
                                flex items-center justify-center text-white font-semibold py-3 px-6 rounded-xl transition duration-300 shadow-md
                            `}
              >
                <Edit3 className="size-5 mr-2" />
                Edit Profile Information
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
