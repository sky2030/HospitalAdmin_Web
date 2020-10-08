import React from "react";
//import ReactDOM from 'react-dom';
import "./dashboard/dashboard.css";
//import nerology from './img/Nerology.png';
//import dentist1 from './img/dentist1.png';
//import cardio from './img/cardio.png';
import addicon from "./img/add.png";
import Arthroscopy from "./img/Arthroscopy.jpg";
import Surgery_Dental from "./img/Surgery_Dental.jpg";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

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

class HospitalSpeciality extends React.Component {
  state = initialState;

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
    //  this.getDepartments();
  };

  getDepartments = () => {
    console.log("Data has been received!!");
    axios
      .get(
        "http://localhost:4300/v1/hospital/departments",

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
    if (localStorage.getItem("token") == null) {
      return <Redirect to="/splash" />;
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
                    alt="Neorology"
                  />
                  {post.departmentname}
                </Link>
              </li>
            </ul>
          </div>
        );
      })
    ) : (
      <div className="center">No Posts to show</div>
    );

    return (
      <div className="alldept1">
        <div className="backarrow">
          <Link to="/Myhospital">
            <i className="fas fa-arrow-left"></i>
          </Link>{" "}
        </div>
        <div
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginRight: "1em",
            marginBottom: "1em",
            marginTop: "1em",
          }}
        >
          <h2 style={{ justifyContent: "center", alignItems: "center" }}>
            Hospital Speciality
          </h2>
        </div>
        <div
          style={{
            borderRadius: "3em",
            borderWidth: "1em",
            marginBottom: "1em",
          }}
        >
          <ul>
            <li>
              <div
                style={{ display: "flex", flexDirection: "row", width: "90%" }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={Arthroscopy}
                    alt="Neorology"
                    style={{ width: "10em", height: "5em" }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div style={{ marginBottom: "0.5em" }}>
                    <b style={{ fontSize: "1.5em", marginLeft: "1em" }}>
                      Arthroscopy
                    </b>
                  </div>
                  <div style={{ marginLeft: "1em" }}>
                    <i style={{ fontWeight: "normal" }}>
                      Arthroscopy (ahr-THROS-kuh-pee) is a procedure for
                      diagnosing and treating joint problems.
                    </i>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div
          style={{
            borderRadius: "3em",
            borderWidth: "1em",
          }}
        >
          <ul>
            <li>
              <div
                style={{ display: "flex", flexDirection: "row", width: "90%" }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={Surgery_Dental}
                    alt="Neorology"
                    style={{ width: "10em", height: "5em" }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div style={{ marginBottom: "0.5em" }}>
                    <b style={{ fontSize: "1.5em", marginLeft: "1em" }}>
                      Surgery Dental
                    </b>
                  </div>
                  <div style={{ marginLeft: "1em" }}>
                    <i style={{ fontWeight: "normal" }}>
                      Dental surgery is any of a number of medical procedures
                      that involve artificially modifying dentition; in other
                      words, surgery of the teeth, gums and jaw bones.
                    </i>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>

        {/* <button onClick={this.handleUpload}>
              <i className="fas fa-upload"></i>Upload Image
              </button> */}

        {/* {postList} */}
        <div className="add_departmet">
          <Link to="/AddSpecialities">
            {" "}
            <i className="fas fa-plus"></i> Add Specialities
          </Link>
        </div>
      </div>
    );
  }
}
export default HospitalSpeciality;
