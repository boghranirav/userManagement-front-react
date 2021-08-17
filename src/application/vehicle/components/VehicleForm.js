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
  FormSelect,
  FormCheckbox,
  Button
} from "shards-react";
import { AuthContext } from "../../../shared/auth-context";

const VehicleForm = props => {
  const auth = useContext(AuthContext);
  const [vehicleName, setVehicleName] = useState("");
  const [vehicleManufacturer, setVehicleManufacturer] = useState("");
  const [vehicleType, setVehicleType] = useState("0");
  const [vehicleFuelType, setVehicleFuelType] = useState("0");
  const [vehicleColour, setVehicleColour] = useState("");
  const [vehiclePrice, setVehiclePrice] = useState("");
  const [chkCsv, setChkCsv] = useState(false);
  const [csvFile, setCsvFile] = useState(null);

  const handleNameChange = e => {
    setVehicleName(e.currentTarget.value);
  };

  const handleManufacturerChange = e => {
    setVehicleManufacturer(e.currentTarget.value);
  };

  const handleTypeChange = e => {
    setVehicleType(e.currentTarget.value);
  };
  const handleFuelTypeChange = e => {
    setVehicleFuelType(e.currentTarget.value);
  };
  const handleColourChange = e => {
    setVehicleColour(e.currentTarget.value);
  };
  const handlePriceChange = e => {
    setVehiclePrice(e.currentTarget.value);
  };

  const onExportHandler = async event => {
    event.preventDefault();
    console.log("Click");
    try {
      const headerAuth = {
        Authorization: `Bearer ${auth.token}`,
        application_id: window.globalVar
      };

      fetch(process.env.REACT_APP_BACKEND_URL + `/vehicle/export`, {
        method: "GET",
        body: null,
        headers: headerAuth
      })
        .then(response => response.blob())
        .then(blob => {
          const url = window.URL.createObjectURL(new Blob([blob]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `vehicle.csv`);
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChkCsvChange = () => {
    setChkCsv(!chkCsv);
    resetVechile();
    if (chkCsv) {
      document.getElementById("divFileUpload").style.visibility = "hidden";
      document.getElementById("divCreateForm").style.visibility = "visible";
    } else {
      document.getElementById("divCreateForm").style.visibility = "hidden";
      document.getElementById("divFileUpload").style.visibility = "visible";
    }
  };

  const sumbitHandler = async event => {
    event.preventDefault();
    const headerAuth = {
      Authorization: `Bearer ${auth.token}`,
      application_id: window.globalVar,
      "Content-Type": "application/json"
    };

    console.log("CSV", csvFile);

    let body, formData;
    if (!chkCsv) {
      body = JSON.stringify({
        name: vehicleName,
        manufacturer: vehicleManufacturer,
        vehicle_type: vehicleType,
        fuel_type: vehicleFuelType,
        colour: vehicleColour,
        price: vehiclePrice
      });
    } else {
      console.log("CSV", csvFile);
      formData = new FormData();
      formData.append("file", csvFile);
    }

    try {
      if (chkCsv) {
        await fetch(process.env.REACT_APP_BACKEND_URL + "/vehicle/import", {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${auth.token}`,
            application_id: window.globalVar
          }
        });
      } else {
        if (props.updateApp && props.updateApp.vehicleStatus === "Update") {
          await fetch(
            process.env.REACT_APP_BACKEND_URL +
              `/vehicle/${props.updateApp.vehicleId}`,
            {
              method: "PATCH",
              body: body,
              headers: headerAuth
            }
          );
        } else {
          await fetch(process.env.REACT_APP_BACKEND_URL + "/vehicle/create", {
            method: "POST",
            body: body,
            headers: headerAuth
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
    setChkCsv(false);
    resetVechile();
  };

  const resetVechile = () => {
    setVehicleName("");
    setVehicleManufacturer("");
    setVehicleType("0");
    setVehicleFuelType("0");
    setVehicleColour("");
    setVehiclePrice("");
    setCsvFile(null);
    props.updateSubmit();
    props.click();
    document.getElementById("btnSubmit").innerHTML = "Create Vehicle";
  };

  useEffect(() => {
    if (props.updateApp) {
      setVehicleName(props.updateApp.vehicleName);
      setVehicleManufacturer(props.updateApp.vehicleManufacturer);
      setVehicleType(props.updateApp.vehicleVehicleType);
      setVehicleFuelType(props.updateApp.vehicleFuelType);
      setVehicleColour(props.updateApp.vehicleColour);
      setVehiclePrice(props.updateApp.vehiclePrice);
      setCsvFile(null);
      setChkCsv(false);
      window.scrollTo(0, 0);

      if (props.updateApp.vehicleStatus === "Update") {
        document.getElementById("btnSubmit").innerHTML = "Update Vehicle";
      }
    }
  }, [props.updateApp]);

  const handleCsvFileChange = event => {
    if (event.target.files[0]) {
      const file_name = event.target.files[0].name;
      var file_extension = file_name.split(".").pop();
      if (file_extension === "csv") {
        setCsvFile(event.target.files[0]);
      } else {
        setCsvFile(null);
        alert("Only .csv file.");
      }
    }
  };

  return (
    <React.Fragment>
      <Card small className="mb-4">
        <CardHeader className="border-bottom">
          <h6 className="m-0">Create Vehicle</h6>
        </CardHeader>
        <ListGroup flush>
          <ListGroupItem className="p-3">
            <Row>
              <Col>
                <Form onSubmit={sumbitHandler} encType="multipart/form-data">
                  <Row form>
                    <Col md="6" className="form-group">
                      <fieldset>
                        <FormCheckbox
                          id="chkCreateCsv"
                          checked={chkCsv}
                          onChange={handleChkCsvChange}
                        >
                          Upload CSV File
                        </FormCheckbox>
                      </fieldset>
                    </Col>
                    <Col
                      md="6"
                      className="form-group"
                      id="divFileUpload"
                      // style={{ visibility: "hidden" }}
                    >
                      <label>File Upload</label>
                      <FormInput type="file" onChange={handleCsvFileChange} />
                    </Col>
                  </Row>

                  <div id="divCreateForm">
                    <Row form>
                      <Col md="6" className="form-group">
                        <label htmlFor="txtName">Vehicle Name</label>
                        <FormInput
                          id="txtVehicleName"
                          // required
                          maxLength="50"
                          placeholder="Vehicle Name"
                          value={vehicleName}
                          onChange={handleNameChange}
                        />
                      </Col>

                      <Col md="6" className="form-group">
                        <label htmlFor="txtManufacturer">Manufacturer</label>
                        <FormInput
                          id="txtManufacturer"
                          maxLength="50"
                          placeholder="Manufacturer Name"
                          value={vehicleManufacturer}
                          onChange={handleManufacturerChange}
                        />
                      </Col>
                    </Row>
                    <Row form>
                      <Col md="6" className="form-group">
                        <label htmlFor="feInputState">Select Type</label>
                        <FormSelect
                          id="selectType"
                          value={vehicleType}
                          onChange={handleTypeChange}
                        >
                          <option value="0">Select Vehicle Type</option>
                          <option value="SEDAN">SEDAN</option>
                          <option value="COUPE">COUPE</option>
                          <option value="HATCHBACK">HATCHBACK</option>
                          <option value="CONVERTIBLE">CONVERTIBLE</option>
                          <option value="SUV">
                            SPORT-UTILITY VEHICLE(SUV)
                          </option>
                        </FormSelect>
                      </Col>
                      <Col md="6" className="form-group">
                        <label htmlFor="feInputState">Select Fuel Type</label>
                        <FormSelect
                          id="selectFuelType"
                          value={vehicleFuelType}
                          onChange={handleFuelTypeChange}
                        >
                          <option value="0">Select Fuel Type</option>
                          <option value="CNG">CNG</option>
                          <option value="Diesel">Diesel</option>
                          <option value="Electric">Electric</option>
                          <option value="Petrol">Petrol</option>
                        </FormSelect>
                      </Col>
                    </Row>

                    <Row form>
                      <Col md="6" className="form-group">
                        <label htmlFor="txtColour">Colour</label>
                        <FormInput
                          id="txtColour"
                          maxLength="50"
                          placeholder="Colour"
                          value={vehicleColour}
                          onChange={handleColourChange}
                        />
                      </Col>
                      <Col md="6" className="form-group">
                        <label htmlFor="txtPrice">Price</label>
                        <FormInput
                          id="txtPrice"
                          maxLength="10"
                          pattern="^[0-9][0-9]*[.]?[0-9]{0,2}$"
                          placeholder="Price"
                          value={vehiclePrice}
                          onChange={handlePriceChange}
                        />
                      </Col>
                    </Row>
                  </div>
                  <Row form>
                    <Col md="3" className="form-group">
                      <Button theme="accent" id="btnSubmit">
                        Create Vehicle
                      </Button>
                    </Col>
                    <Col md="3" className="form-group">
                      <Button
                        theme="info"
                        id="btnExport"
                        type="button"
                        onClick={onExportHandler}
                      >
                        Export Vehicle
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

export default VehicleForm;
