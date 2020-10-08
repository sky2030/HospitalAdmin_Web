import React from 'react';
//import ReactDOM from 'react-dom';
import './dashboard.css';
import bgimg from './img/bgimg.jpg';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        const token = localStorage.getItem("token")

        let loggedIn = true
        if (token == null) {
            loggedIn = false
        }
        this.state = {
            loggedIn
            //token = localStorage.getItem("token")
        }
    }
    render() {
        if (localStorage.getItem("token") == null) {
            return <Redirect to="/splash" />
        }

        return (



            <div className="dashboard_wrap">
                <div className="dashboard_maincontent">
                    <img src={bgimg} alt="doctor-img" />
                    <div className="dashboard_icons">
                        <ul>

                            <li><Link to='/Alldepartment'><i className="fas fa-plus-square"></i>Departments</Link></li>
                            <li><Link to='/Doctorlist'><i className="fas fa-user-md"></i>Active Doctor's</Link></li>
                            <li><Link to='/Myhospital'><i className="fas fa-hospital"></i>My Hospital</Link></li>
                            <li><Link to='/Alltransation'><i className="fas fa-credit-card"></i>Transaction</Link></li>

                        </ul>
                    </div>
                </div>
            </div>



        )
    }
}
export default Dashboard;