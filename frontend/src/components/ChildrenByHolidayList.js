import useChildrenByHoliday from "../hooks/useChildrenByHoliday";
import Child from "./Child";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function ChildrenByHolidayList({ upcomingHolidays }) {
  const { token } = useContext(AuthContext);
  const {
    data: children,
    isLoading,
    error,
  } = useChildrenByHoliday(upcomingHolidays);
  if (isLoading) return "is loading ...";
  if (error) return "error: " + error.message;
  return (
    <section>
      {children?.map((child) => (
        <Child token={token} key={child.id} child={child} />
      ))}
    </section>
  );
}
