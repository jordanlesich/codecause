import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "Login";
import SignUp from "SignUp";
import { AuthProvider } from "contexts/authContext";
import PrivateRoute from "privateRoute";
import Projects from "Projects";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div>
          <PrivateRoute exact path="/" component={Projects} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
