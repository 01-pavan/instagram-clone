import useUser from "../../hooks/use-user";
import Suggestions from "./suggestions";
import User from "./user";

export default function SideBar() {
  const {
    user: { fullName, username, userId },
  } = useUser();
  // console.log("x", fullName);

  return (
    <div className="p-4">
      <User username={username} fullName={fullName} />
      <Suggestions userId={userId} />
    </div>
  );
}
