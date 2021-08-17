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
import { AuthContext } from "../../../shared/auth-context";

const CollegeForm = props => {
  const auth = useContext(AuthContext);
  const [collegeName, setCollegeName] = useState("");
  const [collegeAddress, setCollegeAddress] = useState("");
  const [collegeEmail, setCollegeEmail] = useState("");
  const [collegeMobile, setCollegeMobile] = useState("");
  const [collegeBrochure, setCollegeBrochure] = useState(null);

  const handleNameChange = e => {
    setCollegeName(e.currentTarget.value);
  };

  const handleAddressChange = e => {
    setCollegeAddress(e.currentTarget.value);
  };

  const handleEmailChange = e => {
    setCollegeEmail(e.currentTarget.value);
  };
  const handleMobileChange = e => {
    setCollegeMobile(e.currentTarget.value);
  };
  const handleBrochureChange = e => {
    if (e.target.files[0]) {
      const file_name = e.target.files[0].name;
      var file_extension = file_name.split(".").pop();
      if (file_extension === "pdf") {
        setCollegeBrochure(e.target.files[0]);
      } else {
        setCollegeBrochure(null);
        alert("Only .pdf file.");
      }
    }
  };

  const onExportHandler = async event => {
    event.preventDefault();
    console.log("Click");
    try {
      const headerAuth = {
        Authorization: `Bearer ${auth.token}`,
        application_id: window.globalVar
      };

      fetch(process.env.REACT_APP_BACKEND_URL + `/college/export`, {
        method: "GET",
        body: null,
        headers: headerAuth
      })
        .then(response => response.blob())
        .then(blob => {
          const url = window.URL.createObjectURL(new Blob([blob]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `college.csv`);
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const sumbitHandler = async event => {
    event.preventDefault();
    const headerAuth = {
      Authorization: `Bearer ${auth.token}`,
      application_id: window.globalVar
    };

    const formData = new FormData();
    formData.append("name", collegeName);
    formData.append("address", collegeAddress);
    formData.append("email_id", collegeEmail);
    formData.append("mobile_no", collegeMobile);
    if (collegeBrochure) {
      formData.append("brochure", collegeBrochure);
      console.log(collegeBrochure);
    }

    try {
      if (props.updateApp && props.updateApp.collegeStatus === "Update") {
        await fetch(
          process.env.REACT_APP_BACKEND_URL +
            `/college/${props.updateApp.collegeId}`,
          {
            method: "PATCH",
            body: formData,
            headers: headerAuth
          }
        );
      } else {
        await fetch(process.env.REACT_APP_BACKEND_URL + "/college/create", {
          method: "POST",
          body: formData,
          headers: headerAuth
        });
      }
    } catch (error) {}
    resetCollege();
  };

  const resetCollege = () => {
    setCollegeName("");
    setCollegeAddress("");
    setCollegeEmail("");
    setCollegeMobile("");
    setCollegeBrochure(null);
    props.updateSubmit();
    props.click();
    document.getElementById("btnSubmit").innerHTML = "Create College";
  };

  useEffect(() => {
    if (props.updateApp) {
      console.log(props.updateApp);
      setCollegeName(props.updateApp.collegeName);
      setCollegeAddress(props.updateApp.collegeAddress);
      setCollegeEmail(props.updateApp.collegeEmail);
      setCollegeMobile(props.updateApp.collegeMobile);
      if (props.updateApp.collegeStatus === "Update") {
        document.getElementById("btnSubmit").innerHTML = "Update College";
      }
    }
  }, [props.updateApp]);

  return (
    <React.Fragment>
      <Card small className="mb-4">
        <CardHeader className="border-bottom">
          <h6 className="m-0">Create College</h6>
        </CardHeader>
        <ListGroup flush>
          <ListGroupItem className="p-3">
            <Row>
              <Col>
                <Form onSubmit={sumbitHandler} encType="multipart/form-data">
                  <Row form>
                    <Col md="12" className="form-group">
                      <label htmlFor="txtName">College Name</label>
                      <FormInput
                        id="txtName"
                        placeholder="College Name"
                        required
                        maxLength="100"
                        value={collegeName}
                        onChange={handleNameChange}
                      />
                    </Col>
                  </Row>

                  <Row form>
                    <Col md="12" className="form-group">
                      <label>Address</label>
                      <FormInput
                        id="txtAddress"
                        placeholder="Address"
                        value={collegeAddress}
                        onChange={handleAddressChange}
                      />
                    </Col>
                  </Row>

                  <Row form>
                    <Col md="6" className="form-group">
                      <label>Email Id</label>
                      <FormInput
                        id="txtEmailId"
                        placeholder="Email Id"
                        maxLength="50"
                        pattern="[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*"
                        value={collegeEmail}
                        onChange={handleEmailChange}
                      />
                    </Col>
                    <Col md="6" className="form-group">
                      <label>Mobile</label>
                      <FormInput
                        id="txtMobile"
                        placeholder="Mobile"
                        value={collegeMobile}
                        onChange={handleMobileChange}
                      />
                    </Col>
                  </Row>

                  <Row form>
                    <Col md="12" className="form-group">
                      <label>File Upload</label>
                      <FormInput type="file" onChange={handleBrochureChange} />
                    </Col>
                  </Row>

                  <Row form>
                    <Col md="3" className="form-group">
                      <Button theme="accent" id="btnSubmit">
                        Create College
                      </Button>
                    </Col>
                    <Col md="3" className="form-group">
                      <Button
                        theme="info"
                        id="btnExport"
                        type="button"
                        onClick={onExportHandler}
                      >
                        Export College
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </ListGroupItem>
        </ListGroup>
      </Card>
    </React.Fragment>
  );
};

export default CollegeForm;
