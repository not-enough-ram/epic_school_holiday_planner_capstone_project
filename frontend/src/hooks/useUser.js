import { useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { useQuery } from "react-query";

export default function useUser() {
  const { token } = useContext(AuthContext);
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const getUser = () => {
    return axios
      .get(`/api/user`, config)
      .then((response) => response.data)
      .catch((error) => console.error(error.message));
  };

  return useQuery("getUser", () => getUser());
}
//   const [user, setUser] = useState([]);
//   const { token } = useContext(AuthContext);
//
//   useEffect(() => {
//     const config = {
//       headers: {
//         Authorization: "Bearer " + token,
//       },
//     };
//     axios
//       .get(`/api/user`, config)
//       .then((response) => response.data)
//       .then(setUser)
//       .catch((error) => console.error(error.message));
//   }, [token]);
//
//   return { user };
// }
