import React from "react";
import { Container, Row } from "shards-react";
import PageTitle from "../../components/common/PageTitle";

const Dashboard = () => {
  return (
    <Container fluid className="main-content-container px-4">
      <Row noGutters className="page-header py-4">
        <PageTitle
          title="Dashboard"
          md="12"
          className="ml-sm-auto mr-sm-auto"
        />
      </Row>
    </Container>
  );
};

export default Dashboard;
