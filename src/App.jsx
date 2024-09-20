import { Routes, Route } from "react-router-dom";

import Home from "./routes/home/Home";
import LeaderBoard from "./routes/leaderboard/Leaderboard";
import Login from "./routes/login/Login";
import Achievements from "./routes/achievements/Achievements";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/leaderboard" element={<LeaderBoard />} />
      <Route path="/achievements" element={<Achievements />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
