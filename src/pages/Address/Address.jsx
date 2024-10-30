import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CUSTOMER } from "../../config/roles";
import classes from "./Address.module.css";
import SidebarProfile from "../../components/SidebarProfile/SidebarProfile";
import { Button, Divider, Typography } from "@mui/material";
import { PlusIcon } from "../../icon/Icon";
import { Navigate } from "react-router-dom";
import { getCustomerAddresses } from "../../api/address";
import ModalCustom from "../../components/Modal/BasicModal";
import UpdateAddress from "../../components/Address/UpdateAddress";
import AddAddress from "../../components/Address/AddAddress";
import DeleteModal from "../../components/Modal/DeleteModal";

function Address() {
  const dispatch = useDispatch();
  const { isAuthenticated, userInfo: profile } = useSelector(
    (state) => state.auth
  );
  const {
    role,
    firstName: firstNameProfile,
    lastName: lastNameProfile,
  } = useSelector((state) => state.auth.userInfo);

  const [addresses, setAddresses] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("")

  const handleOpenUpdate = (addressId) => {
    setSelectedAddress(addressId)
    setModalType("update");
    setIsOpen(true);
  };

  const handleOpenAdd = () => {
    setModalType("add");
    setIsOpen(true);
  };

  const handleOpenDelete = () => {
    setModalType("delete");
    setIsOpen(true);
  }

  const handleClose = () => {
    setModalType("");
    setIsOpen(false);
  };

  const fetchAddresses = async () => {
    try {
      const res = await getCustomerAddresses();

      setAddresses(res);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  if (!isAuthenticated || role !== CUSTOMER)
    return <Navigate to="/unauthorized" />;

  return (
    <div className={classes.container}>
      <div className={classes.container_left}>
        <SidebarProfile
          firstName={firstNameProfile}
          lastName={lastNameProfile}
        />
      </div>
      <div className={classes.container_right}>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", fontWeight: "500", mb: "3rem" }}
        >
          MY ADDRESSES
        </Typography>
        <div className={classes.row_end}>
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
            onClick={handleOpenAdd}
          >
            <div className={classes.icon}>
              <PlusIcon />
            </div>
            New Address
          </Button>
        </div>
        {addresses.map((address, index) => (
          <div key={index}>
            <div className={classes.row}>
              <div>
                <Typography variant="h6" sx={{ fontWeight: "500"}}>
                  {profile.lastName} {profile.firstName}
                </Typography>
                <p>{address.localAddress}</p>
                <p>
                  {address.ward.nameEn} Ward, {address.district.nameEn}{" "}
                  District, {address.province.nameEn}
                </p>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    color: "var(--user-second-color)",
                    marginTop: "1rem",
                    borderColor: "var(--user-second-color)",
                    "&:hover": {
                      backgroundColor: "var(--user-second-color)",
                      color: "white",
                    },
                    "&:disabled": {
                      color: "var(--user-color)",
                      backgroundColor: "white",
                      borderColor: "var(--user-color)",
                    },
                  }}
                  disabled={address.isDefault}
                >
                  {address.isDefault ? "default" : "set as default"}
                </Button>
              </div>
              <div className={classes.row}>
                <Button
                  variant="text"
                  sx={{ color: "var(--user-second-color)", fontSize: "1rem" }}
                  onClick={() => handleOpenUpdate(address.id)}
                >
                  Update
                </Button>
                <Button
                  variant="text"
                  sx={{ color: "var(--user-color)", fontSize: "1rem" }}
                  onClick={handleOpenDelete}
                >
                  Delete
                </Button>
              </div>
            </div>
            <Divider />
          </div>
        ))}
      </div>
      {isOpen && modalType == "update" && (
        <ModalCustom isOpen={isOpen} handleClose={handleClose}>
          <UpdateAddress addressId={selectedAddress}/>
        </ModalCustom>
      )}
      {isOpen && modalType == "add" && (
        <ModalCustom isOpen={isOpen} handleClose={handleClose}>
          <AddAddress />
        </ModalCustom>
      )}
      {isOpen && modalType == "delete" && (
        <DeleteModal
          isOpen={isOpen}
          handleClose={handleClose}
          // onSubmit={handleDelete}
          title="Delete address"
          description="Are you sure delete this address ?"
        />
      )}
    </div>
  );
}

export default Address;
