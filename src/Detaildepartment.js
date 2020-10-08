import React from "react";
//import ReactDOM from 'react-dom';
import "./dashboard/dashboard.css";
//import nerology from './img/Nerology.png';
//import dentist1 from './img/dentist1.png';
//import cardio from './img/cardio.png';
//import addicon from './img/add.png';
import { Link } from "react-router-dom";
import axios from "axios";
import { Redirect } from "react-router-dom";

class Detaildepartment extends React.Component {
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
      submitted: false,
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
        "http://localhost:4300/v1/hospital/departments/" +
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
        this.setState({ post: data });
        console.log("Data has been received!!");
      })
      .catch(() => {
        alert("Error retrieving data!!");
      });
  };

  DeleteDept = (event) => {
    event.preventDefault();

    //console.log(`${this.state.post._id} this is department id`)
    axios({
      url: `http://localhost:4300/v1/hospital/departments/${this.state.post._id}`,
      method: "delete",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((data) => {
        alert("Department has been deleted");
        //console.log('Department has been deleted')
        this.setState({
          submitted: true,
        });
      })
      .catch(() => {
        console.log("internal server error");
      });
    //}
  };

  // DeleteDept = () => {
  // 	console.log("delete initiated")
  // 	axios({
  // 		url: `http://localhost:4300/v1/hospital/departments/${this.state.id}`,
  // 		method: 'Delete',
  // 		headers: {
  // 			'Authorization': localStorage.getItem("token")
  // 		}
  // 	})
  // 		.then(res => res.json())
  // 		.then(deletedEmp => {
  // 			console.log(`${this.state.departmentname} deleted`)

  // 		})
  // 		.catch(err => {
  // 			console.log("something went wrong")
  // 		})
  // }
  render() {
    //const { departmentname, picture, description } = this.state
    if (this.state.submitted) {
      return <Redirect to="/Alldepartment" />;
    }
    const { post } = this.state;

    if (this.state.loggedIn === false) {
      return <Redirect to="/splash" />;
    }
    return (
      <div className="detailsdept">
        <div className="backarrow">
          {" "}
          <Link to="/Alldepartment">
            <i className="fas fa-arrow-left"></i>
          </Link>
        </div>
        <h2>Department Details</h2>

        <img src={post.picture} alt="Neorology" />
        <h3>{post.departmentname}</h3>
        <p>{post.deptcode}</p>
        <div className="detlspage">
          <p>{post.description}</p>
        </div>
        <Link to={"/Editdepartment/" + post._id}>
          <button>
            <i className="far fa-edit"></i>Edit{" "}
          </button>
        </Link>
        <button onClick={this.DeleteDept}>
          <i className="fas fa-trash"></i>Delete Department{" "}
        </button>
      </div>
    );
  }
}
export default Detaildepartment;
