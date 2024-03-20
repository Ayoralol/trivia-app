import {BrowserRouter, Route, Routes} from "react-router-dom";
import "./App.css";
import Navigation from "./containers/Navigation/Navigation";
import Home from "./pages/Home/Home";
import Survival from "./pages/Survival/Survival";
import TimeAttack from "./pages/TimeAttack/TimeAttack";
import Profile from "./pages/Profile/Profile";
import Landing from "./pages/Landing/Landing";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navigation />
        <div>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/survival" element={<Survival />} />
            <Route path="/time-attack" element={<TimeAttack />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
