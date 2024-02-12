import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Login from "./components/LoginPage";
import NavbarCustom from "./components/Navbar";
import Home from "./components/HomePage";

function App() {
  return (
    <Container fluid="true" className="p-0 bg-primary ">
      <BrowserRouter>
        <NavbarCustom />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
