import React from "react";

function TransactionTemplate({ data }) {
  return (
    <div>
      {data.resource && (
        <>
          <p className="text-center fw-bold fs-6">
            Details of your transaction
          </p>
          <h6>
            Program name:{" "}
            <span className="fw-normal">{data.resource.program.title}</span>
          </h6>
          <h6>
            Total Selling Price:{" "}
            <span className="fw-normal">
              ${data.resource.program.totalPrice}
            </span>
          </h6>
          <h6>
            Total discount:{" "}
            <span className="fw-normal">
              ${data.resource.program.totalDiscount}
            </span>
          </h6>
          <h6>
            Final price:{" "}
            <span className="fw-normal">
              ${data.resource.program.totalSellingPrice}
            </span>
          </h6>
          <h6>
            Address:{" "}
            <span className="fw-normal">{data.resource.program.address}</span>
          </h6>
          <h6>
            City:{" "}
            <span className="fw-normal">{data.resource.program.city}</span>
          </h6>
          <h6>
            State:{" "}
            <span className="fw-normal">{data.resource.program.state}</span>
          </h6>
          <p>
            Date:
            {new Date(data.createdAt).toLocaleDateString()}
          </p>
        </>
      )}
    </div>
  );
}

export default TransactionTemplate;
