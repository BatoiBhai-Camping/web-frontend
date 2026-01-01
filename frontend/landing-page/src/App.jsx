import { Button } from "@/components/ui/button"
import Header from "./components/Header/header"
import Home from "./components/Home/home"
import Footer from "./components/Footer/footer"
import { Route, Routes } from "react-router-dom"
import SearchPage from "./components/Search/searchItems"
import Package from "./components/Package/package"
import BillPage from "./components/Billing/billPage"

function App() {
  return (
    <>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/search" element={<SearchPage/>}/>
      <Route path="/package" element={<Package/>}/>
      <Route path="/billing" element={<BillPage/>}/>
    </Routes>
    <Footer/>
    </>
  )
}

export default App
