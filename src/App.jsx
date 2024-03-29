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
import AddSubsection from "./components/SubsectionAdd";
import UpdateConventionForm from "./components/UpdateConvention";
import UpdateSectionForm from "./components/UpdateSection";
import UpdateSubsectionForm from "./components/UpdateSubsection";
import RequestList from "./components/Request";
import SendRequestComponent from "./components/RequestAdd";
import UserList from "./components/AllUsers";
import UserProfile from "./components/UserProfile";
import FirstPage from "./components/FirstPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Container
          fluid
          className="p-0 bg-secondary d-flex flex-column flex-grow-0   min-vh-100 "
        >
          <NavbarCustom />

          <Routes>
          <Route path="/" element={<FirstPage />} />
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
            <Route
              path="/conventions/:conventionId/sec/:sectionId"
              element={<SectionDetail />}
            />
            <Route
              path="/conventions/:conventionId/sec/:sectionId/add-subsection"
              element={<AddSubsection />}
            />
            <Route path="/me" element={<ProfileComponent />} />
            <Route path="/register" element={<RegistrationComponent />} />
            <Route path="/addconvention" element={<ConventionForm />} />
            <Route
              path="/updateconvention/:conventionId"
              element={<UpdateConventionForm />}
            />
            <Route
              path="/conventions/:conventionId/sec/:sectionId/updatesection"
              element={<UpdateSectionForm />}
            />
            <Route
              path="/conventions/:conventionId/sec/:sectionId/:subsectionId/updatesubsection"
              element={<UpdateSubsectionForm />}
            />
            <Route path="/requests" element={<RequestList />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/users/:userId" element={<UserProfile />} />

            <Route path="/sendrequest" element={<SendRequestComponent />} />
          </Routes>
        </Container>
        <PageFooter />
      </BrowserRouter>
    </>
  );
}

export default App;
