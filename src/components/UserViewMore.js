import React, { Component, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Container, Nav, Navbar } from "react-bootstrap";
import mystore from './store';

function UserViewMore() {
    let navigate = useNavigate();

    const [bike, setBike] = useState((JSON.parse(sessionStorage.getItem("vmbike"))));
    // const [colors, setColors] = useState((JSON.parse(sessionStorage.getItem("colors"))));
    const [showrooms, setShowrooms] = useState([]);
    const [oprice, setOprice] = useState("");

    const calculatePrice = () => {
        let xprice = (JSON.parse(sessionStorage.getItem("vmbike"))).price;
        let tax = 18;
        var oprice = xprice + (xprice * (tax / 100));
        setOprice(oprice);
    }

    const saveinfo = () => {
        sessionStorage.setItem("Sbike", JSON.stringify(bike));
        sessionStorage.setItem("Sprice", JSON.stringify(oprice));
        sessionStorage.removeItem("showrooms");
        sessionStorage.removeItem("vmbike");
        // sessionStorage.removeItem("colors");
        sessionStorage.removeItem("blist");
        if ((JSON.parse(localStorage.getItem("logState")))) {
            if ((JSON.parse(localStorage.getItem("loggedinuser"))).role === "ROLE_USER")
                BookingBike();
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
        const curdate = `${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${date < 10 ? `0${date}` : `${date}`}`;
        console.log(curdate);
        const reqOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                uid: JSON.parse(localStorage.getItem("loggedinuser")),
                vehicleid: bike,
                swid: JSON.parse(sessionStorage.getItem("Sshowroom")),
                dbook: curdate,
                status: "Booked",
                // cvid: JSON.parse(sessionStorage.getItem("Scolor")).cvid,
                cvid: bike.color,
                id: JSON.parse(sessionStorage.getItem("Sprice")) / 10
            })
        }
        fetch("http://localhost:8081/user/savebikebook", reqOptions)
            .then(resp => resp.json())
            .then(obj => {
                console.log(obj);
                alert("Bike Booked Sucessfully.!");
                navigate("/Viewbookings");
            })
            .catch(() => {
                alert("Try Again!!!");
                <h1>Try Again!!!</h1>
            });
    }

    const getSws = (value) => {
        const reqOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: value,  
                name: bike.companyId.name   
            })
        }
        fetch("http://localhost:8081/showroom/getshowrooms", reqOptions)
            .then(resp => resp.json())
            .then(obj => {
                console.log(obj);
                sessionStorage.setItem("showrooms", JSON.stringify(obj));
                setShowrooms(JSON.parse(sessionStorage.getItem("showrooms")));
            })
            .catch(() => {
                alert("Error!! Try Again");
            });
    }

    const setSwroom = (value) => {
        console.log(value);
        showrooms.forEach(e => {
            if (e.id == value) {
                console.log(e);
                sessionStorage.setItem("Sshowroom", JSON.stringify(e));
            }
        });
    }

    // const setColor = (value) => {
    //     console.log(value);
    //     colors.forEach(e => {
    //         if (e.colorid.colorid == value) {
    //             console.log(e);
    //             sessionStorage.setItem("Scolor", JSON.stringify(e));
    //         }
    //     });
    // }

    const getTax = (value) => {
        calculatePrice();
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

    return (
        <div className='container-fluid'>
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
            </Navbar><br/>
            <div style={{ backgroundColor: 'white', width: '70%', height: '50%', marginTop: '3%', marginLeft: '15%', marginRight: '15%', opacity: 0.8 }}>
                <div className="col-md-12 login-sec">
                    <form><br />
                        <h3 className="text-center">Vehicle Details: </h3><br />
                        <div className='row'>
                                <div className='col'>
                                    <div className="form-group" >
                                        {/* <span style={{ margin: '10px' }}></span> */}
                                        <img src={(bike.image)} alt={(bike.modelName)} width="40%" height="40%" /><br />
                                    </div>
                                </div>
                        </div>
                        <div>
                            <div className='row'>
                                <div className='col'>
                                    <div className="form-group">
                                        <label>Model Name:</label>
                                        <span style={{ margin: '10px' }}></span>{(bike.modelName)}
                                    </div>
                                </div>
                                <div className='col'>
                                    <div className="form-group">
                                        <label>Company Name:</label>
                                        <span style={{ margin: '10px' }}></span>{(bike.companyId.name)}
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col'>
                                    <div className="form-group">
                                        <label>Category :</label>
                                        <span style={{ margin: '10px' }}></span>{(bike.vehicleCategory.catName)}
                                    </div>
                                </div>
                                <div className='col'>
                                    <div className="form-group">
                                        <label>Engine Capacity :</label>
                                        <span style={{ margin: '10px' }}></span>{(bike.engCapacity)}
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col'>
                                    <div className="form-group">
                                        <label>Fuel Capacity :</label>
                                        <span style={{ margin: '10px' }}></span>{(bike.fuelCapacity)}
                                    </div>
                                </div>
                                <div className='col'>
                                    <div className="form-group">
                                        <label>Mileage :</label>
                                        <span style={{ margin: '10px' }}></span>{(bike.mileage)}
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col'>
                                    <div className="form-group">
                                        <label>Power :</label>
                                        <span style={{ margin: '10px' }}></span>{(bike.power)}
                                    </div>
                                </div>
                                <div className='col'>
                                    <div className="form-group">
                                        <label>Brake Type :</label>
                                        <span style={{ margin: '10px' }}></span>{(bike.brakeType)}
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col'>
                                    <div className="form-group">
                                        <label>Emission Standard :</label>
                                        <span style={{ margin: '10px' }}></span>{(bike.emissionStandard)}
                                    </div>
                                </div>
                                <div className='col'>
                                    <div className="form-group">
                                        <label>Torque :</label>
                                        <span style={{ margin: '10px' }}></span>{(bike.torque)}
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col'>
                                    <div className="form-group">
                                        <label>Select City<span style={{ margin: '8px' }}></span></label>
                                        <select name="City" required onChange={(ev) => { getTax(ev.target.value); getSws(ev.target.value) }}>
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
                                        <label>Select Showroom<span style={{ margin: '8px' }}></span></label>
                                        <select name="swroom" required onChange={(ev) => setSwroom(ev.target.value)}>
                                            <option >Select Showroom</option>
                                            {
                                                showrooms.map((showroom) => {
                                                    return (<option value={showroom.id}>{showroom.name}</option>)
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>
                             
                            <div className='row'>
                                <div className='col'>
                                    <div className="form-group">
                                        <label>Ex-Showroom Price :</label>
                                        <span style={{ margin: '8px' }}></span>INR {(bike.price)}
                                    </div>
                                </div>
                                <div className='col'>
                                    <div className="form-group">
                                        <label>Color :</label>
                                        <span style={{ margin: '8px' }}></span>{(bike.color.color)}
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col'>
                                    <div className="form-group">
                                        <label>On-Road Price :</label>
                                        <span style={{ margin: '10px' }}></span>INR {oprice}
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div className='text-center'>
                                <a href='#' onClick={saveinfo}><b>Book Bike</b></a>
                            </div>
                        </div>
                    </form>
                </div><br /><br />
            </div >
        </div >
    );
}

export default UserViewMore;