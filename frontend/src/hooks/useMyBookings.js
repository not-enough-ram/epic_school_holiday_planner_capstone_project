import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";

export default function useMyBookings() {
  const [myBookings, setMyBookings] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    axios
      .get(`/api/holidays/booked`, config)
      .then((response) => response.data)
      .then(setMyBookings)
      .catch((error) => console.error(error.message));
  }, [token]);

  return { myBookings };
}
