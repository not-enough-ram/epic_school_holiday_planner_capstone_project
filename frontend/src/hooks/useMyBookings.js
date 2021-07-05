import { useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { useQuery } from "react-query";

export default function useMyBookings() {
  const { token } = useContext(AuthContext);
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const getMyBookings = () => {
    return axios
      .get(`/api/holidays/booked`, config)
      .then((response) => response.data)
      .catch((error) => console.error(error.message));
  };

  return useQuery("getMyBookings", () => getMyBookings());
}
//   const [myBookings, setMyBookings] = useState([]);
//   const { token } = useContext(AuthContext);
//
//   useEffect(() => {
//     const config = {
//       headers: {
//         Authorization: "Bearer " + token,
//       },
//     };
//     axios
//       .get(`/api/holidays/booked`, config)
//       .then((response) => response.data)
//       .then(setMyBookings)
//       .catch((error) => console.error(error.message));
//   }, [token]);
//
//   return { myBookings };
// }
