import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header/header";
import Movie from "./routes/Movie.js/index.js";
import Time from "./routes/time.js";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
      <Route  path="/" element={<Movie />} />
      <Route path="filme/:idFilme"  element={<Time />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
