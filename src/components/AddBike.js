import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Container, Nav, Navbar } from "react-bootstrap";
import mystore from './store';

function AddBike() {

    let navigate = useNavigate();
    
    const [modelname, setModelName] = useState("");
    const [color , setColor]    = useState("")
    const [image , setImage]    = useState("")
    const [companyId, setCompid] = useState("");
    const [price, setXswprice] = useState("");
    const [vehicleCategory, setCatid] = useState("");
    const [engCapacity, setEngCapacity] = useState("");
    const [mileage, setMileage] = useState("");
    const [fuelCapacity, setFuelcap] = useState("");
    const [emissionStandard, setEmissionStandard] = useState("");
   // const [brakesys, setBrakesys] = useState("");
    const [torque, setTorque] = useState("");
    const [brakeType, setBrakeType] = useState("");
    const [rearBrakeType, setRearBrakeType] = useState("");
    const [colors, setColors] = useState([]);
    const [killswitch, setKillSwitch] = useState("");
    const [power, setPower] = useState("");
   // const [warranty, setWarranty] = useState("");
    // const [kerbweight, setKerbweight] = useState("");
    // const [seatheight, setSeatheight] = useState("");
    const [aboutBike, setAboutBike] = useState("");

    const logoutUser = () => {
        mystore.dispatch({ type: 'LOGGEDOUT' });
        console.log("Loggedin: " + mystore.getState().loggedin);
        localStorage.removeItem("loggedinuser");
        localStorage.removeItem("swlist");
        localStorage.removeItem("allusrinfo");  
        sessionStorage.removeItem("allbook");
        localStorage.setItem("logState", false);
        navigate("/");
    }

    const getColor=()=>{
        const reqOptions={
            method:'POST',
            Headers: {
                'Content-Type': 'application/json'
            }
        }
        fetch("http://localhost:8081/getColor",reqOptions)
        .then(resp=>resp.json())
        .then(obj=>{
            setColors(JSON.parse(JSON.stringify(obj)));
        })
    }

    const submitForm = (ev) => {
        ev.preventDefault();
        const reqOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                modelName: modelname,
                companyId: companyId,
                price: price,
                vehicleCategory: vehicleCategory,
                engCapacity: engCapacity,
                mileage: mileage,
                fuelCapacity: fuelCapacity,
                emissionStandard: emissionStandard,
               // brakesys: brakesys,
                torque: torque,
                brakeType: brakeType,
               // rearBrakeType: rearBrakeType,
               // cylinder: cylinder,
               // killSwitch: killswitch,
                power: power,
                color:color,
                image:image
               // warranty: warranty,
               // kerbweight: kerbweight,
               // seatheight: seatheight,
               // aboutBike: aboutBike
            })
        }
        fetch("http://localhost:8081/admin/addBike", reqOptions)
            .then(resp => resp.json())
            .then(obj => {
                if(obj) {
                    alert("Vehicle added Successfully..");
                    navigate("/AdminHome");
                } else {
                    alert("Error occured!! Try Again after some time.");
                }
            });
    }

    const Cancel = () => {
        navigate("/AdminHome");
    }

    return (
        <div className="container-fluid">
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/AdminHome">BikeLeLo</Navbar.Brand>
                    <span style={{ margin: '20px' }}></span>
                    <Nav>
                        <Nav.Link href="/AdminHome">Home</Nav.Link>
                        <span style={{ margin: '3px' }}></span>
                        <Nav.Link href="/ShowroomRegister">Register Showroom</Nav.Link>
                        <span style={{ margin: '3px' }}></span>
                        <Nav.Link href="/DeleteShowroom">Delete Showroom</Nav.Link>
                        <span style={{ margin: '3px' }}></span>
                        <Nav.Link href="/DeleteCustomer">Delete User</Nav.Link>
                        <span style={{ margin: '3px' }}></span>
                        <Nav.Link href="/reportGenerate">Generate Reports</Nav.Link>
                        {/*<span style={{ margin: '3px' }}></span>
                        <Nav.Link href="/AdminRegister">Register Admin</Nav.Link>*/}
                        <span style={{ margin: '3px' }}></span>
                        <Nav.Link href="/AddBike">Add Bike</Nav.Link>
                        <span style={{ margin: '3px' }}></span>
                        <Nav.Link href="" onClick={logoutUser}>Logout</Nav.Link>
                    </Nav>
                </Container>
            </Navbar><br />
            <div style={{ backgroundColor: 'white', width: '70%', height: '50%', marginTop: '3%', marginLeft: '15%', marginRight: '15%', opacity: 0.8 }}>
                <div className="col-md-12 login-sec">
                    <form><br />
                        <h3 className="text-center">Add Bike: </h3>
                        <div className="form-group">
                            <label>Model Name</label>
                            <input type="text" name="modelName" required className="form-control" placeholder='Enter Model Name' onChange={(ev) => setModelName(ev.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Brand/Company<span style={{ margin: '8px' }}></span></label>
                            <select name="companyid" required onChange={(ev) => setCompid(ev.target.value)}>
                                <option value="">Select Brand</option>
                                <option value="1">Honda</option>
                                <option value="2">Suzuki</option>
                                <option value="3">KTM</option>
                                <option value="4">Hero</option>
                                <option value="5">Royal Enfield</option>
                                <option value="6">BMW</option>
                                <option value="7">TVS</option>
                                <option value="8">Ducati</option>
                                <option value="9">Yamaha</option>
                                <option value="10">Ola</option>
                                <option value="11">Bajaj</option>
                                <option value="12">Aprilla</option>
                                <option value="13">Revolt</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Ex-Showroom Price</label>
                            <input type="number" name="price" required className="form-control" placeholder='Enter Ex-Showroom Price' onChange={(ev) => setXswprice(ev.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Image</label>
                            <input type="text" name="image" required className="form-control" placeholder='Enter image url' onChange={(ev) => setImage(ev.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Category<span style={{ margin: '8px' }}></span></label>
                            <select name="catid" required onChange={(ev) => setCatid(ev.target.value)}>
                                <option value="">Select Category</option>
                                <option value="1">With Gear</option>
                                <option value="2">Without Gear</option>
                                <option value="3">Electric</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Engine Capacity</label>
                            <input type="text" name="engCapacity" required className="form-control" placeholder='Enter Engine Capacity' onChange={(ev) => setEngCapacity(ev.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Mileage</label>
                            <input type="text" name="mileage" required className="form-control" placeholder='Enter Bike Mileage' onChange={(ev) => setMileage(ev.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Fuel Capacity</label>
                            <input type="text" name="fuelCapacity" required className="form-control" placeholder="Enter Fuel Capacity" onChange={(ev) => setFuelcap(ev.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Emission Standard<span style={{ margin: '8px' }}></span></label>
                            <select name="emissionStandard" required onChange={(ev) => setEmissionStandard(ev.target.value)}>
                                <option value="">Select Emission Standard</option>
                                <option value="BS4">BS4</option>
                                <option value="BS5">BS5</option>
                                <option value="BS6">BS6</option>
                            </select>
                        </div>
                        {/* <div className="form-group">
                            <label>Brake System</label>
                            <input type="text" name="brakesys" required className="form-control" placeholder="Enter Brake System" onChange={(ev) => setBrakesys(ev.target.value)} />
                        </div> */}
                        <div className="form-group">
                            <label>Torque</label>
                            <input type="text" name="torque" required className="form-control" placeholder="Enter Torque" onChange={(ev) => setTorque(ev.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Front Brake Type<span style={{ margin: '8px' }}></span></label>
                            <select name="brakeType" required onChange={(ev) => setBrakeType(ev.target.value)}>
                                <option value="">Select  Brake Type</option>
                                <option value="Drum">Drum</option>
                                <option value="Disc">Disc</option>
                            </select></div>
                        {/* <div className="form-group">
                            <label>Rear Brake Type<span style={{ margin: '8px' }}></span></label>
                            <select name="rearBrakeType" required onChange={(ev) => setRearBrakeType(ev.target.value)}>
                                <option value="">Select Rear Brake Type</option>
                                <option value="Drum">Drum</option>
                                <option value="Disc">Disc</option>
                            </select></div> */}
                        {/* <div className="form-group">
                            <label>Number of Cylinders</label>
                            <input type="number" name="cylinder" required className="form-control" placeholder="Enter Number of Cylinders" onChange={(ev) => setCylinder(ev.target.value)} />
                        </div> */}
                        {/* <div className="form-group">
                            <label>Kill-Switch<span style={{ margin: '8px' }}></span></label>
                            <select name="killSwitch" required onChange={(ev) => setKillSwitch(ev.target.value)}>
                                <option value="">Select  </option>
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </select>
                        </div> */}
                        <div className="form-group">
                            <label>Power</label>
                            <input type="text" name="power" required className="form-control" placeholder="Enter Power" onChange={(ev) => setPower(ev.target.value)} />
                        </div>
                        <div className='col'>
                                        <div className="form-group">
                                            <label>Select Color<span style={{ margin: '8px' }}></span></label>
                                            <select name='color' required onClick={getColor} onChange={(ev) => setColor(ev.target.value)}>
                                                <option>Select Color</option>
                                                {
                                                    colors.map((color) => {
                                                        return (<option key={color.id} value={color.id}>{color.color}</option>)
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                        {/* <div className="form-group">
                            <label>Kerb Weight</label>
                            <input type="text" name="kerbweight" required className="form-control" placeholder="Enter KerbWeight" onChange={(ev) => setKerbweight(ev.target.value)} />
                        </div> */}
                        {/* <div className="form-group">
                            <label>Seat Height</label>
                            <input type="text" name="seatheight" required className="form-control" placeholder="Enter SeatHeight" onChange={(ev) => setSeatheight(ev.target.value)} />
                        </div> */}
                        {/* <div className="form-group">
                            <label>Warranty</label>
                            <input type="number" name="warranty" required className="form-control" placeholder=" Enter the Number of Years Warranty" onChange={(ev) => setWarranty(ev.target.value)} />
                        </div> */}
                        {/* <div className="form-group">
                            <label>About Bike</label>
                            <input type="text" name="aboutBike" required className="form-control" placeholder=" Enter Information About Bike" onChange={(ev) => setAboutBike(ev.target.value)} />
                        </div><br/> */}
                        <div className="btn-group" role="group" aria-label="Basic example">
                            <input type="submit" className="btn btn-primary btn-block" value="Submit" onClick={submitForm} />
                        </div><span style={{ margin: '10px' }}></span>
                        <div className="btn-group" role="group" aria-label="Basic example">
                            <button type="button" className="btn btn-primary btn-block" onClick={Cancel}>Cancel</button>
                        </div>
                        <br /><br />
                    </form>
                </div>
            </div><br /><br /><br />
        </div>
    );
}

export default AddBike;