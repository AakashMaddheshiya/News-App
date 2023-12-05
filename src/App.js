import './App.css';
import NavBar from './components/NavBar';
import News from './components/News';
import {
  BrowserRouter ,
  Switch ,
  Route,
} from "react-router-dom";



function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <NavBar/>  
        <Switch>
          <Route exact path="/"><News key="general" pagesize={5} country="us" category='general'/></Route>
          <Route exact path="/business"><News key="business" pagesize={5} country="us" category='business'/></Route>
          <Route exact path="/entertainment"><News key='entertainment' pagesize={5} country="us" category='entertainment'/></Route>
          <Route exact path="/general"><News key='general' pagesize={5} country="us" category='general'/></Route>
          <Route exact path="/health"><News key="health" pagesize={5} country="us" category='health'/></Route>
          <Route exact path="/science"><News key="science" pagesize={5} country="us" category='science'/></Route>
          <Route exact path="/sports"><News  key=" sports" pagesize={5} country="us" category='sports'/></Route>
          <Route exact path="/technology"><News key="technology" pagesize={5} country="us" category='technology'/></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
