import useAllAppUsers from "../hooks/useAllAppUsers";
import { Typography } from "@material-ui/core";

export default function AllUsersPage() {
  const { data: appUsers, isLoading, error } = useAllAppUsers();
  if (isLoading) return "is loading ...";
  if (error) return "something went wrong";
  return (
    <section>
      {appUsers &&
        appUsers.map((user) => (
          <section>
            <Typography>{user?.username}</Typography>
            <Typography>{user?.role}</Typography>
            <p>- - - -</p>
          </section>
        ))}
    </section>
  );
}
