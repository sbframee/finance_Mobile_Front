/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import "./index.css";
import DatePicker from "react-datepicker";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import pmt from "formula-pmt";
import HeaderAdminM from "../../components/HeaderAdminM";

let initials = {
  case_uuid: "",
  customer_uuid: "",
  article_uuid: "",
  agent_uuid: "",
  firm_uuid: localStorage.getItem("firm_uuid"),
  created_by: localStorage.getItem("user_uuid"),
  disbursal_date: "",
  // emi_date: "",
  interest: "",
  loan_amt: "",
  disbursal_status: 0,
  first_installment_date: "",
  number_of_installment: "",
  down_payment: "",
  stage: "",
  case_number: "",
  current_stage: 0,
  article_category: "",
  article_category_uuid: "",
  article_sub_category: "",
  guarantor_uuid: "",
  dealer_uuid: "",
};
export default function AddOrder() {
  const [order, setOrder] = useState(initials);
  const [popupForm, setPopupForm] = useState(false);
  const [emiType, setEmiType] = useState("flat");
  const [details, setDetails] = useState({ customers: [], guarantor: [] });
  const [articles, setArticles] = useState([]);
  const [agents, setAgensts] = useState([]);
  const [customersData, setCustomersData] = useState([]);
  const [dealers, setDealers] = useState([]);
  const getDealerData = async () => {
    const response = await axios({
      method: "get",
      url: "/dealers/GetDealersList",

      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.data.success) setDealers(response.data.result);
  };
  const getCounter = async () => {
    const response = await axios({
      method: "get",
      url: "/articals/GetArticalsList",

      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.data.success) setArticles(response.data.result);
  };
  const getAgents = async () => {
    const response = await axios({
      method: "get",
      url: "/agents/GetAgentsList",

      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.data.success) setAgensts(response.data.result);
  };
  const getItemsData = async () => {
    const response = await axios({
      method: "get",
      url: "/customers/GetCustomersList",

      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    if (response.data.success) setCustomersData(response.data.result);
  };
  useEffect(() => {
    getItemsData();
    getCounter();
    getAgents();
    getDealerData();
  }, []);
  const onSubmit = async () => {
    const response = await axios({
      method: "post",
      url: "/cases/postCase",
      data: order,
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.data.success) {
      setOrder(initials);
      setPopupForm(false);
    }
  };
  const GetEMI = () => {
    let L = +order?.loan_amt || 0;
    let N = +order.number_of_installment || 0;
    let I = +order.interest || 0;
    let value =
      emiType === "flat"
        ? ((L + (N * L * I) / 1200) / (N || 1) || 0).toFixed(2)
        : (pmt(I / 1200, N, L) || 0).toFixed(2);
    console.log(value);
    return value;
  };
  const getDetails = async (type, customer_uuid) => {
    const response = await axios({
      method: "get",
      url: "/documents/GetDocuments/" + customer_uuid,

      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.data.success)
      setDetails((prev) => ({ ...prev, [type]: response.data.result }));
    else setDetails((prev) => ({ ...prev, [type]: [] }));
  };
  const GETDiffernece = () => {
    let L = +order?.loan_amt || 0;
    let N = +order.number_of_installment || 0;
    let I = +order.interest || 0;
    let disbursal_date = new Date(order?.disbursal_date || 0);
    let first_installment_date = new Date(order?.first_installment_date || 0);
    let Days =
      order.disbursal_date && order.first_installment_date
        ? (first_installment_date.getMonth() - disbursal_date.getMonth() - 1) *
            30 +
          first_installment_date.getDate() -
          disbursal_date.getDate()
        : 0;

    let value = (Days * ((N * L * I) / (1200 * 365)) || 0).toFixed(2);
    setOrder((prev) => ({
      ...prev,
      settlements: +value
        ? [
            {
              title: "Emi Date Difference",
              amount: value,
              clearance_status: 0,
            },
          ]
        : [],
    }));
    return value;
  };
  const Difference = useMemo(GETDiffernece, [
    order?.loan_amt,
    order.number_of_installment,
    order.interest,
    order.disbursal_date,
    order.first_installment_date,
  ]);
  const EMI = useMemo(GetEMI, [
    order?.loan_amt,
    order.number_of_installment,
    order.interest,
    emiType,
  ]);
  console.log(details);
  return (
    <>
      
      <div>
     
        <div>
        
          <div id="voucherForm" action="">
            <div>
              <h2>Add Case </h2>
              {/* {type === 'edit' && <XIcon className='closeicon' onClick={close} />} */}
            </div>

            <div>
              
           
             
              <div>
                <label className="selectLabel">
                  Interst
                  <input
                    type="number"
                    name="route_title"
                    className="numberInput"
                    value={order?.interest}
                    onChange={(e) =>
                      setOrder((prev) => ({
                        ...prev,
                        interest:
                          e.target.value.length < 4
                            ? e.target.value
                            : prev.interest,
                      }))
                    }
                  />
                </label>
                <label className="selectLabel">
                  Loan Amount
                  <input
                    type="number"
                    name="route_title"
                    className="numberInput"
                    value={order?.loan_amt}
                    onChange={(e) =>
                      setOrder((prev) => ({
                        ...prev,
                        loan_amt:
                          e.target.value.length < 10
                            ? e.target.value
                            : prev.loan_amt,
                      }))
                    }
                  />
                </label>
              </div>
              <div>
                <label className="selectLabel">
                  Down Payment
                  <input
                    type="number"
                    name="route_title"
                    className="numberInput"
                    value={order?.down_payment}
                    onChange={(e) =>
                      setOrder((prev) => ({
                        ...prev,
                        down_payment: e.target.value,
                      }))
                    }
                    maxLength={9}
                  />
                </label>
                <label className="selectLabel">
                  Number of Installment
                  <input
                    type="number"
                    name="route_title"
                    className="numberInput"
                    value={order?.number_of_installment}
                    onChange={(e) =>
                      setOrder((prev) => ({
                        ...prev,
                        number_of_installment:
                          e.target.value.length < 4
                            ? e.target.value
                            : prev.number_of_installment,
                      }))
                    }
                    maxLength={3}
                  />
                </label>
              </div>
              
              <div style={{ marginTop: "40px" }}>
                
                <button
                  type="button"
                  style={{ background: "none", color: "#000" }}
                >
                  EMI: {EMI}
                </button>

                <button
                  type="button"
                  style={{ background: "none", color: "#000", width: "200px" }}
                >
                  Difference = {Difference}
                </button>
                <label className="selectLabel" style={{ width: "150px" }}>
                  <Select
                    options={[
                      { value: "flat", label: "Flate" },
                      { value: "reduceing", label: "Reducing" },
                    ]}
                    onChange={(doc) => {
                      setEmiType(doc.value);
                    }}
                    value={{
                      value: emiType,
                      label: emiType === "flat" ? "Flate" : "Reducing",
                    }}
                    openMenuOnFocus={true}
                    menuPosition="fixed"
                    menuPlacement="auto"
                    placeholder="Select"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      {popupForm ? (
        <NewUserForm onSave={onSubmit} order={order} setOrder={setOrder} />
      ) : (
        ""
      )}
    </>
  );
}
function NewUserForm({ onSave, order, setOrder }) {
  //   console.log(data);

  return (
    <div className="overlay">
      <div
        className="modal"
        style={{ height: "fit-content", width: "fit-content" }}
      >
        <div
          className="content"
          style={{
            height: "fit-content",
            padding: "20px",
            width: "fit-content",
          }}
        >
          <div style={{ overflowY: "scroll", paddingTop: "30px" }}>
            <form
              className="form"
              onSubmit={(e) => {
                e.preventDefault();
                onSave();
              }}
            >
              <div className="row">
                <h1> </h1>
              </div>
              <div className="form">
                <div className="row">
                  <label
                    className="selectLabel"
                    onClick={() =>
                      setOrder((prev) => ({ ...prev, current_stage: 0 }))
                    }
                  >
                    Evaluation
                    <input
                      type="checkbox"
                      name="route_title"
                      className="numberInput"
                      checked={+order?.current_stage === 0}
                    />
                  </label>

                  <label
                    className="selectLabel"
                    onClick={() =>
                      setOrder((prev) => ({ ...prev, current_stage: 2 }))
                    }
                  >
                    Processing
                    <input
                      type="checkbox"
                      name="route_title"
                      className="numberInput"
                      checked={+order?.current_stage === 2}
                    />
                  </label>
                </div>
              </div>

              <button type="submit" className="submit">
                Save
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
