import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/HomePage/Home";
import SignUp from "./components/SignUp/signUp";
import SignIn from "./components/SignIn/signIn";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/" element={<SignIn />} />
      </Routes>
    </Router>
  );
}

export default App;
