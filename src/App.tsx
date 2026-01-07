import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NavigationMenu from "./components/NavigationMenu";
import DevelopersPage from "./pages/DevelopersPage";

const App: React.FC = () => {
  return (
    <>
      <NavigationMenu />
      {/* Define the routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/settings" element={<DevelopersPage />} />
      </Routes>
    </>
  );
};

export default App;
