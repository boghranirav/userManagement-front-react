import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col } from "shards-react";

import PageTitle from "../../../components/common/PageTitle";
import VehicleImageFrom from "../components/VehicleImageFrom";
import ViewVehicleImage from "../components/ViewVehicleImage";
import { useHttpClient } from "../../../shared/http-hook";
import { AuthContext } from "../../../shared/auth-context";

const VehicleImage = props => {
  const auth = useContext(AuthContext);
  const [loadedVehicle] = useState(props.location.data);
  const [loadedApplication, setLoadedApplication] = useState();
  const { sendRequest } = useHttpClient();
  const [formState, setFormState] = useState(false);

  useEffect(() => {
    console.log(loadedVehicle);
    const fetchApplication = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + `/vehicle/image/${loadedVehicle}`,
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
  }, [formState]);

  const onSubmitHandler = () => {
    setFormState(true);
  };

  const onDeleteApplication = () => {
    setFormState(true);
  };

  return (
    <Container fluid className="main-content-container px-4">
      <Row noGutters className="page-header py-4">
        <PageTitle title="College" md="12" className="ml-sm-auto mr-sm-auto" />
      </Row>
      <Row>
        <Col lg="8">
          <VehicleImageFrom
            click={onSubmitHandler}
            vehicleId={props.location.data}
          />
        </Col>
      </Row>
      <Row>
        <Col lg="6">
          {loadedApplication && loadedApplication.length && (
            <ViewVehicleImage
              vehicle={loadedApplication}
              onDelete={onDeleteApplication}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default VehicleImage;
