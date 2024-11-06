import { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import css from "./ShippingAddress.module.css";
import { getCustomerAddresses } from "../../api/address";

const ShippingAddress = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(0);
  const [addresses, setAddresses] = useState([]);

  const handleAddressChange = (index) => {
    setSelectedAddress(index);
    setIsModalOpen(false);
  };

  const fetchAddresses = async () => {
    try {
      const res = await getCustomerAddresses();
      const formattedAddresses = res.map((address) => ({
        name: address.contactName,
        phone: address.phoneNumber,
        street: address.localAddress,
        city: `${address.ward.nameEn}, ${address.district.nameEn}, ${address.province.nameEn}`,
      }));
      setAddresses(formattedAddresses);
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
      {addresses.length > 0 && (
        <div className={css.addressDetails}>
          <div className={css.addressItem}>
            <div className={css.name}>{addresses[selectedAddress].name}</div>
            <div className={css.street}>
              {addresses[selectedAddress].street}
            </div>
          </div>
          <div className={css.addressItem}>
            <div className={css.phone}>{addresses[selectedAddress].phone}</div>
            <div className={css.city}>{addresses[selectedAddress].city}</div>
          </div>
        </div>
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
              value={selectedAddress}
              onChange={(e) => handleAddressChange(Number(e.target.value))}
              sx={{ mt: 2 }}
            >
              {addresses.map((address, index) => (
                <FormControlLabel
                  key={index}
                  value={index}
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

export default ShippingAddress;