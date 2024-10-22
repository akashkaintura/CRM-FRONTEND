import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Payroll from './components/Payroll';
import Leaves from './components/Leaves';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/payroll" component={Payroll} />
        <Route path="/leaves" component={Leaves} />
      </Switch>
    </Router>
  );
}

export default App;
