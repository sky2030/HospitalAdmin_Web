import React from "react";
//import ReactDOM from 'react-dom';
import "./dashboard/dashboard.css";
//import docicon from './img/doctor-icon.jpg';
//import maxhosp from './img/maxhospital.jpg';
import { Link } from "react-router-dom";
import axios from "axios";
import { Redirect } from "react-router-dom";

class Updatehospitaldetails extends React.Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("token");

    //state=initialState;

    let loggedIn = true;
    if (token == null) {
      loggedIn = false;
    }
    this.state = {
      loggedIn,
      hospitals: {},
      email: "",
      phone: "",
      picture: "",
      emergencyNo: "",
      emergencyDetail: "",
      emailError: "",
      phoneError: "",
      emergencyNoError: "",
      emergencyDetailError: "",
      id: "",
    };
  }
  componentDidMount = () => {
    //  console.log(`This is Hospital ID ${this.props.match.params.id}`)
    this.getHospital();
    //  this.setState({hospital: this.props.match.params});
    //  console.log(`This is Hospital Name ${this.props.match.params.hospitalname}`)
  };

  getHospital = () => {
    //  axios.get('/v1/admin/hospitals/'+`?hospitalcode=${this.props.match.params.id}&doctorName=Sanjeev`,
    axios
      .get("http://localhost:4300/v1/hospital", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      // axios.get('http://localhost:4300/saket_Hospital')
      .then((response) => {
        console.log(response);
        const data = response.data.data;

        this.setState({
          email: data.email,
          phone: data.phone,
          emergencyNo: data.emergencyNo,
          emergencyDetail: data.emergencyDetail,
          picture: data.picture,
          id: data._id,
        });

        console.log("Data has been received!!");
      })
      .catch(() => {
        alert("Error retrieving data!!");
      });
  };

  validate = () => {
    let emailError = "";
    let emergencyNoError = "";
    let phoneError = "";
    let emergencyDetailError = "";

    if (!this.state.email.includes("@")) {
      emailError = "****Invalid Email";
    }
    if (!this.state.phone) {
      phoneError = "****Phone number cannot be blank";
    }

    if (!this.state.emergencyNo) {
      emergencyNoError = "****Emergency No cannot be blank";
    }

    if (!this.state.emergencyDetail) {
      emergencyDetailError = "****Emergency Detail cannot be blank";
    }

    if (emailError || phoneError || emergencyDetailError || emergencyNoError) {
      this.setState({
        emailError,
        phoneError,
        emergencyNoError,
        emergencyDetailError,
      });
      return false;
    }

    return true;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    //const isValid = this.validate();
    //if(isValid){

    const payload = {
      email: this.state.email,
      phone: this.state.phone,
      picture: this.state.picture,
      emergencyNo: this.state.emergencyNo,
      emergencyDetail: this.state.emergencyDetail,
    };
    axios({
      url: `http://localhost:4300/v1/hospital/${this.state.id}`,
      method: "PUT",
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
    //}
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
    this.setState({
      email: "",
      phone: "",
      picture: "",
      emergencyNo: "",
      emergencyDetail: "",
    });
  };
  render() {
    const { email, phone, emergencyDetail, emergencyNo, picture } = this.state;

    if (this.state.submitted) {
      return <Redirect to="/Myhospital" />;
    }
    return (
      <div className="dashboard_wrap">
        {/* <div className="banner-text">
					<img className="hospitalimage" src={picture} alt="hospital_img" />

				</div> */}

        <div className="adddept">
          <div className="backarrow">
            {" "}
            <Link to="/Myhospital">
              <i className="fas fa-arrow-left"></i>
            </Link>
          </div>
          <h2>Update Hospital Details</h2>

          <form action="confirm" onSubmit={this.handleSubmit}>
            <div className="row">
              <input
                type="text"
                name="email"
                value={email}
                placeholder="Enter Email Address"
                onChange={this.handleChange}
              />
              <div style={{ fontSize: 12, color: "red" }}>
                {this.state.emailError}
              </div>

              <input
                type="text"
                name="phone"
                value={phone}
                placeholder="Enter Phone Number"
                onChange={this.handleChange}
              />
              <div style={{ fontSize: 12, color: "red" }}>
                {this.state.phoneError}
              </div>

              <input
                type="text"
                name="emergencyNo"
                value={emergencyNo}
                placeholder="Enter Emergency Number"
                onChange={this.handleChange}
              />
              <div style={{ fontSize: 12, color: "red" }}>
                {this.state.emergencyNoError}
              </div>

              <input
                type="text"
                name="emergencyDetail"
                value={emergencyDetail}
                placeholder="Enter Emergency Detail"
                onChange={this.handleChange}
              />
              <div style={{ fontSize: 12, color: "red" }}>
                {this.state.emergencyDetailError}
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
              {/* <button onClick={this.handleUpload}><i className="fas fa-check"></i>Update Image </button> */}
              <button onClick={this.resetUserInputs}>
                <i className="fas fa-save"></i>
                Reset
              </button>
              <button type="submit">
                <i className="fas fa-save"></i>
                Update Details
              </button>
            </div>
            <img
              alt="Hospital"
              src={this.state.picture}
              style={{ width: "50%" }}
            />
          </form>
        </div>
      </div>
    );
  }
}
export default Updatehospitaldetails;
