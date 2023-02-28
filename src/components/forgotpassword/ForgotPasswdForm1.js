import React, { useState } from "react";
import { Form, Row, Col, Container, Button } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import Alert from "react-bootstrap/Alert";
function ForgotPasswdForm1({
  email,
  setEmail,
  sendCode,
  CodeResponse,
  CodeErr,
}) {
  const SetEmail = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
    console.log(e.target.value);
  };
  const schema = yup.object().shape({
    email: yup
      .string()
      .required("Email is required")
      .email("Enter Valid Email address"),
  });
  return (
    <>
      <Container>
        <Row>
          <Col lg={12}>
            <Formik
              validationSchema={schema}
              onSubmit={console.log}
              initialValues={{
                email: "",
              }}
            >
              {({ handleSubmit, handleChange, handleBlur, values, errors }) => (
                <Form noValidate onSubmit={sendCode}>
                  <Row>
                    <Form.Group
                      as={Col}
                      lg="12"
                      className="form-field"
                      controlId="validationForEmail"
                      onSubmit={(e) => {
                        sendCode(e);
                        handleSubmit(e);
                      }}
                    >
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => {
                          SetEmail(e);
                          handleChange(e);
                        }}
                        isInvalid={!!errors.email}
                      />

                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <div className="text-center mt-4 mb-4">
                    <Button type="submit" className="custom-btn">
                      Send Code
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ForgotPasswdForm1;
