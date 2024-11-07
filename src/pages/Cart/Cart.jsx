import css from "./Cart.module.css";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useState } from "react";
import PropTypes from "prop-types";
import ShowProduct from "./ShowProducts";
import PaymentDetail from "./PaymentDetail";
import OrderSuccess from "../SuccessOrder/OrderSuccess";

const TabLabel = ({ number, text, isActive }) => {
  const tabLabelStyle = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  };

  const circleStyle = {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    backgroundColor: isActive ? "black" : "gray",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const textStyle = {
    color: isActive ? "black" : "gray",
  };

  return (
    <div style={tabLabelStyle}>
      <div style={circleStyle}>{number}</div>
      <div style={textStyle}>{text}</div>
    </div>
  );
};

TabLabel.defaultProps = {
  number: "1",
  text: "Tab",
  isActive: false,
};
TabLabel.propTypes = {
  number: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
};

const Cart = () => {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => setValue(newValue);

  const [valuePaymentDetails, setValuePaymentDetails] = useState(null);
  const [valueOrderSuccess, setValueOrderSuccess] = useState(null);

  return (
    <div className={css.cartContainer}>
      <h1 className={css.title}>Shopping cart</h1>
      <div className={css.tabContainer}>
        <TabContext value={value}>
          <Box
            sx={{ borderBottom: 1, borderColor: "divider" }}
            style={{
              width: "60%",
              margin: "0 auto",
            }}
          >
            <TabList
              onChange={handleChange}
              TabIndicatorProps={{
                style: {
                  backgroundColor: "black",
                },
              }}
            >
              <Tab
                label={
                  <TabLabel
                    number="1"
                    text="Your cart"
                    isActive={value === "1"}
                  />
                }
                value="1"
                className={css.tabLabel}
                disabled={value !== "1"}
              />
              <Tab
                label={
                  <TabLabel
                    number="2"
                    text="Payment details"
                    isActive={value === "2"}
                  />
                }
                value="2"
                className={css.tabLabel}
                disabled={value !== "2"}
              />
              <Tab
                label={
                  <TabLabel
                    number="3"
                    text="Complete order"
                    isActive={value === "3"}
                  />
                }
                value="3"
                className={css.tabLabel}
                disabled={value !== "3"}
              />
            </TabList>
          </Box>
          <TabPanel value="1">
            <ShowProduct
              setValue={setValue}
              setValuePaymentDetails={setValuePaymentDetails}
            />
          </TabPanel>
          <TabPanel value="2">
            <PaymentDetail
              valuePaymentDetails={valuePaymentDetails}
              setValue={setValue}
              setValueOrderSuccess={setValueOrderSuccess}
            />
          </TabPanel>
          <TabPanel value="3">
            <OrderSuccess valueOrderSuccess={valueOrderSuccess} />
          </TabPanel>
        </TabContext>
      </div>
    </div>
  );
};

export default Cart;
