import { useEffect } from "react";

function NotFound() {
  useEffect(() => {
    document.title = "Not Found!";
  }, []);
  return (
    <div className=" bg-gray-background">
      <div className="flex mx-auto max-w-screen-lg h-screen items-center justify-center">
        <p className="text-center text-2xl ">Not Found!</p>
      </div>
    </div>
  );
}

export default NotFound;
