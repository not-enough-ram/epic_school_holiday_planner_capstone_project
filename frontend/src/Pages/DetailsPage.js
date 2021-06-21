import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import HolidayDetails from "../components/HolidayDetails";

export default function DetailsPage() {
  const { name } = useParams();
  const [holidays, setHolidays] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/holidays/details/${name}`)
      .then((response) => response.data)
      .then(setHolidays);
  }, [name]);

  return (
    <>
      {holidays && (
        <HolidayDetails
          name={holidays.name}
          startDate={holidays.startDate}
          endDate={holidays.endDate}
        />
      )}
    </>
  );
}
