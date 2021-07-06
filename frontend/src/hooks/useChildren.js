import { useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { useQuery } from "react-query";

export default function useChildren() {
  const { token } = useContext(AuthContext);
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const getChildrenByUser = () => {
    return axios
      .get(`/api/user/children`, config)
      .then((response) => response.data)
      .catch((error) => console.error(error.message));
  };

  return useQuery("getChildrenByUser", () => getChildrenByUser());
}
