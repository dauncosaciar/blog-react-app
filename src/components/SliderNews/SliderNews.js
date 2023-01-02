/* Componente que muestra un slider de noticias */

import React from "react";
import { Carousel, Button } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import moment from "moment";
import Loading from "../Loading";
import DefaultBackgroundImage from "../../assets/img/default_bg.jpg";

import "./SliderNews.scss";

export default function SliderNews(props) {
  const { news } = props;

  if (news.loading || !news.result) {
    return <Loading />;
  }

  const { data } = news.result;

  return (
    <Carousel autoplay className="slider-news">
      {data?.map((item, index) => (
        <Article key={index} item={item} />
      ))}
    </Carousel>
  );
}

function Article(props) {
  const {
    item: { published_at, title, image, description, url }
  } = props;

  const urlImage = image ? image : DefaultBackgroundImage;

  return (
    <div className="slider-news__new" style={{ backgroundImage: `url("${urlImage}")` }}>
      <div className="slider-news__new-info">
        <span className="slider-news__new-info-date">
          <ClockCircleOutlined
            style={{ fontSize: "25px", color: "#d87f74", marginRight: "10px" }}
          />
          {moment(published_at).calendar()}
        </span>
        <h1>{title}</h1>
        <p>{description}</p>
        <a href={url} target="_blank" rel="noopener noreferrer">
          <Button type="primary">More Info</Button>
        </a>
      </div>
    </div>
  );
}
