import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListUsers from './ListUsers';
import AddUser from './AddUser';
import NavBar from './NavBar';
import './styles/App.css'

function App() {
  return (
    <BrowserRouter>
    <NavBar/>
      <Routes>
        <Route path="/addUser" element={<AddUser/>} />
        <Route path="/" element={<ListUsers/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
