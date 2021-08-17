import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col } from "shards-react";

import PageTitle from "../../../components/common/PageTitle";
import CollegeForm from "../components/CollegeForm";
import ViewCollege from "../components/ViewCollege";
import { useHttpClient } from "../../../shared/http-hook";
import { AuthContext } from "../../../shared/auth-context";

const College = () => {
  const auth = useContext(AuthContext);

  const [loadedApplication, setLoadedApplication] = useState();
  const { sendRequest } = useHttpClient();
  const [formState, setFormState] = useState(false);
  const [updateData, setUpdateData] = useState(null);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + `/college/list`,
          "GET",
          null,
          {
            Authorization: `Bearer ${auth.token}`,
            application_id: window.globalVar
          }
        );
        setLoadedApplication(responseData.DATA);
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
        <PageTitle title="College" md="12" className="ml-sm-auto mr-sm-auto" />
      </Row>
      <Row>
        <Col lg="8">
          <CollegeForm
            click={onSubmitHandler}
            updateApp={updateData}
            updateSubmit={onEditApplicationSubmit}
          />
        </Col>
      </Row>
      <Row>
        <Col lg="12">
          {loadedApplication && loadedApplication.length && (
            <ViewCollege
              college={loadedApplication}
              onDelete={onDeleteApplication}
              onEdit={onEditApplication}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default College;
