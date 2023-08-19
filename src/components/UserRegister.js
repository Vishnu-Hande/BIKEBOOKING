import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Container, Nav, Navbar } from "react-bootstrap";
import validator from 'validator';

function UserRegister() {

    let navigate = useNavigate();
    const [ques, setQues] = useState([]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dob, setDob] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [contact, setContact] = useState("");
    const [password, setPassword] = useState("");
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [hint, setHint] = useState("");
    const [errorMessage, setErrorMessage] = useState('');
    const [emailError, setEmailError] = useState('');
    const [moberror, setMoberror] = useState('');
    const [idMessage, setIdMessage] = useState('');

    const Cancel = () => {
        navigate("/");
    }

    const fetchall = () => {
        const reqOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        fetch("http://localhost:8081/fetchAllQuestion", reqOptions)
            .then(resp => resp.json())
            .then(obj => {
                console.log(obj);
                sessionStorage.setItem("qlist", JSON.stringify(obj));
                setQues(JSON.parse(sessionStorage.getItem("qlist")));
            })
            .catch(() => {
                alert("Error!! Try Again");
            });
    }

    //Email
    const emailRegex = /^\S+@\S+\.\S+$/;
    const validateEmail = (event) => {
        const email = event.target.value;
        if (emailRegex.test(email)) {
            setEmailError('');
        } else {

            setEmailError('Please enter a valid email!');
        }
    };

    //Mobile number
    const mobRegex = /^(?:(?:\+|0{0,2})91(\s*|[\-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/;
    const validateCont = (value) => {
        const cont = value;
        if (mobRegex.test(cont)) {
            setMoberror('');
        } else {
            setMoberror('Please enter a valid Contact!');
        }
    };

    //Password
    const validate = (value) => {

        if (validator.isStrongPassword(value, {
            minLength: 8, minLowercase: 1,
            minUppercase: 1, minNumbers: 1, minSymbols: 1
        })) {

            setErrorMessage('')
        } else {
            setErrorMessage('Too short !! Must contain atleast one uppercase,lowercase,special character,number ')
        }
    }

    //Userid
    const validateid = (value) => {
        console.log(value);
        const reqOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: value
            })
        }
        fetch("http://localhost:8081/uidvalidcheck", reqOptions)
            .then(resp => resp.json())
            .then(obj => {
                console.log(obj);
                if (obj) {
                    setIdMessage('');
                } else {
                    setIdMessage('Userid not available, please try different one!');
                }
            })
            .catch(() => {
                alert("Error!! Try Again");
            });
    }

    const submitForm = (ev) => {
        ev.preventDefault();
        const reqOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                dob: dob,
                email: email,
                address: address,
                contact: contact,              
                password: password,
                question: question,
                answer: answer,
                hint: hint,
                role: "ROLE_USER",
            })
        }
        fetch("http://localhost:8081/register", reqOptions)
            .then(resp => resp.json())
            .then(obj => {
                console.log(obj);
                console.log(obj);
                alert("Registration Successful");
                navigate("/login");
            })
            .catch(() => {
                alert("Try Again!!!");
                <h1>Try Again!!!</h1>
            });
    }

    //DOB
    const disableDates = () => {
        const today = new Date();
        const dd = String(today.getDate() + 1).padStart(2, "0");
        const mm = String(today.getMonth()).padStart(2, "0"); //January is 0!
        const yyyy = String(today.getFullYear() - 16);
        return yyyy + "-" + mm + "-" + dd;
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
            </Navbar><br />
            <div style={{ backgroundColor: 'white', width: '70%', height: '50%', marginTop: '3%', marginLeft: '15%', marginRight: '15%', opacity: 0.8 }}>
                <div className="col-md-12 login-sec">
                    <form><br />
                        <h3 className="text-center">User Registration: </h3><br />
                        <div className="form-group">
                            <label>First Name:</label>
                            <input type="text" name="firstName" required className="form-control" placeholder="Enter First Name" onChange={(ev) => setFirstName(ev.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Last Name</label>
                            <input type="text" name="lastName" className="form-control" placeholder="Enter Last Name" onChange={(ev) => setLastName(ev.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="text" name="email" className="form-control" placeholder="Enter Email" onChange={(ev) => { setEmail(ev.target.value); validateEmail(ev) }} />
                            <span style={{ fontWeight: 'normal', color: 'red', }}>{emailError}</span>
                        </div>
                        <div className="form-group">
                            <label>Date of Birth</label>
                            <input type="Date" name="dob" className="form-control" placeholder="Enter Birthdate" min={"1931-01-01"} max={disableDates()} onChange={(ev) => setDob(ev.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Address</label>
                            <input type="text" name="address" className="form-control" placeholder="Enter Address" onChange={(ev) => setAddress(ev.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Contact</label>
                            <input type="text" name="contact" className="form-control" placeholder="Enter Contact" onChangeCapture={(ev) => validateCont(ev.target.value)} onChange={(ev) => setContact(ev.target.value)} />
                            <span style={{ fontWeight: 'normal', color: 'red', }}>{moberror}</span>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" name="password" className="form-control" placeholder="Enter password" onChangeCapture={(ev) => validate(ev.target.value)} onChange={(ev) => setPassword(ev.target.value)} />
                            <span style={{ fontWeight: 'normal', color: 'red', }}>{errorMessage}</span>
                        </div>
                        <div className="form-group">
                            <label>Security Question<span style={{ margin: '8px' }}></span></label>
                            <select name='question' required onClick={fetchall} onChange={(ev) => setQuestion(ev.target.value)}>
                                <option>Select Question</option>
                                {
                                    ques.map((q) => {
                                        return (<option value={q.id}>{q.securityQuestion}</option>)
                                       
                                    })
                                }
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Enter Answer</label>
                            <input type="text" name="answer" className="form-control" placeholder="Enter Answer" onChange={(ev) => setAnswer(ev.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Hint</label>
                            <input type="text" name="hint" className="form-control" placeholder="Hint" onChange={(ev) => setHint(ev.target.value)} />
                        </div><br />
                        <div className="btn-group" role="group" aria-label="Basic example">
                            <input type="submit" className="btn btn-primary btn-block" value="Submit" onClick={submitForm} />
                        </div><span style={{ margin: '10px' }}></span>
                        <div className="btn-group" role="group" aria-label="Basic example">
                            <button type="button" className="btn btn-primary btn-block" onClick={Cancel}>Cancel</button>
                        </div>
                        <br /><br/><br/>
                    </form>
                </div>
            </div>
        </div>
    );
}
    
export default UserRegister;