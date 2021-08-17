import React, { useContext, useState } from "react";
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

const VehicleImageFrom = props => {
  const auth = useContext(AuthContext);
  const [vehicleImage, setVehicleImage] = useState(null);

  const handleImageChange = e => {
    setVehicleImage(e.target.files[0]);
  };

  const sumbitHandler = async event => {
    event.preventDefault();

    if (!vehicleImage) {
      alert("Please select image.");
      return;
    }

    const headerAuth = {
      Authorization: `Bearer ${auth.token}`,
      application_id: window.globalVar
    };

    const formData = new FormData();
    formData.append("vehicle_id", props.vehicleId);
    if (vehicleImage) {
      formData.append("image", vehicleImage);
    }
    console.log(vehicleImage);
    try {
      await fetch(process.env.REACT_APP_BACKEND_URL + `/vehicle/image`, {
        method: "POST",
        body: formData,
        headers: headerAuth
      });

      props.click();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <Card small className="mb-4">
        <CardHeader className="border-bottom">
          <h6 className="m-0">View Images</h6>
        </CardHeader>
        <ListGroup flush>
          <ListGroupItem className="p-3">
            <Row>
              <Col>
                <Form onSubmit={sumbitHandler} encType="multipart/form-data">
                  <Row form>
                    <Col md="12" className="form-group">
                      <FormInput type="file" onChange={handleImageChange} />
                    </Col>
                  </Row>

                  <Button theme="accent" id="btnSubmit">
                    Create Image
                  </Button>
                </Form>
              </Col>
            </Row>
          </ListGroupItem>
        </ListGroup>
      </Card>
    </React.Fragment>
  );
};

export default VehicleImageFrom;
