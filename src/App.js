import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SportsList from './components/sports.component'
import EventsList from './components/events.component'
import OutcomesList from './components/outcomes.component'
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<SportsList />} />
            <Route path="/sports" element={<SportsList />} />
            <Route path="/sports/:sportId" element={<EventsList />} />
            <Route path="/sports/:sportId/events/:eventId" element={<OutcomesList />} />
          </Routes>
        </div>
      </Router>
    )
  }
}

export default App;

