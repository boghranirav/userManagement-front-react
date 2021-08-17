import React, { useContext } from "react";
import { Row, Col, Card, CardHeader, CardBody, Button } from "shards-react";
import { AuthContext } from "../../../shared/auth-context";
import { useHttpClient } from "../../../shared/http-hook";

const ViewVehicleImage = props => {
  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpClient();

  const deleteApplication = async appId => {
    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + `/vehicle/image/${appId}`,
        "DELETE",
        null,
        {
          Authorization: `Bearer ${auth.token}`,
          application_id: window.globalVar
        }
      );
      props.onDelete();
    } catch (error) {}
  };

  return (
    <div>
      {/* Default Light Table */}
      <Row>
        <Col>
          <Card small className="mb-4">
            <CardHeader className="border-bottom">
              <h6 className="m-0">View Product</h6>
            </CardHeader>
            <CardBody className="p-0 pb-3">
              <table className="table mb-0">
                <thead className="bg-light">
                  <tr>
                    <th scope="col" className="border-0">
                      Name
                    </th>
                    <th scope="col" className="border-0">
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {props.vehicle.map(vehicle => (
                    <tr key={vehicle.image_id}>
                      <td>
                        <img
                          alt={vehicle.image_path}
                          src={`${process.env.REACT_APP_BACKEND_URL}/vehicle/${vehicle.image_path}`}
                          style={{ height: 200, width: 200 }}
                        />
                      </td>
                      <td>
                        <Button
                          theme="danger"
                          className="mb-2 mr-1"
                          onClick={() => deleteApplication(vehicle.image_id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ViewVehicleImage;
