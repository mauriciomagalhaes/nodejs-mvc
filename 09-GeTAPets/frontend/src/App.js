import  {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

/* Components */
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

/* Pages */
import Login from './components/pages/auth/Login';
import Register from './components/pages/auth/Register';
import Home from './components/pages/home';

function App() {
  return (
    <Router>
      <Navbar />

      <Routes> {/* switch */}
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />   
      </Routes>
      
      <Footer />
    </Router>
  );
}

export default App;
