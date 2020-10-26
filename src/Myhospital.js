import React from "react";
import "./dashboard/dashboard.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Navigation from "./Nav";

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
        console.log(response);
        if (response.data.code === 200) {
          const data = response.data.data;
          this.setState({ hospitals: data });
          console.log("Data has been received!!");
        } else {
          alert(response.data.message)
        }
      })
      .catch((Error) => {
        alert(Error);
      });
  };

  render() {
    const { hospitals } = this.state;

    if (this.state.loggedIn === false) {
      return <Redirect to="/" />;
    }
    return (
      <div className="Appcontainer">
        <Navigation />
        <div className="dashboard_wrap">
          <div className="headeralign">
            <div className="banner-text">
              <img
                style={{
                  width: "100%",
                  height: "50vh",
                  borderRadius: "2rem",
                  marginTop: "2rem",
                }}
                src={hospitals.picture}
                alt="hospital_img"
              />
            </div>
            <div className="flex-container scroll">
              <div className="col5 box-shad">
                <h3>{hospitals.hospitalname}</h3>
                <p>
                  <i className="far fa-envelope"></i> {hospitals.email}
                </p>
                <p>
                  <i className="fas fa-phone-alt"></i> {hospitals.phone}
                </p>
                <p>
                  <i className="fas fa-phone-alt"></i> {hospitals.emergencyNo}
                </p>
              </div>
              <div className="col5 box-shad">
                <h3>
                  <i className="fas fa-map-marker-alt"></i>Address
                </h3>
                <p>
                  <b>Place:</b> {hospitals.place}
                </p>
                <p>
                  <b>Landmark:</b> {hospitals.landmark}
                </p>
                <p>
                  <b>District:</b> {hospitals.city}
                </p>
                <p>
                  <b>State:</b> {hospitals.state} <b>Pin Code:</b>{" "}
                  {hospitals.pincode}
                </p>
              </div>
            </div>
          </div>
          <div className="add_departmet">
            <Link to="/Updatehospitaldetails">
              <i className="far fa-edit"></i> Update Details{" "}
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
export default Myhospital;
