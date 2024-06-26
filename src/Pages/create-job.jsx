import React, { useState, useEffect } from "react";
import gradientbg from "../assets/images/banner/vector2.png";
import {
  Form,
  Input,
  Select,
  notification,
  Switch,
  Upload,
  Button,
  DatePicker,
  Row,
  Col,
  Radio,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { BASE_URL } from "../utils/config";
import moment from "moment";
import Cookies from "js-cookie";

import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  //   Button,
} from "reactstrap";
import data from "../components/home/data";
import { useNavigate } from "react-router-dom";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  Autocomplete,
} from "@react-google-maps/api";

const { Option } = Select;

const CreateJob = () => {
  const [form] = Form.useForm();
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
  const [placeName, setPlaceName] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [imageBase64, setImageBase64] = useState("");
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyB1GNLedehoDsSDG3f-cf2XCHxiUtIz6bg",
    libraries: ["places"],
  });

  useEffect(() => {
    if (!window.google || !window.google.maps || !window.google.maps.places) {
      console.error("Google Maps API is not loaded.");
      return;
    }
  }, []);

  const mapStyles = {
    height: "400px",
    width: "100%",
    marginBottom: "20px",
  };

  const defaultCenter = {
    lat: 23.777176,
    lng: 90.399452,
  };

  const onMapClick = (event) => {
    const newCoordinates = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: newCoordinates }, (results, status) => {
      if (status === "OK") {
        if (results[0]) {
          const placeName = results[0].formatted_address;
          setPlaceName(placeName);
        } else {
          console.error("No results found");
        }
      } else {
        console.error("Geocoder failed due to: " + status);
      }
    });

    setCoordinates(newCoordinates);
    form.setFieldsValue({
      coordinates: `${newCoordinates.lat}, ${newCoordinates.lng}`,
    });
  };

  const onPlaceSelected = (place) => {
    if (!place.geometry || !place.geometry.location) {
      console.error("Selected place has no geometry or location.");
      return;
    }

    setPlaceName(place.formatted_address);
    setCoordinates({
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    });
    form.setFieldsValue({
      coordinates: `${place.geometry.location.lat()}, ${place.geometry.location.lng()}`,
    });
    setSearchValue(place.formatted_address);
  };

  const handleImageUpload = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImageBase64(reader.result.split(",")[1]);
    };
    reader.readAsDataURL(file);
    return false;
  };

  const handleFormSubmit = async (values) => {
    const accesstoken = Cookies.get("access_token");
    const payload = {
      userId: Cookies.get("userid"),
      workType: values.workType,
      address: placeName,
      GPSCoordinates: {
        latitude: coordinates.lat,
        longitude: coordinates.lng,
      },
      emergency: values.emergency === "Yes",
      open: true,
      payAmount: values.payAmount,
      shortTitle: values.shortTitle,
      description: values.description,
      images: [imageBase64],
      startDate: moment(values.startDate).format("DD-MM-YYYY"),
      endDate: moment(values.endDate).format("DD-MM-YYYY"),
      bidded_sp_ids: [],
    };

    try {
      const response = await fetch(`${BASE_URL}/jobs/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "access-token": accesstoken
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        notification.success({ message: "Job created successfully!" });
        form.resetFields();
        setCoordinates({ lat: 0, lng: 0 });
        setPlaceName("");
        setSearchValue("");
        setImageBase64("");
      } else {
        notification.error({ message: "Failed to create job" });
      }
    } catch (error) {
      notification.error({ message: "An error occurred" });
    }
  };

  return (
    <div
      className="h-full flex flex-col justify-center py-10 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${gradientbg})` }}
    >
      <div className="max-w-screen-xl w-full mx-auto p-content__padding flex flex-col justify-center items-center mb-20">
        <div style={{ marginBottom: "20px" }}>
          {isLoaded && (
            <Autocomplete
              onLoad={(autocomplete) => {
                autocomplete.addListener("place_changed", () => {
                  const place = autocomplete.getPlace();
                  onPlaceSelected(place);
                });
              }}
            >
              <Input
                id="autocomplete"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search for a place"
                style={{ width: "300px" }}
              />
            </Autocomplete>
          )}
        </div>
        <div className="w-full h-[400px] border group relative rounded-tl-md rounded-tr-md">
          <div className="absolute group-hover:bg-opacity-0 duration-300 top-0 left-0 right-0 bottom-0 w-full h-full bg-black bg-opacity-50 group-hover:invisible rounded-tl-md rounded-tr-md"></div>

          {isLoaded && (
            <GoogleMap
              mapContainerStyle={mapStyles}
              zoom={10}
              center={defaultCenter}
              onClick={onMapClick}
            >
              {coordinates.lat !== 0 && coordinates.lng !== 0 && (
                <Marker
                  position={{ lat: coordinates.lat, lng: coordinates.lng }}
                  icon={{
                    url: "https://maps.google.com/mapfiles/kml/pal3/icon55.png",
                    scaledSize: new window.google.maps.Size(50, 50),
                  }}
                />
              )}
            </GoogleMap>
          )}

          {placeName && (
            <div className="mb-4 mt-4">
              <p className="font-semibold text-lg">
                Place Name: <span className="text-gray-600"> {placeName}</span>
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="max-w-screen-xl w-full mx-auto p-content__padding flex flex-col mb-40">
        <h1 className="text-2xl font-bold mb-4">Post a Job</h1>
        <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
          <Row gutter={16}>
            <Col xs={24} sm={8}>
              <Form.Item
                label="Work Type"
                name="workType"
                rules={[{ required: true, message: "Please select work type" }]}
              >
                <Select placeholder="Select work type">
                  <Select.Option value="Plumbing">Plumbing</Select.Option>
                  <Select.Option value="Electrician">Electrician</Select.Option>
                  <Select.Option value="Gardening">Gardening</Select.Option>
                  <Select.Option value="Cleaning">Cleaning</Select.Option>
                  <Select.Option value="Moving">Moving</Select.Option>
                  <Select.Option value="Painting">Painting</Select.Option>
                  <Select.Option value="Tutoring">Tutoring</Select.Option>
                  <Select.Option value="Computer Repair">
                    Computer Repair
                  </Select.Option>
                  <Select.Option value="Dog Walking">Dog Walking</Select.Option>
                  <Select.Option value="Photography">Photography</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item
                label="Emergency"
                name="emergency"
                rules={[
                  { required: true, message: "Please select emergency option" },
                ]}
              >
                <Select placeholder="Select emergency">
                  <Select.Option value="Yes">Yes</Select.Option>
                  <Select.Option value="No">No</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item
                label="Pay Amount"
                name="payAmount"
                rules={[{ required: true, message: "Please enter pay amount" }]}
              >
                <Input type="number" prefix="$" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Start Date"
                name="startDate"
                rules={[
                  { required: true, message: "Please select Start date" },
                ]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="End Date"
                name="endDate"
                rules={[{ required: true, message: "Please select End date" }]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label="Short Title"
            name="shortTitle"
            rules={[{ required: true, message: "Please enter short title" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please enter description" }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item label="Image" name="image">
            <Upload beforeUpload={handleImageUpload} >
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ backgroundColor: "#12002E", width: "100%" }}
            >
              Post
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default CreateJob;
