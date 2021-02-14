import React, { useState, useEffect } from "react";
import Card from "antd/lib/card";
import Button from "antd/lib/button";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Image from "antd/lib/image";
import Modal from "antd/lib/modal";
import Spin from "antd/lib/spin";
import Form from "antd/lib/form";
import Input from "antd/lib/input";

import EditOutlined from "@ant-design/icons/EditOutlined";
import CloudUploadOutlined from "@ant-design/icons/CloudUploadOutlined";
import axios from "axios";
import Im404 from "../images/404.png";
import TimeAgo from "timeago-react";

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 12,
  },
  layout: "horizantal",
  size: "large",
};

const tailLayout = {
  wrapperCol: {
    span: 12,
    sm: {
      push: 6,
    },
  },
};

const MemeComponent = ({ loading, image }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onSubmit = async (values) => {
    setFormLoading(true);
    await axios
      .patch(`${process.env.REACT_APP_SERVER_URL}/memes/${image.id}`, {
        name: values.name,
        caption: values.caption || undefined,
        url: values.url,
      })
      .then((res) => {
        image.name = values.name;
        image.caption = values.caption;
        image.url = image.url;
      });
    setFormLoading(false);
    setIsModalVisible(false);
  };

  return (
    <Card
      hoverable
      style={{
        height: "100%",
        borderRadius: "20px 20px 0 0",
      }}
      loading={loading}
      cover={
        <Image
          src={image.url}
          fallback={Im404}
          style={{
            display: "block",
            height: "300px",
            width: "100%",
            objectFit: "contain",
            borderRadius: "20px 20px 0 0",
          }}
        />
      }
      actions={[<EditOutlined key="Edit" onClick={showModal} />]}
    >
      <Card.Meta title={image.caption} description={image.name}></Card.Meta>
      <TimeAgo
        className="ant-card-meta-description"
        datetime={image.postedAt}
      />
      <Modal
        title="Edit Meme"
        visible={isModalVisible}
        footer={null}
        onCancel={handleCancel}
      >
        <Form
          {...layout}
          initialValues={{
            remember: true,
            name: image.name,
            caption: image.caption,
            url: image.url,
          }}
          onFinish={onSubmit}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <Input disabled />
          </Form.Item>

          <Form.Item label="Caption" name="caption">
            <Input />
          </Form.Item>

          <Form.Item
            label="Meme URL"
            name="url"
            type="url"
            rules={[
              {
                required: true,
                message: "Meme URL can't be empty!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" block>
              Submit
            </Button>
          </Form.Item>
          <Row justify="center">
            <Col span={24} flex="initial">
              {formLoading && <Spin size="large" />}
            </Col>
          </Row>
        </Form>
      </Modal>
    </Card>
  );
};

const MemeForm = () => {
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");

  useEffect(async () => {
    await axios
      .get(`${process.env.REACT_APP_SERVER_URL}/memes`)
      .then((res) => {
        setImages(res.data);
      })
      .catch((err) => setError(err));
    setLoading(false);
  }, []);
  return (
    <Row justify="center">
      <Col span={20} style={{ marginBottom: "15px" }}>
        <a href="/new">
          <Button type="primary" block size="large" shape="round">
            <CloudUploadOutlined />
            Upload
          </Button>
        </a>
      </Col>
      <Row gutter={[0, 8]} justify="space-around" style={{ width: "100%" }}>
        {images.map((image, index) => (
          <Col xl={5} md={11} xs={20}>
            <MemeComponent loading={loading} image={image} />
          </Col>
        ))}
      </Row>
    </Row>
  );
};

export default MemeForm;
