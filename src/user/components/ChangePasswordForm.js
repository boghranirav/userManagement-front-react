import React from "react";
import PropTypes from "prop-types";
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

const ChangePasswordForm = ({ title }) => (
  <Card small className="mb-4">
    <CardHeader className="border-bottom">
      <h6 className="m-0">{title}</h6>
    </CardHeader>
    <ListGroup flush>
      <ListGroupItem className="p-3">
        <Row>
          <Col>
            <Form>
              <Row form>
                <Col md="12" className="form-group">
                  <label htmlFor="txtOldPassword">Old Password</label>
                  <FormInput
                    id="txtOldPassword"
                    placeholder="Enter Old Password"
                    onChange={() => {}}
                  />
                </Col>
              </Row>
              <Row form>
                <Col md="12" className="form-group">
                  <label htmlFor="txtOldPassword">New Password</label>
                  <FormInput
                    id="txtNewPassword"
                    placeholder="Enter New Password"
                    onChange={() => {}}
                  />
                </Col>
              </Row>
              <Row form>
                <Col md="12" className="form-group">
                  <label htmlFor="txtOldPassword">Confirm Password</label>
                  <FormInput
                    id="txtRePassword"
                    placeholder="Confirm New Password"
                    onChange={() => {}}
                  />
                </Col>
              </Row>
              <Button theme="accent">Create Role</Button>
            </Form>
          </Col>
        </Row>
      </ListGroupItem>
    </ListGroup>
  </Card>
);

ChangePasswordForm.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string
};

ChangePasswordForm.defaultProps = {
  title: "Change Password"
};

export default ChangePasswordForm;
