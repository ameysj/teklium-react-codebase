import React, { useState } from "react";
import { Helmet } from "react-helmet";
import Layout from "../../components/layouts";
import { Container,Row,Col } from "react-bootstrap";
import ForgotPasswdForm1 from "../../components/forgotpassword/ForgotPasswdForm1";
import ForgotPasswdForm2 from "../../components/forgotpassword/ForgotPasswdForm2";
import { CognitoUser } from "amazon-cognito-identity-js";
import UserPool from "../../Constants/Cognito_IDs/UserPool";
function ForgotPassword() {
    const [stage, setStage] = useState(1); // 1 = email stage, 2 = code stage
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [CodeResponse, setCodeResponse] = useState("");
    const [CodeErr, setCodeErr] = useState("");
  
    const getUser = () => {
      return new CognitoUser({
        Username: email,
        Pool: UserPool, 
      });
    };
  
    const sendCode = event => {
      event.preventDefault();
  
      getUser().forgotPassword({
        onSuccess: data => {
          setCodeErr("");
          console.log("onSuccess:", data);
          if (stage===2){
            setCodeResponse(CodeResponse);
          };
          setStage(2);
        },
        onFailure: err => {
          console.error("onFailure:", err);
          setCodeResponse("");
          setCodeErr(err);
        },
        inputVerificationCode: data => {
            setCodeErr("");
            console.log("onSuccess2:", data);
            if (stage===2){
                setCodeResponse(data);
              };
            setStage(2);
        }
      });
    };
  
    const resetPassword = event => {
      event.preventDefault();
      setCodeErr("");
      setCodeResponse("");
  
      if (password !== confirmPassword) {
        console.error("Passwords are not the same");
        return;
      }
  
      getUser().confirmPassword(code, password, {
        onSuccess: data => {
            setCodeErr("");
            setCodeResponse("SUCCESS")
          console.log("onSuccess:", data);

        },
        onFailure: err => {
            setCodeResponse("");
            setCodeErr(err.message)
          console.error("onFailure:", err);
        }
      });
    };

  return (<>
  <Layout>
      {stage === 1 && <ForgotPasswdForm1 email={email} setEmail={setEmail} sendCode={sendCode} CodeResponse={CodeResponse} CodeErr={CodeErr}/>}
      {stage === 2 && <ForgotPasswdForm2 setCode={setCode} sendCode={sendCode} setPassword={setPassword} setConfirmPassword={setConfirmPassword} resetPassword={resetPassword} CodeResponse={CodeResponse} CodeErr={CodeErr} password={password} confirmPassword={confirmPassword} code={code}/>}
  </Layout>
  </>);
}

export default ForgotPassword;
