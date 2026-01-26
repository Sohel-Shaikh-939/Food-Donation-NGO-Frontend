import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import "./index.css";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { homeSliceAction } from "./routes/Home/homeSlice";
function App() {
  const dispatch = useDispatch();
  const {repaint} = useSelector(store => store.Home);

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }

      const res = await axios.post("http://localhost:3000/auth",{token});

      if(res.data.status) {
        dispatch(homeSliceAction.setAuthenticated(true));
        dispatch(homeSliceAction.setUser(res.data.data))
      }
    })();
  }, [repaint]);

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
