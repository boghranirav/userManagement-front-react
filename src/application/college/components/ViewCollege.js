import React, { useContext } from "react";
import { Row, Col, Card, CardHeader, CardBody, Button } from "shards-react";
import { AuthContext } from "../../../shared/auth-context";
import { useHttpClient } from "../../../shared/http-hook";

const ViewCollege = props => {
  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpClient();

  const deleteApplication = async appId => {
    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + `/college/${appId}`,
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
                      Manufacturer
                    </th>
                    <th scope="col" className="border-0">
                      Price
                    </th>
                    <th scope="col" className="border-0">
                      Description
                    </th>
                    <th scope="col" className="border-0">
                      Brochure
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
                  {props.college.map(college => (
                    <tr key={college.college_id}>
                      <td>{college.name}</td>
                      <td>{college.address}</td>
                      <td>{college.email_id}</td>
                      <td>{college.mobile_no}</td>
                      <td>
                        {college.brochure ? (
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={`${process.env.REACT_APP_BACKEND_URL}/college/${college.brochure}`}
                          >
                            View Brochure
                          </a>
                        ) : (
                          "No brochure found."
                        )}
                      </td>
                      <td>
                        <Button
                          theme="primary"
                          className="mb-2 mr-1"
                          onClick={() =>
                            updateApplication({
                              collegeStatus: "Update",
                              collegeId: college.college_id,
                              collegeName: college.name,
                              collegeAddress: college.address,
                              collegeEmail: college.email_id,
                              collegeMobile: college.mobile_no
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
                          onClick={() => deleteApplication(college.college_id)}
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

export default ViewCollege;
