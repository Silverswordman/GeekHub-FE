import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import Login from "./components/LoginPage";
import NavbarCustom from "./components/Navbar";
import Home from "./components/HomePage";
import PageFooter from "./components/Footer";
import ConventionDetailCard from "./components/ConventionDetail";
import ProfileComponent from "./components/ProfilePage";
import RegistrationComponent from "./components/Registration";

function App() {
  return (
    <Container
      fluid
      className="p-0 bg-primary d-flex flex-column h-100 flex-grow-1"
    >
      <BrowserRouter>
        <NavbarCustom />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/convention/:conventionId"
            element={<ConventionDetailCard />}
          />
          <Route path="/me" element={<ProfileComponent />} />
          <Route path="/register" element={<RegistrationComponent />} />
        </Routes>
      </BrowserRouter>

      <PageFooter />
    </Container>
  );
}

export default App;
