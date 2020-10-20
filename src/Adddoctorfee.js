import React from "react";
import Navigation from "./Nav";
//import ReactDOM from 'react-dom';
import "./dashboard/dashboard.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { Redirect } from "react-router-dom";

const initialState = {
  consultation: "",
  ewsfee: "",
  followupdays: "",
  followupfee: "",
  consultationError: "",
  submitted: false,
};

class Adddoctorfee extends React.Component {
  state = initialState;

  validate = () => {
    let consultationError = "";

    if (!this.state.consultation) {
      consultationError = "****Consultation Fees cannot be blank";
    }

    // if (!this.state.email.includes("@")) {
    //   emailError = "****Invalid Email";
    // }
    // if (!this.state.phone) {
    //   phoneError = "****Phone number cannot be blank";
    // }

    if (consultationError) {
      this.setState({ consultationError });
      return false;
    }

    return true;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      const payload = {
        consultation: this.state.consultation,
        ewsfee: this.state.ewsfee,
        followupdays: this.state.followupdays,
        followupfee: this.state.followupfee,
      };
      axios({
        url: `https://stage.mconnecthealth.com/v1/hospital/doctorfee/${this.props.match.params.id}`,
        method: "PUT",
        data: payload,
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
        .then(() => {
          console.log("Data has been sent to the server successfully");
          this.resetUserInputs();
          this.setState({
            submitted: true,
          });
        })
        .catch(() => {
          console.log("internal server error");
        });
    }
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  resetUserInputs = () => {
    this.setState(initialState);
    // this.setState({
    //   hospitalname:'',
    //   code:'',
    //   email:'',
    //   phone:'',
    //   picture:'',
    //   place:'',
    //   Landmark:'',
    //   District:'',
    //   city:'',
    //   state:'',
    //   pincode:''
    // });
  };
  render() {
    const {
      consultation,
      ewsfee,
      followupdays,
      followupfee,
      consultationError,
      submitted,
    } = this.state;

    if (submitted) {
      return <Redirect to="/Doctorlist" />;
    }
    return (
      <div className="Appcontainer">
        <Navigation />
        <div className="adddept">
          <div className="backarrow">
            {" "}
            <Link to={"/Doctorprofile/" + this.props.match.params.id}>
              <i className="fas fa-arrow-left"></i>
            </Link>
          </div>
          <h2>Add Doctor Fee</h2>

          <form action="confirm" onSubmit={this.handleSubmit}>
            <div className="row">
              <input
                type="text"
                placeholder="Consultation Fee"
                value={consultation}
                name="consultation"
                onChange={this.handleChange}
              />
              <div style={{ fontSize: 12, color: "red" }}>
                {consultationError}
              </div>
            </div>
            <div className="row">
              <input
                type="text"
                placeholder="EWS Fees"
                value={ewsfee}
                name="ewsfee"
                onChange={this.handleChange}
              />
              {/* <div style={{ fontSize: 12, color: "red" }}>
              {nameError}
            </div> */}
            </div>
            <div className="row">
              <input
                type="text"
                placeholder="Follow Up Day"
                value={followupdays}
                name="followupdays"
                onChange={this.handleChange}
              />
              {/* <div style={{ fontSize: 12, color: "red" }}>
              {nameError}
            </div> */}
            </div>
            <div className="row">
              <input
                type="text"
                placeholder="Followup Fees"
                value={followupfee}
                name="followupfee"
                onChange={this.handleChange}
              />
              {/* <div style={{ fontSize: 12, color: "red" }}>
              {nameError}
            </div> */}
            </div>

            <div className="btncontainer">
              <button type="submit">
                {" "}
                <i className="fas fa-save"></i> Save{" "}
              </button>
              <button onClick={this.resetUserInputs}>
                <i className="fas fa-save"></i>Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default Adddoctorfee;
