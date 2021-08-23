import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../shared/auth-context";
import platform from "platform";
import ip from "ip";

import {
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormInput,
  Button
} from "shards-react";
import GoogleLogin from "react-google-login";

const Login = () => {
  const auth = useContext(AuthContext);
  const detectBrowser = platform.parse(navigator.userAgent);
  const history = useHistory();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const handleEmailChange = e => {
    setLoginEmail(e.currentTarget.value);
  };

  const handlePasswordChange = e => {
    setLoginPassword(e.currentTarget.value);
  };

  const authSumbitHandler = async event => {
    event.preventDefault();
    try {
      const body = JSON.stringify({
        email_id: loginEmail,
        password: loginPassword,
        browser: detectBrowser.name + " " + detectBrowser.version,
        ip_address: ip.address(),
        os:
          detectBrowser.os.family +
          " " +
          detectBrowser.os.version +
          " " +
          detectBrowser.os.architecture
      });

      const responseData = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/authentication/login",
        {
          method: "POST",
          body: body,
          headers: { "Content-Type": "application/json" }
        }
      );

      const response = await responseData.json();
      if (response.success && response.token) {
        auth.login(response.token);
        window.location.href = "/dashboard";
      }
    } catch (err) {}
  };

  const handleLogin = async googleData => {
    const body = JSON.stringify({
      browser: detectBrowser.name + " " + detectBrowser.version,
      ip_address: ip.address(),
      token: googleData.tokenId,
      os:
        detectBrowser.os.family +
        " " +
        detectBrowser.os.version +
        " " +
        detectBrowser.os.architecture
    });

    const responseData = await fetch(
      process.env.REACT_APP_BACKEND_URL + "/authentication/google",
      {
        method: "POST",
        body: body,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    const response = await responseData.json();
    if (response.success && response.token) {
      auth.login(response.token);
      window.location.href = "/dashboard";
    }
  };

  return (
    <Row
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Col lg="4">
        <Card className="mb-4">
          <CardHeader className="border-bottom">
            <h6 className="m-0">Login</h6>
          </CardHeader>
          <ListGroup flush>
            <ListGroupItem className="p-3">
              <Row>
                <Col>
                  <Form onSubmit={authSumbitHandler}>
                    <Row form>
                      <Col md="12" className="form-group">
                        <label htmlFor="txtEmailId">Email Id</label>
                        <FormInput
                          id="txtEmailId"
                          maxLength="50"
                          placeholder="Enter Email Id"
                          value={loginEmail}
                          onChange={handleEmailChange}
                        />
                      </Col>
                    </Row>
                    <Row form>
                      <Col md="12" className="form-group">
                        <label htmlFor="txtPassword">Password</label>
                        <FormInput
                          id="txtPassword"
                          type="password"
                          maxLength="50"
                          placeholder="Enter Password"
                          value={loginPassword}
                          onChange={handlePasswordChange}
                        />
                      </Col>
                    </Row>
                    <Row form>
                      <Col md="12" className="form-group">
                        <Button theme="accent">Login</Button>
                      </Col>
                    </Row>
                    <Row form>
                      <Col md="12" className="form-group">
                        <GoogleLogin
                          clientId="715180532991-um5kroc5a8jb3tskb0lem34m9stebumk.apps.googleusercontent.com"
                          buttonText="Log in with Google"
                          onSuccess={handleLogin}
                          onFailure={handleLogin}
                          cookiePolicy={"single_host_origin"}
                        />
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </Row>
            </ListGroupItem>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;
