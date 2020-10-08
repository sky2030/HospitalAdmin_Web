import React from "react";
// import ReactDOM from 'react-dom';
import "./dashboard/dashboard.css";
import { Link, Redirect } from "react-router-dom";
import docicon from "./img/doctor-icon.jpg";
import axios from "axios";
// import Adddoctor from './Adddoctor';

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
        "http://localhost:4300/v1/hospital/doctors",

        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        console.log(response);
        const data = response.data.data;
        console.log(response);
        this.setState({ posts: data });
        console.log("Data has been received!!");
      })
      .catch(() => {
        alert("Error retrieving data!!");
      });
  };

  render() {
    const { posts } = this.state;

    const postList = posts.length ? (
      posts.map((post) => {
        return (
          <div key={post._id} className="doctor-card col">
            <Link to={"/Doctorprofile/" + post._id}>
              <h3 style={{ color: "white" }}>
                Dr. {post.first_name} {post.last_name}
              </h3>
              <div className="doctorpic">
                <img
                  src={post.picture === "" ? docicon : post.picture}
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
              </div>
            </Link>
          </div>
        );
      })
    ) : (
        <div className="center">No posts to show</div>
      );

    if (this.state.loggedIn === false) {
      return <Redirect to="/splash" />;
    }
    return (
      <div className="dashboard_wrap">
        <div className="flex-container">{postList}</div>
        <div className="add_departmet">
          <Link to="/Adddoctor">
            <i className="fas fa-plus"></i> Add Doctor{" "}
          </Link>
        </div>
      </div>
    );
  }
}
export default Doctorlist;
