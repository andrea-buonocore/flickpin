import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/homepage/HomePage";
import PhotoDetail from "./pages/Photo/PhotoDetail";
import Search from "./pages/search/Search";

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/photo/:id" element={<PhotoDetail/>}/>
          <Route path="/search/:query" element={<Search/>}/>
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
