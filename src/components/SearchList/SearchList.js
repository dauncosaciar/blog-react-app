/* Componente que muestra el listado de noticias a partir de una búsqueda */

import React from "react";
import { Button, Card } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import moment from "moment";
import DefaultBackgroundImage from "../../assets/img/default_bg.jpg";

import "./SearchList.scss";

export default function SearchList(props) {
  const {
    news: { data }
  } = props;

  return (
    <div className="search-list">
      {data.map((item, index) => (
        <NewCard key={index} new={item} />
      ))}
    </div>
  );
}

function NewCard(props) {
  const {
    new: { category, image, published_at, title, url }
  } = props;

  const urlImage = image ? image : DefaultBackgroundImage;

  return (
    <Card title={category.toUpperCase()} bordered={false}>
      <div className="image" style={{ backgroundImage: `url("${urlImage}")` }} />
      <div className="content">
        <h3>{title}</h3>
        <p>
          <ClockCircleOutlined style={{ fontSize: "15px", marginRight: "5px" }} />{" "}
          {moment(published_at).calendar()}
        </p>
        <a href={url} target="_blank" rel="noopener noreferrer">
          <Button type="primary">More Info</Button>
        </a>
      </div>
    </Card>
  );
}
