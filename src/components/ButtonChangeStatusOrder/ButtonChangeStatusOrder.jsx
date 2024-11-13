import { Button } from "@mui/material";
import css from "./ButtonChangeStatusOrder.module.css";
import PropTypes from "prop-types";
import { useState } from "react";
import ModalConfirmChangeStatusOrder from "../ModalConfirmChangeStatusOrder/ModalConfirmChangeStatusOrder";

const ButtonChangeStatusOrder = ({ order, getOrder }) => {
  const { status, id } = order;
  const [openModal, setOpenModal] = useState(false);
  const [statusWantToChange, setStatusWantToChange] = useState(null);
  const handleOpenModal = (statusWantToChange) => {
    setOpenModal(true);
    setStatusWantToChange(statusWantToChange);
  };
  return (
    <div className={css.buttonContainer}>
      {status === "PENDING" && (
        <>
          <Button
            className={css.button}
            onClick={() => handleOpenModal("CANCELLED")}
            style={{
              backgroundColor: "white",
              color: "black",
              border: "1px solid black",
            }}
          >
            Cancel
          </Button>
          <Button
            className={css.button}
            onClick={() => handleOpenModal("PACKAGING")}
            style={{
              backgroundColor: "#f09651",
            }}
          >
            Accept
          </Button>
        </>
      )}
      {status === "PACKAGING" && (
        <>
          <Button
            className={css.button}
            onClick={() => handleOpenModal("CANCELLED")}
            style={{
              backgroundColor: "white",
              color: "black",
              border: "1px solid black",
            }}
          >
            Cancel
          </Button>
          <Button
            className={css.button}
            onClick={() => handleOpenModal("DELIVERING")}
            style={{
              backgroundColor: "#f09651",
            }}
          >
            Deliver
          </Button>
        </>
      )}
      {status === "DELIVERING" && (
        <Button
          className={css.button}
          onClick={() => handleOpenModal("COMPLETED")}
          style={{
            backgroundColor: "#f09651",
          }}
        >
          Complete
        </Button>
      )}

      <ModalConfirmChangeStatusOrder
        openModal={openModal}
        setOpenModal={setOpenModal}
        statusWantToChange={statusWantToChange}
        id={id}
        getOrder={getOrder}
      />
    </div>
  );
};

ButtonChangeStatusOrder.propTypes = {
  order: PropTypes.object.isRequired,
  getOrder: PropTypes.func.isRequired,
};

export default ButtonChangeStatusOrder;
