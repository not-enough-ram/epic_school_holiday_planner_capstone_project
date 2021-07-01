import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";

export default function useChildren() {
  const [bookingByChild, setBookingByChild] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    axios
      .get(`/api/holidays/bookingbychild`, config)
      .then((response) => response.data)
      .then(setBookingByChild)
      .catch((error) => console.error(error.message));
  }, [token]);

  return { bookingByChild };
}
