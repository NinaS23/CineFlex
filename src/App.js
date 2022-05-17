import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header/header";
import Movie from "./routes/Movie.js/index.js";
import Seats from "./routes/seats";
import Time from "./routes/time.js";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
      <Route  path="/" element={<Movie />} />
      <Route path="filme/:idFilme"  element={<Time />}/>
      <Route path="sessao/:idSessao"  element={<Seats />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
