import React, { useContext, useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import { Container, Row, Col } from "shards-react";
import { useHttpClient } from "../../shared/http-hook";

import PageTitle from "../../components/common/PageTitle";
import ApplicationForm from "../components/ApplicationForm";
import ViewApplication from "../components/ViewApplication";
import { AuthContext } from "../../shared/auth-context";

const CreateApplication = () => {
  const auth = useContext(AuthContext);

  const [loadedApplication, setLoadedApplication] = useState();
  const { sendRequest } = useHttpClient();
  const [formState, setFormState] = useState(false);
  const [updateData, setUpdateData] = useState(null);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const responseData = await fetch(
          process.env.REACT_APP_BACKEND_URL + `/application/list`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
              application_id: 0
            }
          }
        );
        const response = await responseData.json();
        setLoadedApplication(response.DATA);
      } catch (error) {}
    };
    fetchApplication();
    setFormState(false);
  }, [sendRequest, formState, updateData]);

  const onSubmitHandler = () => {
    setFormState(true);
  };

  const onDeleteApplication = () => {
    setFormState(true);
  };

  const onEditApplication = appDetails => {
    setUpdateData(appDetails);
  };

  const onEditApplicationSubmit = () => {
    setUpdateData(null);
  };

  return (
    <Container fluid className="main-content-container px-4">
      <Row noGutters className="page-header py-4">
        <PageTitle
          title="Application"
          md="12"
          className="ml-sm-auto mr-sm-auto"
        />
      </Row>
      <Row>
        <Col lg="8">
          <ApplicationForm
            click={onSubmitHandler}
            updateApp={updateData}
            updateSubmit={onEditApplicationSubmit}
          />
        </Col>
      </Row>
      <Row>
        <Col lg="12">
          {loadedApplication && loadedApplication.length && (
            <ViewApplication
              application={loadedApplication}
              onDelete={onDeleteApplication}
              onEdit={onEditApplication}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default CreateApplication;
