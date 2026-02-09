import { Routes, Route } from "react-router-dom";

// Public pages
import LandingPage from "../pages/LandingPage";
import Login from "../pages/Login";
import Register from "../pages/Register";

// Layout
import Layout from "./Layout";

// App pages
import Dashboard from "../pages/Dashboard";
import CareerTracks from "../pages/CareerTracks";
import RoadmapPage from "../pages/RoadmapPage";
import DSAContent from "../pages/DSAContent";
import AnalyzeResume from "../pages/AnalyzeResume";
import Feature from "../pages/Feature"; 
import Resources from "../pages/Resources";
import MockInterview from "../pages/MockInterview";
import ResourceDetail from "../pages/ResourceDetail"; // create this page

function Routings() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* App */}
      <Route path="/app" element={<Layout />}>
        <Route index element={<Dashboard />} />

        <Route path="career-tracks" element={<CareerTracks />} />
        <Route path="career-tracks/:slug" element={<RoadmapPage />} />

        {/* Resource main page */}
        <Route path="resources" element={<Resources />} />

        {/* Single resource page (important) */}
        <Route path="resources/:topic" element={<ResourceDetail />} />

        <Route path="dsa" element={<DSAContent />} />
        <Route path="mock-interview" element={<MockInterview />} />
        <Route path="resume" element={<AnalyzeResume />} />
        <Route path="job" element={<Feature />} />
      </Route>
    </Routes>
  );
}

export default Routings;
