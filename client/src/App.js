import { Route, useLocation } from 'react-router-dom';
import './App.css';
import Landing from './views/Landing/Landing';
import Form from './views/Form/Form';
import Home from './views/Home/Home';
import Details from './views/Details/Details';
import NavBar from './components/NavBar/NavBar';

function App() {

  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== '/' && <NavBar />}{ }
      <Route exact path="/" component={Landing} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/create" component={Form} />
      <Route path="/detail/:id" component={Details} />
    </div>
  );
}

export default App;
