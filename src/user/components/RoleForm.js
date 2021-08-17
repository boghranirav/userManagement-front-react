import React, { useState, useEffect, useContext } from "react";

import {
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormRadio,
  FormCheckbox,
  FormSelect,
  Button
} from "shards-react";
import { AuthContext } from "../../shared/auth-context";

const RoleForm = props => {
  const auth = useContext(AuthContext);
  const [roleDesignation, setRoleDesignation] = useState("0");
  const [roleApplication, setRoleApplication] = useState("0");
  const [roleCreate, setRoleCreate] = useState(false);
  const [roleRead, setRoleRead] = useState(false);
  const [roleDelete, setRoleDelete] = useState(false);
  const [roleUpdate, setRoleUpdate] = useState(false);
  const [roleDeny, setRoleDeny] = useState(false);

  const handleDesignationChange = e => {
    setRoleDesignation(e.currentTarget.value);
  };

  const handleApplicationChange = e => {
    setRoleApplication(e.currentTarget.value);
  };

  const handleRoleCreateChange = () => {
    setRoleCreate(!roleCreate);
  };

  const handleRoleReadChange = () => {
    setRoleRead(!roleRead);
  };
  const handleRoleUpdateChange = () => {
    setRoleUpdate(!roleUpdate);
  };
  const handleRoleDeleteChange = () => {
    setRoleDelete(!roleDelete);
  };
  const handleRoleDenyChange = () => {
    setRoleDeny(!roleDeny);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    console.log(roleApplication, roleDesignation);
    if (roleApplication === "0" || roleDesignation === "0") {
      alert("Invalid Data.");
    } else {
      try {
        const headerAuth = {
          Authorization: `Bearer ${auth.token}`,
          application_id: 0,
          "Content-Type": "application/json"
        };

        const body = JSON.stringify({
          designation_id: roleDesignation,
          application_id: roleApplication,
          read_data: roleRead,
          create_data: roleCreate,
          update_data: roleUpdate,
          delete_data: roleDelete,
          deny_data: roleDeny
        });

        if (props.updateRole && props.updateRole.roleState === "Update") {
          await fetch(
            process.env.REACT_APP_BACKEND_URL +
              `/role/${props.updateRole.roleId}`,
            {
              method: "PATCH",
              body: body,
              headers: headerAuth
            }
          );
          document.getElementById("btnSubmit").innerHTML = "Create Role";
        } else {
          await fetch(process.env.REACT_APP_BACKEND_URL + "/role/create", {
            method: "POST",
            body: body,
            headers: headerAuth
          });
        }

        resetState();
        props.updateSubmit();
        props.click();
      } catch (error) {}
    }
  };

  const resetState = () => {
    setRoleDesignation("0");
    setRoleApplication("0");
    setRoleCreate(false);
    setRoleRead(false);
    setRoleDelete(false);
    setRoleUpdate(false);
    setRoleDeny(false);
  };

  useEffect(() => {
    if (props.updateRole) {
      setRoleDesignation(props.updateRole.designation_id);
      setRoleApplication(props.updateRole.application_id);
      console.log(props.updateRole.read_data);
      setRoleCreate(props.updateRole.create_data);
      setRoleRead(props.updateRole.read_data);
      setRoleDelete(props.updateRole.delete_data);
      setRoleUpdate(props.updateRole.update_data);
      setRoleDeny(props.updateRole.deny_data);
      if (props.updateRole.roleState === "Update") {
        document.getElementById("btnSubmit").innerHTML = "Update Role";
      }
    }
  }, [props.updateRole]);

  return (
    <Card small className="mb-4">
      <CardHeader className="border-bottom">
        <h6 className="m-0">Create Role</h6>
      </CardHeader>
      <ListGroup flush>
        <ListGroupItem className="p-3">
          <Row>
            <Col>
              <Form onSubmit={handleSubmit}>
                <Row form>
                  <Col md="6" className="form-group">
                    <label>Select Designation</label>
                    <FormSelect
                      id="selectDesignation"
                      value={roleDesignation}
                      onChange={handleDesignationChange}
                    >
                      <option value="0" key="0">
                        Select Designation
                      </option>
                      {props.designationList.map(designation => (
                        <option
                          value={designation.designation_id}
                          key={designation.designation_id}
                        >
                          {designation.name}
                        </option>
                      ))}
                    </FormSelect>
                  </Col>
                  <Col md="6" className="form-group">
                    <label>Select Application</label>
                    <FormSelect
                      id="selectApplication"
                      value={roleApplication}
                      onChange={handleApplicationChange}
                    >
                      <option value="0" key="0">
                        Select Application
                      </option>
                      {props.applicationList.map(application => (
                        <option
                          value={application.application_id}
                          key={application.application_id}
                        >
                          {application.name}
                        </option>
                      ))}
                    </FormSelect>
                  </Col>
                </Row>

                <Row form>
                  <Col md="6" className="form-group">
                    <strong className="text-muted d-block mb-6">
                      Allow access
                    </strong>
                    <fieldset>
                      <FormRadio
                        id="radioAllow"
                        name="radioApplication"
                        value="1"
                        checked={roleDeny}
                        onChange={handleRoleDenyChange}
                      >
                        Allow
                      </FormRadio>
                      <FormRadio
                        id="radioDeny"
                        name="radioApplication"
                        value="0"
                        checked={!roleDeny}
                        onChange={handleRoleDenyChange}
                      >
                        Deny
                      </FormRadio>
                    </fieldset>
                  </Col>
                </Row>
                <Row form>
                  <Col md="3" className="mb-3">
                    <fieldset>
                      <FormCheckbox
                        id="chkCreate"
                        checked={roleCreate}
                        onChange={handleRoleCreateChange}
                      >
                        Create
                      </FormCheckbox>
                    </fieldset>
                  </Col>
                  <Col md="3" className="mb-3">
                    <fieldset>
                      <FormCheckbox
                        id="chkRead"
                        checked={roleRead}
                        onChange={handleRoleReadChange}
                      >
                        Read
                      </FormCheckbox>
                    </fieldset>
                  </Col>
                  <Col sm="12" md="3" className="mb-3">
                    <fieldset>
                      <FormCheckbox
                        id="chkUpdate"
                        checked={roleUpdate}
                        onChange={handleRoleUpdateChange}
                      >
                        Update
                      </FormCheckbox>
                    </fieldset>
                  </Col>
                  <Col sm="12" md="3" className="mb-3">
                    <fieldset>
                      <FormCheckbox
                        id="chkDelete"
                        checked={roleDelete}
                        onChange={handleRoleDeleteChange}
                      >
                        Delete
                      </FormCheckbox>
                    </fieldset>
                  </Col>
                </Row>
                <Button theme="accent" id="btnSubmit">
                  Create Role
                </Button>
              </Form>
            </Col>
          </Row>
        </ListGroupItem>
      </ListGroup>
    </Card>
  );
};

export default RoleForm;
