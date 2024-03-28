import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import OtherPage from "./pages/OtherPage";
import Fib from "./pages/Fib";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Link to="/">HOme</Link>
        <Link to='/other'>Other</Link>
        <Routes>
        <Route path='/' element={<Fib/>}/>
        <Route path='/other' element={<OtherPage/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
