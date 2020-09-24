/*!

=========================================================
* Argon Design System React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import history from '../../history'
import UserData from './UserData'
// import { BrowserRouter as Router } from 'react-router-dom'
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";
// import {withRouter} from 'react-router'
// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import { connect } from "react-redux"
import loadUserAction from "../../redux/actions/loadUserAction";
import {provider, firebase} from "../../fbConfig"

class Login extends React.Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: ''
    }
  }




  onEmailChange = (event) => {
    this.setState({ email: event.target.value })
  }

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value })
  }

  handleLoadUser = (data) => {
    this.props.loadUser(data.user.id, data.user.username, data.user.email, data.token)
  }

  onSubmit = () => {
    const bodyContent = JSON.stringify({
      email: this.state.email,
      password: this.state.password
    });

    fetch('http://localhost:3001/login-page', {
      method: "post",
      headers: { 'Content-Type': 'application/json' },
      body: bodyContent
    })
      .then(response => response.json())
      .then(data => {
        if (data) {
          UserData.setUserData(data)
          this.handleLoadUser(data);
          history.push('/user-profile');
        }
        else {
          alert("failed to signin");
        }
      }
      )
      .catch(err => {
        console.log("Failed to load the user " + err)
      })
  }


  onSignIn =(googleUser) =>{
    alert(JSON.stringify(googleUser))

    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }


  


  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }
  render() {
    return (
      <>
        <main ref="main">
          <Container className="pt-lg-7">
            <Row className="justify-content-center">
              <Col>
                <img
                  className="animate__animated animate__slideInLeft"
                  src={require("assets/img/theme/image1.png")}
                />
              </Col>
              <Col lg="5">
                <Card className="bg-secondary shadow border-0">
                  <CardHeader className="bg-white pb-5">
                    <div className="text-muted text-center mb-3">
                      <small>Sign in with</small>
                    </div>
                    <div className="btn-wrapper text-center">
                      <Button
                        className="btn-neutral btn-icon"
                        color="default"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        <span className="btn-inner--icon mr-1">
                          <img
                            alt="..."
                            src={require("assets/img/icons/common/github.svg")}
                          />
                        </span>
                        <span className="btn-inner--text">Github</span>
                      </Button>
                      <Button
                        className="btn-neutral btn-icon ml-1"
                        color="default"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        <span className="btn-inner--icon mr-1">
                          <img
                            alt="..."
                            src={require("assets/img/icons/common/google.svg")}
                          />
                        </span>
                        <span className="btn-inner--text"
                        onClick ={this.onSignIn}>Google</span>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardBody className="px-lg-5 py-lg-5">
                    <div className="text-center text-muted mb-4">
                      <small>Or sign in with credentials</small>
                    </div>
                    <Form role="form">
                      <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-email-83" />
                            </InputGroupText>
                          </InputGroupAddon>
                          {/* I have added onChange method into email input */}
                          <Input onChange={this.onEmailChange} placeholder="Email" type="email" />

                        </InputGroup>
                      </FormGroup>
                      <FormGroup>
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-lock-circle-open" />
                            </InputGroupText>
                          </InputGroupAddon>

                          {/* I have added  onPasswordChange method to the password input*/}
                          <Input
                            onChange={this.onPasswordChange}
                            placeholder="Password"
                            type="password"
                            autoComplete="off"
                          />

                        </InputGroup>
                      </FormGroup>
                      <div className="custom-control custom-control-alternative custom-checkbox">
                        <input
                          className="custom-control-input"
                          id=" customCheckLogin"
                          type="checkbox"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor=" customCheckLogin"
                        >
                          <span>Remember me</span>
                        </label>
                      </div>
                      <div className="text-center">

                        {/* Added the onSubmit method into the button */}
                        <Button
                          onClick={this.onSubmit}
                          className="my-4"
                          color="primary"
                          type="button"
                        >
                          Sign in
                          </Button>


                      </div>
                    </Form>
                  </CardBody>
                </Card>
                <Row className="mt-3">
                  <Col xs="6">
                    <a
                      className="text-light"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                    >
                      <small>Forgot password?</small>
                    </a>
                  </Col>
                  <Col className="text-right" xs="6">
                    <a
                      className="text-light"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                    >
                      <small>Create new account</small>
                    </a>
                  </Col>
                </Row>
              </Col>

            </Row>
  
          </Container>
          <SimpleFooter/>
        </main>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadUser: (userId, userName, email, idToken) => dispatch(loadUserAction(userId, userName, email, idToken))
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Login);