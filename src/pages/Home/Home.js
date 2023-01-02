/* Página de inicio */

import React from "react";
import { Row, Col } from "antd";
import useFetch from "../../hooks/useFetch";
import { NEWS_URL_API, NEWS_API_KEY } from "../../utils/constants";
import SliderNews from "../../components/SliderNews";
import NewsList from "../../components/NewsList";

import "./Home.scss";

export default function Home() {
  const sportsNews = useFetch(
    `${NEWS_URL_API}/news?access_key=${NEWS_API_KEY}&categories=sports&limit=20&sort=published_desc`
  );
  const techNews = useFetch(
    `${NEWS_URL_API}/news?access_key=${NEWS_API_KEY}&categories=technology&limit=10&sort=published_desc`
  );
  const entertainmentNews = useFetch(
    `${NEWS_URL_API}/news?access_key=${NEWS_API_KEY}&categories=entertainment&limit=10&sort=published_desc`
  );

  return (
    <>
      <SliderNews news={sportsNews} />
      <Row style={{ paddingLeft: "16px", paddingRight: "16px" }}>
        <Col xs={24} md={12}>
          <NewsList title="Technology" news={techNews} />
        </Col>
        <Col xs={24} md={12}>
          <NewsList title="Entertainment" news={entertainmentNews} />
        </Col>
      </Row>
    </>
  );
}
