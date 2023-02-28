import React from "react";
import { Helmet } from "react-helmet";
import Layout from "../../components/layouts";
import RegisterForm from "../../components/layouts/RegisterForm/registerForm";
import { Container,Row,Col } from "react-bootstrap";

function Register() {
  const pageTitle = "Register yourself";
  return (
    <>
      <Layout>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{pageTitle}</title>
          <meta name="description" content="register page for new members" />
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
        <Container className="register-form">
          <Row>
            <Col lg={12}>
              <h2>REGISTER    </h2>
            </Col>
          </Row>
          <Row>
            <RegisterForm />
          </Row>
        </Container>
      </Layout>
    </>
  );
}

export default Register;
