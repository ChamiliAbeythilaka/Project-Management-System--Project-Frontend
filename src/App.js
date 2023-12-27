import React from "react";
import "./App.css";
import Navbar from './layouts/Navbar/NavbarComponent';
import Home from './pages/home/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Ourteam from './pages/ourteam/Ourteam';
import Companies from './pages/companies/Companies';
import People from './pages/people/People';
import Projects from './pages/project/Projects';
import Document from "./pages/document/Document";

function App() {
  return (
    <div className="App">
      
      <Router>
     
      <Navbar />
      <Switch>
       
        <Route path='/' exact component={Home} />
        <Route path='/projects' component={Projects} />
        <Route path='/ourteam' component={Ourteam} />
        <Route path='/companies' component={Companies} />
        <Route path='/people' component={People} />
        <Route path="/documents" component={Document} />
      </Switch>
    </Router>
    
    </div>
  );
}

export default App;
