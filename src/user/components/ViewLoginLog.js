import React from "react";
import { Row, Col, Card, CardHeader, CardBody } from "shards-react";
import moment from "moment";
import tz from "moment-timezone";

const ViewLoginLog = props => {
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
                      Log Id
                    </th>
                    <th scope="col" className="border-0">
                      Email Id
                    </th>
                    <th scope="col" className="border-0">
                      Browser
                    </th>
                    <th scope="col" className="border-0">
                      IP Address
                    </th>
                    <th scope="col" className="border-0">
                      OS
                    </th>
                    <th scope="col" className="border-0">
                      Log Status
                    </th>
                    <th scope="col" className="border-0">
                      Created At
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {props.logs.map(log => (
                    <tr key={log.log_id}>
                      <td>{log.log_id}</td>
                      <td>{log.user ? log.user.email_id : "N/A"}</td>
                      <td>{log.browser || "N/A"}</td>
                      <td>{log.ip_address || "N/A"}</td>
                      <td>{log.os || "N/A"}</td>
                      <td>{log.log_status || "N/A"}</td>
                      <td>
                        {moment(log.created_at)
                          .tz("Asia/Colombo")
                          .format("lll")}
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

export default ViewLoginLog;
