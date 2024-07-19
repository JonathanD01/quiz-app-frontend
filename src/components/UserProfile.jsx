import { AuthContext } from "@/context/AuthProvider";
import { useContext } from "react";

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="grid grid-cols-8 grid-rows-2 max-h-[250px]">
      <div className="col-start-1 -col-end-1 row-start-1 -row-end-1">
        <img
          src="images/study_illustration.png"
          className="object-cover object-top w-full h-full rounded-2xl"
        />
      </div>
      <div className="col-start-2 -col-end-2 row-start-2 md:col-start-3 md:-col-end-3 md:row-start-2 md:-row-end-1 justify-center self-end">
        <h2 className="bg-white rounded-t-xl pt-3 px-5 font-bold text-xl md:text-2xl text-gray-900 text-center">
          Velkommen tilbake {user?.firstname}
        </h2>
      </div>
    </div>
  );
};

export default UserProfile;
