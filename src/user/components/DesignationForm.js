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

const DesignationForm = props => {
  const auth = useContext(AuthContext);

  const [desName, setDesName] = useState("");
  const [desDescription, setDesDescription] = useState("");

  useEffect(() => {
    if (props.updateDes) {
      setDesName(props.updateDes.designationName);
      setDesDescription(props.updateDes.designationDesc);
      if (props.updateDes.designation === "Update") {
        document.getElementById("btnSubmit").innerHTML = "Update Designation";
      }
    }
  }, [props.updateDes]);

  const handleNameChange = e => {
    setDesName(e.currentTarget.value);
  };

  const handleDescriptionChange = e => {
    setDesDescription(e.currentTarget.value);
  };

  const designationSumbitHandler = async event => {
    event.preventDefault();
    try {
      const body = JSON.stringify({
        name: desName,
        description: desDescription
      });
      const headerAuth = {
        Authorization: `Bearer ${auth.token}`,
        application_id: 0,
        "Content-Type": "application/json"
      };

      if (props.updateDes && props.updateDes.designation === "Update") {
        await fetch(
          process.env.REACT_APP_BACKEND_URL +
            `/designation/${props.updateDes.designationId}`,
          {
            method: "PATCH",
            body: body,
            headers: headerAuth
          }
        );
        document.getElementById("btnSubmit").innerHTML = "Create Designation";
      } else {
        await fetch(process.env.REACT_APP_BACKEND_URL + "/designation/create", {
          method: "POST",
          body: body,
          headers: headerAuth
        });
      }

      setDesName("");
      setDesDescription("");
      props.updateSubmit();
      props.click();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card small className="mb-4">
      <CardHeader className="border-bottom">
        <h6 className="m-0">Create Designation</h6>
      </CardHeader>
      <ListGroup flush>
        <ListGroupItem className="p-3">
          <Row>
            <Col>
              <Form onSubmit={designationSumbitHandler}>
                <Row form>
                  <Col md="12" className="form-group">
                    <label htmlFor="txtName">Designation</label>
                    <FormInput
                      id="txtName"
                      required
                      maxLength="50"
                      placeholder="Enter designation name"
                      value={desName}
                      onChange={handleNameChange}
                    />
                  </Col>
                </Row>
                <Row form>
                  <Col md="12" className="form-group">
                    <label htmlFor="txtApplicationDesc">Description</label>
                    <FormInput
                      id="txtDescription"
                      placeholder="Enter designation description"
                      value={desDescription}
                      onChange={handleDescriptionChange}
                    />
                  </Col>
                </Row>
                <Button theme="accent" id="btnSubmit">
                  Create Designation
                </Button>
              </Form>
            </Col>
          </Row>
        </ListGroupItem>
      </ListGroup>
    </Card>
  );
};

export default DesignationForm;
