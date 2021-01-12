import React from "react";
import Navigation from "./Nav";
import "./dashboard/dashboard.css";
import contactImg from "./img/contact2.jpg";
import { Redirect } from "react-router-dom";
import axios from "axios";

class Myhospital extends React.Component {
  constructor(props) {
    super(props);

    const token = localStorage.getItem("token");

    let loggedIn = true;
    if (token == null) {
      loggedIn = false;
    }


    this.state = {
      loggedIn,
      hospitals: {},
    };
  }

  componentDidMount = () => {
    this.getHospital();
  };

  getHospital = () => {
    axios
      .get("https://stage.mconnecthealth.com/v1/hospital", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.data.code === 200) {
          console.log(response);
          const data = response.data.data;
          this.setState({ hospitals: data });
          console.log("Data has been received!!");
        } else {
          alert(response.data.message)
        }
      })
      .catch((Error) => {
        if (Error.message === "Network Error") {
          alert("Please Check your Internet Connection")
          console.log(Error.message)
          return;
        }
        if (Error.response.data.code === 403) {
          alert(Error.response.data.message)
          console.log(JSON.stringify("Error 403: " + Error.response.data.message))
          this.setState({
            loggedIn: false
          })

        }
        else {
          alert("Something Went Wrong")
        }
      });
  };
  render() {
    if (localStorage.getItem("token") == null) {
      return <Redirect to="/" />;
    }
    if (this.state.loggedIn === false) {
      return <Redirect to="/" />;
    }

    const {
      hospitalname,
      emergencyNo,
      emergencyDetail,
      phone,
      email,
    } = this.state.hospitals;
    return (
      <div className="Appcontainer">
        <Navigation />
        <div className="dashboard_wrap2">
          <div
            className="banner-text"
          >
            <img
              src={contactImg}
              alt="Contact_img"
            />
          </div>
          <div className="flex-container scroll">
            <div className="col4 box-shad">
              <h3>{hospitalname}</h3>
              <p>
                <i className="far fa-envelope"></i>
                {email}
              </p>
              <p>
                <i className="fas fa-phone-alt"></i>
                {phone}
              </p>
              <h3>Emergency Helpline</h3>
              <p>
                <i className="far fa-envelope"></i> {emergencyDetail}
              </p>
              <p>
                <i className="fas fa-phone-alt"></i>
                {emergencyNo}
              </p>
              <h3>Application Support</h3>
              <p>
                <i className="far fa-envelope"></i>vrcure@smhs.motherson.com
                </p>
              <p>
                <i className="fas fa-phone-alt"></i>0120-4365125
                </p>
            </div>
          </div>

        </div>
      </div>
    );
  }
}
export default Myhospital;
