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
  loggedIn: true,
  consultation: "",
  ewsfee: "",
  followupdays: "",
  followupfee: ""
};

class Adddoctorfee extends React.Component {
  state = initialState;

  constructor(props) {
    super(props);

  }

  validate = () => {
    let consultationError = "";

    if (!this.state.consultation) {
      consultationError = "****Consultation Fees cannot be blank";
    }

    if (consultationError) {
      this.setState({ consultationError });
      return false;
    }

    return true;
  };

  componentDidMount = () => {
    console.log(`This is Hospital ID ${this.props.match.params.id}`);
    this.getDoctor();
    //  this.setState({hospital: this.props.match.params});
    //  console.log(`This is Hospital Name ${this.props.match.params.hospitalname}`)
  };

  getDoctor = () => {
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
      .then((response) => {
        console.log(response);
        const data = response.data.data;
        this.setState({
          consultation: data.consultation,
          ewsfee: data.ewsfee,
          followupdays: data.followupdays,
          followupfee: data.followupfee,
          id: data._id,
        });
        console.log("Data has been received!!");
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

  SubmitFees = (event) => {
    event.preventDefault();
    const {
      consultation,
    } = this.state;
    const isValid = this.validate();
    if (isValid) {
      const payload = new FormData();
      payload.append("consultation", consultation);
      axios({
        url: `https://stage.mconnecthealth.com/v1/hospital/doctorfee/${this.props.match.params.id}`,
        method: "POST",
        data: payload,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: localStorage.getItem("token"),
        },
      })
        .then((response) => {
          if (response.data.data.department.consultation === this.state.consultation) {
            alert(`Success: ${this.state.consultation} added Successfully `);
            console.log("Data has been sent to the server successfully");
            this.resetUserInputs();
            this.setState({
              submitted: true,
            });
          } else {
            alert(`Failure: Try again Adding ${this.state.consultation} `);
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
    }
  };


  handleSubmit = (event) => {
    event.preventDefault();
    // const isValid = this.validate();
    // if (isValid) {
    const payload = {
      consultation: this.state.consultation,
      ewsfee: this.state.ewsfee,
      followupdays: this.state.followupdays,
      followupfee: this.state.followupfee,
    };
    const isValid = this.validate();
    if (isValid) {
      axios({
        url: `https://stage.mconnecthealth.com/v1/hospital/doctorfee/${this.props.match.params.id}`,
        method: "PUT",
        data: payload,
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
        .then((response) => {
          if (response.data.code === 200) {
            alert(response.data.message)
            console.log("Data has been sent to the server successfully");
            this.resetUserInputs();
            this.setState({
              submitted: true,
            });
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
    if (this.state.loggedIn === false) {
      return <Redirect to="/" />;
    }
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

            </div>
            <div className="row">
              <input
                type="text"
                placeholder="Follow Up Day"
                value={followupdays}
                name="followupdays"
                onChange={this.handleChange}
              />

            </div>
            <div className="row">
              <input
                type="text"
                placeholder="Followup Fees"
                value={followupfee}
                name="followupfee"
                onChange={this.handleChange}
              />

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
