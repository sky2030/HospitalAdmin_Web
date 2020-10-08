import React from 'react';
//import ReactDOM from 'react-dom';
import './dashboard/dashboard.css';
import contactImg from './img/contact2.jpg';
import { Redirect } from 'react-router-dom';
//import { Link } from 'react-router-dom'; 

class Myhospital extends React.Component {
  constructor(props) {
    super(props)
    const token = localStorage.getItem("token")

    let loggedIn = true
    if (token == null) {
      loggedIn = false
    }
    this.state = {
      loggedIn
      //token = localStorage.getItem("token")
    }
  }
  render() {
    if (localStorage.getItem("token") == null) {
      return <Redirect to="/splash" />
    }
    return (

      <div className="dashboard_wrap2">
        <div className="headeralign">
          <div className="banner-text">
            <img style={{ width: "110%", borderRadius: "2rem", marginTop: "2rem" }} src={contactImg} alt="Contact_img" />
          </div>
          <div className="flex-container scroll">
            <div className="col4 box-shad">
              <h3>Apollo Hospital</h3>
              <p><i className="far fa-envelope"></i> support@apollohospital.com </p>
              <p><i className="fas fa-phone-alt"></i>120-34232334</p>
              <h3>Emergency Helpline</h3>
              <p><i className="far fa-envelope"></i> emergency@apollohospital.com </p>
              <p><i className="fas fa-phone-alt"></i>120-34232334</p>
              <h3>Application Support</h3>
              <p><i className="far fa-envelope"></i>eopd@smhs.motherson.com</p>
              <p><i className="fas fa-phone-alt"></i>120-34232334</p>
            </div>


          </div>
        </div>

      </div>


    )
  }
}
export default Myhospital;
