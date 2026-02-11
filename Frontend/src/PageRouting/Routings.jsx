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
import ResourceDetail from "../pages/ResourceDetail";
import Profile from "../pages/Profile"; // 🔥 ADD THIS

import MockHome from "../pages/MockHome";
import PersonalInterview from "../pages/PersonalInterview";
import GroupDiscussion from "../pages/GroupDiscussion";

function Routings() {
  return (
    <Routes>

      {/* PUBLIC PAGES */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* APP LAYOUT */}
      <Route path="/app" element={<Layout />}>
        <Route index element={<Dashboard />} />

        {/* 🔥 PROFILE PAGE */}
        <Route path="profile" element={<Profile />} />

        {/* Career */}
        <Route path="career-tracks" element={<CareerTracks />} />
        <Route path="career-tracks/:slug" element={<RoadmapPage />} />

        {/* Resources */}
        <Route path="resources" element={<Resources />} />
        <Route path="resources/:topic" element={<ResourceDetail />} />

        {/* Other */}
        <Route path="dsa" element={<DSAContent />} />
        <Route path="resume" element={<AnalyzeResume />} />
        <Route path="job" element={<Feature />} />

        {/* MOCK INTERVIEW */}
        <Route path="mock" element={<MockHome />} />
        <Route path="mock/personal" element={<PersonalInterview />} />
        <Route path="mock/group" element={<GroupDiscussion />} />
      </Route>

    </Routes>
  );
}

export default Routings;
