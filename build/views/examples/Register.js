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
import history from "../../history"
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

// core components
import SimpleFooter from "components/Footers/SimpleFooter.js";
import {connect}  from "react-redux"
import loadUserAction from "../../redux/actions/loadUserAction";

class Register extends React.Component {
  constructor(){
      super()
      this.state ={
        name: '',
        mail: '',
        password:''
      }
  }
  onEmailChange = (event) =>{
    this.setState({email: event.target.value})
 }

 onPasswordChange = (event) =>{
    this.setState({password: event.target.value})
 }

 onNameChange = (event) =>{
  this.setState({name: event.target.value})
}

handleLoadUser =(data) =>{
  this.props.loadUser(data.user.id, data.user.username, data.user.email, data.token)
}

 onSubmit = () =>{
   const bodyContent = JSON.stringify({
     name: this.state.name,
     email: this.state.email,
     password: this.state.password
   });

   fetch('http://localhost:3001/register-page',{
     method: "post",
     headers: {'Content-Type': 'application/json'},
     body: bodyContent
   })
   .then(response => response.json())
   .then(data =>{
    if(data){
        this.handleLoadUser(data);
        history.push('/user-profile')
       
    }
    else{
        alert("failed to register");
    }
    
})
.catch(err=>{
  console.log("Failed to load the user "+ err)
})
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
                <Col lg="5">
                  <Card className="bg-secondary shadow border-0">
                    <CardHeader className="bg-white pb-5">
                      <div className="text-muted text-center mb-3">
                        <small>Sign up with</small>
                      </div>
                      <div className="text-center">
                        <Button
                          className="btn-neutral btn-icon mr-4"
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
                          <span className="btn-inner--text">Google</span>
                        </Button>
                      </div>
                    </CardHeader>
                    <CardBody className="px-lg-5 py-lg-5">
                      <div className="text-center text-muted mb-4">
                        <small>Or sign up with credentials</small>
                      </div>
                      <Form role="form">
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-hat-3" />
                              </InputGroupText>
                            </InputGroupAddon>

                        {/* Added onChange method into the input */}
                            <Input 
                            onChange = {this.onNameChange}
                            placeholder="Name" 
                            type="text" 
                            />

                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-email-83" />
                              </InputGroupText>
                            </InputGroupAddon>
                          {/* Added onEmailChange method into the input */}
                            <Input 
                            onChange = {this.onEmailChange}
                            placeholder="Email" 
                            type="email" 
                            />

                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-lock-circle-open" />
                              </InputGroupText>
                            </InputGroupAddon>

                        {/* Added onPasswordChange method into the input */}
                            <Input
                              onChange = {this.onPasswordChange}
                              placeholder="Password"
                              type="password"
                              autoComplete="off"
                            />

                          </InputGroup>
                        </FormGroup>
                        <div className="text-muted font-italic">
                          <small>
                            password strength:{" "}
                            <span className="text-success font-weight-700">
                              strong
                            </span>
                          </small>
                        </div>
                        <Row className="my-4">
                          <Col xs="12">
                            <div className="custom-control custom-control-alternative custom-checkbox">
                              <input
                                className="custom-control-input"
                                id="customCheckRegister"
                                type="checkbox"
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="customCheckRegister"
                              >
                                <span>
                                  I agree with the{" "}
                                  <a
                                    href="#pablo"
                                    onClick={e => e.preventDefault()}
                                  >
                                    Privacy Policy
                                  </a>
                                </span>
                              </label>
                            </div>
                          </Col>
                        </Row>
                        <div className="text-center">

                      {/* Added onSubmit into the button */}
                          <Button
                            onClick = {this.onSubmit}
                            className="mt-4"
                            color="primary"
                            type="button"
                          >
                            Create account
                          </Button>
                        </div>
                      </Form>
                    </CardBody>
                  </Card>
                </Col>
                <Col>
                    <img 
                    className ="animate__animated animate__slideInRight"
                    src={require("assets/img/theme/image2.png")}/>
                </Col>
              </Row>
            </Container>
        </main>
      </>
    );
  }
}

const mapStateToProps =(state) =>{
  return {
      user:state.user
  }
}

const mapDispatchToProps =(dispatch) =>{
  return {
    loadUser:( userId, userName, email, idToken) => dispatch(loadUserAction(userId, userName, email, idToken))
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
