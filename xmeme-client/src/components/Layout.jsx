import React from "react";
import Layout from "antd/lib/layout";
import Typography from "antd/lib/typography";
import Button from "antd/lib/button";
import HomeOutlined from "@ant-design/icons/HomeOutlined";

const { Header, Content, Footer } = Layout;

function SiderDemo(props) {
  return (
    <Layout style={{ minHeight: "100vh", overflow: "hidden" }}>
      <Header style={{}}>
        <a href="/">
          <Typography.Title
            level={2}
            style={{ display: "inline-block", color: "white" }}
          >
            <HomeOutlined />
            XMeme
          </Typography.Title>
        </a>

        <Button
          type="primary"
          style={{ float: "right", marginTop: "10px" }}
          size="large"
          href="/new"
        >
          Upload!
        </Button>
      </Header>
      <Content style={{ marginTop: "50px" }}>{props.children}</Content>
      <Footer
        style={{
          textAlign: "center",
          width: "100%",
        }}
      >
        Appaji Chintimi
      </Footer>
    </Layout>
  );
}

export default SiderDemo;
