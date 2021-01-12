import React from "react";
import Navigation from "./Nav";
//import ReactDOM from 'react-dom';
import "./dashboard/dashboard.css";
//import nerology from './img/Nerology.png';
//import dentist1 from './img/dentist1.png';
//import cardio from './img/cardio.png';
//import docicon from './img/doctor-icon.jpg';
import { Link } from "react-router-dom";
import axios from "axios";
import { Redirect } from "react-router-dom";

const BASE = "https://stage.mconnecthealth.com";


class Doctorprofile extends React.Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("token");

    let loggedIn = true;
    if (token == null) {
      loggedIn = false;
    }
    this.state = {
      loggedIn,
      post: {},
      submitted: false,
    };
  }
  componentDidMount = () => {
    console.log(`This is Hospital ID ${this.props.match.params.id}`);
    this.getDoctor();
    //  this.setState({hospital: this.props.match.params});
    //  console.log(`This is Hospital Name ${this.props.match.params.hospitalname}`)
  };

  getDoctor = () => {
    //  axios.get('/v1/admin/hospitals/'+`?hospitalcode=${this.props.match.params.id}&doctorName=Sanjeev`,
    axios
      .get(
        `https://stage.mconnecthealth.com/v1/hospital/doctors/` +
        this.props.match.params.id,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      // axios.get('https://stage.mconnecthealth.com/saket_Hospital')
      .then((response) => {
        console.log(response);
        if (response.data.code === 200) {
          const data = response.data.data;
          this.setState({ post: data });
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

  DeleteDoctor = () => {
    axios({
      url: `https://stage.mconnecthealth.com/v1/hospital/doctors/${this.props.match.params.id}`,
      method: "delete",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((data) => {
        console.log(data.data.code);
        if (data.data.code === 200) {
          this.setState({
            submitted: true,
          });
          alert(data.data.message);
        } else {
          alert(data.data.message);
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
    //}
  };
  render() {
    const { post } = this.state;

    if (this.state.loggedIn === false) {
      return <Redirect to="/" />;
    }
    if (this.state.submitted) {
      return <Redirect to="/Doctorlist" />;
    }
    return (
      <div className="Appcontainer">
        <Navigation />
        <div className="detailsdept">
          <div className="backarrow">
            {" "}
            <Link to="/Doctorlist">
              <i className="fas fa-arrow-left"></i>
            </Link>
          </div>
          <h2>Doctor Profile</h2>
          <div className="scrolldiv">
            <img src={post.picture} alt="Neorology" />
            <h3>
              Dr. {post.first_name} {post.last_name}
            </h3>
            <p>{post.designation}</p>
            <ul className="dlist">
              <li>
                <i className="fas fa-user"></i>
                {post.department}
              </li>
              <li>
                <i className="fas fa-user-md"></i>
                {post.experience}
              </li>
              <li>
                <i className="fas fa-certificate"></i>
                {post.degree}
              </li>
              <li>
                <i className="far fa-envelope"></i>
                {post.email}
              </li>
              <li>
                <i className="fas fa-phone-alt"></i>
                {post.mobile}
              </li>
              <li>
                <i className="fas fa-rupee-sign"></i>
                {post.consultation}
              </li>
              <li>
                <i className="fas fa-birthday-cake"></i>
                {post.dob}
              </li>
            </ul>
            <Link to={"/Updateprofile/" + post._id}>
              <button>
                <i className="far fa-edit"></i> Update Details{" "}
              </button>
            </Link>
            <button onClick={this.DeleteDoctor}>
              <i className="fas fa-trash"></i>Delete{" "}
            </button>
            <Link to={"/Adddoctorfee/" + post._id}>
              <button>
                <i className="fas fa-rupee-sign"></i>Add Fees{" "}
              </button>
            </Link>
            <Link to={"/Manageconsulation/" + post._id}>
              <button>
                <i className="fas fa-hospital"></i>Manage Slots{" "}
              </button>{" "}
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
export default Doctorprofile;
