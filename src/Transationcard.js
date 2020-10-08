import React from 'react';
//import ReactDOM from 'react-dom';
import './dashboard/dashboard.css';

class Transationcard extends React.Component{
    render(){
        return(
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
		  
		    )
       }
         }
         export default Transationcard;