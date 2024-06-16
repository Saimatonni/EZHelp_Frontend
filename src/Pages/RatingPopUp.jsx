// RatingPopup.jsx
import React, { useState } from "react";
import { Modal, Rate, Form, Input, Button, message } from "antd";
import { BASE_URL } from "../utils/config";
import Cookies from "js-cookie";

const RatingPopup = ({ providerId, clientName, clientImage, onClose }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const accessToken = Cookies.get("access_token");

      const requestBody = {
        provider_id: providerId,
        client_name: clientName,
        client_image: clientImage,
        rating: values.rating,
        review: values.review,
      };

      const response = await fetch(`${BASE_URL}/clients/rating`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "access-token": accessToken,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      message.success("Rating submitted successfully");
      form.resetFields();
      onClose();
    } catch (error) {
      message.error("Failed to submit rating. Please try again later.");
      console.error("Failed to submit rating:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Give Rating"
      visible={true}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={() => form.submit()}
        >
          Submit
        </Button>,
      ]}
    >
      <Form form={form} onFinish={onFinish}>
        <Form.Item
          label="Rating"
          name="rating"
          rules={[{ required: true, message: "Please give a rating" }]}
        >
          <Rate />
        </Form.Item>
        <Form.Item
          label="Review"
          name="review"
          rules={[{ required: true, message: "Please write a review" }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default RatingPopup;
