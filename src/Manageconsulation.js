import React from "react";
import "./dashboard/dashboard.css";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import "rc-time-picker/assets/index.css";
//import TimePicker from "react-time-picker";
import TimePicker from "rc-time-picker";
import moment from "moment-timezone";

const now = moment().hour(0).minute(0);

const format = "h:mm a";

class Manageconsulation extends React.Component {
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
      d_id: this.props.match.params.id,
      startTime: 0,
      endTime: 0,
      dayfrom: -1,
      dayto: -1,
      days: [],
      duration: 0,
      submitted: false,
    };
  }
  componentDidMount = () => {
    console.log(`This is Doctor ID ${this.props.match.params.id}`);
    // this.getDoctor();
  };

  //   getDoctor = () => {
  //     //  axios.get('/v1/admin/hospitals/'+`?hospitalcode=${this.props.match.params.id}&doctorName=Sanjeev`,
  //     axios
  //       .get(
  //         `http://localhost:4300/v1/hospital/doctors/` +
  //           this.props.match.params.id,
  //         {
  //           headers: {
  //             Authorization: localStorage.getItem("token"),
  //           },
  //         }
  //       )
  //       .then((response) => {
  //         console.log(response);
  //         const data = response.data.data;
  //         this.setState({ post: data });
  //         console.log("Data has been received!!");
  //       })
  //       .catch(() => {
  //         alert("Error retrieving data!!");
  //       });
  //   };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  onChange = (value) => {
    if (value) {
      console.log(value.hours(), value.minutes());
      let startTime = this.HHmmTimestampFromString(
        value.hours(),
        value.minutes()
      );
      console.log(startTime);
      this.setState({
        startTime: startTime,
      });
    }

    //setStarttime(HHmmTimestampFromString(date.getHours(), date.getMinutes()));
    //console.log(value && value.format(format));
    // this.setState({
    //   startTime: e.target.value,
    // });
  };
  EndTimeChange = (value) => {
    if (value) {
      console.log(value.hours(), value.minutes());
      let EndTime = this.HHmmTimestampFromString(
        value.hours(),
        value.minutes()
      );
      console.log(EndTime);
      if (EndTime > this.state.startTime) {
        this.setState({
          endTime: EndTime,
        });
      } else {
        alert("End time should be after start time");
      }
    }
  };

  handleDayfrom = (e) => {
    this.setState({
      dayfrom: e.target.value,
    });
  };

  handleDayto = (e) => {
    this.setState({
      dayto: e.target.value,
    });
  };
  handleDuration = (e) => {
    this.setState({
      duration: e.target.value,
    });
  };

  updateDetails = (event) => {
    event.preventDefault();
    const {
      dayfrom,
      dayto,
      startTime,
      endTime,
      duration,
      days,
      d_id,
    } = this.state;
    if (dayfrom < 0) {
      alert("Select Days from");
      return;
    }
    if (dayto < 0) {
      alert("Select Days To");
      return;
    }
    if (dayfrom > dayto) {
      alert(`Select dayto after dayfrom`);
      return;
    }
    if (startTime <= 0) {
      alert("Select Start Time");
      return;
    }
    if (endTime <= 0) {
      alert("Select End Time");
      return;
    }
    if (Number(duration) <= 0) {
      alert("Select Slot Duration");
      return;
    }

    let durationValue = this.HHmmTimestampFromString(0, duration);
    let startIndex = dayfrom;
    let daysArray = [];
    while (startIndex <= dayto) {
      daysArray.push(startIndex);
      startIndex++;
    }
    let payload = {
      startTime,
      endTime,
      duration: durationValue,
      days: daysArray,
    };

    console.log(payload, d_id);

    fetch(`http://localhost:4300/v1/hospital/doctors/${d_id}/slots`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code === 200) {
          console.log("Slot has been Created Successfully");
          alert(data.message);
        } else {
          alert(`Error:${data.code} Message: ${data.message}`);
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Something went wrong");
      });
  };

  // handleStartTimeConfirm = (date) => {
  // 	setStarttime(HHmmTimestampFromString(date.getHours(), date.getMinutes()));
  // 	// console.log("A date has been picked: ", date.getHours());
  // 	setStartPickerPickerVisible(false);
  // };
  // handleendTimeConfirm = (date) => {
  // 	let endtimevalue = HHmmTimestampFromString(
  // 		date.getHours(),
  // 		date.getMinutes()
  // 	);
  // 	if (endtimevalue > startTime) {
  // 		setEndtime(endtimevalue);
  // 	} else {
  // 		alert("End time shloud be after start time");
  // 	}
  // 	setEndPickerPickerVisible(false);
  // };
  HHmmTimestampFromString = (hours, minutes) => {
    var returnValue = hours * 60 * 60 * 1000;
    if (minutes > 0) {
      returnValue = returnValue + minutes * 60 * 1000;
    }
    return returnValue;
  };
  // StringFromTime = (timevalue) => {
  // 	if (timevalue <= 0) {
  // 		return "";
  // 	}
  // 	time = Number(timevalue) / 60000;
  // 	let sdate = new Date();
  // 	sdate.setHours(Math.floor(time / 60));
  // 	sdate.setMinutes(time % 60);
  // 	var returnValue = moment(sdate.getTime(), "x").format("hh:mm A");
  // 	// DeviceInfo.is24Hour() ? "HH:mm" : "hh:mm A"

  // 	return returnValue;
  // };
  render() {
    const { dayfrom, dayto, startTime, endTime, duration, days } = this.state;
    return (
      <div className="adddept">
        <div className="backarrow">
          {" "}
          <Link to="/Doctorlist">
            <i className="fas fa-arrow-left"></i>
          </Link>
        </div>
        <h2>Manage Consultation</h2>
        <form onSubmit={this.updateDetails}>
          <div className="row">
            <select onChange={this.handleDayfrom}>
              <option>Day From</option>
              <option value={0}>Sunday</option>
              <option value={1}>Monday</option>
              <option value={2}>Tuesday</option>
              <option value={3}>Wednesday</option>
              <option value={4}>Thursday</option>
              <option value={5}>Friday</option>
              <option value={6}>Saturday</option>
            </select>
          </div>
          <div className="row">
            <select onChange={this.handleDayto}>
              <option>Day To</option>
              <option value={0}>Sunday</option>
              <option value={1}>Monday</option>
              <option value={2}>Tuesday</option>
              <option value={3}>Wednesday</option>
              <option value={4}>Thursday</option>
              <option value={5}>Friday</option>
              <option value={6}>Saturday</option>
            </select>
          </div>
          <div className="row">
            <div className="timerow">
              <h5>Start Time </h5>
              <TimePicker
                showSecond={false}
                defaultValue={now}
                className="xxx"
                onChange={this.onChange}
                format={format}
                use12Hours
                inputReadOnly
              />
              <h5>End Time </h5>
              <TimePicker
                showSecond={false}
                defaultValue={now}
                className="xxx"
                onChange={this.EndTimeChange}
                format={format}
                use12Hours
                inputReadOnly
              />
            </div>

            {/* <select>
              <option>Start Time</option>
              <option>09:00 AM</option>
              <option>10:00 AM</option>
              <option>11:00 AM</option>
              <option>12:00 PM</option>
              <option>01:00 PM</option>
              <option>02:00 PM</option>
              <option>03:00 PM</option>
              <option>04:00 PM</option>
            </select> */}
          </div>
          {/* <div className="row">
            <select>
              <option>End Time</option>
              <option>10:00 AM</option>
              <option>11:00 AM</option>
              <option>12:00 PM</option>
              <option>01:00 PM</option>
              <option>02:00 PM</option>
              <option>03:00 PM</option>
              <option>04:00 PM</option>
              <option>05:00 PM</option>
              <option>06:00 PM</option>
            </select>
          </div> */}
          <div className="row">
            <select onChange={this.handleDuration}>
              <option>Slot Duration</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
            </select>
          </div>

          <div>
            {/* <p>{this.state.startTime}</p> */}
            {/* <TimePicker
              onChange={this.handleStartTime}
              value={this.state.startTime}
            /> */}
          </div>

          <div>
            {/* <p>{this.state.endTime}</p> */}
            {/* <TimePicker
              onChange={this.handleENdTime}
              value={this.state.endTime}
            /> */}
          </div>

          <div className="btncontainer">
            <button type="submit">
              <i className="fas fa-save"></i> Save
            </button>
            <button>
              <i className="far fa-window-close"></i>Cancel
            </button>
          </div>
        </form>
        {/* {dayfrom}, {dayto}, {startTime}, {endTime}, {duration}, {days} */}
      </div>
    );
  }
}
export default Manageconsulation;
