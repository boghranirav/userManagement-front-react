import React, { useContext } from "react";
import { Row, Col, Card, CardHeader, CardBody, Button } from "shards-react";
import { AuthContext } from "../../shared/auth-context";
import { useHttpClient } from "../../shared/http-hook";

const ViewUser = props => {
  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpClient();

  const deleteData = async dId => {
    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + `/user/${dId}`,
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

  const updateData = items => {
    props.onEdit(items);
  };

  return (
    <div>
      {/* Default Light Table */}
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
                      Name
                    </th>
                    <th scope="col" className="border-0">
                      Email
                    </th>

                    <th scope="col" className="border-0">
                      Designation
                    </th>
                    <th scope="col" className="border-0">
                      Mobile
                    </th>
                    <th scope="col" className="border-0">
                      Address
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
                  {props.users.map(user => (
                    <tr key={user.user_id}>
                      <td>{user.name}</td>
                      <td>{user.email_id}</td>
                      <td>{user.designation.name}</td>
                      <td>{user.mobile_no}</td>
                      <td>{user.address}</td>
                      <td>
                        <Button
                          theme="primary"
                          className="mb-2 mr-1"
                          onClick={() =>
                            updateData({
                              userStatus: "Update",
                              userId: user.user_id,
                              name: user.name,
                              email: user.email_id,
                              mobile: user.mobile_no,
                              address: user.address,
                              designationId: user.designation_id
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
                          onClick={() => deleteData(user.user_id)}
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

export default ViewUser;
