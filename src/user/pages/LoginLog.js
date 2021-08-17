import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "shards-react";
import PageTitle from "../../components/common/PageTitle";
import { AuthContext } from "../../shared/auth-context";
import { useHttpClient } from "../../shared/http-hook";
import ViewLoginLog from "../components/ViewLoginLog";
import ReactPaginate from "react-paginate";

import "./LoginLog.css";

const LoginLog = () => {
  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpClient();
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState([]);
  const [perPage] = useState(10);
  const [pageCount, setPageCount] = useState(0);

  const headerAuth = {
    Authorization: `Bearer ${auth.token}`,
    application_id: 0
  };
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + `/log/list`,
          "GET",
          null,
          headerAuth
        );

        const data = await responseData.DATA;
        const slice = data.slice(offset * perPage, offset * perPage + perPage);
        setData(slice);
        setPageCount(Math.ceil(data.length / perPage));
      } catch (error) {}
    };
    fetchUser();
  }, [offset]);

  const handlePageClick = e => {
    const selectedPage = e.selected;
    setOffset(selectedPage - 1 + 1);
  };

  console.log("pageCount=>", pageCount);

  return (
    <Container fluid className="main-content-container px-4">
      <Row noGutters className="page-header py-4">
        <PageTitle
          title="Login Log"
          md="12"
          className="ml-sm-auto mr-sm-auto"
        />
      </Row>
      <Row>
        <Col lg="12">{data && data.length && <ViewLoginLog logs={data} />}</Col>
      </Row>
      <Row>
        <div className="App">
          <ReactPaginate
            previousLabel={"prev"}
            nextLabel={"next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
        </div>
      </Row>
    </Container>
  );
};

export default LoginLog;
