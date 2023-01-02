/* Componente que muestra un listado de noticias en base a una categoría determinada */

import React from "react";
import { List, Avatar, Button } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import moment from "moment";
import Loading from "../Loading";
import DefaultBackgroundImage from "../../assets/img/default_bg.jpg";

import "./NewsList.scss";

export default function NewsList(props) {
  const { title, news } = props;

  if (news.loading || !news.result) {
    return <Loading />;
  }

  return (
    <List
      className="news-list"
      itemLayout="vertical"
      header={<h2>{title}</h2>}
      size="large"
      bordered
      dataSource={news.result.data}
      renderItem={(item) => <RenderNew item={item} />}
    />
  );
}

function RenderNew(props) {
  const {
    item: { image, title, url, published_at }
  } = props;

  const urlImage = image ? image : DefaultBackgroundImage;

  return (
    <List.Item className="news-list__new">
      <List.Item.Meta
        avatar={
          <Avatar
            src={urlImage}
            shape="square"
            size={{ xs: 32, md: 64, lg: 100, xl: 120, xxl: 120 }}
          />
        }
        title={
          <>
            <a href={url} target="_blank" rel="noopener noreferrer">
              {title}
            </a>
            <span>
              <ClockCircleOutlined style={{ fontSize: "15px", marginRight: "5px" }} />
              {moment(published_at).calendar()}
            </span>
          </>
        }
      />
      <div className="buttons">
        <a href={url} target="_blank" rel="noopener noreferrer">
          <Button type="primary">More Info</Button>
        </a>
      </div>
    </List.Item>
  );
}
