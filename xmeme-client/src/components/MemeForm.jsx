import React, { useState } from "react";
import Form from "antd/lib/form";
import Input from "antd/lib/input";
import Button from "antd/lib/button";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Image from "antd/lib/image";
import Spin from "antd/lib/spin";
import Result from "antd/lib/result";

import axios from "axios";

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

const CreateMemeForm = ({ setImageUrl, setResult }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onSubmit = async (values) => {
    setLoading(true);
    await axios
      .post(`${process.env.REACT_APP_SERVER_URL}/memes`, {
        name: values.name,
        caption: values.caption,
        url: values.url,
      })
      .then((res) => {
        form.resetFields();
        setResult({
          success: true,
          id: res.data.id,
        });
      });
    setLoading(false);
  };

  return (
    <Form
      {...layout}
      initialValues={{
        remember: true,
      }}
      form={form}
      onFinish={onSubmit}
      onValuesChange={(changedValues, allValues) => {
        if ("url" in changedValues) {
          setImageUrl(changedValues.url);
        }
      }}
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
        <Input />
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
          {loading && <Spin size="large" />}
        </Col>
      </Row>
    </Form>
  );
};

const MemeForm = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [result, setResult] = useState({
    success: false,
    id: "",
  });

  return (
    <Row justify="center">
      <Col span={18}>
        <CreateMemeForm setImageUrl={setImageUrl} setResult={setResult} />
      </Col>
      <Col xs={20} lg={12}>
        {!result.success && <Image src={imageUrl} width="100%" height="auto" />}
        {result.success && (
          <Result
            status="success"
            title="Successfully Posted Meme to XMeme!"
            subTitle={`MemeID: ${result.id}`}
          />
        )}
      </Col>
    </Row>
  );
};

export default MemeForm;
