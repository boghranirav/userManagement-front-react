import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col } from "shards-react";

import PageTitle from "../../components/common/PageTitle";
import DesignationForm from "../components/DesignationForm";
import ViewDesignation from "../components/ViewDesignation";
import { AuthContext } from "../../shared/auth-context";

const Designation = () => {
  const auth = useContext(AuthContext);
  const [loadedDesignation, setLoadedDesignation] = useState();
  const [formState, setFormState] = useState(false);
  const [updateData, setUpdateData] = useState(null);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const responseData = await fetch(
          process.env.REACT_APP_BACKEND_URL + `/designation/list`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
              application_id: 0
            }
          }
        );
        const response = await responseData.json();
        setLoadedDesignation(response.DATA);
      } catch (error) {}
    };
    fetchApplication();
    setFormState(false);
  }, [formState, updateData]);

  const onSubmitHandler = () => {
    setFormState(true);
  };

  const onDeleteDesignation = () => {
    setFormState(true);
  };

  const onEditDesignation = desDetails => {
    setUpdateData(desDetails);
  };

  const onEditDesignationSubmit = () => {
    setUpdateData(null);
  };

  return (
    <Container fluid className="main-content-container px-4">
      <Row noGutters className="page-header py-4">
        <PageTitle
          title="Designation"
          md="12"
          className="ml-sm-auto mr-sm-auto"
        />
      </Row>
      <Row>
        <Col lg="8">
          <DesignationForm
            click={onSubmitHandler}
            updateDes={updateData}
            updateSubmit={onEditDesignationSubmit}
          />
        </Col>
      </Row>
      <Row>
        <Col lg="12">
          {loadedDesignation && loadedDesignation.length && (
            <ViewDesignation
              designation={loadedDesignation}
              onDelete={onDeleteDesignation}
              onEdit={onEditDesignation}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Designation;
