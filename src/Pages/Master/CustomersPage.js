import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/solid";
import axios from "axios";
import "./styles.css";
import { v4 as uuid } from "uuid";
import { Add } from "@mui/icons-material";
const CustomerPage = () => {
  const [itemsData, setItemsData] = useState([]);
  const [filterItemsData, setFilterItemsData] = useState([]);
  const [popupForm, setPopupForm] = useState(false);
  const [filterTitle, setFilterTitle] = useState("");

  //   const getItemCategories = async () => {
  //     const response = await axios({
  //       method: "get",
  //       url: "/itemCategories/GetItemCategoryList",

  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     if (response.data.success) setItemCategories(response.data.result);
  //   };
  const getItemsData = async () => {
    const response = await axios({
      method: "get",
      url: "/customers/GetCustomersList",

      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    if (response.data.success) setItemsData(response.data.result);
  };
  useEffect(() => {
    getItemsData();
  }, [popupForm]);
  useEffect(
    () =>
      setFilterItemsData(
        itemsData
        //   .filter((a) => a.user_title)
        //   .filter(
        //     (a) =>
        //       !filterTitle ||
        //       a.user_title
        //         .toLocaleLowerCase()
        //         .includes(filterTitle.toLocaleLowerCase())
        //   )
      ),
    [itemsData, filterTitle]
  );
  //   const getCompanies = async () => {
  //     const response = await axios({
  //       method: "get",
  //       url: "/companies/getCompanies",

  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     if (response.data.success) setCompanies(response.data.result);
  //   };
  //   useEffect(() => {
  //     getCompanies();
  //     getItemCategories();
  //   }, []);
  return (
    <>
      <Sidebar />
      <Header />
      <div className="item-sales-container orders-report-container">
        <div id="heading">
          <h2>Customers</h2>
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
        <div className="table-container-user item-sales-container">
          <Table itemsDetails={filterItemsData} setPopupForm={setPopupForm} />
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

export default CustomerPage;
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

          <th colSpan={2}>
            <div className="t-head-element">
              <span>Firstname</span>
              <div className="sort-buttons-container">
                <button
                  onClick={() => {
                    setItems("customer_firstname");
                    setOrder("asc");
                  }}
                >
                  <ChevronUpIcon className="sort-up sort-button" />
                </button>
                <button
                  onClick={() => {
                    setItems("customer_firstname");
                    setOrder("desc");
                  }}
                >
                  <ChevronDownIcon className="sort-down sort-button" />
                </button>
              </div>
            </div>
          </th>
          <th colSpan={2}>
            <div className="t-head-element">
              <span>Middlename</span>
              <div className="sort-buttons-container">
                <button
                  onClick={() => {
                    setItems("customer_middlename");
                    setOrder("asc");
                  }}
                >
                  <ChevronUpIcon className="sort-up sort-button" />
                </button>
                <button
                  onClick={() => {
                    setItems("customer_middlename");
                    setOrder("desc");
                  }}
                >
                  <ChevronDownIcon className="sort-down sort-button" />
                </button>
              </div>
            </div>
          </th>
          <th colSpan={2}>
            <div className="t-head-element">
              <span>Lastname</span>
              <div className="sort-buttons-container">
                <button
                  onClick={() => {
                    setItems("customer_lastname");
                    setOrder("asc");
                  }}
                >
                  <ChevronUpIcon className="sort-up sort-button" />
                </button>
                <button
                  onClick={() => {
                    setItems("customer_lastname");
                    setOrder("desc");
                  }}
                >
                  <ChevronDownIcon className="sort-down sort-button" />
                </button>
              </div>
            </div>
          </th>
          <th colSpan={2}>
            <div className="t-head-element">
              <span>Address</span>
              <div className="sort-buttons-container">
                <button
                  onClick={() => {
                    setItems("address");
                    setOrder("asc");
                  }}
                >
                  <ChevronUpIcon className="sort-up sort-button" />
                </button>
                <button
                  onClick={() => {
                    setItems("address");
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

              <td colSpan={2}>{item.customer_firstname}</td>
              <td colSpan={2}>{item.customer_middlename}</td>
              <td colSpan={2}>{item.customer_lastname}</td>
              <td colSpan={2}>{item.address||""}</td>
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
    if (popupInfo?.type === "edit")
      setdata({
        ...popupInfo.data,
        mobile: popupInfo?.data?.mobile.map((a) => ({ uuid: uuid(), ...a })),
      });
    else
      setdata({
        customer_gender: "",
        customer_lastname: "",
        customer_middlename: "",
        customer_firstname: "",
        address:"",
        mobile: [{ uuid: uuid(), number: "", label: "" }],
      });
  }, [popupInfo.data, popupInfo?.type]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!data.customer_firstname) {
      setErrorMassage("Please insert User Title");
      return;
    }

    if (popupInfo?.type === "edit") {
      const response = await axios({
        method: "put",
        url: "/customers/putCustomers",
        data: [data],
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.data.result[0].success) {
        setItemsData((prev) =>
          prev.map((i) => (i.user_uuid === data.user_uuid ? data : i))
        );
        onSave();
      }
    } else {
      const response = await axios({
        method: "post",
        url: "/customers/postCustomer",
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
        style={{ height: "fit-content", width: "fit-content", padding: "20px" }}
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
                <h1>{popupInfo.type === "edit" ? "Edit" : "Add"} Customers</h1>
              </div>

              <div className="formGroup">
                <div className="row">
                  <label className="selectLabel">
                    First Name
                    <input
                      type="text"
                      name="route_title"
                      className="numberInput"
                      value={data?.customer_firstname}
                      onChange={(e) =>
                        setdata({
                          ...data,
                          customer_firstname: e.target.value,
                        })
                      }
                      maxLength={60}
                    />
                  </label>

                  <label className="selectLabel">
                    Middle Name
                    <input
                      type="text"
                      name="route_title"
                      className="numberInput"
                      value={data?.customer_middlename}
                      onChange={(e) =>
                        setdata({
                          ...data,
                          customer_middlename: e.target.value,
                        })
                      }
                      maxLength={60}
                    />
                  </label>

                  <label className="selectLabel">
                    Last Name
                    <input
                      type="text"
                      name="route_title"
                      className="numberInput"
                      value={data?.customer_lastname}
                      onChange={(e) =>
                        setdata({
                          ...data,
                          customer_lastname: e.target.value,
                        })
                      }
                      maxLength={60}
                    />
                  </label>
                </div>
                <div className="row">
                  <label className="selectLabel">
                    Gender
                    <select
                      type="text"
                      name="route_title"
                      className="numberInput"
                      value={data?.customer_gender}
                      onChange={(e) =>
                        setdata({
                          ...data,
                          customer_gender: e.target.value,
                        })
                      }
                      maxLength={60}
                    >
                      <option value="">None</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Others">Others</option>
                    </select>

                  </label>
                  <label className="selectLabel">
                    Date Of Birth
                    <input
                      type="date"
                      name="route_title"
                      className="numberInput"
                      value={data?.dob}
                      onChange={(e) =>
                        setdata({
                          ...data,
                          dob: e.target.value,
                        })
                      }
                      maxLength={60}
                    />
                  </label>
                  <label className="selectLabel">
                    Address
                    <input
                      type="text"
                      name="route_title"
                      className="numberInput"
                      value={data?.address}
                      onChange={(e) =>
                        setdata({
                          ...data,
                          address: e.target.value,
                        })
                      }
                      maxLength={60}
                    />
                  </label>
                </div>
                <div className="row">
                  <label className="selectLabel" style={{width:"100%"}}>
                    Mobiles
                    {data?.mobile?.map((a) => (
                      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",width:"100%"}}>
                        <input
                          key={a.uuid}
                          type="text"
                          name="route_title"
                          className="numberInput"
                          placeholder="Number"
                          value={
                            data?.mobile.find((b) => b.uuid === a.uuid)?.number
                          }
                          onChange={(e) =>
                            setdata((prev) => ({
                              ...prev,
                              mobile: prev?.mobile?.map((b) =>
                                a.uuid === b.uuid
                                  ? { ...b, number: e.target.value }
                                  : b
                              ),
                            }))
                          }
                          maxLength={60}
                        />
                        <input
                          key={a.uuid}
                          type="text"
                          name="route_title"
                          className="numberInput"
                          placeholder="lable"
                          value={
                            data?.mobile.find((b) => b.uuid === a.uuid)?.label
                          }
                          onChange={(e) =>
                            setdata((prev) => ({
                              ...prev,
                              mobile: prev.mobile.map((b) =>
                                a.uuid === b.uuid
                                  ? { ...b, label: e.target.value }
                                  : b
                              ),
                            }))
                          }
                          maxLength={60}
                        />
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() =>
                        setdata((prev) => ({
                          ...prev,
                          mobile: [
                            ...prev.mobile,
                            { uuid: uuid(), number: "", lable: "" },
                          ],
                        }))
                      }
                      className="item-sales-search"
                      style={{width:"fit-content"}}
                    >
                      <Add />
                    </button>
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
