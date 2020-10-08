import React from "react";
//import ReactDOM from 'react-dom';
import "./dashboard/dashboard.css";
//import docicon from './img/doctor-icon.jpg';
//import maxhosp from './img/maxhospital.jpg';
import { Link } from "react-router-dom";
import axios from "axios";
import { Redirect } from "react-router-dom";

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
    //  console.log(`This is Hospital ID ${this.props.match.params.id}`)
    this.getHospital();
    //  this.setState({hospital: this.props.match.params});
    //  console.log(`This is Hospital Name ${this.props.match.params.hospitalname}`)
  };

  getHospital = () => {
    //  axios.get('/v1/admin/hospitals/'+`?hospitalcode=${this.props.match.params.id}&doctorName=Sanjeev`,
    axios
      .get("http://localhost:4300/v1/hospital", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      // axios.get('http://localhost:4300/saket_Hospital')
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
    const { hospitals } = this.state;

    if (this.state.loggedIn === false) {
      return <Redirect to="/splash" />;
    }
    return (
      <div className="dashboard_wrap">
        {/* <div className="add_departmet1">
					<Link to='/Updatehospitaldetails'><i className="far fa-edit"></i> Update Details </Link>
				</div> */}
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
              {/* <p>{hospitals.emergencyDetail}</p> */}
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
        {/* <div style={{
					display: 'flex',
					flexDirection: 'row',
					alignContent: 'center',
					justifyContent: 'center'
				}}> */}
        <div className="add_departmet">
          <Link to="/Updatehospitaldetails">
            <i className="far fa-edit"></i> Update Details{" "}
          </Link>
        </div>

        {/* <div className="add_departmet">
          <Link to="/HospitalSpeciality">
            <i className="far fa-edit"></i> View Specialities{" "}
          </Link>
        </div> */}
      </div>
    );
  }
}
export default Myhospital;
