import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/home";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Home} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
