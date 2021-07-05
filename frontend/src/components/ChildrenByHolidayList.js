import useChildrenByHoliday from "../hooks/useChildrenByHoliday";

export default function childrenByHolidayList(holiday) {
  const { data: childrenByHoliday, error, isLoading } = useChildrenByHoliday();
  return (
    <section>
      if(isLoading) return "is loading ..."
      {childrenByHoliday.map((child) => (
        <p>{child.firstName}</p>
      ))}
    </section>
  );
}
