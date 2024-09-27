import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/routeMap";

import Navbar from "./components/Navbar";
import Home from "./routes/home/Home";
import LeaderBoard from "./routes/leaderboard/Leaderboard";
import Achievements from "./routes/achievements/Achievements";
import LeagueSession from "./routes/leagueSession/LeagueSession";
import AchievementCrud from "./routes/crud/AchievementCrud";

function App() {
  return (
    <>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/leaderboard" element={<LeaderBoard />} />
          <Route path="/achievements" element={<Achievements />} />
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
                <LeagueSession />
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
