import React from "react";
//import ReactDOM from 'react-dom';
import "./dashboard/dashboard.css";
//import nerology from './img/Nerology.png';
//import dentist1 from './img/dentist1.png';
//import cardio from './img/cardio.png';
import addicon from "./img/add.png";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

class Alldepartment extends React.Component {
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
    this.getDepartments();
  };

  getDepartments = () => {
    console.log("Data has been received!!");
    axios
      .get(
        "http://localhost:4300/v1/hospital/departments",

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
    if (localStorage.getItem("token") == null) {
      return <Redirect to="/splash" />;
    }
    const { posts } = this.state;

    const postList = posts.length ? (
      posts.map((post) => {
        return (
          <div key={post._id}>
            <ul>
              <li>
                <Link to={"/Detaildepartment/" + post._id}>
                  <img
                    src={post.picture === "" ? addicon : post.picture}
                    alt="Neorology"
                  />
                  {post.departmentname}
                </Link>
              </li>
            </ul>
          </div>
        );
      })
    ) : (
      <div className="center">No Posts to show</div>
    );

    return (
      <div className="alldept">
        <div className="backarrow">
          <Link to="/Dashboard">
            <i className="fas fa-arrow-left"></i>
          </Link>{" "}
        </div>
        <h2>All Department</h2>

        {postList}
        <div className="add_departmet">
          <Link to="/Adddepartment">
            {" "}
            <i className="fas fa-plus"></i> Add Department
          </Link>
        </div>
      </div>
    );
  }
}
export default Alldepartment;
