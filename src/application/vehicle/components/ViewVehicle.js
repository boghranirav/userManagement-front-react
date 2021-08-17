import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, CardHeader, CardBody, Button } from "shards-react";
import { AuthContext } from "../../../shared/auth-context";
import { useHttpClient } from "../../../shared/http-hook";

const ViewVehicle = props => {
  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpClient();

  const deleteApplication = async appId => {
    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + `/vehicle/${appId}`,
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

  const updateApplication = appDetails => {
    props.onEdit(appDetails);
  };

  return (
    <div>
      {/* Default Light Table */}
      <Row>
        <Col>
          <Card small className="mb-4">
            <CardHeader className="border-bottom">
              <h6 className="m-0">View Vehicle</h6>
            </CardHeader>
            <CardBody className="p-0 pb-3">
              <table className="table mb-0">
                <thead className="bg-light">
                  <tr>
                    <th scope="col" className="border-0">
                      Name
                    </th>
                    <th scope="col" className="border-0">
                      Manufacturer
                    </th>
                    <th scope="col" className="border-0">
                      Type
                    </th>
                    <th scope="col" className="border-0">
                      Fuel Type
                    </th>
                    <th scope="col" className="border-0">
                      Colour
                    </th>
                    <th scope="col" className="border-0">
                      Price
                    </th>
                    <th scope="col" className="border-0">
                      Edit
                    </th>
                    <th scope="col" className="border-0">
                      Delete
                    </th>
                    <th scope="col" className="border-0">
                      View Images
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {props.vehicle.map(vehicle => (
                    <tr key={vehicle.vehicle_id}>
                      <td>{vehicle.name}</td>
                      <td>{vehicle.manufacturer}</td>
                      <td>{vehicle.vehicle_type}</td>
                      <td>{vehicle.fuel_type}</td>
                      <td>{vehicle.colour}</td>
                      <td>{vehicle.price}</td>
                      <td>
                        <Button
                          theme="primary"
                          className="mb-2 mr-1"
                          onClick={() =>
                            updateApplication({
                              vehicleStatus: "Update",
                              vehicleId: vehicle.vehicle_id,
                              vehicleName: vehicle.name,
                              vehicleManufacturer: vehicle.manufacturer,
                              vehiclePrice: vehicle.price,
                              vehicleColour: vehicle.colour,
                              vehicleFuelType: vehicle.fuel_type,
                              vehicleVehicleType: vehicle.vehicle_type
                            })
                          }
                        >
                          Edit
                        </Button>
                      </td>
                      <td>
                        <Button
                          theme="danger"
                          className="mb-2 mr-1"
                          onClick={() => deleteApplication(vehicle.vehicle_id)}
                        >
                          Delete
                        </Button>
                      </td>
                      <td>
                        <Link
                          to={{
                            pathname: "/view-vehicle-image",
                            data: vehicle.vehicle_id,
                            applicationId: props.applicationId
                          }}
                        >
                          View Images
                        </Link>
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

export default ViewVehicle;
