import React from "react";
//import ReactDOM from 'react-dom';
import "./dashboard/dashboard.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Navigation from "./Nav";
import { Redirect } from "react-router-dom";

const initialState = {
  first_name: "",
  last_name: "",
  mobile: "",
  email: "",
  gender: "",
  dob: "",
  password: "",
  picture: "",
  registration_no: "",
  experience: "",
  degree: "",
  designation: "",
  deptcode: "",
  department: "",
  specialities: "",
  genderError: "",
  dobError: "",
  registrationError: "",
  expError: "",
  degreeError: "",
  designationError: "",
  specialitiesError: "",
  nameError: "",
  deptError: "",
  emailError: "",
  phoneError: "",
  passwordError: "",
  selectedFile: null,
  submitted: false,
  posts: [],
  Male: "Male",
  Female: "Female",
};

class Adddoctor extends React.Component {
  state = initialState;

  validate = () => {
    let deptError = "";
    let emailError = "";
    let phoneError = "";
    let nameError = "";
    let passwordError = "";
    let genderError = "";
    let dobError = "";
    let registrationError = "";
    let expError = "";
    let degreeError = "";
    let designationError = "";
    let specialitiesError = "";

    if (!this.state.deptcode) {
      deptError = "****Department Code cannot be blank";
    }
    if (!this.state.gender) {
      genderError = "****Gender cannot be blank";
    }
    if (!this.state.dob) {
      dobError = "****Date of Birth cannot be blank";
    }
    if (!this.state.registration_no) {
      registrationError = "****Registration No cannot be blank";
    }
    if (!this.state.experience) {
      expError = "****Experience cannot be blank";
    }
    if (!this.state.degree) {
      degreeError = "****Degree cannot be blank";
    }
    if (!this.state.designation) {
      designationError = "****Designation cannot be blank";
    }
    if (!this.state.specialities) {
      specialitiesError = "****Specialities cannot be blank";
    }
    if (!this.state.password) {
      passwordError = "****password must be more than 7 Character";
    }
    if (!this.state.first_name) {
      nameError = "****Doctor Name cannot be blank";
    }

    if (!this.state.email.includes("@")) {
      emailError = "****Invalid Email";
    }
    if (!this.state.mobile) {
      phoneError = "****Mobile number cannot be blank";
    }

    if (
      specialitiesError ||
      designationError ||
      degreeError ||
      expError ||
      emailError ||
      nameError ||
      deptError ||
      registrationError ||
      phoneError ||
      passwordError ||
      genderError ||
      dobError
    ) {
      this.setState({
        emailError,
        designationError,
        specialitiesError,
        deptError,
        phoneError,
        nameError,
        passwordError,
        genderError,
        dobError,
        registrationError,
        expError,
        degreeError,
      });
      return false;
    }

    return true;
  };

  componentDidMount = () => {
    console.log(`this is hospital code ${this.state.hospitalcode}`);
    this.getDepartments();
  };

