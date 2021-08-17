import React, { useState, useEffect, useContext } from "react";

import {
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormGroup,
  FormInput,
  FormSelect,
  Button
} from "shards-react";
import { AuthContext } from "../../shared/auth-context";

const UserAccountDetails = props => {
  const auth = useContext(AuthContext);

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userMobile, setUserMobile] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [userDesignation, setUserDesignation] = useState("0");

  const handleDesignationChange = e => {
    setUserDesignation(e.currentTarget.value);
  };

  const handleNameChange = e => {
    setUserName(e.currentTarget.value);
  };

  const handleEmailChange = e => {
    setUserEmail(e.currentTarget.value);
  };

  const handlePasswordChange = e => {
    setUserPassword(e.currentTarget.value);
  };

  const handleMobileChange = e => {
    setUserMobile(e.currentTarget.value);
  };

  const handleAddressChange = e => {
    setUserAddress(e.currentTarget.value);
  };

  const onSumbitHandler = async event => {
    event.preventDefault();
    if (userDesignation === "0") {
      alert("Please select designation.");
      return;
    }
    if (!props.updateUser && userPassword === "") {
      alert("Please enter password.");
      return;
    }
    try {
      const headerAuth = {
        Authorization: `Bearer ${auth.token}`,
        application_id: 0,
        "Content-Type": "application/json"
      };
      const body = JSON.stringify({
        name: userName,
        email_id: userEmail,
        password: userPassword,
        designation_id: userDesignation,
        mobile_no: userMobile,
        address: userAddress
      });

      if (props.updateUser && props.updateUser.userStatus === "Update") {
        await fetch(
          process.env.REACT_APP_BACKEND_URL +
            `/user/${props.updateUser.userId}`,
          {
            method: "PATCH",
            body: body,
            headers: headerAuth
          }
        );
        document.getElementById("btnSubmit").innerHTML = "Create User";
        document.getElementById("divPassword").style.visibility = "visible";
      } else {
        await fetch(process.env.REACT_APP_BACKEND_URL + "/user/create", {
          method: "POST",
          body: body,
          headers: headerAuth
        });
      }

      resetForm();
    } catch (error) {
      console.log(error);
    }
  };

  const resetForm = () => {
    setUserName("");
    setUserEmail("");
    setUserPassword("");
    setUserMobile("");
    setUserAddress("");
    setUserDesignation("0");
    props.updateSubmit();
    props.click();
  };

  useEffect(() => {
    if (props.updateUser) {
      setUserName(props.updateUser.name);
      setUserEmail(props.updateUser.email);
      setUserPassword("");
      setUserMobile(props.updateUser.mobile);
      setUserAddress(props.updateUser.address);
      setUserDesignation(props.updateUser.designationId);
      if (props.updateUser.userStatus === "Update") {
        document.getElementById("btnSubmit").innerHTML = "Update User";
        document.getElementById("divPassword").style.visibility = "hidden";
      }
    }
  }, [props.updateUser]);

  return (
    <Card small className="mb-4">
      <CardHeader className="border-bottom">
        <h6 className="m-0">Account Details</h6>
      </CardHeader>
      <ListGroup flush>
        <ListGroupItem className="p-3">
          <Row>
            <Col>
              <Form onSubmit={onSumbitHandler}>
                <Row form>
                  {/* First Name */}
                  <Col md="12" className="form-group">
                    <label htmlFor="feFirstName">Full Name</label>
                    <FormInput
                      id="txtName"
                      maxLength="50"
                      required
                      placeholder="Full Name"
                      value={userName}
                      onChange={handleNameChange}
                    />
                  </Col>
                </Row>
                <Row form>
                  {/* Email */}
                  <Col md="6" className="form-group">
                    <label htmlFor="feEmail">Email</label>
                    <FormInput
                      type="email"
                      id="txtEmail"
                      maxLength="50"
                      required
                      pattern="[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*"
                      placeholder="Email Address"
                      value={userEmail}
                      onChange={handleEmailChange}
                    />
                  </Col>
                  <Col md="6" className="form-group" id="divPassword">
                    <label htmlFor="fePassword">Password</label>
                    <FormInput
                      type="password"
                      id="txtPassword"
                      maxLength="30"
                      placeholder="Password"
                      value={userPassword}
                      onChange={handlePasswordChange}
                    />
                  </Col>
                </Row>
                <Row form>
                  <Col md="6" className="form-group">
                    <label htmlFor="fePhone">Mobile No</label>
                    <FormInput
                      id="txtMobile"
                      placeholder="Mobile"
                      maxLength="20"
                      value={userMobile}
                      onChange={handleMobileChange}
                    />
                  </Col>
                  <Col md="6" className="form-group">
                    <label htmlFor="feInputState">Select Designation</label>
                    <FormSelect
                      id="feInputState"
                      value={userDesignation}
                      onChange={handleDesignationChange}
                    >
                      <option value="0">Select Designation</option>
                      {props.designationList.map(designation => (
                        <option value={designation.designation_id}>
                          {designation.name}
                        </option>
                      ))}
                    </FormSelect>
                  </Col>
                </Row>
                <FormGroup>
                  <label htmlFor="feAddress">Address</label>
                  <FormInput
                    id="txtAddress"
                    placeholder="Address"
                    value={userAddress}
                    onChange={handleAddressChange}
                  />
                </FormGroup>

                <Button theme="accent" id="btnSubmit">
                  Create User
                </Button>
              </Form>
            </Col>
          </Row>
        </ListGroupItem>
      </ListGroup>
    </Card>
  );
};

export default UserAccountDetails;
