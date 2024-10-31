import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CUSTOMER } from "../../config/roles";
import classes from "./Address.module.css";
import SidebarProfile from "../../components/SidebarProfile/SidebarProfile";
import { Button, Divider, Typography } from "@mui/material";
import { PlusIcon } from "../../icon/Icon";
import { Navigate } from "react-router-dom";
import { deleteAddress, getCustomerAddresses, setAsDefault } from "../../api/address";
import ModalCustom from "../../components/Modal/BasicModal";
import UpdateAddress from "../../components/Address/UpdateAddress";
import AddAddress from "../../components/Address/AddAddress";
import DeleteModal from "../../components/Modal/DeleteModal";
import { toast } from "react-toastify";

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

  const handleOpenDelete = (address) => {
    if (address.isDefault) {
      toast.error("Cannot delete default address", {
        autoClose: 3000,
      });
    } else {
      setSelectedAddress(address.id)
    setModalType("delete");
    setIsOpen(true);
    }
    
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
  }, [isOpen]);

  const setAddressAsDefault = async (addressId) => {
    try {
      await setAsDefault(addressId)
      fetchAddresses()
      toast.success("Set default address successfully", {
        autoClose: 3000,
      });
    } catch (error) {
      toast.error("Failed to set default address", {
        autoClose: 3000,
      });
      console.error(error)
    }
  }

  const handleDeleteAddress = async () => {
    try {
      await deleteAddress(selectedAddress)
      handleClose()
      toast.success("Delete address successfully", {
        autoClose: 3000,
      });
    } catch (error) {
      toast.error(error, {
        autoClose: 3000,
      });
    }
  }

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
                <div className={classes.row_name}>
                <Typography variant="h6" sx={{ fontWeight: "500", width: "250px", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden"}}>
                  {address.contactName}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: "400", marginX: "1rem"}}>
                  |
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: "400"}}>
                  {address.phoneNumber}
                </Typography>
                </div>
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
                  onClick={() => {if(!address.isDefault) setAddressAsDefault(address.id)}}
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
                  onClick={() => handleOpenDelete(address)}
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
          <UpdateAddress addressId={selectedAddress} handleClose={handleClose}/>
        </ModalCustom>
      )}
      {isOpen && modalType == "add" && (
        <ModalCustom isOpen={isOpen} handleClose={handleClose}>
          <AddAddress handleClose={handleClose}/>
        </ModalCustom>
      )}
      {isOpen && modalType == "delete" && (
        <DeleteModal
          isOpen={isOpen}
          handleClose={handleClose}
          onSubmit={handleDeleteAddress}
          title="Delete address"
          description="Are you sure delete this address ?"
        />
      )}
    </div>
  );
}

export default Address;
