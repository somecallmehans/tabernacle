import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/routeHelper";

import Navbar from "./components/Navbar";
import Home from "./routes/home/Home";
import FAQ from "./routes/home/FAQ";
import LeaderBoard from "./routes/leaderboard/Leaderboard";
import AchievementsPage from "./routes/achievements/Achievements";
import LeagueRouter from "./routes/leagueSession/LeagueSession";
import ManagementContainer from "./routes/crud/ManagementContainer";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/leaderboard" element={<LeaderBoard />} />
        <Route path="/achievements" element={<AchievementsPage />} />
        <Route
          path="/management"
          element={
            <ProtectedRoute>
              <ManagementContainer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/league-session/*"
          element={
            <ProtectedRoute>
              <LeagueRouter />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<p>404 Error - Nothing here...</p>} />
      </Routes>
    </>
  );
}

export default App;
