import {useContext, useEffect, useState} from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";

export default function useHolidays() {

    const [holidays, setHolidays] = useState([]);
    const {token} = useContext(AuthContext)

    useEffect(() => {
        const config = {
            headers: {
                Authorization: "Bearer " + token,
            },
        }
        axios
            .get(`/api/holidays`, config)
            .then((response) => response.data)
            .then(setHolidays)
            .catch((error) => console.error(error.message));
    }, [token]);

    return { holidays };
}