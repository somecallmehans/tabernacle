import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/routeHelper";

import Navbar from "./components/Navbar";
import Home from "./routes/home/Home";
import LeaderBoard from "./routes/leaderboard/Leaderboard";
import AchievementsPage from "./routes/achievements/Achievements";
import LeagueSessionPage from "./routes/leagueSession/LeagueSession";
import AchievementCrud from "./routes/crud/AchievementCrud";

function App() {
  return (
    <>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/leaderboard" element={<LeaderBoard />} />
          <Route path="/achievements" element={<AchievementsPage />} />
          <Route
            path="/crud"
            element={
              <ProtectedRoute>
                <AchievementCrud />
              </ProtectedRoute>
            }
          />
          <Route
            path="/league-session"
            element={
              <ProtectedRoute>
                <LeagueSessionPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<p>404 Error - Nothing here...</p>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
