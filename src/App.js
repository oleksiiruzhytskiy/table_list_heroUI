import * as React from "react";

import { Navbar } from "@heroui/navbar";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import TablePage from "./pages/TablePage";
import ListPage from "./pages/ListPage";
import "./App.css";
import { HeroUIProvider } from "@heroui/react";
function App() {
  return (
    <HeroUIProvider>
      <BrowserRouter>
          <div className="App">
            <Navbar>
              <Link to="/list">List</Link>
              <Link to="/table">Table</Link>
            </Navbar>
              <Routes>
                <Route path="/" element={<TablePage />} />
                <Route path="/list" element={<ListPage />} />
                <Route path="/table" element={<TablePage />} />
              </Routes>
          </div>
      </BrowserRouter>
    </HeroUIProvider>
  );
}

export default App;
