import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import axios from "axios";
import MainAdmin from "./Pages/MainAdminM";
import AgentsPage from "./Pages/Master/AgentsPage";
import ArticalsPage from "./Pages/Master/ArticalsPages";
import AgentMPage from "./Pages/Master/AgentsPageM";
import ArticalMPage from "./Pages/Master/ArticalsPageM";
import UsersPage from "./Pages/Master/UsersPage";
import UsersMPage from "./Pages/Master/UsersMPage";
import LoginPage from "./LoginPage";
import React, { useEffect, useState } from "react";
import CustomerPage from "./Pages/Master/CustomersPage";
import CustomerMPage from "./Pages/Master/CustomersPageM";
import AddOrder from "./Pages/AddOrder/AddOrder";
import AddOrderM from "./Pages/AddOrder/AddOrderM";
import AllCases from "./Pages/Reports/AllCases";
import AllCaseM from "./Pages/Reports/AllCasesM";
import UpcomingEmi from "./Pages/Reports/UpcomingEmi";
import UpcomingEmiM from "./Pages/Reports/UpcomingEmiM";
import AllPayments from "./Pages/Reports/AllPayments";
import AllPaymentsM from "./Pages/Reports/AllPaymentsM";
import ChargesPage from "./Pages/Master/ChargesPage";
import ChargesMPage from "./Pages/Master/ChargesPageM";
import AllCustomers from "./Pages/Reports/AllCustomers";
import AllCustomersM from "./Pages/Reports/AllCustomersM";
import Forms from "./Pages/Master/Forms";
import FormsM from "./Pages/Master/FormsM";
import DealerPage from "./Pages/Master/Dealer";
import DealerMPage from "./Pages/Master/DealerM";

function App() {
  axios.defaults.baseURL = "https://financebackendapp.herokuapp.com";
  // axios.defaults.baseURL = "http://localhost:9000";
  const [userType, setUserType] = useState(sessionStorage.getItem("userType")||0);

  const getUserType = async () => {
    let user_uuid = localStorage.getItem("user_uuid");
    if (user_uuid) {
      const response = await axios({
        method: "get",
        url: "users/GetUser/" + user_uuid,

        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data.result.user_type);
      if (response.data.success)
        setUserType(response.data.result.user_type || false);
      sessionStorage.setItem("userType", response.data.result.user_type);
    }
  };
  useEffect(() => {
    document.title=localStorage.getItem("firm_title")||"Firm"
    if (userType === "0" || userType === "1") return;
    getUserType();
  }, [userType]);
  console.log(userType);
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* admin Routes */}
          {userType === "1" ? (
            <>
              <Route path="/admin" element={<MainAdmin />} />
              <Route path="*" element={<Navigate replace to={"/admin"} />} />
              <Route path="/admin/agents" element={<AgentsPage />} />
              <Route path="/admin/agentM" element={<AgentMPage />} /> 
              <Route path="/admin/articalM" element={<ArticalMPage />} />
              <Route path="/admin/articals" element={<ArticalsPage />} />
              <Route path="/admin/customers" element={<CustomerPage />} />
              <Route path="/admin/customerM" element={<CustomerMPage />} />
              <Route path="/admin/addCase" element={<AddOrder />} />
              <Route path="/admin/addCaseM" element={<AddOrderM />} />
              <Route path="/admin/cases" element={<AllCases />} />
              <Route path="/admin/casesM" element={<AllCaseM />} />
              <Route path="/admin/upcomingEmi" element={<UpcomingEmi />} />
              <Route path="/admin/upcomingEmiM" element={<UpcomingEmiM />} />
              <Route path="/admin/allPayments" element={<AllPayments />} />
              <Route path="/admin/allPaymentsM" element={<AllPaymentsM />} />
              <Route path="/admin/charges" element={<ChargesPage />} />
              <Route path="/admin/chargesM" element={<ChargesMPage />} />
              <Route path="/admin/allCustomers" element={<AllCustomers />} />
              <Route path="/admin/allCustomersM" element={<AllCustomersM />} />
              <Route path="/admin/forms" element={<Forms />} />
              <Route path="/admin/formsM" element={<FormsM />} />
              <Route path="/admin/dealer" element={<DealerPage />} />
              <Route path="/admin/dealerM" element={<DealerMPage />} />
              <Route
                path="/admin/users"
                element={<UsersPage />}
              />
              <Route
                path="/admin/users"
                element={<UsersPage />}
              />
              <Route
                path="/admin/usersM"
                element={<UsersMPage />}
              />
            </>
          ) : !window.location.pathname.includes("/login") ? (
            <>
              <Route path="*" element={<Navigate replace to={"/login"} />} />
            </>
          ) : (
            ""
            )}
            <Route
              path="/login"
              element={<LoginPage setUserType={setUserType} />}
            />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
