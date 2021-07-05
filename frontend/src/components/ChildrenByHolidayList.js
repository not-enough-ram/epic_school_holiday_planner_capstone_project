import useChildrenByHoliday from "../hooks/useChildrenByHoliday";

export default function childrenByHolidayList(holiday) {
  const { data: childrenByHoliday, error, isLoading } = useChildrenByHoliday();
  return <>if(isLoading) return "is loading ..."</>;
}
