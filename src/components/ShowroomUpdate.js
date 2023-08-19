import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Container, Nav, Navbar } from "react-bootstrap";
import mystore from './store';

function ShowroomUpdate() {

    let navigate = useNavigate();

    const [contact, setContact] = useState((JSON.parse(localStorage.getItem("loggedinuser"))).contact);
    const [email, setEmail] = useState((JSON.parse(localStorage.getItem("loggedinuser"))).email);
    const [question, setQuestion] = useState((JSON.parse(localStorage.getItem("loggedinuser"))).question);
    const [answer, setAnswer] = useState((JSON.parse(localStorage.getItem("loggedinuser"))).answer);
    const [hint, setHint] = useState((JSON.parse(localStorage.getItem("loggedinuser"))).hint);
    const [emailError, setEmailError] = useState('');
    const [moberror, setMoberror] = useState('');
    const [ques, setQues] = useState([]);

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
            ;
            setEmailError('');
        } else {

            setEmailError('Please enter a valid email!');
        }
    };

    //Mobile number
    /*const validateCont = (value) => {
        const contact = value;
        if (isNaN(contact)) {
            setMoberror('Please enter a valid Contact');
        } else {
            setMoberror('');
        }
    };*/
    const mobRegex = /^(?:(?:\+|0{0,2})91(\s*|[\-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/;
    const validateCont = (value) => {
        const cont = value;
        if (mobRegex.test(cont)) {
            ;
            setMoberror('');
        } else {
            setMoberror('Please enter a valid Contact!');
        }
    };

    const submitForm = (ev) => {
        ev.preventDefault();
        const reqOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: (JSON.parse(localStorage.getItem("loggedinuser"))).email,
                contact: contact,
                email: email,
                question:{id:question} ,
                answer: answer,
                hint: hint
            })
        }
        fetch("http://localhost:8081/showroom/update", reqOptions)
            .then(resp => resp.json())
            .then(obj => {
                console.log("Showroom Update: " + obj);
                if (obj) {
                    alert("Details Updated");
                    navigate("/ShowroomHome");
                }
            });
        /*localStorage.setItem("loggedinuser", JSON.stringify(user));
        console.log(localStorage.getItem("loggedinuser").email.role);*/
        //console.log(user.fname);
    }

    const Cancel = () => {
        navigate("/ShowroomHome");
    }

    const logoutUser = (ev) => {
        mystore.dispatch({ type: 'LOGGEDOUT' });
        console.log("Loggedin: " + mystore.getState().loggedin);
        localStorage.removeItem("loggedinuser");
        localStorage.removeItem("swlist");
        localStorage.removeItem("allusrinfo");
        localStorage.setItem("logState", false);
        navigate("/");
    }

    return (
        <div className="container-fluid">
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/ShowroomHome">BikeLeLo</Navbar.Brand>
                    <span style={{ margin: '20px' }}></span>
                    <Nav>
                        <Nav.Link href="/ShowroomHome">Home</Nav.Link>
                        <span style={{ margin: '10px' }}></span>
                        <Nav.Link href="/ShowroomUpdate">Update Profile</Nav.Link>
                        <span style={{ margin: '10px' }}></span>
                        <Nav.Link href="/updatestatus">Update Booking Status</Nav.Link>
                        <span style={{ margin: '10px' }}></span>
                        <Nav.Link href="" onClick={logoutUser}>Logout</Nav.Link>
                    </Nav>
                </Container>
            </Navbar><br />
            <Nav.Link href="/ShowroomChangePassword"><span style={{ marginLeft: '75%' }}></span>Change Password</Nav.Link>
            <div style={{ backgroundColor: 'white', width: '70%', height: '50%', marginTop: '3%', marginLeft: '15%', marginRight: '15%', opacity: 0.8 }}>
                <div className="col-md-12 login-sec">
                    <form><br />
                        <h3 className="text-center">Showroom Details Update: </h3><br />
                        <div className="form-group">
                            <label>Showroom Name: </label><span style={{ margin: '10px' }}></span>{(JSON.parse(localStorage.getItem("loggedinuser"))).name}
                        </div>
                        <div className="form-group">
                            <label>Showroom Contact No</label>
                            <input type="text" name="contact" className="form-control" placeholder="Enter Contact" onBlur={(ev) => validateCont(ev.target.value)} onChange={(ev) => setContact(ev.target.value)} />
                            <span style={{ fontWeight: 'normal', color: 'red', }}>{moberror}</span>
                        </div>
                        <div className="form-group">
                            <label>Showroom Email</label>
                            <input type="text" name="contact" required className="form-control" value={email} onChange={(ev) => { setEmail(ev.target.value); validateEmail(ev) }} />
                            <span style={{ fontWeight: 'normal', color: 'red', }}>{emailError}</span>
                        </div>
                        <div className="form-group">
                            <label>LandMark: </label>
                            <span style={{ margin: '10px' }}></span>{(JSON.parse(localStorage.getItem("loggedinuser"))).landMark}
                        </div>
                        <div className="form-group">
                            <label>PinCode: </label>
                            <span style={{ margin: '10px' }}></span>{(JSON.parse(localStorage.getItem("loggedinuser"))).pinCode}
                        </div>
                        <div className="form-group">
                            <label>City: <span style={{ margin: '8px' }}></span></label>
                            <span style={{ margin: '10px' }}></span>{(JSON.parse(localStorage.getItem("loggedinuser"))).city.city}
                        </div>
                        <div className="form-group">
                            <label>Showroom Email: </label>
                            <span style={{ margin: '10px' }}></span>{(JSON.parse(localStorage.getItem("loggedinuser"))).email}
                        </div>
                        <div className="form-group">
                            <label>Security Question <span style={{ margin: '8px' }}></span></label>
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
                            <label>Answer</label>
                            <input type="text" name="answer" value={answer} className="form-control" onChange={(ev) => setAnswer(ev.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Hint</label>
                            <input type="text" name="hint" value={hint} className="form-control" onChange={(ev) => setHint(ev.target.value)} />
                        </div><br />
                        <div className="btn-group" role="group" aria-label="Basic example">
                            <input type="submit" className="btn btn-primary btn-block" value="Update" onClick={submitForm} />
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

export default ShowroomUpdate;