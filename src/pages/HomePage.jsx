import { useLocation } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import Sidebar from "../components/Sidebar";
import Datatable from "../components/dataTable";
import Module2 from "../components/Module2";
import Module3 from "../components/Module3";
import Module4 from "../components/Module4";
import Module5 from "../components/Module5";
import Module6 from "../components/Module6";
import Module8 from "../components/Module8";
import Module9 from "../components/Module9";
import SSHBlocker from "../components/SSHBlocker";

export default function HomePage() {
  const location = useLocation();

  return (
    <div className="flex h-auto min-h-[100vh] ">
      <section className="bg-light-gray-neon-p w-[15vw] h-full">
        <Sidebar />
      </section>

      <section className="flex-grow bg-white">
      {location.pathname.includes("/module2") && <Module2 />}
      {location.pathname.includes("/module3") && <Module3 />}
      {location.pathname.includes("/module4") && <Module4 />}
      {location.pathname.includes("/module5") && <Module5 />}
      {location.pathname.includes("/module6") && <Module6 />}
      {location.pathname.includes("/module8") && <Module8 />}
      {location.pathname.includes("/module9") && <Module9 />}

      {location.pathname.includes("/dashboard") && <Dashboard />}
      {location.pathname.includes("/sites") && <Datatable />}
      {location.pathname.includes("/sshblocker") && <SSHBlocker />}

      </section>
    </div>
  );
}
