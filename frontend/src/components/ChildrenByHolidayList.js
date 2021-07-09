import useChildrenByHoliday from "../hooks/useChildrenByHoliday";
import Child from "./Child";

export default function ChildrenByHolidayList({ upcomingHolidays }) {
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
        <Child key={child.id} child={child} />
      ))}
    </section>
  );
}
