import React, { useContext } from "react";
import { Row, Col, Card, CardHeader, CardBody, Button } from "shards-react";
import { AuthContext } from "../../../shared/auth-context";
import { useHttpClient } from "../../../shared/http-hook";

const ViewProduct = props => {
  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpClient();

  const deleteApplication = async appId => {
    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + `/product/${appId}`,
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
                      Image
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
                  {props.product.map(product => (
                    <tr key={product.product_id}>
                      <td>{product.name}</td>
                      <td>{product.manufacturer}</td>
                      <td>{product.price}</td>
                      <td>{product.description}</td>
                      <td>
                        <img
                          alt={product.name}
                          src={`${process.env.REACT_APP_BACKEND_URL}/${product.image}`}
                          style={{ height: 100, width: 100 }}
                        />
                      </td>
                      <td>
                        <Button
                          theme="primary"
                          className="mb-2 mr-1"
                          onClick={() =>
                            updateApplication({
                              productStatus: "Update",
                              productId: product.product_id,
                              productName: product.name,
                              productManufacturer: product.manufacturer,
                              productPrice: product.price,
                              productDescription: product.description
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
                          onClick={() => deleteApplication(product.product_id)}
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

export default ViewProduct;
