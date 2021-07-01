import { useContext } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import AuthContext from "../context/AuthContext";

export default function useBookingByChild() {
  const { token } = useContext(AuthContext);
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const getBookingsByChild = () => {
    return axios
      .get(`/api/holidays/bookingbychild`, config)
      .then((response) => response.data)
      .catch((error) => console.error(error.message));
  };

  return useQuery("bookingByChild", () => getBookingsByChild());
}
