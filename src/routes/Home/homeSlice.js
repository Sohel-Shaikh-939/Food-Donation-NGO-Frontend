import { createSlice } from "@reduxjs/toolkit";

const homeSlice = createSlice({
  name: "Home",
  initialState: {
    authenticated: false,
    repaint: true,
    user: {
      name: "",
      phone: "",
      email: "",
      donated: 0,
      claimed: 0,
      donations: [],
      createdAt: "",
    },
  },
  reducers: {
    setAuthenticated: (store, action) => {
      store.authenticated = action.payload;
    },
    setUser: (store, action) => {
      store.user = action.payload;
    },
    setRepaint: (store) => {
      store.repaint = !store.repaint;
    },
    setDonations: (store, action) => {
      let newUser = {
        ...store.user,
        donations: [action.payload, ...store.user.donations],
      };
      store.user = newUser;
    },
    setNewUserDetails : (store,action) => {
      store.user = {...store.user,...action.payload}
    }
  },
});

export const homeSliceAction = homeSlice.actions;
export default homeSlice;
