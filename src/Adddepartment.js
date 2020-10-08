import React from "react";
//import ReactDOM from 'react-dom';
import "./dashboard/dashboard.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { Redirect } from "react-router-dom";

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
};

class Adddepartment extends React.Component {
  state = initialState;

  validate = () => {
    let departmentnameError = "";
    let descriptionError = "";

    if (!this.state.departmentname) {
      departmentnameError = "****Department name cannot be blank";
    }

    if (!this.state.description) {
      descriptionError = "****Description cannot be blank";
    }

    // if (!this.state.email.includes("@")) {
    //   emailError = "****Invalid Email";
    // }
    // if (!this.state.phone) {
    //   phoneError = "****Phone number cannot be blank";
    // }

    if (departmentnameError || descriptionError) {
      this.setState({ departmentnameError, descriptionError });
      return false;
    }

    return true;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      const payload = {
        departmentname: this.state.departmentname,
        deptcode: this.state.deptcode,
        description: this.state.description,
        picture: this.state.picture,
      };
      axios({
        url: "http://localhost:4300/v1/hospital/department/add",
        method: "POST",
        data: payload,
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
        .then(() => {
          console.log("Data has been sent to the server successfully");
          console.log(this.state.picture);
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

  // onChangeHandler = event => {
  //   this.setState({
  //     selectedFile: event.target.files[0],
  //     loaded: 0,
  //   })

  // }

  onChangeHandler = (event) => {
    console.log("file to upload:", event.target.files[0]);

    this.getBase64(event.target.files[0], (result) => {
      this.setState({
        picture: result,
      });
      console.log(result);
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
      .catch((err) => {
        console.log("error while uploading" + err);
      });
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
    if (this.state.submitted) {
      return <Redirect to="/Alldepartment" />;
    }
    return (
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
          {/* <div className="row">
            <label>Department Code:</label>
            <input type="text"
              value={this.state.deptcode}
              name="deptcode"

              placeholder="Enter Department Code"
              onChange={this.handleChange} />
            <div style={{ fontSize: 12, color: "red" }}>
              {this.state.nameError}
            </div>
          </div> */}
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
            {/* <button onClick={this.handleUpload}>
              <i className="fas fa-upload"></i>Upload Image
              </button> */}

            <button onClick={this.resetUserInputs}>
              <i className="fas fa-save"></i>Reset
            </button>
            {/* <input type='submit' value='Save' />  */}
            <button type="submit">
              <i className="fas fa-save"></i>Save
            </button>
          </div>
          <img
            alt="Department"
            src={this.state.picture}
            style={{ width: "50%" }}
          />
        </form>
      </div>
    );
  }
}
export default Adddepartment;
