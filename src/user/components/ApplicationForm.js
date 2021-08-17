import React, { useState, useEffect, useContext } from "react";
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
import { AuthContext } from "../../shared/auth-context";

const ApplicationForm = props => {
  const auth = useContext(AuthContext);
  const [appName, setAppName] = useState("");
  const [appDescription, setAppDescription] = useState("");

  useEffect(() => {
    if (props.updateApp) {
      setAppName(props.updateApp.appName);
      setAppDescription(props.updateApp.appDesc);
      if (props.updateApp.app === "Update") {
        document.getElementById("btnSubmit").innerHTML = "Update Application";
      }
    }
  }, [props.updateApp]);

  const handleNameChange = e => {
    setAppName(e.currentTarget.value);
  };

  const handleDescriptionChange = e => {
    setAppDescription(e.currentTarget.value);
  };

  const placeSumbitHandler = async event => {
    event.preventDefault();
    try {
      const body = JSON.stringify({
        name: appName.trim(),
        description: appDescription.trim()
      });

      const headerAuth = {
        Authorization: `Bearer ${auth.token}`,
        application_id: 0,
        "Content-Type": "application/json"
      };

      if (props.updateApp && props.updateApp.app === "Update") {
        await fetch(
          process.env.REACT_APP_BACKEND_URL +
            `/application/${props.updateApp.appId}`,
          {
            method: "PATCH",
            body: body,
            headers: headerAuth
          }
        );
        document.getElementById("btnSubmit").innerHTML = "Create Application";
      } else {
        await fetch(process.env.REACT_APP_BACKEND_URL + "/application/create", {
          method: "POST",
          body: body,
          headers: headerAuth
        });
      }

      setAppName("");
      setAppDescription("");
      props.updateSubmit();
      props.click();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card small className="mb-4">
      <CardHeader className="border-bottom">
        <h6 className="m-0">Create Application</h6>
      </CardHeader>
      <ListGroup flush>
        <ListGroupItem className="p-3">
          <Row>
            <Col>
              <Form onSubmit={placeSumbitHandler}>
                <Row form>
                  <Col md="12" className="form-group">
                    <label htmlFor="txtName">Application Name</label>
                    <FormInput
                      required
                      id="txtName"
                      maxLength="50"
                      placeholder="Enter application name"
                      value={appName}
                      onChange={handleNameChange}
                    />
                  </Col>
                </Row>
                <Row form>
                  <Col md="12" className="form-group">
                    <label htmlFor="txtApplicationDesc">Description</label>
                    <FormInput
                      required
                      id="txtDescription"
                      placeholder="Enter application description"
                      value={appDescription}
                      onChange={handleDescriptionChange}
                    />
                  </Col>
                </Row>
                <Button theme="accent" id="btnSubmit">
                  Create Application
                </Button>
              </Form>
            </Col>
          </Row>
        </ListGroupItem>
      </ListGroup>
    </Card>
  );
};

export default ApplicationForm;
