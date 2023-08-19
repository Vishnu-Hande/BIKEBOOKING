import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Container, Nav, Navbar } from "react-bootstrap";
import mystore from './store';
import background from "../data/RR.jpg";
function LoginForShowroom() {

    let navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submitForm = (ev) => {
        ev.preventDefault();
        const reqOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
            })
        }
        fetch("http://localhost:8081/loginShowroom", reqOptions)
            .then(resp => resp.json())
            .then(obj => {
                if (obj !== null) {
                    debugger;
                    localStorage.setItem("temp", JSON.stringify(obj));
                    if (true) {
                        localStorage.setItem("loggedinuser", JSON.stringify(obj));
                        localStorage.removeItem("temp");
                        mystore.dispatch({ type: 'LOGGEDIN' });
                        console.log("Loggedin: " + mystore.getState().loggedin);
                        localStorage.setItem("logState", true);
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
                        sessionStorage.removeItem("Scolor");
                        sessionStorage.removeItem("Sshowroom");
                 
                        //console.log(localStorage.getItem("loggedinuser"));
                        let role = (JSON.parse(localStorage.getItem("loggedinuser"))).role;
                       
                        console.log("Role: " + role);
                            navigate("/ShowroomHome");
                    } 
                }
            })
            .catch(() => {
                alert("Incorrect Credentials!!!");
            });
    }

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
        sessionStorage.removeItem("Scolor");
        sessionStorage.removeItem("Sshowroom");
        navigate("/");
    }

    const forgetPass = () => {
        navigate("/ForgotPassword");
    }

    return (
        <div className="container-fluid">
            <div style = {{backgroundImage: `url(${background})` , width: '100%' , height: '100%'}}>
            <div>
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
            </div>
            <div>
                <div style={{ backgroundColor: 'white', width: '50%', height: '50%', marginTop: '8%', marginLeft: '25%', marginRight: '25%', opacity: 0.8 }}>
                    <div>
                        <div className="col-md-12 login-sec">
                            <form><br />
                                <h3 className="text-center">Sign In to Showroom</h3>
                                <div className="form-group">
                                    <label>User ID</label>
                                    <input type="text" name="email" className="form-control" placeholder="Enter User Name" onChange={(ev) => setEmail(ev.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input type="password" name="password" className="form-control" placeholder="Enter password" onChange={(ev) => setPassword(ev.target.value)} />
                                </div><br />
                                <div>
                                    <div className="btn-group" role="group" aria-label="Basic example">
                                        <input type="submit" className="btn btn-primary btn-block" value="Login" onClick={submitForm} />
                                    </div><span style={{ margin: '10px' }}></span>
                                    <div className="btn-group" role="group" aria-label="Basic example">
                                        <button type="button" className="btn btn-primary btn-block" onClick={Cancel}>Cancel</button>
                                    </div><span style={{ margin: '70px' }}></span>
                                    <div className="btn-group" role="group" aria-label="Basic example">
                                        <Nav.Link href="" onClick={forgetPass}>Forgot Password?</Nav.Link>
                                    </div>
                                </div>
                                <br /><br />
                            </form>
                        </div>
                    </div>
                </div>
            </div><br /><br /><br />
        </div >
        </div>
    );
}

export default LoginForShowroom;