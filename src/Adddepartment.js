import React from "react";
//import ReactDOM from 'react-dom';
import "./dashboard/dashboard.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Navigation from "./Nav";

const initialState = {
  hospitalcode: "",
  deptcode: "",
  departmentname: "",
  description: "",
  picture: "",
  departmentnameError: "",
  descriptionError: "",
  selectedFile: null,
  submitted: false,
  loggedIn: true
};

class Adddepartment extends React.Component {
  state = initialState;

  constructor(props) {
    super(props);

  }

  validate = () => {
    let departmentnameError = "";
    let descriptionError = "";

    if (!this.state.departmentname) {
      departmentnameError = "****Department name cannot be blank";
    }

    if (!this.state.description) {
      descriptionError = "****Description cannot be blank";
    }

    if (departmentnameError || descriptionError) {
      this.setState({ departmentnameError, descriptionError });
      return false;
    }

    return true;
  };

  SubmitDepartment = (event) => {
    event.preventDefault();
    const {
      departmentname,
      description,
      picture
    } = this.state;
    const isValid = this.validate();
    if (isValid) {
      const payload = new FormData();
      payload.append("departmentname", departmentname);
      payload.append("description", description);
      payload.append("picture", picture);
      axios({
        url: "https://stage.mconnecthealth.com/v1/hospital/department/add",
        method: "POST",
        data: payload,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: localStorage.getItem("token"),
        },
      })
        .then((response) => {
          if (response.data.data.department.departmentname === this.state.departmentname) {
            alert(`Success: ${this.state.departmentname} added Successfully `);
            console.log("Data has been sent to the server successfully");
            this.resetUserInputs();
            this.setState({
              submitted: true,
            });
          } else {
            alert(`Failure: Try again Adding ${this.state.departmentname} `);
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
    //const isValid = this.validate();
    // if (isValid) {
    const payload = {
      departmentname: this.state.departmentname,
      deptcode: this.state.deptcode,
      description: this.state.description,
      picture: this.state.picture,
    };
    const isValid = this.validate();
    if (isValid) {
      axios({
        url: "https://stage.mconnecthealth.com/v1/hospital/department/add",
        method: "POST",
        data: payload,
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
        .then((response) => {
          console.log("Response: " + JSON.stringify(response.data.code));
          if (response.data.code === 200) {
            alert(`${response.data.message} : ${this.state.departmentname} added Successfully `);
            console.log("Data has been sent to the server successfully");
            this.resetUserInputs();
            this.setState({
              submitted: true,
            });
          } else {
            alert(`Failure: Try again Adding ${this.state.departmentname} `);
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



  onFileHandler = async (event) => {
    await this.setState({
      picture: event.target.files[0],
      loaded: 0,
    });
    // console.log(this.state.picture);
  };

  onChangeHandler = async (event) => {
    console.log("file to upload:", event.target.files[0]);

    this.getBase64(event.target.files[0], (result) => {
      this.setState({
        picture: result,
      });
      //  console.log(result);
    });
  };

  getBase64(file, cb) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  }

  _handleReaderLoaded = (readerEvt) => {
    let binaryString = readerEvt.target.result;
    this.setState({
      picture: btoa(binaryString),
    });
  };

  handleUpload = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("file", this.state.selectedFile);
    data.append("upload_preset", "skyMedi");
    data.append("cloud_name", "skycloud55");

    fetch("https://api.cloudinary.com/v1_1/skycloud55/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.url);
        this.setState({
          picture: data.url,
        });
        console.log(this.state.picture);
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

  resetUserInputs = () => {
    this.setState(initialState);

  };
  render() {
    if (this.state.submitted) {
      return <Redirect to="/Alldepartment" />;
    }
    if (this.state.loggedIn === false) {
      return <Redirect to="/" />;
    }
    return (
      <div className="Appcontainer">
        <Navigation />
        <div className="adddept">
          <div className="backarrow">
            {" "}
            <Link to="/Alldepartment">
              <i className="fas fa-arrow-left"></i>
            </Link>
          </div>
          <h2>Add Department</h2>

          <form onSubmit={this.handleSubmit}>
            <div className="row">
              <label>Department Name:</label>
              <input
                type="text"
                value={this.state.departmentname}
                name="departmentname"
                placeholder="Enter Department Name"
                onChange={this.handleChange}
              />
              <div style={{ fontSize: 12, color: "red" }}>
                {this.state.departmentnameError}
              </div>
            </div>

            <div className="row">
              <label> Description:</label>
              <input
                type="text"
                value={this.state.description}
                name="description"
                placeholder="Enter Description"
                onChange={this.handleChange}
              />
              <div style={{ fontSize: 12, color: "red" }}>
                {this.state.descriptionError}
              </div>
            </div>
            <div className="row">
              <input
                type="file"
                className="uploadbox"
                name="file"
                accept=".jpeg, .png, .jpg"
                onChange={this.onChangeHandler}
              />
            </div>
            <div className="btncontainer">

              <button onClick={this.resetUserInputs}>
                <i className="fas fa-save"></i>Reset
              </button>
              {/* <input type='submit' value='Save' />  */}
              <button type="submit">
                <i className="fas fa-save"></i>Save
              </button>
            </div>
            {/* <img
              alt="Department"
              src={this.state.picture}
              style={{ width: "50%" }}
            /> */}
          </form>
        </div>
      </div>
    );
  }
}
export default Adddepartment;
