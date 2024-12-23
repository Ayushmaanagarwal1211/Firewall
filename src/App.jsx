import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Dashboard from "./components/Dashboard";
import Datatable from "./components/dataTable";
import Context from "./context/context";
import { useState } from "react";
import Module2 from "./components/Module2";
import Module3 from "./components/Module3";
import Module4 from "./components/Module4";
import Module5 from "./components/Module5";
import Module6 from "./components/Module6";
import Module9 from "./components/Module9";
import Module8 from "./components/Module8";
import SSHBlocker from "./components/SSHBlocker";

export default function App() {
  let [render,setRender] = useState(0)
  return (
    <Context.Provider value={{render,setRender}}>

    <Router>
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route path="module2" element={<Module2 />} />
          <Route path="module3" element={<Module3 />} />
          <Route path="module4" element={<Module4 />} />
          <Route path="module5" element={<Module5 />} />
          <Route path="module6" element={<Module6 />} />
          <Route path="module8" element={<Module8 />} />
          <Route path="module9" element={<Module9 />} />
          <Route path="sshblocker" element={<SSHBlocker />} />

          <Route path="sites" element={<Datatable />} />
        </Route>
      </Routes>
    </Router>
    </Context.Provider>
  );
}
