import React, { useState, useEffect } from "react";
import { Button } from "antd";
import "./index.less";
const Pagination = (props) => {
  const { transferParams, trData } = props;
  const { total, size, current } = trData;
  const defaultData = { current, page: 1, total, size };
  const [paginationData, setPaginationData] = useState(defaultData);
  const [disabledUpPage, setDisabledUpPage] = useState(false);
  const [disabledNextPage, setDisabledNextPage] = useState(false);

  useEffect(() => {
    setPaginationData((val) => {
      const totalPage = Math.ceil(total / size);

      return { ...val, page: totalPage, total, size };
    });
  }, [trData]);
  // 首页
  const firstPageClick = () => {
    setPaginationData((val) => {
      const newPaginationData = { ...paginationData, current: 1 };
      transferParams(newPaginationData);
      return newPaginationData;
    });
  };
  // 上一页
  const previousPageClick = () => {
    setPaginationData((val) => {
      const { current } = val;
      const newCurrent = current - 1;
      if (newCurrent === 1) {
        setDisabledUpPage(true);
      }
      const newPaginationData = { ...paginationData, current: newCurrent };
      transferParams(newPaginationData);
      return newPaginationData;
    });

  };
  // 下一页
  const nextPageClick = () => {
    setPaginationData((val) => {
      const { current, page } = val;
      const newCurrent = current + 1;
      if (newCurrent === page) {
        setDisabledUpPage(true);
      }
      const newPaginationData = { ...paginationData, current: newCurrent };
      transferParams(newPaginationData);
      return newPaginationData;
    });
  };
  // 尾页
  const lastPageClick = () => {
    setPaginationData((val) => {
      const newPaginationData = { ...paginationData, current: val.page };
      transferParams(newPaginationData);
      return newPaginationData;
    });
  };
  const setVFun = () => {
    if (paginationData.page === paginationData.current) {
      setDisabledNextPage(true);
    } else {
      setDisabledNextPage(false);
    }
    if (paginationData.current === 1) {
      setDisabledUpPage(true);
    } else {
      setDisabledUpPage(false);
    }
  };

  useEffect(() => {
    setVFun();
  }, [paginationData]);
  const pageSizeText = `${paginationData.current}/${paginationData.page}页`;
  const totalDataText = `共${paginationData.page}页${paginationData.total}条`;
  return (
    <div className="pagination">
      <Button className="fist-page" type="primary" onClick={firstPageClick}>
        首页
      </Button>
      <Button
        className="previous-page"
        disabled={disabledUpPage}
        onClick={previousPageClick}
      >
        上一页
      </Button>
      <Button
        className="next-page"
        disabled={disabledNextPage}
        onClick={nextPageClick}
      >
        下一页
      </Button>
      <Button className="last-page" type="primary" onClick={lastPageClick}>
        尾页
      </Button>
      <div className="size-page">{pageSizeText}</div>
      <div className="total-data">{totalDataText}</div>
    </div>
  );
};
export default Pagination;
