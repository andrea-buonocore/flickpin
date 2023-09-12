import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/homepage/HomePage";
import PhotoDetail from "./pages/Photo/PhotoDetail";
import Search from "./pages/search/Search";
import Header from "./shared/Header";
import Footer from "./shared/Footer";
import UserPage from "./pages/user_page/UserPage";

function App() {


  return (
    <>
      <BrowserRouter>
        
        <Header />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/photo/:id" element={<PhotoDetail />} />
          <Route path="/search/:query" element={<Search />} />
          <Route path="/user/:username" element={<UserPage />} />

        </Routes>
        
        <Footer />
      
      </BrowserRouter>
    </>
  )
}

export default App
