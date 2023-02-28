import { Form, Row, Col, Container, Button } from "react-bootstrap";
import React, { useState, useContext } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { SessionContext } from "../../../Context/Session/Session";
import Alert from "react-bootstrap/Alert";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Session } from "../../../Context/Session/Session";
function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errmessage, SetErrMessage] = useState("");
  const { authenticate,setUserEmail,setsessionID,setuserID, sessionID ,userID} = useContext(SessionContext);
  const schema = yup.object().shape({
    email: yup
      .string()
      .required("Email is required")
      .email("Enter Valid Email address"),
    password: yup.string().required("Please Enter the password"),
  });

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const onSubmit =  (event) => {
    event.preventDefault();
    authenticate(email, password.trim())
      .then(async(data) => {
        console.log("Logged in!", data);
        SetErrMessage("");
        window.location.href = "/";
      })
      .catch((err) => {
        console.error("Failed to login", err);
        SetErrMessage(err.message);
      });
  };

  return (
    <>
      <section className="form-cont">
        <Formik
          validationSchema={schema}
          onSubmit={console.log}
          initialValues={{
            email: "",
            password: "",
          }}
        >
          {({ handleSubmit, handleChange, handleBlur, values, errors }) => (
            <Form noValidate onSubmit={onSubmit}>
              <Row>
                <Form.Group
                  as={Col}
                  lg="12"
                  className="form-field"
                  controlId="validationForEmail"
                >
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    isInvalid={!!errors.email}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row>
                <Form.Group
                  as={Col}
                  lg="12"
                  className="form-field"
                  controlId="validationFormik03"
                >
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password.trim()}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    isInvalid={!!errors.password}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <div className="text-center">
                <Button type="submit" className="custom-btn" disabled={(email&&password)?false:true}>
                  login
                </Button>
              </div>

              <Form.Group className="mb-3 login-text">
                <Form.Text className="text-align">                 
                  <Link to='/forgotpassword' className="login-link"> Forgot Password ?</Link>
                </Form.Text>
              </Form.Group>
            </Form>
          )}
        </Formik>
      </section>
      <Alert variant={errmessage ? "danger" : null}>
        {errmessage && errmessage}
      </Alert>
    </>
  );
}

export default LoginForm;
