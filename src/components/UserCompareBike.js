import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Nav, Navbar } from "react-bootstrap";
import mystore from './store';

function UserCompareBike() {
    let navigate = useNavigate();

    const [first, setFirst] = useState([]);
    const [second, setSecond] = useState([]);
    const [fbike, setFbike] = useState(sessionStorage.getItem("Fbike"));
    const [sbike, setSbike] = useState(sessionStorage.getItem("Sbike"));
   // const [colors1, setColors1] = useState([]);
    const [showrooms1, setShowrooms1] = useState([]);
    const [oprice1, setOprice1] = useState("");
   // const [colors2, setColors2] = useState([]);
    const [showrooms2, setShowrooms2] = useState([]);
    const [oprice2, setOprice2] = useState("");

    const saveinfo1 = () => {
        debugger;
        sessionStorage.setItem("bike", fbike);
        //sessionStorage.setItem("Scolor", JSON.parse(sessionStorage.getItem("Fbike")).color);
        sessionStorage.setItem("price", JSON.stringify(oprice1));
        sessionStorage.setItem("Sshowroom", sessionStorage.getItem("Sshowroom1"));
        sessionStorage.removeItem("showrooms1");
        sessionStorage.removeItem("vmbike");
        sessionStorage.removeItem("colors1");
        sessionStorage.removeItem("blist");
        console.log((JSON.parse(localStorage.getItem("loggedinuser"))).role);

        if ((JSON.parse(localStorage.getItem("logState")))) {
            if ((JSON.parse(localStorage.getItem("loggedinuser"))).role === "ROLE_USER") {
                BookingBike();
            }
        } else {
            alert("Please Login to book vehicle");
            navigate("/login");
        }
    }

    const saveinfo2 = () => {
        sessionStorage.setItem("bike", sbike);
        //sessionStorage.setItem("Scolor", JSON.parse(sessionStorage.getItem("Sbike").color));
        sessionStorage.setItem("price", JSON.stringify(oprice2));
        sessionStorage.setItem("Sshowroom",sessionStorage.getItem("Sshowroom2"));
        sessionStorage.removeItem("showrooms2");
        sessionStorage.removeItem("vmbike");
        sessionStorage.removeItem("colors2");
        sessionStorage.removeItem("blist");
       
        if ((JSON.parse(localStorage.getItem("logState")))) {
            if ((JSON.parse(localStorage.getItem("loggedinuser"))).role === "ROLE_USER") {
                BookingBike();
            }
        } else {
            alert("Please Login to book vehicle");
            navigate("/login");
        }
    }

    const BookingBike = () => {
        const newDate = new Date();
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        let separator = '-';
        debugger;
        const curdate = `${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${date < 10 ? `0${date}` : `${date}`}`;
        console.log(curdate);
        const reqOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                uid: JSON.parse(localStorage.getItem("loggedinuser")),
                vehicleid:JSON.parse(sessionStorage.getItem("bike")),
                swid: JSON.parse(sessionStorage.getItem("Sshowroom")),
                dbook: curdate,
                status: "Booked",
                cvid: JSON.parse((sessionStorage.getItem("bike"))).color,
                trid: {amt: (JSON.parse(sessionStorage.getItem("bike")).price)*0.118}
            })
        }
        fetch("http://localhost:8081/user/savebikebook", reqOptions)
            .then(resp => resp.json())
            .then(obj => {
                console.log(obj);
                alert("Bike Booked Sucessfully.!");
                sessionStorage.removeItem("Fbike");
                sessionStorage.removeItem("Sbike");
                sessionStorage.removeItem("colors1");
                sessionStorage.removeItem("bikelist");
                sessionStorage.removeItem("colors2");
                sessionStorage.removeItem("tax1");
                sessionStorage.removeItem("showrooms1");
                sessionStorage.removeItem("tax");
                sessionStorage.removeItem("showrooms2");
                sessionStorage.removeItem("Sshowroom");
                sessionStorage.removeItem("Scolor2");
                sessionStorage.removeItem("Scolor");
                sessionStorage.removeItem("Sprice");
                sessionStorage.removeItem("blist");
                sessionStorage.removeItem("uallbookings");
                navigate("/Viewbookings");
            })
            .catch(() => {
                alert("Try Again!!!");
                <h1>Try Again!!!</h1>
            });
    }

    

    const getSws1 = (value) => {
        const reqOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                city: {id: value},
                companyId: JSON.parse(fbike).companyId
            })
        }
        fetch("http://localhost:8081/fetchShowroomForCity", reqOptions)
            .then(resp => resp.json())
            .then(obj => {
                console.log(obj);
                sessionStorage.setItem("showrooms1", JSON.stringify(obj));
                setShowrooms1(JSON.parse(sessionStorage.getItem("showrooms1")));
            })
    }

    const setSwroom1 = (value) => {
        //console.log(value);
        showrooms1.forEach(e => {
            if (e.id == value) {
                console.log(e);
                sessionStorage.setItem("Sshowroom1", JSON.stringify(e));
            }
        });
    }

    // const setColor1 = (value) => {
    //     console.log(value);
    //     colors1.forEach(e => {
    //         if (e.colorid.colorid == value) {
    //             console.log(e);
    //             sessionStorage.setItem("Scolor", JSON.stringify(e));
    //         }
    //     });
    // }

    // const getTax2 = (value) => {
    //     const reqOptions = {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             cityid: value
    //         })
    //     }
    //     fetch("http://localhost:8081/gettax", reqOptions)
    //         .then(resp => resp.json())
    //         .then(obj => {
    //             console.log(obj);
    //             sessionStorage.setItem("tax", JSON.stringify(obj));
    //             calculatePrice2(obj);
    //         })
    //         .catch(() => {
    //             alert("Error!! Try Again");
    //         });
    // }

    const calculatePrice2 = () => {
        let xprice = (JSON.parse(sessionStorage.getItem("Sbike"))).vehicleid.xswprice;
        let tax = (JSON.parse(sessionStorage.getItem("tax")));
        var oprice = xprice + (xprice * (tax / 100));
        setOprice2(oprice);
    }

    const getSws2 = (value) => {
        const reqOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                city:{id: value} ,
                companyId: JSON.parse(sbike).companyId
            })
        }
        fetch("http://localhost:8081/fetchShowroomForCity", reqOptions)
            .then(resp => resp.json())
            .then(obj => {
                console.log(obj);
                sessionStorage.setItem("showrooms2", JSON.stringify(obj));
                setShowrooms2(JSON.parse(sessionStorage.getItem("showrooms2")));
            })
            .catch(() => {
                alert("Error!! Try Again");
            });
    }

    const setSwroom2 = (value) => {
        console.log(value);
        showrooms2.forEach(e => {
            if (e.id == value) {
                console.log(e);
                sessionStorage.setItem("Sshowroom2", JSON.stringify(e));
            }
        });
    }

    // const setColor2 = (value) => {
    //     console.log(value);
    //     colors2.forEach(e => {
    //         if (e.colorid.colorid == value) {
    //             console.log(e);
    //             sessionStorage.setItem("Scolor", JSON.stringify(e));
    //         }
    //     });
    // }

    const Cancel = () => {
        sessionStorage.removeItem("Fbike");
        sessionStorage.removeItem("Sbike");
        sessionStorage.removeItem("colors1");
        sessionStorage.removeItem("bikelist");
        sessionStorage.removeItem("colors2");
        sessionStorage.removeItem("tax1");
        sessionStorage.removeItem("showrooms1");
        sessionStorage.removeItem("tax");
        sessionStorage.removeItem("showrooms2");
        sessionStorage.removeItem("Sshowroom1");
        sessionStorage.removeItem("Scolor2");
        sessionStorage.removeItem("Scolor1");
        sessionStorage.removeItem("Sprice");
        sessionStorage.removeItem("blist");
        sessionStorage.removeItem("uallbookings");
        setFbike(JSON.parse(JSON.stringify(sessionStorage.getItem("Fbike"))));
        setSbike(JSON.parse(JSON.stringify(sessionStorage.getItem("Sbike"))));
        navigate("/UserHome");
    }

    const setBike = (value) => {
        console.log(value);
        first.forEach(e => {
            if (e.id == value) {
                sessionStorage.setItem("Fbike", JSON.stringify(e));
                sessionStorage.removeItem("bikelist");
                setFbike(JSON.parse(JSON.stringify(sessionStorage.getItem("Fbike"))));
            }
        });
    }

    const setsBike = (value) => {
        console.log(value);
        second.forEach(e => {
            if (e.id == value) {
                sessionStorage.setItem("Sbike", JSON.stringify(e));
                sessionStorage.removeItem("secbikelist");
                setSbike(JSON.parse(JSON.stringify(sessionStorage.getItem("Sbike"))));
            }
        });
    }

    const fetchall = () => {
        const reqOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        fetch("http://localhost:8081/fetchAllBikes", reqOptions)
            .then(resp => resp.json())
            .then(obj => {
                //console.log(obj);
                sessionStorage.setItem("bikelist", JSON.stringify(obj));
                setFirst(JSON.parse(sessionStorage.getItem("bikelist")));
                setSecond(JSON.parse(sessionStorage.getItem("bikelist")));
            })
            .catch(() => {
                alert("Error!! Try Again");
            });
    }

    const fetcha = (value) => {
        const reqOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                specsid: value
            })
        }
        fetch("http://localhost:8081/fetchAllBikes", reqOptions)
            .then(resp => resp.json())
            .then(obj => {
                //console.log(obj);
                sessionStorage.setItem("secbikelist", JSON.stringify(obj));
                //setSecond(JSON.parse(sessionStorage.getItem("secbikelist")));
            })
            .catch(() => {
                alert("Error!! Try Again");
            });
    }

    const logoutUser = () => {
        sessionStorage.removeItem("Fbike");
        sessionStorage.removeItem("Sbike");
        sessionStorage.removeItem("colors1");
        sessionStorage.removeItem("bikelist");
        sessionStorage.removeItem("colors2");
        sessionStorage.removeItem("tax1");
        sessionStorage.removeItem("showrooms1");
        sessionStorage.removeItem("tax");
        sessionStorage.removeItem("showrooms2");
        sessionStorage.removeItem("Sshowroom1");
        sessionStorage.removeItem("Scolor2");
        sessionStorage.removeItem("Scolor1");
        sessionStorage.removeItem("Sprice");
        sessionStorage.removeItem("blist");
        sessionStorage.removeItem("ucanbookings");
        sessionStorage.removeItem("uallbookings");
        sessionStorage.removeItem("uactbookings");
        localStorage.removeItem("allblist");
        mystore.dispatch({ type: 'LOGGEDOUT' });
        console.log("Loggedin: " + mystore.getState().loggedin);
        localStorage.removeItem("loggedinuser");
        localStorage.setItem("logState", false);
        navigate("/");
    }

    if (fbike === null || sbike === null) {
        return (
            <div className="container-fluid">
                <Navbar bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand href="/UserHome">BikeLeLo</Navbar.Brand>
                        <span style={{ margin: '20px' }}></span>
                        <Nav>
                            <Nav.Link href="/UserHome" >Home</Nav.Link>
                            <span style={{ margin: '3px' }}></span>
                            <Nav.Link href="/UserUpdate">Update Profile</Nav.Link>
                            <span style={{ margin: '3px' }}></span>
                            <Nav.Link href="/UserSearchBike">Search Bike</Nav.Link>
                            <span style={{ margin: '3px' }}></span>
                            <Nav.Link href="/usercomparebike">Compare Bike</Nav.Link>
                            <span style={{ margin: '3px' }}></span>
                            <Nav.Link href="/Viewbookings">View Bookings</Nav.Link>
                            <span style={{ margin: '3px' }}></span>
                            <Nav.Link href="" onClick={logoutUser}>Logout</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar><br />
                <div style={{ backgroundColor: 'white', width: '90%', height: '100%', marginTop: '3%', marginLeft: '5%', marginRight: '8%', opacity: 0.8 }}>
                    <div className="col-md-12 login-sec"><br />
                        <h4 className='text-center'>Compare Bikes</h4><br />
                        <div className='row'>
                            <div className='col'>
                                <div className="text-center">
                                    <label>Select Vehicle <span style={{ margin: '15px' }}></span></label>
                                    <select name='vehicles' required onClick={fetchall} onChange={(ev) => fetcha(ev.target.value)} onChangeCapture={(ev) => { setBike(ev.target.value);  }} >
                                        <option>Select Vehicle</option>
                                        {
                                            first.map((vehicles) => {
                                                return (<option key={vehicles.id} value={vehicles.id}> {vehicles.modelName}</option>)
                                            })
                                        }
                                    </select>
                                </div><br />
                            </div>
                            <div className='col'>
                                <div className="text-center">
                                    <label>Select Vehicle <span style={{ margin: '15px' }}></span></label>
                                    <select name='vehicles' required onChangeCapture={(ev) => { setsBike(ev.target.value);  }}>
                                        <option>Select Vehicle</option>
                                        {
                                            second.map((vehicles) => {
                                                return (<option key={vehicles.id} value={vehicles.id}> {vehicles.modelName}</option>)
                                            })
                                        }
                                    </select>
                                </div><br />
                            </div>
                        </div>
                    </div>
                </div><br /><br /><br />
            </div>
        )
    } else {
        return (
            <div className="container-fluid">
                <Navbar bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand href="/UserHome">BikeLeLo</Navbar.Brand>
                        <span style={{ margin: '20px' }}></span>
                        <Nav>
                            <Nav.Link href="/UserHome" >Home</Nav.Link>
                            <span style={{ margin: '3px' }}></span>
                            <Nav.Link href="/UserUpdate">Update Profile</Nav.Link>
                            <span style={{ margin: '3px' }}></span>
                            <Nav.Link href="/UserSearchBike">Search Bike</Nav.Link>
                            <span style={{ margin: '3px' }}></span>
                            <Nav.Link href="/usercomparebike">Compare Bike</Nav.Link>
                            <span style={{ margin: '3px' }}></span>
                            <Nav.Link href="/Viewbookings">View Bookings</Nav.Link>
                            <span style={{ margin: '3px' }}></span>
                            <Nav.Link href="" onClick={logoutUser}>Logout</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar><br />
                <div style={{ backgroundColor: 'white', width: '90%', height: '100%', marginTop: '3%', marginLeft: '5%', marginRight: '8%', opacity: 0.8 }}>
                    <div className="col-md-16 login-sec"><br />
                        <h4 className='text-center'>Compare Bikes</h4><br />

                        <div className='row'>
                        <div className='col'>
                                <div className="form-group">
                                    <label><span style={{ margin: '25px' }}></span>Image:</label>
                                </div>
                            </div>
                                <div className='col'>
                                    <div className="form-group" >
                                        {/* <span style={{ margin: '10px' }}></span> */}
                                        <img src={JSON.parse(fbike).image} alt={JSON.parse(fbike).modelName} width="50%" height="50%" /><br />
                                    </div>
                                </div>
                                <div className='col'>
                                    <div className="form-group" >
                                        {/* <span style={{ margin: '10px' }}></span> */}
                                        <img src={JSON.parse(sbike).image} alt={JSON.parse(sbike).modelName} width="50%" height="50%" /><br />
                                    </div>
                                </div>
                        </div>

                        <div className='row'>
                            <div className='col'>
                                <div className="form-group">
                                    <label><span style={{ margin: '25px' }}></span>Model Name:</label>
                                </div>
                            </div>
                            <div className='col'>
                                <div className="form-group">
                                    {JSON.parse(fbike).modelName}
                                </div>
                            </div>
                            <div className='col'>
                                <div className="form-group">
                                    {JSON.parse(sbike).modelName}
                                </div>
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col'>
                                <div className="form-group">
                                    <label><span style={{ margin: '25px' }}></span>Company Name:</label>
                                </div>
                            </div>
                            <div className='col'>
                                <div className="form-group">
                                    {JSON.parse(fbike).companyId.name}
                                </div>
                            </div>
                            <div className='col'>
                                <div className="form-group">
                                    {JSON.parse(sbike).companyId.name}
                                </div>
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col'>
                                <div className="form-group">
                                    <label><span style={{ margin: '25px' }}></span>Category:</label>
                                </div>
                            </div>
                            <div className='col'>
                                <div className="form-group">
                                    {JSON.parse(fbike).vehicleCategory.catName}
                                </div>
                            </div>
                            <div className='col'>
                                <div className="form-group">
                                    {JSON.parse(sbike).vehicleCategory.catName}
                                </div>
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col'>
                                <div className="form-group">
                                    <label><span style={{ margin: '25px' }}></span>Engine Capacity:</label>
                                </div>
                            </div>
                            <div className='col'>
                                <div className="form-group">
                                    {JSON.parse(fbike).engCapacity}
                                </div>
                            </div>
                            <div className='col'>
                                <div className="form-group">
                                    {JSON.parse(sbike).engCapacity}
                                </div>
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col'>
                                <div className="form-group">
                                    <label><span style={{ margin: '25px' }}></span>Fuel Capacity:</label>
                                </div>
                            </div>
                            <div className='col'>
                                <div className="form-group">
                                    {JSON.parse(fbike).fuelCapacity}
                                </div>
                            </div>
                            <div className='col'>
                                <div className="form-group">
                                    {JSON.parse(sbike).fuelCapacity}
                                </div>
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col'>
                                <div className="form-group">
                                    <label><span style={{ margin: '25px' }}></span>Mileage:</label>
                                </div>
                            </div>
                            <div className='col'>
                                <div className="form-group">
                                    {JSON.parse(sbike).mileage}
                                </div>
                            </div>
                            <div className='col'>
                                <div className="form-group">
                                    {JSON.parse(sbike).mileage}
                                </div>
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col'>
                                <div className="form-group">
                                    <label><span style={{ margin: '25px' }}></span>Power:</label>
                                </div>
                            </div>
                            <div className='col'>
                                <div className="form-group">
                                    {JSON.parse(fbike).power}
                                </div>
                            </div>
                            <div className='col'>
                                <div className="form-group">
                                    {JSON.parse(sbike).power}
                                </div>
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col'>
                                <div className="form-group">
                                    <label><span style={{ margin: '25px' }}></span>Brake System:</label>
                                </div>
                            </div>
                            <div className='col'>
                                <div className="form-group">
                                    {JSON.parse(fbike).brakeType}
                                </div>
                            </div>
                            <div className='col'>
                                <div className="form-group">
                                    {JSON.parse(sbike).brakeType}
                                </div>
                            </div>
                        </div>

                        {/* <div className='row'>
                            <div className='col'>
                                <div className="form-group">
                                    <label><span style={{ margin: '25px' }}></span>Front Brake Type:</label>
                                </div>
                            </div>
                            <div className='col'>
                                <div className="form-group">
                                    {JSON.parse(fbike).fbraketype}
                                </div>
                            </div>
                            <div className='col'>
                                <div className="form-group">
                                    {JSON.parse(sbike).fbraketype}
                                </div>
                            </div>
                        </div> */}

                        {/* <div className='row'>
                            <div className='col'>
                                <div className="form-group">
                                    <label><span style={{ margin: '25px' }}></span>Rear Brake Type:</label>
                                </div>
                            </div>
                            <div className='col'>
                                <div className="form-group">
                                    {JSON.parse(fbike).rbraketype}
                                </div>
                            </div>
                            <div className='col'>
                                <div className="form-group">
                                    {JSON.parse(sbike).rbraketype}
                                </div>
                            </div>
                        </div> */}

                        {/* <div className='row'>
                            <div className='col'>
                                <div className="form-group">
                                    <label><span style={{ margin: '25px' }}></span>No. of Cylinder/s:</label>
                                </div>
                            </div>
                            <div className='col'>
                                <div className="form-group">
                                    {JSON.parse(fbike).cylinder}
                                </div>
                            </div>
                            <div className='col'>
                                <div className="form-group">
                                    {JSON.parse(sbike).cylinder}
                                </div>
                            </div>
                        </div> */}

                        <div className='row'>
                            <div className='col'>
                                <div className="form-group">
                                    <label><span style={{ margin: '25px' }}></span>Emission Standard:</label>
                                </div>
                            </div>
                            <div className='col'>
                                <div className="form-group">
                                    {JSON.parse(fbike).emissionStandard}
                                </div>
                            </div>
                            <div className='col'>
                                <div className="form-group">
                                    {JSON.parse(sbike).emissionStandard}
                                </div>
                            </div>
                        </div>

                        {/* <div className='row'>
                            <div className='col'>
                                <div className="form-group">
                                    <label><span style={{ margin: '25px' }}></span>Kerb Weight:</label>
                                </div>
                            </div>
                            <div className='col'>
                                <div className="form-group">
                                    {JSON.parse(fbike).kerbweight}
                                </div>
                            </div>
                            <div className='col'>
                                <div className="form-group">
                                    {JSON.parse(sbike).kerbweight}
                                </div>
                            </div>
                        </div> */}

                        {/* <div className='row'>
                            <div className='col'>
                                <div className="form-group">
                                    <label><span style={{ margin: '25px' }}></span>Seat Height:</label>
                                </div>
                            </div>
                            <div className='col'>
                                <div className="form-group">
                                    {JSON.parse(sbike).seatheight}
                                </div>
                            </div>
                            <div className='col'>
                                <div className="form-group">
                                    {JSON.parse(sbike).seatheight}
                                </div>
                            </div>
                        </div> */}

                        <div className='row'>
                            <div className='col'>
                                <div className="form-group">
                                    <label><span style={{ margin: '25px' }}></span>Torque:</label>
                                </div>
                            </div>
                            <div className='col'>
                                <div className="form-group">
                                    {JSON.parse(fbike).torque}
                                </div>
                            </div>
                            <div className='col'>
                                <div className="form-group">
                                    {JSON.parse(sbike).torque}
                                </div>
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col'>
                                <div className="form-group">
                                    <label><span style={{ margin: '25px' }}></span>Color:</label>
                                </div>
                            </div>
                            <div className='col'>
                                <div className="form-group">
                                    {JSON.parse(fbike).color.color}
                                </div>
                            </div>
                            <div className='col'>
                                <div className="form-group">
                                    {JSON.parse(sbike).color.color}
                                </div>
                            </div>
                        </div>

                        {/* <div className='row'>
                            <div className='col'>
                                <div className="form-group">
                                    <label><span style={{ margin: '25px' }}></span>Warranty:</label>
                                </div>
                            </div>
                            <div className='col'>
                                <div className="form-group">
                                    {JSON.parse(sbike).warranty}
                                </div>
                            </div>
                            <div className='col'>
                                <div className="form-group">
                                    {JSON.parse(sbike).warranty}
                                </div>
                            </div>
                        </div> */}

                        {/* <div className='row'>
                            <div className='col'>
                                <div className="form-group">
                                    <label><span style={{ margin: '25px' }}></span>aboutBike:</label>
                                </div>
                            </div>
                            <div className='col'>
                                <div className="form-group">
                                    {JSON.parse(fbike).aboutBike}
                                </div>
                            </div>
                            <div className='col'>
                                <div className="form-group">
                                    {JSON.parse(sbike).aboutBike}
                                </div>
                            </div>
                        </div> */}

                        <div className='row'>
                            <div className='col'>
                                <div className="form-group">
                                    <label><span style={{ margin: '25px' }}></span>City:</label>
                                </div>
                            </div>
                            <div className='col'>
                                <div className="form-group">
                                    <label>Select City<span style={{ margin: '8px' }}></span></label>
                                    <select name="City" required onChange={(ev) => {  getSws1(ev.target.value) }}>
                                        <option >Select City</option>
                                        <option value="1">Pune</option>
                                        <option value="2">Mumbai</option>
                                        <option value="3">Nagpur</option>
                                        <option value="4">Satara</option>
                                        <option value="5">Ahmednagar</option>
                                        <option value="6">Kolhapur</option>
                                    </select>
                                </div>
                            </div>
                            <div className='col'>
                                <div className="form-group">
                                    <label>Select City<span style={{ margin: '8px' }}></span></label>
                                    <select name="City" required onChange={(ev) => {  getSws2(ev.target.value) }}>
                                        <option >Select City</option>
                                        <option value="1">Pune</option>
                                        <option value="2">Mumbai</option>
                                        <option value="3">Nagpur</option>
                                        <option value="4">Satara</option>
                                        <option value="5">Ahmednagar</option>
                                        <option value="6">Kolhapur</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col'>
                                <div className="form-group">
                                    <label><span style={{ margin: '25px' }}></span>Showroom:</label>
                                </div>
                            </div>
                            <div className='col'>
                                <div className="form-group">
                                    <label>Select Showroom<span style={{ margin: '8px' }}></span></label>
                                    <select name="swroom1" required onChange={(ev) => setSwroom1(ev.target.value)}>
                                        <option >Select Showroom</option>
                                        {
                                            showrooms1.map((showroom) => {
                                                return (<option key={showroom.id} value={showroom.id}>{showroom.name}</option>)
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className='col'>
                                <div className="form-group">
                                    <label>Select Showroom<span style={{ margin: '8px' }}></span></label>
                                    <select name="swroom2" required onChange={(ev) => setSwroom2(ev.target.value)}>
                                        <option >Select Showroom</option>
                                        {
                                            showrooms2.map((showroom) => {
                                                return (<option key={showroom.id} value={showroom.id}>{showroom.name}</option>)
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* <div className='row'>
                            <div className='col'>
                                <div className="form-group">
                                    <label><span style={{ margin: '25px' }}></span>Color:</label>
                                </div>
                            </div>
                            <div className='col'>
                                <div className="form-group">
                                    <label>Select Color<span style={{ margin: '8px' }}></span></label>
                                    <select name='color1' required onChange={(ev) => setColor1(ev.target.value)}>
                                        <option>Select Color</option>
                                        {
                                            colors1.map((color) => {
                                                return (<option value={color.colorid.colorid}>{color.colorid.colorname}</option>)
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className='col'>
                                <div className="form-group">
                                    <label>Select Color<span style={{ margin: '8px' }}></span></label>
                                    <select name='color2' required onChange={(ev) => setColor2(ev.target.value)}>
                                        <option>Select Color</option>
                                        {
                                            colors2.map((color) => {
                                                return (<option value={color.colorid.colorid}>{color.colorid.colorname}</option>)
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                        </div> */}

                        <div className='row'>
                            <div className='col'>
                                <div className="form-group">
                                    <label><span style={{ margin: '25px' }}></span>Ex-Showroom Price:</label>
                                </div>
                            </div>
                            <div className='col'>
                                <div className="form-group">
                                    INR {JSON.parse(fbike).price}
                                </div>
                            </div>
                            <div className='col'>
                                <div className="form-group">
                                    INR {JSON.parse(sbike).price}
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col'>
                                <div className="form-group">
                                    <label><span style={{ margin: '25px' }}></span>On- Road Price:</label>
                                </div>
                            </div>
                            <div className='col'>
                                <div className="form-group">
                                    INR {(JSON.parse(fbike).price)*1.18}
                                </div>
                            </div>
                            <div className='col'>
                                <div className="form-group">
                                    INR {(JSON.parse(sbike).price)*1.18}
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col'>
                            </div>
                            <div className='col'>
                                <br />
                                <div className='text-center'>
                                    <a href='#' onClick={saveinfo1}><b>Book Bike</b></a>
                                </div><br /><br />
                            </div>
                            <div className='col'>
                                <br />
                                <div className='text-center'>
                                    <a href='#' onClick={saveinfo2}><b>Book Bike</b></a>
                                </div><br /><br />
                            </div>
                        </div>
                    </div>
                </div><br />
                <span style={{ margin: '40px' }}></span>
                <div className="btn-group" role="group" aria-label="Basic example">
                    <button type="button" className="btn btn-primary btn-block" onClick={Cancel}>Cancel</button>
                </div><br /><br /><br /><br />
            </div>
        )
    }
}

export default UserCompareBike;