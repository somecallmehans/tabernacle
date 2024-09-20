import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./routes/home/Home";
import LeaderBoard from "./routes/leaderboard/Leaderboard";
import Login from "./routes/login/Login";
import Achievements from "./routes/achievements/Achievements";

function App() {
  return (
    <>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/leaderboard" element={<LeaderBoard />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
