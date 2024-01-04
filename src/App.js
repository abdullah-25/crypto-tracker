import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import Home from "./pages/Home/Home";

import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Home />
        <Routes>
          <Route path="/" element={<Navigate to="/" />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
