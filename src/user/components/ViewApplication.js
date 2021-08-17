import React, { useContext } from "react";
import { Row, Col, Card, CardHeader, CardBody, Button } from "shards-react";
import { AuthContext } from "../../shared/auth-context";
// import { useHttpClient } from "../../shared/http-hook";

const ViewApplication = props => {
  // const { sendRequest } = useHttpClient();
  const auth = useContext(AuthContext);

  const deleteApplication = async appId => {
    try {
      await fetch(process.env.REACT_APP_BACKEND_URL + `/application/${appId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${auth.token}`,
          application_id: 0
        }
      });
      props.onDelete();
    } catch (error) {}
  };

  const updateApplication = appDetails => {
    props.onEdit(appDetails);
  };

  return (
    <div>
      <Row>
        <Col>
          <Card small className="mb-4">
            <CardHeader className="border-bottom">
              <h6 className="m-0">View Application</h6>
            </CardHeader>
            <CardBody className="p-0 pb-3">
              <table className="table mb-0">
                <thead className="bg-light">
                  <tr>
                    <th scope="col" className="border-0">
                      Application Name
                    </th>
                    <th scope="col" className="border-0">
                      Description
                    </th>
                    <th scope="col" className="border-0">
                      Edit
                    </th>
                    <th scope="col" className="border-0">
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {props.application.map(application => (
                    <tr key={application.application_id}>
                      <td>{application.name}</td>
                      <td>{application.description}</td>
                      <td>
                        <Button
                          theme="primary"
                          className="mb-2 mr-1"
                          onClick={() =>
                            updateApplication({
                              app: "Update",
                              appId: application.application_id,
                              appName: application.name,
                              appDesc: application.description
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
                          onClick={() =>
                            deleteApplication(application.application_id)
                          }
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

export default ViewApplication;
