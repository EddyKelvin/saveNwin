// eslint-disable-line react-hooks/exhaustive-deps
// STYLES
import "./index.css";
import { MoreOutlined, LoadingOutlined } from "@ant-design/icons";
import { Pagination, Modal, Popover, Input } from "antd";

// MODULES AND PACKAGES
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AxiosCall from "../../../../Utils/axios";

// ACTIONS
import {
  getProgramList,
  getProgramCleanup,
} from "../../../../Store/actions/bussiness/get-program";

const VipProgram = () => {
  const { Search } = Input;
  const dispatch = useDispatch();
  const getProgramState = useSelector((s) => s.getProgram);
  const [programs, setPrograms] = useState();
  const [totalPrograms, setTotalPrograms] = useState("");
  const [currentID, setCurrentID] = useState("");
  const [currentProgram, setCurrentProgam] = useState("");
  // FOR MODAL
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const changePage = (page) => {
    dispatch(getProgramList({ page: page }));
  };

  useEffect(() => {
    dispatch(getProgramList({ limit: 20 }));
  }, []);

  useEffect(() => {
    if (getProgramState.isSuccessful) {
      setPrograms(getProgramState.data);
      setTotalPrograms(getProgramState.data.totalPrograms);
      dispatch(getProgramCleanup());
    } else if (getProgramState.error) {
      setPrograms(null);
      dispatch(getProgramCleanup());
    }
  }, [getProgramState]);

  const actions = async (id) => {
    try {
      const result = await AxiosCall({
        method: "DELETE",
        path: "programs/" + id,
      });
      dispatch(getProgramList({}));
      handleCancel();
    } catch (err) {}
  };

  const onSearch = (value) => dispatch(getProgramList({ title: value }));

  return (
    <div className="program-list-container">
      <h3>Programs</h3>
      <hr />

      {totalPrograms === 0 ? null : <p>{totalPrograms} programs</p>}

      <p>{totalPrograms === 0 ? "No programs found" : null}</p>
      <div className="search-container">
        <Search
          placeholder="Search by program title"
          onSearch={onSearch}
          enterButton
        />
      </div>

      {getProgramState.isLoading ? (
        <div className="text-center py-5">
          <LoadingOutlined style={{ fontSize: 30 }} Spin />
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table borderless">
            {programs && programs.programs.length === 0 ? null : (
              <thead>
                <tr>
                  <th scope="col" className="col-1">
                    No.
                  </th>
                  <th scope="col" className="col-3">
                    Program Title
                  </th>
                  <th scope="col" className="col-2">
                    Original Price
                  </th>

                  <th scope="col" className="col-2">
                    Total Selling Price
                  </th>

                  <th scope="col" className="col-2">
                    Total Discount
                  </th>

                  <th scope="col" className="col-2">
                    Date Created
                  </th>
                  <th scope="col" className="col-1">
                    Actions
                  </th>
                </tr>
              </thead>
            )}

            {programs && programs.programs.length !== 0 && (
              <>
                {programs.programs.map((program, index) => (
                  <tbody key={index}>
                    <tr className="all-products">
                      <td>{index + 1}.</td>
                      <td>{program.title}</td>
                      <td>${program.totalPrice}</td>
                      <td>${program.totalSellingPrice}</td>
                      <td>${program.totalDiscount}</td>
                      <td>
                        {new Date(program.createdAt).toLocaleDateString()}
                      </td>
                      <td className="delete-action text-start">
                        <Popover
                          content={
                            <p
                              className="delete-action"
                              onClick={() => {
                                setCurrentID(program._id);
                                setCurrentProgam(program.title);
                                showModal();
                              }}
                            >
                              Delete Item
                            </p>
                          }
                          trigger="click"
                        >
                          <MoreOutlined />
                        </Popover>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </>
            )}
          </table>
        </div>
      )}

      <Modal
        title="Delete Program"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <p className="text-center">
          Are you sure you want to delete this Program?
        </p>

        <h5 className="text-center fw-normal"> {currentProgram} </h5>

        <div className="d-flex justify-content-center">
          <button
            className="btn btn-danger btn-sm m-4"
            onClick={() => actions(currentID)}
          >
            YES
          </button>
          <button
            className="btn btn-primary btn-sm m-4"
            onClick={() => handleCancel()}
          >
            NO
          </button>
        </div>
      </Modal>

      <div className="d-flex justify-content-end pb-5 pt-4">
        <Pagination
          onChange={changePage}
          total={totalPrograms}
          hideOnSinglePage={true}
        />
      </div>
    </div>
  );
};

export default VipProgram;
