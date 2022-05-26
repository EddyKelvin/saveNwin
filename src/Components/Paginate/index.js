import "./index.css";
import React from "react";

const Paginate = ({ data, navigate }) => {
  return (
    <div className="paginate">
      {data.currentPage === 1 ? (
        <button disabled className="goto-page">
          First
        </button>
      ) : (
        <button
          onClick={(e) => {
            e.preventDefault();
            navigate({ page: 1 });
          }}
          className="goto-page"
        >
          First
        </button>
      )}
      {data.prev && (
        <button
          onClick={(e) => {
            e.preventDefault();
            navigate({ page: data.prev });
          }}
          className="page"
        >
          {data.prev}
        </button>
      )}
      <button disabled className="page active">
        {data.currentPage}
      </button>
      {data.next && (
        <button
          onClick={(e) => {
            e.preventDefault();
            navigate({ page: data.next });
          }}
          className="page"
        >
          {data.next}
        </button>
      )}
      {data.currentPage === data.pageCount ? (
        <button disabled className="goto-page">
          Last
        </button>
      ) : (
        <button
          className="goto-page"
          onClick={(e) => {
            e.preventDefault();
            navigate({ page: data.pageCount });
          }}
        >
          Last
        </button>
      )}
    </div>
  );
};

export default Paginate;
