import React , {useState, useEffect} from "react";
import { Form, Row, Col, Container, Button } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import UserPool from "../../../Constants/Cognito_IDs/UserPool";
import Alert from 'react-bootstrap/Alert';
import { CognitoUser } from "amazon-cognito-identity-js";
import useRegisterToDb from "../../../api/RegisterToAdmindb/useRegisterToDb";
import Spinnerbutton from "../../SpinnerButton/Spinnerbutton";
import { ExistMsg, ShowVerifiedMsg, successMsg, VerifiedExistsMsg } from "../../../Constants/RegisterForm";
import { successMsg2 } from "../../../Constants/RegisterForm";
const RegisterForm = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [RegisterData, setRegData] = useState("");
    const [Code, setCode] = useState("");
    const [errmessage, setErrMessage] = useState("");
    const [Confirmation,setConfirmation] =useState("");
    const [codeErr,setCodeErr] =useState("");
    const [FirstName,  setName] =useState("");
    const [LastName,  setLastName] =useState("");
    const [phone,  setPhone] =useState("");
    const [Response, Register]= useRegisterToDb("");
    
    const onlyText = /^[a-zA-Z ]*$/;
 
    const user = new CognitoUser({
      Username: email,
      Pool: UserPool,
    });

    let formatPhoneNumber =  (str) => {
      //Filter only numbers from the input
      let format ='';
      let cleaned = ('' + str).replace(/\D/g, '');
      
      //Check if the input is of correct length
      let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    
      if (match) {
        format=match[1] + '-' + match[2] + '-' + match[3]
        return format.toString();
      };
    
      return null
    };
    
    const onSubmit = async  (event) => {
      event.preventDefault();
      setRegData("");setErrMessage("");setCodeErr("");setConfirmation("");setCode("")
        UserPool.signUp(email, password.trim(), [], null, (err, data)  => {
          if (err) {
              setRegData("")
              if(err.message==ExistMsg){
                user.resendConfirmationCode((err, result) => {
                  if (err) {
                    // console.log(err);
                  } else if (result) {
                    // console.log(result);
                  }
                });
                setErrMessage("");
                setRegData(err.message)
                return null
              }
              setErrMessage(err.message);
          } else if(data){
              setErrMessage("")
          setRegData(data);
          SendDataToBackend(data);
          }
      });
    };

    const SendDataToBackend = async (data)=>{
      let sendData= await data ;
      const body = JSON.stringify({ FirstName: FirstName.trim() ,
        LastName: LastName.trim() ,
        email: sendData.user.username,
        phone: await formatPhoneNumber(phone.trim()),
        cognito_subid: sendData.userSub,
      });
      Register(body);
    }
    const sendCode = async (e) =>{
      const body =JSON.stringify({ FirstName: FirstName ,
        email: email,
        phone: phone,
      });
      e.preventDefault();
      setCodeErr("");setConfirmation("");
      user.confirmRegistration(Code,true, (err,result)=>{
        if (err){
          setConfirmation("");
          setCodeErr(err.message);
          if(err.message===VerifiedExistsMsg){
            setCodeErr(ShowVerifiedMsg)
          }
        }else if (result){
          setCodeErr("");
          setConfirmation(result);
        }
      });
    };
  // const SrtingWithoutNumbers =/(([a-zA-Z])+$)/
  const SrtingWithoutNumbers = /^[a-zA-Z ]*$/;
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  const schema = yup.object().shape({
    FirstName: yup.string().matches(SrtingWithoutNumbers,"Enter a valid name").required("Please Enter First Name").max(20,"name is too long"),
    LastName: yup.string().matches(SrtingWithoutNumbers,"Enter a valid name").required("Please Enter last Name").max(20,"name is too long"),
    phone: yup.string().required("please enter a phone number").matches(phoneRegExp, 'Phone must be a 10 digit valid number').min(10,"Phone must be a minumum 10 digit valid number").max(10,"Phone must be a maximun 10 digit valid number"),
    // phone: yup.number("num req").integer("number req").required("Please Enter Last Name"),
    email: yup
      .string()
      .required("Email is required")
      .email("Enter Valid Email address"),
    password: yup
      .string()
      .required("Please Enter the password")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
    confirmPassword: yup
      .string()
      .required("Enter Confirm Password")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });
  return (<>
    <Container>
      <Row>
        <Col lg={12}>
          <Formik
            validationSchema={schema}
            onSubmit={console.log}
            initialValues={{
              FirstName: "",
              LastName: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
          >
            {({ handleSubmit, handleChange, handleBlur, values, errors }) => (           
              <Form onSubmit={onSubmit}>
                <Row>
                  <Form.Group
                    as={Col}
                    lg="12"
                    className="form-field"
                    controlId="validationForEmail"
                    onSubmit={(e)=>{onSubmit(e);handleSubmit(e)}}
                  >
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={values.email}
                      onChange={(e)=>{setEmail(e.target.value.trim());handleChange(e)}}
                      isInvalid={!!errors.email}
                      placeholder="Enter email"
                    />

                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                

                <Row>
                  <Form.Group
                    as={Col}
                    lg="6"
                    className="form-field"
                    controlId="validationFormik07"
                  >
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="First Name"
                      name="FirstName"
                      value={FirstName}
                      onChange={(e)=>{onlyText.test(e.target.value) && setName(e.target.value); handleChange(e)}}
                      isInvalid={!!errors.FirstName}
                    />
                     <Form.Control.Feedback type="invalid">
                      {errors.name}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    lg="6"
                    className="form-field"
                    controlId="validationFormik06"
                  >
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="LastName"
                      placeholder="Your last name"
                      value={LastName}
                      onChange={(e)=>{onlyText.test(e.target.value) && setLastName(e.target.value); handleChange(e)}}
                      isInvalid={!!errors.LastName}
                    />
                     <Form.Control.Feedback type="invalid">
                      {errors.LastName}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row>
                <Form.Group
                    as={Col}
                    lg="12"
                    className="form-field"
                    controlId="validationFormik07"
                  >
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="tel"
                      name="phone"
                      placeholder="Your phone number"
                      value={phone}
                      onChange={(e)=>{setPhone(e.target.value); handleChange(e)}}
                      isInvalid={!!errors.phone}
                    />
                     <Form.Control.Feedback type="invalid">
                      {errors.phone}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row>
                  <Form.Group
                    as={Col}
                    lg="6"
                    className="form-field"
                    controlId="validationFormik03"
                  >
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={values.password.trim()}
                      onChange={(e)=>{setPassword(e.target.value); handleChange(e)}}
                      isInvalid={!!errors.password}
                    />

                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    lg="6"
                    className="form-field"
                    controlId="validationFormik05"
                  >
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirm Password"
                      name="confirmPassword"
                      value={values.confirmPassword.trim()}
                      onChange={(e)=>{setConfirmPass(e.target.value); handleChange(e)}}
                      isInvalid={!!errors.confirmPassword}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.confirmPassword}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                {(RegisterData || errmessage) ?
                  <Alert variant={(errmessage ? 'danger' : null) || (RegisterData ? 'success' : null)}>
                    {(errmessage && errmessage) || (RegisterData && successMsg)}
                  </Alert> : null}
                <div className="text-center mb-4">
                  <Button type="submit" className="custom-btn" disabled={(password===confirmPass)&&(email)&&(FirstName)&&(LastName)&&(phone)&&(password)&&(!errors.password)&&(!errors.email)&&(!errors.phone)&&(!errors.FirstName)&&(!errors.LastName)?false:true}>
                    Register
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
          {(RegisterData) ?
          <Formik>
            <Form onSubmit={(e)=>sendCode(e)}>
              <Row>
                <Form.Group 
                 as={Col}
                 lg="6"
                 className="form-field"
                 controlId="validationFormik04">
                   <Form.Control 
                    type="text"
                    placeholder="enter the verification code"
                    value={Code}
                    onChange={(e)=>{setCode(e.target.value)}}
                   >
                   </Form.Control>
                </Form.Group>
              </Row>
              {(Confirmation || codeErr) ?
                  <Alert variant={(codeErr ? 'danger' : null) || (Confirmation ? 'success' : null)}>
                    {(codeErr && codeErr) || (Confirmation && successMsg2)}
                  </Alert> : null}

              <div className="text-center mb-4">
                  <Button type="submit" className="custom-btn  mb-4" style={{width:'150px'}} disabled={Code===""?true:false}>
                    Verify
                  </Button>
                  <Spinnerbutton user={user}/>
                </div>
            </Form>
          </Formik>
          : null}
          
        </Col>
      </Row>
    </Container>
  
    </>
  );
};

export default RegisterForm;
