import React from "react";
import Navigation from "./Nav";
//import ReactDOM from 'react-dom';
import "./dashboard/dashboard.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { Redirect } from "react-router-dom";

// const initialState = {
// 	hospitalcode:'',
// 	deptcode:'',
// 	departmentname:'',
// 	description:'',
// 	picture:'',
// 	nameError: "",
// 	emailError: "",
// 	phoneError: "",
// 	selectedFile:null,
// 	submitted:false
//   };

class Editdepartment extends React.Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("token");

    let loggedIn = true;
    if (token == null) {
      loggedIn = false;
    }
    this.state = {
      loggedIn,
      post: {},
      departmentname: "",
      deptcode: "",
      description: "",
      picture: "",
      id: "",
      departmentnameError: "",
      descriptionError: "",
    };
  }
  componentDidMount = () => {
    console.log(`This is Hospital ID ${this.props.match.params.id}`);
    this.getDepartment();
    //  this.setState({hospital: this.props.match.params});
    //  console.log(`This is Hospital Name ${this.props.match.params.hospitalname}`)
  };

  getDepartment = () => {
    //  axios.get('/v1/admin/hospitals/'+`?hospitalcode=${this.props.match.params.id}&doctorName=Sanjeev`,
    axios
      .get(
        "https://stage.mconnecthealth.com/v1/hospital/departments/" +
          this.props.match.params.id,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      // axios.get('https://stage.mconnecthealth.com/saket_Hospital')
      .then((response) => {
        console.log(response);
        const data = response.data.data;

        this.setState({
          departmentname: data.departmentname,
          description: data.description,
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

   UpdateDepartment = (event) => {
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
        url: `https://stage.mconnecthealth.com/v1/hospital/departments/${this.state.id}`,
        method: "PUT",
        data: payload,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: localStorage.getItem("token"),
        },
      })
        .then((response) => {
          if (response.code === 200) {
            alert(response.message);
            console.log("Data has been sent to the server successfully");
          } else {
            console.log(response.message);
          }
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


  handleSubmit = (event) => {
    event.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      const payload = {
        departmentname: this.state.departmentname,
        description: this.state.description,
        picture: this.state.picture,
      };
      axios({
        url: `https://stage.mconnecthealth.com/v1/hospital/departments/${this.state.id}`,
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
    this.setState({
      departmentname: "",
      description: "",
      picture: "",
    });
  };
  render() {
    const { departmentname, description } = this.state;
    if (this.state.submitted) {
      return <Redirect to="/Alldepartment" />;
    }
    return (
      <div className="Appcontainer">
        <Navigation />
        <div className="adddept">
          <div className="backarrow">
            {" "}
            <Link to="/Alldepartment">
              <i class="fas fa-arrow-left"></i>
            </Link>
          </div>
          <h2>Update Department</h2>

          <form onSubmit={this.handleSubmit}>
            {/* <div className="imgdetail">
						<img src={picture} alt="Neorology" className="imgdetail" />
					</div> */}
            <div className="row">
              <label>Department Name:</label>
              <input
                type="text"
                value={departmentname}
                name="departmentname"
                placeholder="enter department Name"
                onChange={this.handleChange}
              />
              <div style={{ fontSize: 12, color: "red" }}>
                {this.state.departmentnameError}
              </div>
            </div>
            {/* <div className="row">
						<label>Department Code:</label>
						<input type="text" placeholder="789ND"
							name="deptcode"
							value={deptcode}
							placeholder="enter department code"
							onChange={this.handleChange} />
					</div> */}
            <div className="row">
              <label> Description:</label>
              <input
                type="text"
                name="description"
                value={description}
                placeholder="enter description"
                onChange={this.handleChange}
              />
              <div style={{ fontSize: 12, color: "red" }}>
                {this.state.descriptionError}
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
            </div>
            <div className="btncontainer">
              {/* <button onClick={this.handleUpload}>
							<i class="fas fa-check"></i>Upload Image </button> */}
              <button onClick={this.resetUserInputs}>
                <i className="fas fa-save"></i>Reset
              </button>
              <button type="submit">
                <i class="fas fa-save"></i>Update Details
              </button>
            </div>
            <img
              alt="Hospital"
              src={this.state.picture}
              style={{ width: "90%" }}
            />
          </form>
        </div>
      </div>
    );
  }
}
export default Editdepartment;
