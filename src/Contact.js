import React from "react";
import Navigation from "./Nav";
import "./dashboard/dashboard.css";
import contactImg from "./img/contact2.jpg";
import { Redirect } from "react-router-dom";
import axios from "axios";

class Myhospital extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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
        console.log(response);
        const data = response.data.data;
        this.setState({ hospitals: data });
        console.log("Data has been received!!");
      })
      .catch(() => {
        alert("Error retrieving data!!");
      });
  };
  render() {
    if (localStorage.getItem("token") == null) {
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
          <div className="headeralign">
            <div
              className="banner-text"
              style={{
                marginBottom: "1em",
              }}
            >
              <img
                style={{
                  width: "100%",
                  borderRadius: "1rem",
                  marginTop: "2rem",
                }}
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
      </div>
    );
  }
}
export default Myhospital;
