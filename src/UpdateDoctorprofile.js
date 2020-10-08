import React from "react";
//import ReactDOM from 'react-dom';
import "./dashboard/dashboard.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { Redirect } from "react-router-dom";

// const initialState = {
// 	first_name: "",
// 	last_name: "",
// 	mobile: "",
// 	email: "",
// 	gender: "",
// 	dob: "",
// 	password: "",
// 	picture: "",
// 	gender: "",
// 	department: "",
// 	deptcode: "",
// 	registration_no: "",
// 	experience: "",
// 	degree: "",
// 	designation: "",
// 	specialities: "",
// 	nameError: "",
// 	emailError: "",
// 	phoneError: "",
// 	selectedFile: null,
// 	submitted: false,
// 	posts: []
// };

class Adddoctor extends React.Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("token");

    let loggedIn = true;
    if (token == null) {
      loggedIn = false;
    }
    this.state = {
      loggedIn,
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
      specialities: "",
      nameError: "",
      emailError: "",
      phoneError: "",
      genderError: "",
      dobError: "",
      registrationError: "",
      expError: "",
      degreeError: "",
      designationError: "",
      specialitiesError: "",
      deptError: "",
      passwordError: "",
      selectedFile: null,
      submitted: false,
      id: "",
    };
  }
  componentDidMount = () => {
    console.log(`This is Hospital ID ${this.props.match.params.id}`);
    this.getDoctor();
    //  this.setState({hospital: this.props.match.params});
    //  console.log(`This is Hospital Name ${this.props.match.params.hospitalname}`)
  };

  getDoctor = () => {
    //  axios.get('/v1/admin/hospitals/'+`?hospitalcode=${this.props.match.params.id}&doctorName=Sanjeev`,
    axios
      .get(
        `http://localhost:4300/v1/hospital/doctors/` +
        this.props.match.params.id,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      // axios.get('http://localhost:4300/saket_Hospital')
      .then((response) => {
        console.log(response);
        const data = response.data.data;
        this.setState({
          first_name: data.first_name,
          last_name: data.last_name,
          mobile: data.mobile,
          email: data.email,
          gender: data.gender,
          department: data.department,
          deptcode: data.deptcode,
          dob: data.dob,
          password: data.password,
          picture: data.picture,
          registration_no: data.registration_no,
          experience: data.experience,
          degree: data.degree,
          designation: data.designation,
          specialities: data.specialities,
          id: data._id,
        });
        console.log("Data has been received!!");
      })
      .catch(() => {
        alert("Error retrieving data!!");
      });
  };

  //state = initialState;

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

  // componentDidMount = () => {
  // 	console.log(`this is hospital code ${this.state.hospitalcode}`);
  // 	this.getDepartments();
  // };

  handleSubmit = (event) => {
    console.log("update Initiated");
    event.preventDefault();
    const isValid = this.validate();
    if (isValid) {

      // const data = new FormData()
      // data.append('file', this.state.selectedFile)

      const payload = {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        mobile: this.state.mobile,
        email: this.state.email,
        gender: this.state.gender,
        department: this.state.department,
        deptcode: this.state.deptcode,
        dob: this.state.dob,
        password: this.state.password,
        picture: this.state.picture,
        registration_no: this.state.registration_no,
        experience: this.state.experience,
        degree: this.state.degree,
        designation: this.state.designation,
        specialities: this.state.specialities,
      };
      axios({
        url: `http://localhost:4300/v1/hospital/doctors/${this.state.id}`,
        method: "PUT",
        data: payload,
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
        .then(() => {
          console.log("Data has been sent to the server successfully");
          console.log(this.state.picture);
          alert("Doctor has been Updated");
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
  // 	this.setState({
  // 		selectedFile: event.target.files[0],
  // 		loaded: 0,
  // 	})

  // }
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
    //this.setState(initialState);
    this.setState({
      first_name: "",
      last_name: "",
      mobile: "",
      email: "",
      dob: "",
      password: "",
      picture: "",
      registration_no: "",
      experience: "",
      degree: "",
      designation: "",
      specialities: "",
    });
  };
  render() {
    const {
      first_name,
      last_name,
      mobile,
      email,
      dob,
      password,
      picture,
      registration_no,
      experience,
      degree,
      designation,
      specialities,
    } = this.state;

    if (this.state.submitted) {
      return <Redirect to="/Doctorlist" />;
    }
    return (
      <div className="adddept">
        <div className="backarrow">
          {" "}
          <Link to={"/Doctorprofile/" + this.props.match.params.id}>
            <i className="fas fa-arrow-left"></i>
          </Link>
        </div>
        <h2>Update Doctor</h2>

        <form action="confirm" onSubmit={this.handleSubmit}>
          {/* <div className="imgdetail">
						<img src={picture} alt="Doctor" className="imgdetail" />
					</div> */}
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
            {/* <button onClick={this.handleUpload}><i className="fas fa-upload"></i>Upload Image </button> */}
            <button onClick={this.resetUserInputs}>
              <i className="fas fa-save"></i>Reset
            </button>
            <button type="submit">
              <i className="fas fa-save"></i>Update Profile
            </button>
          </div>
          <img
            alt="Hospital"
            src={this.state.picture}
            style={{ width: "50%" }}
          />
        </form>
      </div>
    );
  }
}
export default Adddoctor;