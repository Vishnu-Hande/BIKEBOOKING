import React, { useState } from 'react';
import { Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import validator from 'validator';

function ForgotPassword() {

    let navigate = useNavigate();
    const [flag,setFlag]=useState(true);
    const [email, setEmail] = useState("");
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [password, setPassword] = useState("");
    //sessionStorage.removeItem("temp1");
    const [errorMessage, setErrorMessage] = useState('');
    const fetchque = (value) => {
      //  debugger;
      
        console.log("fetching Ques for email: " + value);
        setEmail(value);
        const reqOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: value
                
            })
        }
        fetch("http://localhost:8081/user/fetchQuestionUser", reqOptions)
            .then(resp => resp.json())
            .then(obj => {
                if (obj) {
                    setFlag(false);
                    console.log("Question: " + JSON.parse(JSON.stringify(obj)).question);
                    sessionStorage.setItem("temp1", JSON.stringify(obj));
                    setQuestion((JSON.parse(sessionStorage.getItem("temp1"))).question.securityQuestion);
                } else {
                    alert("Account Not found! Please check your credentials..")
                }
            });
    }
                
    //             if(flag){
    //                 fetch("http://localhost:8081/showroom/fetchQuestionShowroom", reqOptions)
    //         .then(resp => resp.json())
    //         .then(obj => {
    //             if (obj !== null) {
    //                console.log("Question: " + JSON.parse(JSON.stringify(obj)).question);
    //                sessionStorage.setItem("temp1", JSON.stringify(obj));
    //                setQuestion((JSON.parse(sessionStorage.getItem("temp1"))).question);
                   
    //      } 
    //  })
    //              } 

    const Cancel = () => {
        navigate("/");
    }

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

    const submitForm = (ev) => {
        ev.preventDefault();
        debugger;
        if ((email === (JSON.parse(sessionStorage.getItem("temp1"))).email) && (answer === (JSON.parse(sessionStorage.getItem("temp1"))).answer)) {
            const reqOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            }
            fetch("http://localhost:8081/user/resetPassword", reqOptions)
                .then(resp => resp.json())
                .then(obj => {
                    if (obj) {
                        alert("Password changed successfully, Please login..");
                        navigate("/login");
                    } else {
                        alert("Error!!!")
                    }
                });
        } else {
            alert("Incorrect Answer! Please enter correct answer to proceed ans");
        }
    }

    return (
        <div className="container-fluid">
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
                                <h3 className="text-center">Sign In</h3>
                                <div className="form-group">
                                    <label>User ID</label>
                                    <input type="text" name="email" className="form-control" placeholder='Enter your email' onChange={(ev)=>fetchque(ev.target.value) }/>
                                </div>
                                <div className="form-group">
                                    <label>Question<span style={{ margin: '8px' }}></span></label>
                                    {/* <button onClick={()=>setQuestion((JSON.parse(sessionStorage.getItem("temp1"))).question.securityQuestion)}>Check</button> */}
                                    <span style={{ margin: '10px' }} ></span>{question}
                                    
                                </div>
                                <div className="form-group">
                                    <label>Enter Answer </label>
                                    <input type="text" name="answer" className="form-control" value={answer} onChange={(ev) => setAnswer(ev.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input type="text" name="password" className="form-control" placeholder="Enter password" onChangeCapture={(ev) => validate(ev.target.value)} onChange={(ev) => setPassword(ev.target.value)} />
                                    <span style={{ fontWeight: 'normal', color: 'red', }}>{errorMessage}</span>
                                </div><br />
                                <div>
                                    <div className="btn-group" role="group" aria-label="Basic example">
                                        <input type="submit" className="btn btn-primary btn-block" value="Submit" onClick={submitForm} />
                                    </div><span style={{ margin: '10px' }}></span>
                                    <div className="btn-group" role="group" aria-label="Basic example">
                                        <button type="button" className="btn btn-primary btn-block" onClick={Cancel}>Cancel</button>
                                    </div>
                                </div>
                                <br /><br /><br />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default ForgotPassword;