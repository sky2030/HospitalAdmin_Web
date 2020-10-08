import React from 'react';
//import ReactDOM from 'react-dom';
import './dashboard/dashboard.css';
import { Link } from 'react-router-dom';
//import {Redirect } from 'react-router-dom';
import Transationcard from './Transationcard';
//import axios from 'axios'

class Alltransation extends React.Component {
	render() {
		return (

			<div className="alldept pb15">
				<div className="backarrow"> <Link to='/Dashboard'><i className="fas fa-arrow-left"></i></Link></div>
				<h2>All Transation</h2>
				<div className="maintrans">
					<h3>25 JUNE 2020</h3>
					<div className="alltransation">
						<div>
							<p><b>Invoice No</b></p>
							<p>#INVR5RK6SOYH2</p>
						</div>
						<div>
							<p><b>Patient</b></p>
							<p>Avneet Dixit</p>
						</div>
						<div>
							<p><b>Amount</b></p>
							<p>Rs.1200/-</p>
						</div>
					</div>
				</div>
				<Transationcard />
				<Transationcard />
				<Transationcard />
				<Transationcard />

			</div>

		)
	}
}
export default Alltransation;
