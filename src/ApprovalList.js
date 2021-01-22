import React from "react";
import Navigation from "./Nav";
//import ReactDOM from 'react-dom';
import "./dashboard/dashboard.css";
//import Spinner from "./img/Spinner.gif";
import Spinner from "./img/Spinnergrey.gif";
//import Spinner from "./img/Magnify.gif";
import addicon from "./img/department.png";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

const BASE = "https://stage.mconnecthealth.com";


class ApprovalList extends React.Component {
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
                    this.setState({ posts: data });
                    console.log("Data has been received!!");
                } else {
                    alert(response.data.message)
                }
            })
            .catch((Error) => {
                console.log("Error " + JSON.stringify(Error))
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
        if (this.state.loggedIn === false) {
            return <Redirect to="/" />;
        }
        if (localStorage.getItem("token") == null) {
            return <Redirect to="/" />;
        }
        const { posts } = this.state;

        const postList = posts.length ? (
            posts.map((post) => {
                return (

                    <Link to={"/Doctorprofile/" + post._id} key={post._id} className="linkdecoration" >
                        {post.is_approved === false ?
                            <ul>
                                <li>
                                    <div>
                                        Dr. {post.first_name} {post.last_name} | {post.department}
                                        <p> Registration No: {post.registration_no}</p>
                                        <p> Email Address: {post.email}</p>
                                    </div>



                                </li>
                            </ul>
                            : null}

                    </Link>
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
                <div className="Approval">
                    <div className="backarrow">
                        <Link to="/Dashboard">
                            <i className="fas fa-arrow-left"></i>
                        </Link>{" "}
                    </div>
                    <h2>Approval List</h2>

                    {postList}

                </div>
            </div >
        );
    }
}
export default ApprovalList;
