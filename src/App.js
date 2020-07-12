import React from 'react';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom"
import Home from './components/home';
import News from './components/news';
import Statistics from './components/statistics';
import Helpline from './components/helpline';


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
           <Route path="/" exact component={Home} />
           <Route path="/statistics" component={Statistics} />
           <Route path="/news" component={News} />
           <Route path="/helpline" component={Helpline} />
        </Switch>
      </Router>

    </div>
  );
}

export default App;
