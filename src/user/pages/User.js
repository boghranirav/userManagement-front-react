import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col } from "shards-react";
import { useHttpClient } from "../../shared/http-hook";

import PageTitle from "../../components/common/PageTitle";
import UserAccountDetails from "../components/UserAccountDetails";
import ViewUser from "../components/ViewUser";
import { AuthContext } from "../../shared/auth-context";

const User = () => {
  const auth = useContext(AuthContext);

  const [loadedUser, setLoadedUser] = useState();
  const { sendRequest } = useHttpClient();
  const [formState, setFormState] = useState(false);
  const [updateData, setUpdateData] = useState(null);
  const [designationList, setDesignationList] = useState("");
  const headerAuth = {
    Authorization: `Bearer ${auth.token}`,
    application_id: 0
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + `/user/list`,
          "GET",
          null,
          headerAuth
        );
        setLoadedUser(responseData.DATA);
      } catch (error) {}
    };
    fetchUser();
    setFormState(false);
  }, [sendRequest, formState, updateData]);

  const onSubmitHandler = () => {
    setFormState(true);
  };

  const onDelete = () => {
    setFormState(true);
  };

  const onEdit = items => {
    setUpdateData(items);
  };

  const onEditSubmit = () => {
    setUpdateData(null);
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + `/designation/list`,
          "GET",
          null,
          headerAuth
        );
        setDesignationList(responseData.DATA);
      } catch (error) {}
    };
    fetch();
  }, []);

  return (
    <Container fluid className="main-content-container px-4">
      <Row noGutters className="page-header py-4">
        <PageTitle
          title="User Profile"
          md="12"
          className="ml-sm-auto mr-sm-auto"
        />
      </Row>
      <Row>
        <Col lg="8">
          {designationList && designationList.length && (
            <UserAccountDetails
              click={onSubmitHandler}
              updateUser={updateData}
              updateSubmit={onEditSubmit}
              designationList={designationList}
            />
          )}
        </Col>
      </Row>
      <Row>
        <Col lg="12">
          {loadedUser && loadedUser.length && (
            <ViewUser users={loadedUser} onDelete={onDelete} onEdit={onEdit} />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default User;
