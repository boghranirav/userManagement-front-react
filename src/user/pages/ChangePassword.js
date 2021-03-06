import React from "react";
import { Container, Row, Col } from "shards-react";

import PageTitle from "../../components/common/PageTitle";
import ChangePasswordForm from "../components/ChangePasswordForm";

const ChangePassword = () => (
  <Container fluid className="main-content-container px-4">
    <Row noGutters className="page-header py-4">
      <PageTitle
        title="Change Password"
        md="12"
        className="ml-sm-auto mr-sm-auto"
      />
    </Row>
    <Row>
      <Col lg="6">
        <ChangePasswordForm />
      </Col>
    </Row>
  </Container>
);

export default ChangePassword;
