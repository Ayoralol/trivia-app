import {BrowserRouter, Route, Routes} from "react-router-dom";
import "./App.scss";
import Navigation from "./containers/Navigation/Navigation";
import Home from "./pages/Home/Home";
import Survival from "./pages/Survival/Survival";
import TimeAttack from "./pages/TimeAttack/TimeAttack";
import Profile from "./pages/Profile/Profile";
import Landing from "./pages/Landing/Landing";
import FreePlay from "./pages/FreePlay/FreePlay";
import {UserContextProvider} from "./context/UserContext";

function App() {
  return (
    <>
      <UserContextProvider>
        <BrowserRouter>
          <Navigation />
          <div>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/home" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/survival" element={<Survival />} />
              <Route path="/time-attack" element={<TimeAttack />} />
              <Route path="/free-play" element={<FreePlay />} />
            </Routes>
          </div>
        </BrowserRouter>
      </UserContextProvider>
    </>
  );
}

export default App;
