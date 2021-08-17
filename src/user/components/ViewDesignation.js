import React, { useContext } from "react";
import { Row, Col, Card, CardHeader, CardBody, Button } from "shards-react";
import { AuthContext } from "../../shared/auth-context";

const ViewDesignation = props => {
  const auth = useContext(AuthContext);

  const deleteDesignation = async desId => {
    try {
      await fetch(process.env.REACT_APP_BACKEND_URL + `/designation/${desId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${auth.token}`,
          application_id: 0
        }
      });
      props.onDelete();
    } catch (error) {}
  };

  const updateDesignation = desDetails => {
    props.onEdit(desDetails);
  };

  return (
    <div>
      <Row>
        <Col>
          <Card small className="mb-4">
            <CardHeader className="border-bottom">
              <h6 className="m-0">View Designation</h6>
            </CardHeader>
            <CardBody className="p-0 pb-3">
              <table className="table mb-0">
                <thead className="bg-light">
                  <tr>
                    <th scope="col" className="border-0">
                      Designation
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
                  {props.designation.map(designation => (
                    <tr key={designation.designation_id}>
                      <td>{designation.name}</td>
                      <td>{designation.description}</td>
                      <td>
                        <Button
                          theme="primary"
                          className="mb-2 mr-1"
                          onClick={() =>
                            updateDesignation({
                              designation: "Update",
                              designationId: designation.designation_id,
                              designationName: designation.name,
                              designationDesc: designation.description
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
                            deleteDesignation(designation.designation_id)
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

export default ViewDesignation;
