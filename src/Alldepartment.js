import React from "react";
import Navigation from "./Nav";
//import ReactDOM from 'react-dom';
import "./dashboard/dashboard.css";
//import Spinner from "./img/Spinner.gif";
import Spinner from "./img/Spinnergrey.gif";
//import Spinner from "./img/Magnify.gif";
import addicon from "./img/add.png";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

 const BASE = "https://stage.mconnecthealth.com";


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
        "https://stage.mconnecthealth.com/v1/hospital/departments",

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
      return <Redirect to="/" />;
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
                    alt="Department"
                  />
                  {post.departmentname}
                </Link>
              </li>
            </ul>
          </div>
        );
      })
    ) : (
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: "150px",
          marginBottom: "100px",
        }}
      >
        <img src={Spinner} alt="Loading" />
      </div>
    );

    return (
      <div className="Appcontainer">
        <Navigation />
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
              <i className="fas fa-plus"></i> Add Department
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
export default Alldepartment;
