import { useEffect } from "react";
import Header from "../components/Header";
import SideBar from "../components/sidebar/index";
import TimeLine from "../components/TimeLine";

export default function () {
  useEffect(() => {
    document.title = "Instagram";
  }, []);

  return (
    <div className="bg-gray-background">
      <Header />
      <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg ">
        <div className="col-span-2">
          <TimeLine />
        </div>

        <SideBar />
      </div>
    </div>
  );
}
