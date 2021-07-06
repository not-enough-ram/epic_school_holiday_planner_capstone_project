import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";

export default function useChildren() {
  const [children, setChildren] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    axios
      .get(`/api/user/children`, config)
      .then((response) => response.data)
      .then(setChildren)
      .catch((error) => console.error(error.message));
  }, [token]);

  return { children };
}
