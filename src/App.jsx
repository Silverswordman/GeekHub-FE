import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Login from "./components/LoginPage";
import NavbarCustom from "./components/Navbar";
import Home from "./components/HomePage";
import PageFooter from "./components/Footer";
import ConventionDetailCard from "./components/ConventionDetail";
import ProfileComponent from "./components/ProfilePage";
import RegistrationComponent from "./components/Registration";
import ConventionForm from "./components/ConventionAdd";
import AddSection from "./components/SectionAdd";
import SectionDetail from "./components/SectionDetail";

function App() {
  return (
    <>
      <BrowserRouter>
        <Container
          fluid
          className="p-0 bg-primary d-flex flex-column flex-grow-0   min-vh-100 "
        >
          <NavbarCustom />

          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/convention/:conventionId"
              element={<ConventionDetailCard />}
            />
            <Route
              path="/conventions/:conventionId/add-section"
              element={<AddSection />}
            />
            <Route path="/conventions/:conventionId/sec/:sectionId" element={<SectionDetail/>} />


            <Route path="/me" element={<ProfileComponent />} />
            <Route path="/register" element={<RegistrationComponent />} />
            <Route path="/addconvention" element={<ConventionForm />} />
          </Routes>
        </Container>
        <PageFooter />
      </BrowserRouter>
    </>
  );
}

export default App;
