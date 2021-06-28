import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";

export default function useUser() {
  const [user, setUser] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    axios
      .get(`/api/user`, config)
      .then((response) => response.data)
      .then(setUser)
      .catch((error) => console.error(error.message));
  }, [token]);

  return { user };
}
