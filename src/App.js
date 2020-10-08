import React from 'react';
import Nav from './Nav';
import Footer from './Footer';
import Adddepartment from './Adddepartment';
import Alldepartment from './Alldepartment';
import Detaildepartment from './Detaildepartment';
import Editdepartment from './Editdepartment';
import Adddoctor from './Adddoctor';
import Doctorlist from './Doctorlist';
import Dashboard from './dashboard/Dashboard';
import Doctorprofile from './Doctorprofile';
import Updateprofile from './UpdateDoctorprofile';
import Adddoctorfee from './Adddoctorfee';
import Manageconsulation from './Manageconsulation';
import Myhospital from './Myhospital';
import Updatehospitaldetails from './Updatehospitaldetails';
import Contact from './Contact';
import Alltransation from './Alltransation';
import splash from './splash'
import Login from './Login';
import HospitalSpeciality from './HospitalSpeciality'
import AddSpecialities from './AddSpecialities'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
	return (
		<Router>
			<div className="App">
				<Nav />
				<Switch>
					<Route path="/" exact component={Login} />
					<Route path="/adddepartment" component={Adddepartment} />
					<Route path="/Alldepartment" component={Alldepartment} />
					<Route path="/Detaildepartment/:id" component={Detaildepartment} />
					<Route path="/Dashboard" component={Dashboard} />
					<Route path="/Editdepartment/:id" component={Editdepartment} />
					<Route path="/Adddoctor" component={Adddoctor} />
					<Route path="/Doctorlist" component={Doctorlist} />
					<Route path="/Doctorprofile/:id" component={Doctorprofile} />
					<Route path="/Updateprofile/:id" component={Updateprofile} />
					<Route path="/Adddoctorfee/:id" component={Adddoctorfee} />
					<Route path="/Manageconsulation/:id" component={Manageconsulation} />
					<Route path="/Myhospital" component={Myhospital} />
					<Route path="/Updatehospitaldetails" component={Updatehospitaldetails} />
					<Route path="/Contact" component={Contact} />
					<Route path="/Alltransation" component={Alltransation} />
					<Route path="/splash" component={splash} />
					<Route path="/Login" component={Login} />
					<Route path="/HospitalSpeciality" component={HospitalSpeciality} />
					<Route path="/AddSpecialities" component={AddSpecialities} />
				</Switch>

			</div>
			<Footer />
		</Router>
	);
}


export default App;
