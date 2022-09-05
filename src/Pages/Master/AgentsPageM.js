import React, { useState, useEffect } from "react";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/solid";
import axios from "axios";
import "./styles.css";
import HeaderAdminM from "../../components/HeaderAdminM";

const AgentsPageM = () => {
 

  const [itemsData, setItemsData] = useState([]);
  const [filterItemsData, setFilterItemsData] = useState([]);
  const [popupForm, setPopupForm] = useState(false);
  const [filterTitle, setFilterTitle] = useState("");

  const getItemsData = async () => {
    const response = await axios({
      method: "get",
      url: "/agents/GetAgentsList",

      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.data.success) setItemsData(response.data.result);
  };
  useEffect(() => {
    getItemsData();
  }, [popupForm]);
  useEffect(
    () =>
      setFilterItemsData(
        itemsData
          .filter((a) => a.agent_title)
          .filter(
            (a) =>
              !filterTitle ||
              a.agent_title
                .toLocaleLowerCase()
                .includes(filterTitle.toLocaleLowerCase())
          )
      ),
    [itemsData, filterTitle]
  );
 

  return (
    <>
    
      <div>
             <HeaderAdminM />
        <div id="heading">
          <h2>Agents</h2>
        </div>
       
        <div id="item-sales-top">
          <div
            id="date-input-container"
            style={{
              overflow: "visible",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <input
              type="text"
              onChange={(e) => setFilterTitle(e.target.value)}
              value={filterTitle}
              placeholder="Search Item Title..."
              className="searchInput"
            />

            <div>Total Items: {filterItemsData.length}</div>
            <button
              className="item-sales-search"
              onClick={() => setPopupForm(true)}
            >
              Add
            </button>
          </div>
        </div>
        <div>
          <Table
            itemsDetails={filterItemsData}
            setPopupForm={setPopupForm}
          />
        </div>
      </div>
      {popupForm ? (
        <NewUserForm
          onSave={() => setPopupForm(false)}
          setItemsData={setItemsData}
          popupInfo={popupForm}
        />
      ) : (
        ""
      )}
    </>
  );
  
};

export default AgentsPageM;
function Table({ itemsDetails, setPopupForm }) {
  const [items, setItems] = useState("sort_order");
  const [order, setOrder] = useState("");

  console.log(items);
  return (
    <table
      className="user-table"
      style={{ maxWidth: "100vw", height: "fit-content", overflowX: "scroll" }}
    >
      <thead>
        <tr>
          <th>S.N</th>

          <th colSpan={3}>
            <div className="t-head-element">
              <span>Agent Title</span>
              <div className="sort-buttons-container">
                <button
                  onClick={() => {
                    setItems("agent_title");
                    setOrder("asc");
                  }}
                >
                  <ChevronUpIcon className="sort-up sort-button" />
                </button>
                <button
                  onClick={() => {
                    setItems("agent_title");
                    setOrder("desc");
                  }}
                >
                  <ChevronDownIcon className="sort-down sort-button" />
                </button>
              </div>
            </div>
          </th>
          <th colSpan={3}>
            <div className="t-head-element">
              <span>Mobile</span>
              <div className="sort-buttons-container">
                <button
                  onClick={() => {
                    setItems("mobile");
                    setOrder("asc");
                  }}
                >
                  <ChevronUpIcon className="sort-up sort-button" />
                </button>
                <button
                  onClick={() => {
                    setItems("mobile");
                    setOrder("desc");
                  }}
                >
                  <ChevronDownIcon className="sort-down sort-button" />
                </button>
              </div>
            </div>
          </th>
        </tr>
      </thead>
      <tbody className="tbody">
        {itemsDetails
          .sort((a, b) =>
            order === "asc"
              ? typeof a[items] === "string"
                ? a[items].localeCompare(b[items])
                : a[items] - b[items]
              : typeof a[items] === "string"
              ? b[items].localeCompare(a[items])
              : b[items] - a[items]
          )
          ?.map((item, i) => (
            <tr
              key={Math.random()}
              style={{ height: "30px" }}
              onClick={() => setPopupForm({ type: "edit", data: item })}
            >
              <td>{i + 1}</td>

              <td colSpan={3}>{item.agent_title}</td>
              <td colSpan={3}>{item.mobile}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
function NewUserForm({ onSave, popupInfo, setItemsData }) {
  const [data, setdata] = useState({});

  const [errMassage, setErrorMassage] = useState("");

  useEffect(() => {
    if (popupInfo?.type === "edit") setdata({ ...popupInfo.data });
    else setdata({ firm_uuid: localStorage.getItem("firm_uuid") });
  }, [popupInfo.data, popupInfo?.type]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!data.agent_title) {
      setErrorMassage("Please insert Route Title");
      return;
    }

    if (popupInfo?.type === "edit") {
      const response = await axios({
        method: "put",
        url: "/agents/putAgent",
        data: [data],
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.data.result[0].success) {
        setItemsData((prev) =>
          prev.map((i) => (i.agent_uuid === data.agent_uuid ? data : i))
        );
        onSave();
      }
    } else {
      const response = await axios({
        method: "post",
        url: "/agents/postAgent",
        data,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.data.success) {
        setItemsData((prev) => [...prev, data]);
        onSave();
      }
    }
  };

  return (
    <div className="overlay">
      <div
        className="modal"
        style={{height: "fit-content",  width: "fit-content", padding: "20px" }}
      >
        <div
          className="content"
          style={{
            height: "fit-content",
            padding: "20px",
            width: "fit-content",
          }}
        >
          <div style={{ overflowY: "scroll" }}>
            <form className="form" onSubmit={submitHandler}>
              <div className="row">
                <h1>{popupInfo.type === "edit" ? "Edit" : "Add"} Agent</h1>
              </div>

              <div className="formGroup">
                <div className="row">
                  <label className="selectLabel">
                    Agent Title
                    <input
                      type="text"
                      name="route_title"
                      className="numberInput"
                      value={data?.agent_title}
                      onChange={(e) =>
                        setdata({
                          ...data,
                          agent_title: e.target.value,
                    
                        })
                      }
                      maxLength={60}
                    />
                  </label>
                </div>
                <div className="row">
                  <label className="selectLabel">
                    Mobile
                    <input
                      type="number"
                      name="route_title"
                      className="numberInput"
                      value={data?.mobile}
                      onChange={(e) =>
                        setdata({
                          ...data,
                          mobile: e.target.value,
                    
                        })
                      }
                      maxLength={60}
                    />
                  </label>
                </div>
              </div>
              <i style={{ color: "red" }}>
                {errMassage === "" ? "" : "Error: " + errMassage}
              </i>

              <button type="submit" className="submit">
                Save changes
              </button>
            </form>
          </div>
          <button onClick={onSave} className="closeButton">
            x
          </button>
        </div>
      </div>
    </div>
  );
}
