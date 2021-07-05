import { useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { useQuery } from "react-query";

export default function useHolidays() {
  const { token } = useContext(AuthContext);
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const getHolidays = () => {
    return axios
      .get(`/api/holidays`, config)
      .then((response) => response.data)
      .catch((error) => console.error(error.message));
  };

  return useQuery("getHolidays", () => getHolidays());
}
//     const [holidays, setHolidays] = useState([]);
//     const {token} = useContext(AuthContext)
//
//     useEffect(() => {
//         const config = {
//             headers: {
//                 Authorization: "Bearer " + token,
//             },
//         }
//         axios
//             .get(`/api/holidays`, config)
//             .then((response) => response.data)
//             .then(setHolidays)
//             .catch((error) => console.error(error.message));
//     }, [token]);
//
//     return { holidays };
// }
