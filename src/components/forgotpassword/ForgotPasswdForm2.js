import React , {useState} from "react";
import { Form, Row, Col, Container, Button } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import UserPool from "../../Constants/Cognito_IDs/UserPool";
import Alert from 'react-bootstrap/Alert';
import { paswdSuccessMsg, ResentMsg } from "../../Constants/ForgotPassword";
function ForgotPasswdForm2({setCode,
                            setConfirmPassword,
                            setPassword, 
                            resetPassword, 
                            CodeResponse, 
                            CodeErr,
                            password,
                            confirmPassword,
                            sendCode,
                            code}) {
    const [CodeResent , setCodeResent] = useState(false);
    const SetCode = (e)=>{
        e.preventDefault();
        setCode(e.target.value.trim());
      }
    const SetPassword = (e)=>{
        e.preventDefault();
        setPassword(e.target.value.trim());
      }
    const SetConfirmPass = (e)=>{
        e.preventDefault();
        setConfirmPassword(e.target.value.trim());
      }
    const resendCode =(e)=>{
        e.preventDefault();

    }
  


    const schema = yup.object().shape({
        firstName: yup.string().required("Please Enter First Name"),
        lastName: yup.string().required("Please Enter Last Name"),
        code: yup
          .string()
          .required("Code is required"),
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
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
          >
            {({ handleSubmit, handleChange, handleBlur, values, errors }) => (
              <Form noValidate onSubmit={(e)=>resetPassword(e)}>
        

                <Row>
                  <Form.Group
                    as={Col}
                    lg="12"
                    className="form-field"
                    controlId=""
                    onSubmit={(e)=>{resetPassword(e);handleSubmit(e)}}
                  >
                    <Form.Label>Enter Code</Form.Label>
                    <Form.Control
                      type="text"
                      name="email"
                      value={values.email}
                      onChange={(e)=>{SetCode(e);handleChange(e)}}
                      isInvalid={!!errors.email}
                      className="mb-3"
                    />

                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className="mb-3">
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
                      onChange={(e)=>{SetPassword(e); handleChange(e)}}
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
                    controlId="validationFormik04"
                  >
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirm Password"
                      name="confirmPassword"
                      value={values.confirmPassword.trim()}
                      onChange={(e)=>{SetConfirmPass(e); handleChange(e)}}
                      isInvalid={!!errors.confirmPassword}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.confirmPassword}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <div className="couple-btn text-center my-4 0">
                  <div className="button-submit">
                    <Button type="submit" onClick={()=>setCodeResent(false)} className="custom-btn" disabled={ !errors.password &&  password===confirmPassword && (password) && (code)?false:true}>
                      Submit
                    </Button>
                  </div>
                  <div className="button-resend"> 
                    <Button onClick={(e)=>{sendCode(e);setCodeResent(true)}}  className="custom-btn">
                      Resend Code
                    </Button>
                  </div>            
                </div> 

              </Form>
            )}
          </Formik>
        </Col>
       
      </Row>
     
       <Alert variant={(CodeErr?'danger':null) || (CodeResponse ==='SUCCESS' || (CodeResponse && CodeResent) ?'success': null)}>
       {(CodeErr && CodeErr ) || ((CodeResponse==='SUCCESS') && paswdSuccessMsg) || ((CodeResponse && CodeResent) && ResentMsg)  }
       </Alert>
      
      
    </Container>
  </>);
}

export default ForgotPasswdForm2;
