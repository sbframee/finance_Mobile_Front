import React from "react";
import "./style.css";
import NavLink from "./Navlink";
import {
  AutoAwesomeMosaicOutlined as MasterIcon,
} from "@mui/icons-material";
import AssessmentIcon from '@mui/icons-material/Assessment';
import AddIcon from "@mui/icons-material/Add";

const Sidebar = () => {
  return (
    <div className="left-panel" style={{ position: "relative" }}>
      <div className="nav" style={{ height: "100vh",paddingTop:"80px" }}>
      <NavLink
          title="New"
          icon={<AddIcon sx={{ fontSize: 50 }} />}
          // href="/admin/addOrder"
          isActive={false}
          menuList={[
            {
              name: "Add Case",
              link: "/admin/addCase",
            },
            {
              name: "Add Customer",
              link: "/admin/customers",
            },
          ]}
        />
        <NavLink
          title={"Master"}
          icon={<MasterIcon sx={{ fontSize: 50 }} />}
          isActive={true}
          menuList={[
            {
              name: "Agents",
              link: "/admin/agents",
            },
            {
              name: "Articles",
              link: "/admin/articals",
            },
            {
              name: "Users",
              link: "/admin/users",
            },
            {
              name: "Charges",
              link: "/admin/charges",
            },
            {
              name: "Dealers",
              link: "/admin/dealer",
            },
            {
              name: "Forms",
              link: "/admin/forms",
            },
           
            
          ]}
        />
       
        {/* <NavLink

          title={"Quick Access"}
          icon={<QuickAccessIcon sx={{ fontSize: 50 }} />}
          isActive={false}
          menuList={[
            {
              name: "Trips",
              link: "#",
            },
            {
              name: "Signed Bills",
              link: "/admin/signedBills",
            },
          ]}
        />*/}
         <NavLink
          title={"Report"}
          icon={<AssessmentIcon sx={{ fontSize: 50 }} />}
          isActive={false}
          menuList={[
            {
              name: "All Cases",
              link: "/admin/cases",
            },
            {
              name: "Upcoming EMI",
              link: "/admin/upcomingEmi",
            },
            {
              name: "All Payments",
              link: "/admin/allPayments",
            },
            {
              name: "All Customers",
              link: "/admin/allCustomers",
            },
            // {
            //   name: "UPI Transaction",
            //   link: "/admin/upiTransactionReport",
            // },
            // {
            //   name: "Completed Orders",
            //   link: "/admin/completeOrderReport",
            // },
            // {
            //   name: "Items Wise",
            //   link: "/admin/OrderItemReport",
            // },
            // {
            //   name: "Completed Trips",
            //   link: "/admin/CompletedTripsReport",
            // },
            // {
            //   name: "Counter Ledger",
            //   link: "/admin/CounterLeger",
            // },
            // {
            //   name: "Outstandings",
            //   link: "/admin/Outstandings",
            // },
            // {
            //   name: "Pending Entry",
            //   link: "/admin/pendingEntry",
            // },
            
          ]}
        />
        {/*
         <NavLink
          title={"Setup"}
          icon={<SettingsIcon sx={{ fontSize: 50 }} />}
          isActive={false}
          menuList={[
            {
              name: "Auto Increase Quantity",
              link: "/admin/autoIncreaseQty",
            },
            {
              name: "Auto Add Item",
              link: "/admin/autoIncreaseItem",
            },
            {
              name: "Order Range Incentive",
              link: "/admin/OrderRangeIncentive",
            },
            {
              name: "Delivery Incentive",
              link: "/admin/DeliveryIncentive",
            },
            {
              name: "Order Item Incentive",
              link: "/admin/ItemIncentive",
            },
          ]}
        /> */}

        
      </div>
    </div>
  );
};

export default Sidebar;
