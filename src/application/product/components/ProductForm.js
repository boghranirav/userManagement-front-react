import React, { useState, useEffect, useContext } from "react";
import {
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormInput,
  FormTextarea,
  Button
} from "shards-react";
import { AuthContext } from "../../../shared/auth-context";

const ProductForm = props => {
  const auth = useContext(AuthContext);
  const [productName, setProductName] = useState("");
  const [productManufacturer, setProductManufacturer] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImage, setProductImage] = useState(null);

  const handleNameChange = e => {
    setProductName(e.currentTarget.value);
  };

  const handleManufacturerChange = e => {
    setProductManufacturer(e.currentTarget.value);
  };

  const handleImageChange = e => {
    setProductImage(e.target.files[0]);
  };

  const handlePriceChange = e => {
    setProductPrice(e.currentTarget.value);
  };
  const handleDescriptionChange = e => {
    setProductDescription(e.currentTarget.value);
  };

  const sumbitHandler = async event => {
    event.preventDefault();
    const headerAuth = {
      Authorization: `Bearer ${auth.token}`,
      application_id: window.globalVar
    };

    const formData = new FormData();
    formData.append("name", productName);
    formData.append("manufacturer", productManufacturer);
    formData.append("price", productPrice);
    formData.append("description", productDescription);
    if (productImage) {
      formData.append("image", productImage);
    }

    try {
      if (props.updateApp && props.updateApp.productStatus === "Update") {
        await fetch(
          process.env.REACT_APP_BACKEND_URL +
            `/product/${props.updateApp.productId}`,
          {
            method: "PATCH",
            body: formData,
            headers: headerAuth
          }
        );
      } else {
        await fetch(process.env.REACT_APP_BACKEND_URL + "/product/create", {
          method: "POST",
          body: formData,
          headers: headerAuth
        });
      }
    } catch (error) {}
    resetProduct();
  };

  const onExportHandler = async event => {
    event.preventDefault();
    console.log("Click");
    try {
      const headerAuth = {
        Authorization: `Bearer ${auth.token}`,
        application_id: window.globalVar
      };

      fetch(process.env.REACT_APP_BACKEND_URL + `/product/export`, {
        method: "GET",
        body: null,
        headers: headerAuth
      })
        .then(response => response.blob())
        .then(blob => {
          const url = window.URL.createObjectURL(new Blob([blob]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `product.csv`);
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const resetProduct = () => {
    setProductName("");
    setProductManufacturer("");
    setProductPrice("");
    setProductDescription("");
    setProductImage(null);
    props.updateSubmit();
    props.click();
    document.getElementById("btnSubmit").innerHTML = "Create Product";
  };

  useEffect(() => {
    if (props.updateApp) {
      setProductName(props.updateApp.productName);
      setProductManufacturer(props.updateApp.productManufacturer);
      setProductPrice(props.updateApp.productPrice);
      setProductDescription(props.updateApp.productDescription);
      if (props.updateApp.productStatus === "Update") {
        document.getElementById("btnSubmit").innerHTML = "Update Product";
      }
    }
  }, [props.updateApp]);

  return (
    <React.Fragment>
      <Card small className="mb-4">
        <CardHeader className="border-bottom">
          <h6 className="m-0">Create Product</h6>
        </CardHeader>
        <ListGroup flush>
          <ListGroupItem className="p-3">
            <Row>
              <Col>
                <Form onSubmit={sumbitHandler} encType="multipart/form-data">
                  <Row form>
                    <Col md="6" className="form-group">
                      <label htmlFor="txtName">Product Name</label>
                      <FormInput
                        id="txtProductName"
                        required
                        maxLength="50"
                        placeholder="Product Name"
                        value={productName}
                        onChange={handleNameChange}
                      />
                    </Col>

                    <Col md="6" className="form-group">
                      <label htmlFor="txtManufacturer">Manufacturer</label>
                      <FormInput
                        id="txtManufacturer"
                        placeholder="Manufacturer Name"
                        value={productManufacturer}
                        onChange={handleManufacturerChange}
                      />
                    </Col>
                  </Row>
                  <Row form>
                    <Col md="6" className="form-group">
                      <label>File Upload</label>
                      <FormInput type="file" onChange={handleImageChange} />
                    </Col>
                    <Col md="6" className="form-group">
                      <label>Price</label>
                      <FormInput
                        id="txtPrice"
                        pattern="^[0-9][0-9]*[.]?[0-9]{0,2}$"
                        placeholder="Full Name"
                        maxLength="10"
                        value={productPrice}
                        onChange={handlePriceChange}
                      />
                    </Col>
                  </Row>

                  <Row form>
                    <Col md="12" className="form-group">
                      <label htmlFor="txtDescription">Description</label>
                      <FormTextarea
                        id="txtDescription"
                        value={productDescription}
                        onChange={handleDescriptionChange}
                      />
                    </Col>
                  </Row>
                  <Row form>
                    <Col md="3" className="form-group">
                      <Button theme="accent" id="btnSubmit">
                        Create Product
                      </Button>
                    </Col>
                    <Col md="3" className="form-group">
                      <Button
                        theme="info"
                        id="btnExport"
                        type="button"
                        onClick={onExportHandler}
                      >
                        Export Product
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </ListGroupItem>
        </ListGroup>
      </Card>
    </React.Fragment>
  );
};

export default ProductForm;
