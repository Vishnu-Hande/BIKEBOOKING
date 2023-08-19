import React, { useState } from 'react';
import { Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

function SearchBike() {

    let navigate = useNavigate();

    const [datas, setData] = useState([]);
    const [range, setRange] = useState("");
    const [vehicleCategory, setVehicleCategory] = useState("");
    const [search, setSearch] = useState("");

    const ViewMore = value => () => {
        sessionStorage.setItem("vmbike", JSON.stringify(value));
        // getColors(value);
        navigate("/ViewMore");
    }

    // const getColors = (value) => {
    //     const reqOptions = {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             vehicleid: value.vehicleid
    //         })
    //     }
    //     fetch("http://localhost:8081/getcolors", reqOptions)
    //         .then(resp => resp.json())
    //         .then(obj => {
    //             console.log(obj);
    //             sessionStorage.removeItem("colors");
    //             sessionStorage.setItem("colors", JSON.stringify(obj));
    //             navigate("/ViewMore");
    //         })
    //         .catch(() => {
    //             alert("Error!! Try Again");
    //         });
    // }

    const fetchbyrange = (value) => {
        setRange(value);
        const reqOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                price: value,
            })
        }
        fetch("http://localhost:8081/user/range", reqOptions)
            .then(resp => resp.json())
            .then(obj => {
                console.log(obj);
                sessionStorage.setItem("blist", JSON.stringify(obj));
                setData(JSON.parse(sessionStorage.getItem("blist")));
                setSearch("");
                setVehicleCategory("");
            })
            .catch(() => {
                alert("Error!! Try Again");
            });
    }

    const fetchbycat = (value) => {
        setVehicleCategory(value);
        const reqOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: value,
            })
        }
        fetch("http://localhost:8081/user/catid", reqOptions)
            .then(resp => resp.json())
            .then(obj => {
                console.log(obj);
                sessionStorage.setItem("blist", JSON.stringify(obj));
                setData(JSON.parse(sessionStorage.getItem("blist")));
                setSearch("");
                setRange("");
            })
            .catch(() => {
                alert("Error!! Try Again");
            });
    }

    const Search = () => {
        const reqOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                modelName: search
            })
        }
        fetch("http://localhost:8081/user/search", reqOptions)
            .then(resp => resp.json())
            .then(obj => {
                if(obj.length !== 0){
                console.log(obj);
                sessionStorage.setItem("blist", JSON.stringify(obj));
                setData(JSON.parse(sessionStorage.getItem("blist")));
                setRange("");
                setVehicleCategory("");
                } else {
                    alert("No Vehicles Found! Try Again");
                    setSearch("");
                }
            })
            .catch(() => {
                alert("Error!! Try Again");
            });
    }
    return (
        <div className="container-fluid">
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">BikeLeLo</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/searchbike">Search Bike</Nav.Link>
                        <span style={{ margin: '10px' }}></span>
                        <Nav.Link href="/comparebike">Compare Bike</Nav.Link>
                        <span style={{ margin: '10px' }}></span>
                        <Nav.Link href="/login">Login</Nav.Link>
                        <span style={{ margin: '10px' }}></span>
                        <Nav.Link href="/UserRegister">Register User</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <div style={{ backgroundColor: 'white', width: '90%', height: '100%', marginTop: '3%', marginLeft: '5%', marginRight: '8%', opacity: 0.8 }}>
                <div className="col-md-12 login-sec"><br/>
                    <h2 className="text-center">Search Bike</h2><br />
                    <form>
                        <table>
                            <tr>
                                <span style={{ marginLeft: '80px'}}></span>
                                <td>
                                    <div className="form-group">
                                        <input type="text" placeholder="Search Bike" value={search} onChange={(ev) => setSearch(ev.target.value)} /><span style={{ margin: '10px' }}></span>
                                        <input type='button' value="Search" onClick={Search} />
                                    </div>
                                </td>
                                <span style={{ margin: '20px' }}></span>
                                <td>
                                    <div className="form-group">
                                        <label>Range <span style={{ margin: '8px' }}></span></label>
                                        <select name="range" key={range} value={range} required onChange={(ev) => fetchbyrange(ev.target.value)}>
                                            <option value="">Select Range</option>
                                            <option value="100000">Below 1 lacs</option>
                                            <option value="500000">Below 5 lacs</option>
                                            <option value="1000000">Below 10 lacs</option>
                                            <option value="1500000">Below 15 lacs</option>
                                            <option value="2000000">Below 20 lacs</option>
                                            <option value="0">Above 20 lacs</option>
                                        </select>
                                    </div >
                                </td>
                                <span style={{ margin: '20px' }}></span>
                                <td>
                                    <div className="form-group">
                                        <label>Category<span style={{ margin: '8px' }}></span></label>
                                        <select name="vehicleCategory" value={vehicleCategory} required onChange={(ev) => fetchbycat(ev.target.value)}>
                                            <option value="">Select Category</option>
                                            <option value="1">With Gear</option>
                                            <option value="2">Without Gear</option>
                                            <option value="3">Electric</option>
                                        </select>
                                    </div >
                                </td>
                                <span style={{ marginLeft: '80px' }}></span>
                            </tr>
                        </table>
                    </form><br />
                    <br />
                    <div>
                        <table className="table table-bordered">
                            <tr className='text-center'>
                                <th>Company</th>
                                <th>Model Name</th>
                                <th>Category</th>
                                <th>Ex-Showroom Price</th>
                                <th>Action</th>
                            </tr>
                            {datas.map((data,index) => (
                                <tr key={index} className='text-center'>
                                    <td>{data.companyId.name}</td>
                                    <td>{data.modelName}</td>
                                    <td>{data.vehicleCategory.catName}</td>
                                    <td>{data.price}</td>
                                    <td><a href="#" onClick={ViewMore(data)}> View More</a></td>
                                </tr>
                            ))}
                        </table><br /><br /><br />
                    </div>
                </div>
            </div><br /><br /><br /><br /><br /><br />
        </div>
    );
}

export default SearchBike;