  SubmitDoctor = (event) => {
    event.preventDefault();
    const {
      first_name,
      last_name,
      mobile,
      email,
      gender,
      dob,
      password,
      picture,
      registration_no,
      experience,
      degree,
      designation,
      deptcode,
      specialities,
    } = this.state;
    const isValid = this.validate();
    if (isValid) {
      const payload = new FormData();
      payload.append("first_name", first_name);
      payload.append("last_name", last_name);
      payload.append("mobile", mobile);
      payload.append("email", email);
      payload.append("gender", gender);
      payload.append("dob", dob);
      payload.append("password", password);
      payload.append("picture", picture);
      payload.append("registration_no", registration_no);
      payload.append("experience", experience);
      payload.append("degree", degree);
      payload.append("designation", designation);
      payload.append("deptcode", deptcode);
      payload.append("specialities", specialities);
      
      axios({
        url: "https://stage.mconnecthealth.com/v1/hospital/doctors/add",
        method: "POST",
        data: payload,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: localStorage.getItem("token"),
        },
      })
        .then((response) => {
          if (response.data.code === 200) {
            alert(response.data.message);
            console.log("Data has been sent to the server successfully");
            this.resetUserInputs();
            this.setState({
              submitted: true,
            });
          } else {
            alert(response.data.message);
            console.log(response.data.message);
          }

        })
        .catch((Error) => {
          alert(Error);
          console.log("internal server error");
        });
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const {
      first_name,
      last_name,
      mobile,
      email,
      gender,
      dob,
      password,
      picture,
      registration_no,
      experience,
      degree,
      designation,
      deptcode,
      specialities,
    } = this.state;
    const payload = {
      first_name,
      last_name,
      mobile,
      email,
      gender,
      dob,
      password,
      picture,
      registration_no,
      experience,
      degree,
      designation,
      deptcode,
      // department,
      specialities,
    };
    console.log(payload);
    const isValid = this.validate();
    if (isValid) {
      axios({
        url: "https://stage.mconnecthealth.com/v1/hospital/doctors/add",
        method: "POST",
        data: payload,
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
        .then((response) => {
          console.log(response.data.message + response.data.code);
          if (response.data.code === 200) {
            alert("Success: " + response.data.message);
            console.log("Data has been sent to the server successfully");  
            this.resetUserInputs();
            this.setState({
              submitted: true,
            });
          } else {
            alert("Error: " + response.data.message);
            console.log(response.data.message);
          }

        })
        .catch((Error) => {
          alert(Error);
          console.log("internal server error");
        });
    }
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

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleOnChange = (e) => {
    this.setState({
      department: e.target.value,
    });
  };

  handledeptcode = (e) => {
    this.setState({
      deptcode: e.target.value,
    });
  };

  handleGender = (e) => {
    this.setState({
      gender: e.target.value,
    });
  };

  onFileHandler = async (event) => {
    await this.setState({
      picture: event.target.files[0],
      loaded: 0,
    });
    console.log(this.state.picture);
  };

  onChangeHandler = (event) => {
    console.log("file to upload:", event.target.files[0]);

    this.getBase64(event.target.files[0], (result) => {
      this.setState({
        picture: result,
      });
      console.log(result);
    });

    // let file = event.target.files[0];

    // if (file) {
    //   const reader = new FileReader();

    //   reader.onload = this._handleReaderLoaded.bind(this);
    //   reader.readAsBinaryString(file);
    // }
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

  //   this.getBase64(idCard, (result) => {
  //      idCardBase64 = result;
  // });

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
    const {
      posts,
      first_name,
      last_name,
      mobile,
      email,
      //gender,
      dob,
      password,
      //picture,
      registration_no,
      experience,
      degree,
      designation,
      //deptcode,
      //department,
      specialities,
      Male,
      Female,
    } = this.state;
   

    const deptcodelist = posts.length ? (
      posts.map((item) => {
        return (
          <option key={item._id} value={item.deptcode}>
            {item.departmentname}
          </option>
        );
      })
    ) : (
        <div className="center">No Departments</div>
      );

    if (this.state.submitted) {
      return <Redirect to="/Doctorlist" />;
    }
    return (
      <div className="Appcontainer">
        <Navigation />
        <div className="adddept">
          <div className="backarrow">
            {" "}
            <Link to="/Doctorlist">
              <i className="fas fa-arrow-left"></i>
            </Link>
          </div>
          <h2>Add Doctor</h2>

          <form action="confirm" onSubmit={this.handleSubmit}>
            <div className="row">
              <input
                type="text"
                placeholder="Enter First Name"
                value={first_name}
                name="first_name"
                onChange={this.handleChange}
              />
              <div style={{ fontSize: 12, color: "red" }}>
                {this.state.nameError}
              </div>
            </div>
            <div className="row">
              <input
                type="text"
                placeholder=" Enter Last Name"
                value={last_name}
                name="last_name"
                onChange={this.handleChange}
              />
              <div style={{ fontSize: 12, color: "red" }}>
                {this.state.nameError}
              </div>
            </div>
            <div className="row">
              <input
                type="text"
                placeholder=" Enter Email"
                value={email}
                name="email"
                onChange={this.handleChange}
              />
              <div style={{ fontSize: 12, color: "red" }}>
                {this.state.emailError}
              </div>
            </div>
            <div className="row">
              <input
                type="text"
                placeholder="Enter Phone Number"
                value={mobile}
                name="mobile"
                onChange={this.handleChange}
              />
              <div style={{ fontSize: 12, color: "red" }}>
                {this.state.phoneError}
              </div>
            </div>
            <div className="row">
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                name="password"
                onChange={this.handleChange}
              />
              <div style={{ fontSize: 12, color: "red" }}>
                {this.state.passwordError}
              </div>
            </div>
            <div className="row">
              <select onChange={this.handleGender}>
                <option>Gender</option>
                <option value={Male}>Male</option>
                <option value={Female}>Female</option>
              </select>
              <div style={{ fontSize: 12, color: "red" }}>
                {this.state.genderError}
              </div>
            </div>
            {/* <div className="row">
            <select onChange={this.handleOnChange}>{departmentlist}</select>
            <div style={{ fontSize: 12, color: "red" }}>
              {this.state.nameError}
            </div>
          </div> */}
            <div className="row">
              <select onChange={this.handledeptcode}>{deptcodelist}</select>
              <div style={{ fontSize: 12, color: "red" }}>
                {this.state.deptError}
              </div>
            </div>

            <div className="row">
              <input
                type="text"
                placeholder="Date of Birth"
                value={dob}
                name="dob"
                onChange={this.handleChange}
              />
              <div style={{ fontSize: 12, color: "red" }}>
                {this.state.dobError}
              </div>
            </div>
            <div className="row">
              <input
                type="text"
                placeholder="Enter Registration Number"
                value={registration_no}
                name="registration_no"
                onChange={this.handleChange}
              />
              <div style={{ fontSize: 12, color: "red" }}>
                {this.state.registrationError}
              </div>
            </div>
            <div className="row">
              <input
                type="text"
                placeholder=" Enter Experience"
                value={experience}
                name="experience"
                onChange={this.handleChange}
              />
              <div style={{ fontSize: 12, color: "red" }}>
                {this.state.expError}
              </div>
            </div>
            <div className="row">
              <input
                type="text"
                placeholder="Enter Degree"
                value={degree}
                name="degree"
                onChange={this.handleChange}
              />
              <div style={{ fontSize: 12, color: "red" }}>
                {this.state.degreeError}
              </div>
            </div>
            <div className="row">
              <input
                type="text"
                placeholder="Enter Designation"
                value={designation}
                name="designation"
                onChange={this.handleChange}
              />
              <div style={{ fontSize: 12, color: "red" }}>
                {this.state.designationError}
              </div>
            </div>
            <div className="row">
              <input
                type="text"
                placeholder="Enter Specialities"
                value={specialities}
                name="specialities"
                onChange={this.handleChange}
              />
              <div style={{ fontSize: 12, color: "red" }}>
                {this.state.specialitiesError}
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
              <button type="submit">
                <i className="fas fa-save"></i>Save
              </button>
            </div>
            <img
              alt="Doctor"
              src={this.state.picture}
              style={{ width: "50%" }}
            />
          </form>
        </div>
      </div>
    );
  }
}
export default Adddoctor;
