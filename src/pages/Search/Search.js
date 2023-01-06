/* Página que muestra un buscador de noticias */

import React, { useState, useEffect } from "react";
import { Row, Col, Input, Select } from "antd";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import queryString from "query-string";
import { useDebouncedCallback } from "use-debounce";
import { NEWS_API_KEY, NEWS_URL_API } from "../../utils/constants";
import { newsCategories } from "../../utils/newsCategories";
import SearchList from "../../components/SearchList";
import Loading from "../../components/Loading";

import "./Search.scss";

function Search(props) {
  const { location, history } = props;
  const [newsList, setNewsList] = useState(null);
  const [error, setError] = useState(null);
  const params = useNewsQuery(location);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `${NEWS_URL_API}/news?access_key=${NEWS_API_KEY}&${searchParamsCleaned}&limit=100&sort=published_desc`
        );
        const json = await response.json();
        setNewsList(json);
      } catch (err) {
        setError(err);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const onSearchInput = useDebouncedCallback((value) => {
    setNewsList(null);
    history({ search: queryString.stringify({ ...params, keywords: value }) });
  }, 500);

  const onSearchSelect = useDebouncedCallback((value) => {
    setNewsList(null);
    history({ search: queryString.stringify({ ...params, categories: value }) });
  }, 500);

  const searchParams = location.search.split("?");
  const searchParamsCleaned = searchParams[1];

  return (
    <Row style={{ paddingLeft: "16px", paddingRight: "16px" }}>
      <Col xs={24} xl={{ offset: 6, span: 12 }} className="search">
        <h1>News Search!</h1>
        <Input
          placeholder="Enter a keyword for search news..."
          onChange={(e) => onSearchInput(e.target.value)}
        />

        <p>Also, you can filter your search by a category:</p>

        <Select
          style={{
            width: "100%"
          }}
          onChange={(value) => onSearchSelect(value)}
          options={newsCategories}
        />
      </Col>

      {newsList?.data ? (
        <Col span={24}>
          <SearchList news={newsList} />
        </Col>
      ) : (
        <Col span={24}>
          <Loading />
        </Col>
      )}
    </Row>
  );
}

function useNewsQuery(location) {
  const { keywords, categories = "general" } = queryString.parse(location.search);

  return { keywords, categories };
}

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let history = useNavigate();
    let params = useParams();

    return <Component {...props} location={location} params={params} history={history} />;
  }

  return ComponentWithRouterProp;
}

export default withRouter(Search);
