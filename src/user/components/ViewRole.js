import React, { useContext } from "react";
import { Row, Col, Card, CardHeader, CardBody, Button } from "shards-react";
import { AuthContext } from "../../shared/auth-context";
import { useHttpClient } from "../../shared/http-hook";

const ViewRole = props => {
  const auth = useContext(AuthContext);

  const { sendRequest } = useHttpClient();

  const deleteRole = async roleId => {
    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + `/role/${roleId}`,
        "DELETE",
        null,
        {
          Authorization: `Bearer ${auth.token}`,
          application_id: 0
        }
      );
      props.onDelete();
    } catch (error) {}
  };

  const updateRole = roleDetails => {
    props.onEdit(roleDetails);
  };

  return (
    <div>
      <Row>
        <Col>
          <Card small className="mb-4">
            <CardHeader className="border-bottom">
              <h6 className="m-0">View Role</h6>
            </CardHeader>
            <CardBody className="p-0 pb-3">
              <table className="table mb-0">
                <thead className="bg-light">
                  <tr>
                    <th scope="col" className="border-0">
                      Designation
                    </th>
                    <th scope="col" className="border-0">
                      Application
                    </th>
                    <th scope="col" className="border-0">
                      Access
                    </th>
                    <th scope="col" className="border-0">
                      Create
                    </th>
                    <th scope="col" className="border-0">
                      Read
                    </th>
                    <th scope="col" className="border-0">
                      Update
                    </th>
                    <th scope="col" className="border-0">
                      Delete
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
                  {props.role.map(role => (
                    <tr key={role.role_id}>
                      <td>{role.designation.name}</td>
                      <td>{role.application.name}</td>
                      <td>{role.deny_data ? "✅" : "🚫"}</td>
                      <td>{role.create_data ? "✅" : "🚫"}</td>
                      <td>{role.read_data ? "✅" : "🚫"}</td>
                      <td>{role.update_data ? "✅" : "🚫"}</td>
                      <td>{role.delete_data ? "✅" : "🚫"}</td>
                      <td>
                        <Button
                          theme="primary"
                          className="mb-2 mr-1"
                          onClick={() =>
                            updateRole({
                              roleState: "Update",
                              roleId: role.role_id,
                              designation_id: role.designation_id,
                              application_id: role.application_id,
                              deny_data: role.deny_data,
                              create_data: role.create_data,
                              read_data: role.read_data,
                              update_data: role.update_data,
                              delete_data: role.delete_data
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
                          onClick={() => deleteRole(role.role_id)}
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

export default ViewRole;
