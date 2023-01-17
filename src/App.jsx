import { NavigationBar } from "./components/NavigationBar";
import { ClaimsTable } from "./components/ClaimsTable";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Logout } from "./components/Logout";

const App = () => {
  return (
    <>
      <NavigationBar/>
      <BrowserRouter>
        <Routes>
          <Route path="/logout" element={<Logout />} />
          <Route path="/" element={<ClaimsTable />} />
        </Routes>
      </BrowserRouter>

    </>
  );
}


export default App;
