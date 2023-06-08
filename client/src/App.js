import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { Home, Detail, Form, Landing, Modify } from "../src/views/index";
import NavBar from "./components/NavBar/NavBar";
import NotFound from "./views/NotFound/NotFound";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3001/";

function App() {
  const location = useLocation();
  return (
    <div className="App">
      {/*     {location.pathname !== "/" && <NavBar />} */}
      <Routes>
        {" "}
        {/* Estoy usando routes por que react router dom en las versiona anterioes de 5 hacia atras no usaba "Routes" por eso lo llamaban de una manera diferente con solo "route" */}
        <Route exact path="/recipes/:id" element={<Detail />} />
        <Route exact path="/createrecipes" element={<Form />} />
        <Route exact path="/recipes" element={<Home />} />
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/modify" element={<Modify />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/not-found" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
