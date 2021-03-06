import React from "react";
//import ReactDOM from 'react-dom';
import "./dashboard.css";
import bgimg from "./img/bgimg.jpg";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import Navigation from "../Nav";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("token");

    let loggedIn = true;
    if (token == null) {
      loggedIn = false;
    }
    this.state = {
      loggedIn,
      //token = localStorage.getItem("token")
    };
  }
  render() {
    if (this.state.loggedIn === false) {
      return <Redirect to="/" />;
    }
    if (localStorage.getItem("token") == null) {
      return <Redirect to="/" />;
    }

    return (
      <div className="Appcontainer">
        <Navigation />
        <div className="dashboard_wrap">
          <div className="dashboard_maincontent">
            <img src={bgimg} alt="doctor-img" />
            <div className="dashboard_icons">
              <ul>
                <li>
                  <Link to="/Alldepartment">
                    <i className="fas fa-plus-square"></i>Departments
                  </Link>
                </li>
                <li>
                  <Link to="/Doctorlist">
                    <i className="fas fa-user-md"></i>Active Doctor's
                  </Link>
                </li>
                <li>
                  <Link to="/HospitalSpeciality">
                    <i className="fas fa-user-md"></i>Specialities
              </Link>
                </li>
                <li>
                  <Link to="/Transactions">
                    <i className="fas fa-credit-card"></i>Transaction
                  </Link>
                </li>

              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Dashboard;
