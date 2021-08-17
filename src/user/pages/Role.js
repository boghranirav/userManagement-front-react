import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col } from "shards-react";
import { useHttpClient } from "../../shared/http-hook";

import PageTitle from "../../components/common/PageTitle";
import RoleForm from "../components/RoleForm";
import ViewRole from "../components/ViewRole";
import { AuthContext } from "../../shared/auth-context";

const Role = () => {
  const auth = useContext(AuthContext);

  const [loadedRole, setLoadedRole] = useState();
  const { sendRequest } = useHttpClient();
  const [formState, setFormState] = useState(false);
  const [updateData, setUpdateData] = useState(null);
  const [roleDesignationList, setRoleDesignationList] = useState("");
  const [roleApplicationList, setRoleApplicationList] = useState("");

  const headerAuth = {
    Authorization: `Bearer ${auth.token}`,
    application_id: 0
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + `/role/list`,
          "GET",
          null,
          headerAuth
        );

        setLoadedRole(responseData.DATA);
      } catch (error) {}
    };
    fetch();
    setFormState(false);
  }, [sendRequest, formState, updateData]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + `/designation/list`,
          "GET",
          null,
          headerAuth
        );
        setRoleDesignationList(responseData.DATA);
      } catch (error) {}
    };
    fetch();
  }, [sendRequest]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + `/application/list`,
          "GET",
          null,
          headerAuth
        );
        setRoleApplicationList(responseData.DATA);
      } catch (error) {}
    };
    fetch();
  }, [sendRequest]);

  const onSubmitHandler = () => {
    setFormState(true);
  };

  const onDeleteRole = () => {
    setFormState(true);
  };

  const onEditRole = desDetails => {
    setUpdateData(desDetails);
  };

  const onEditRoleSubmit = () => {
    setUpdateData(null);
  };

  return (
    <Container fluid className="main-content-container px-4">
      <Row noGutters className="page-header py-4">
        <PageTitle title="Role" md="12" className="ml-sm-auto mr-sm-auto" />
      </Row>
      <Row>
        <Col lg="8">
          {roleDesignationList &&
            roleApplicationList &&
            roleDesignationList.length &&
            roleApplicationList.length && (
              <RoleForm
                click={onSubmitHandler}
                updateRole={updateData}
                updateSubmit={onEditRoleSubmit}
                designationList={roleDesignationList}
                applicationList={roleApplicationList}
              />
            )}
        </Col>
      </Row>
      <Row>
        <Col lg="12">
          {loadedRole && loadedRole.length && (
            <ViewRole
              role={loadedRole}
              onDelete={onDeleteRole}
              onEdit={onEditRole}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Role;
