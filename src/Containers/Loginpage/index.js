import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Helmet from "react-helmet";
import Layout from "../../components/layouts";
import LoginForm from "../../components/layouts/loginForm/LoginForm";

function Login() {
  const pageTitle = "Login";

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{pageTitle}</title>
        <meta name="description" content="register page for new members" />
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <Layout>
        <Container className="login-form">
          <Row>
            <Col lg={12}>
              <h2>Login</h2>
              <LoginForm />
            </Col>
          </Row>
        </Container>
      </Layout>
    </>
  );
}

export default Login;
