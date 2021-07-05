import { useContext } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import AuthContext from "../context/AuthContext";

export default function useChildrenByHoliday(holiday) {
  const { token } = useContext(AuthContext);
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
    params: {
      name: holiday,
    },
  };
  const getChildrenByHoliday = () => {
    return axios
      .get(`/api/holidays/children`, config)
      .then((response) => response.data)
      .catch((error) => console.error(error.message));
  };

  return useQuery("childrenByHoliday", () => getChildrenByHoliday());
}
