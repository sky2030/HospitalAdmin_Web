import React from "react";
import Navigation from "./Nav";
// import ReactDOM from 'react-dom';
import "./dashboard/dashboard.css";
import { Link, Redirect } from "react-router-dom";
import docicon from "./img/doctor-icon.jpg";
import axios from "axios";
//import Spinner from "./img/Magnify.gif";
import Spinner from "./img/Spinnergrey.gif";
//import Spinner from "./img/Spinner.gif";
// import Adddoctor from './Adddoctor';

const BASE = "https://stage.mconnecthealth.com";


class Doctorlist extends React.Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("token");

    let loggedIn = true;
    if (token == null) {
      loggedIn = false;
    }
    this.state = {
      loggedIn,
      posts: [],
    };
  }
  componentDidMount = () => {
    this.getDoctors();
  };

  getDoctors = () => {
    console.log("Data has been received!!");
    axios
      .get(
        "https://stage.mconnecthealth.com/v1/hospital/doctors",

        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        console.log(response);
        if (response.data.code === 200) {
          const data = response.data.data;
          console.log(response);
          this.setState({ posts: data });
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
    const { posts } = this.state;

    const postList = posts.length ? (
      posts.map((post) => {
        return (
          <Link to={"/Doctorprofile/" + post._id} key={post._id} className="doctor-card col">

            <h3 style={{ color: "white" }}>
              Dr. {post.first_name} {post.last_name}
            </h3>
            <div style={{
              display: 'flex',
              flexDirection: 'row'
            }}>
              <div className="doctorpic">
                <img
                  src={post.picture === "" || !post.picture ? docicon : post.picture}
                  alt="doctors"
                />
              </div>
              <div className="doctordetails">
                <p>
                  <b>{post.department}</b> | {post.degree}
                </p>
                <p>
                  {" "}
                  <i className="fas fa-star"></i>{" "}
                  <i className="fas fa-star"></i>{" "}
                  <i className="fas fa-star"></i>{" "}
                  <i className="fas fa-star"></i>{" "}
                </p>
                <p>Rs. : {post.consultation}</p>
                <p>{post.designation}</p>
                {post.is_approved === false ?
                  <div className="ApprovePanel">
                    <p style={{ color: 'red', fontSize: "12px" }}> <b>Approval Pending</b>, Approve this Doctor if Belongs to Your Hospital</p>

                  </div>
                  : null}
              </div>
            </div>

          </Link>
        );
      })
    ) : (
        <div
          className="center"
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: "50px",
          }}
        >
          <img src={Spinner} alt="Loading" />
        </div>
      );

    if (this.state.loggedIn === false) {
      return <Redirect to="/" />;
    }
    return (
      <div className="Appcontainer">
        <Navigation />
        <div className="dashboard_wrap">
          <div className="flex-container">{postList}</div>
          <div className="add_departmet">
            <Link to="/Adddoctor">
              <i className="fas fa-plus"></i> Add Doctor{" "}
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
export default Doctorlist;
