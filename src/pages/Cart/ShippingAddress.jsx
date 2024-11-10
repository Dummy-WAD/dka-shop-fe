import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@mui/material";
import css from "./ShippingAddress.module.css";
import { getCustomerAddresses } from "../../api/address";
import { PlusIcon } from "../../icon/Icon";
import ModalCustom from "../../components/Modal/BasicModal";
import AddAddress from "../../components/Address/AddAddress";

const ShippingAddress = ({ selectedAddress, setSelectedAddress }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [openModalAddNewAddress, setOpenModalAddNewAddress] = useState(false);

  const handleAddressChange = (e) => {
    const element = addresses.filter(
      (addresses) => addresses.id == e.target.value
    );
    setSelectedAddress(element[0]);
    setIsModalOpen(false);
  };

  const fetchAddresses = async () => {
    try {
      const res = await getCustomerAddresses();
      const formattedAddresses = res.map((address) => ({
        id: address.id,
        name: address.contactName,
        phone: address.phoneNumber,
        street: address.localAddress,
        city: `${address.ward.nameEn}, ${address.district.nameEn}, ${address.province.nameEn}`,
        isDefault: address.isDefault,
      }));
      const element = formattedAddresses.filter((address) => address.isDefault);
      setAddresses(formattedAddresses);
      setSelectedAddress(element[0]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  return (
    <div className={css.shippingAddressContainer}>
      <div className={css.header}>
        <span>
          <svg
            width="14"
            height="20"
            viewBox="0 0 14 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.95149 0.268066C3.11383 0.268066 0 3.07082 0 6.5244C0 12.0856 6.95149 19.7322 6.95149 19.7322C6.95149 19.7322 13.903 12.0856 13.903 6.5244C13.903 3.07082 10.7891 0.268066 6.95149 0.268066ZM6.95149 10.0001C6.40154 10.0001 5.86394 9.83707 5.40667 9.53153C4.9494 9.226 4.59301 8.79173 4.38255 8.28364C4.17209 7.77555 4.11703 7.21647 4.22432 6.67709C4.33161 6.1377 4.59644 5.64225 4.98531 5.25338C5.37418 4.8645 5.86964 4.59968 6.40902 4.49239C6.9484 4.3851 7.50749 4.44016 8.01557 4.65062C8.52366 4.86107 8.95793 5.21747 9.26346 5.67474C9.569 6.132 9.73208 6.6696 9.73208 7.21955C9.73128 7.95676 9.43806 8.66355 8.91677 9.18484C8.39549 9.70613 7.6887 9.99934 6.95149 10.0001Z"
              fill="black"
            />
          </svg>
          <span
            style={{
              marginLeft: "10px",
              fontWeight: "bold",
              fontSize: "18px",
            }}
          >
            Shipping address
          </span>
        </span>
        <span
          className={css.changeLink}
          onClick={() => setIsModalOpen(true)}
          style={{ cursor: "pointer", color: "#1a73e8" }}
        >
          Change
        </span>
      </div>
      {addresses.length > 0 ? (
        <div className={css.addressDetails}>
          <div className={css.addressItem}>
            <div className={css.name}>{selectedAddress?.name}</div>
            <div className={css.street}>{selectedAddress?.street}</div>
          </div>
          <div className={css.addressItem}>
            <div className={css.phone}>{selectedAddress?.phone}</div>
            <div className={css.city}>{selectedAddress?.city}</div>
          </div>
        </div>
      ) : (
        <>
          <div className={css.noAddress}>
            <div className={css.titleNoAddress}>No address available</div>
            <Button
              variant="outlined"
              sx={{
                color: "var(--user-second-color)",
                borderColor: "var(--user-second-color)",
                "&:hover": {
                  backgroundColor: "var(--user-second-color)",
                  color: "white",
                },
              }}
              onClick={() => setOpenModalAddNewAddress(true)}
            >
              <div className={css.icon}>
                <PlusIcon />
              </div>
              New Address
            </Button>
          </div>
          <ModalCustom
            isOpen={openModalAddNewAddress}
            handleClose={() => {
              setOpenModalAddNewAddress(false);
            }}
          >
            <AddAddress
              handleClose={async () => {
                await fetchAddresses();
                setOpenModalAddNewAddress(false);
              }}
            />
          </ModalCustom>
        </>
      )}

      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: 1,
            boxShadow: 24,
            p: 3,
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            Select Address
          </Typography>
          <Typography id="modal-description" sx={{ mt: 1 }}>
            <RadioGroup
              // value={selectedAddress}
              value={selectedAddress?.id || ""}
              onChange={(e) => handleAddressChange(e)}
              sx={{ mt: 2 }}
            >
              {addresses.map((address, index) => (
                <FormControlLabel
                  key={index}
                  value={address.id}
                  control={<Radio />}
                  label={
                    <div
                      style={{
                        marginBottom: "16px",
                        width: "100%",
                      }}
                    >
                      <div>
                        <strong>{address.name}</strong>
                      </div>
                      <div>{address.phone}</div>
                      <div>{address.street}</div>
                      <div>{address.city}</div>
                      <hr />
                    </div>
                  }
                />
              ))}
            </RadioGroup>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};
ShippingAddress.propTypes = {
  selectedAddress: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    phone: PropTypes.string,
    street: PropTypes.string,
    city: PropTypes.string,
  }),
  setSelectedAddress: PropTypes.func.isRequired,
};

export default ShippingAddress;
