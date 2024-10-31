import React, { useEffect, useState } from "react";
import { createAddress, getDistrictsByProvice, getProvinces, getWardsByDistrict } from "../../api/address";
import {
  Box,
  Button,
  Typography,
} from "@mui/material";
import { phoneNumber as ValidPhoneNumber } from "../../validator";
import MyTextField from "../MyTextField/MyTextField";
import SelectAddress from "./SelectAddress";
import { toast } from "react-toastify";

function AddAddress({handleClose, ...props}) {
  const [provinces, setProvinces] = useState([{id: "", nameEn: ""}]);
  const [districts, setDistricts] = useState([])
  const [wards, setWards] = useState([])
  const [selectedProvince, setSelectedProvince] = useState({})
  const [selectedDistrict, setSelectedDistrict] = useState({})
  const [selectedWard, setSelectedWard] = useState(null)
  const [localAddress, setLocalAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [contactName, setContactName] = useState("");
  const fetchProvinces = async () => {
    try {
      const res = await getProvinces();
      setProvinces(res);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDistrictsByProvince = async() => {
    try {
      const res = await getDistrictsByProvice(selectedProvince)
      setDistricts(res)
    } catch (error) {
      console.error(error)
    }
  }

  const fetchWardsByDistrict = async() => {
    try {
      const res = await getWardsByDistrict(selectedDistrict)
      setWards(res)
    } catch (error) {
      console.error(error)
    }
  }


  useEffect(() => {
    fetchProvinces();
  }, []);
  useEffect(() => {
    fetchDistrictsByProvince()
  }, [selectedProvince])
  useEffect(() => {
    fetchWardsByDistrict()
  }, [selectedDistrict])

  const createNewAddress = async () => {
    let isValided = true;
    let error = null;
    console.log(contactName, localAddress, phoneNumber, selectedWard)
    isValided =
      contactName.trim() != "" &&
      localAddress.trim() != "" &&
      phoneNumber.trim() != "" &&
      selectedWard != null;
    error = isValided ? null : "Please fill all information";
    
    isValided = isValided && ValidPhoneNumber(phoneNumber);
    // error = error == null ? (ValidPhoneNumber(phoneNumber) ? "Invalid phone number" : null) : error;
    if(error == null){
      if (!ValidPhoneNumber(phoneNumber)) error = "Invalid phone number"
    }
    console.log(error)
    if (isValided) {
      console.log(error);
      try {
        await createAddress({
          contactName: contactName,
          phoneNumber: phoneNumber,
          wardId: selectedWard,
          localAddress: localAddress,
        });
        handleClose();
        toast.success("Update address successfully", {
          autoClose: 3000,
        });
      } catch (err) {
        if (err.response && err.response.status === 400) {
          toast.error(
            err.response.data.message || "Update failed due to invalid input",
            {
              autoClose: 3000,
            }
          );
        } else
          toast.error("Update address failed", {
            autoClose: 3000,
          });
      }
    } else {
      toast.error(error, {
        autoClose: 3000,
      });
    }
  }

  return (
    <Box sx={{ width: "500px" }}>
      <Typography variant="h5" sx={{ fontWeight: "500", textAlign: "center" }}>
        New Address
      </Typography>
      <Box sx={{ mt: "1rem" }}>
      <MyTextField
          id="contactName"
          label="Contact Name"
          variant="outlined"
          color="var(--admin-color)"
          fullWidth
          style={{ marginY: "1rem" }}
          onChange={(e) => setContactName(e.target.value)}
        />
        <MyTextField
          id="phoneNumber"
          label="Phone Number"
          variant="outlined"
          color="var(--admin-color)"
          fullWidth
          style={{ marginY: "1rem" }}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <SelectAddress
          style={{ width: "100%", marginY: "1rem" }}
          label="Province"
          id="province"
          color="var(--admin-color)"  
          menuList={provinces}
          value={selectedProvince}
          onChange={(e) => {
            setSelectedProvince(e.target.value);
            setSelectedWard(null);
            setSelectedDistrict(null);
          }}
        />
        <SelectAddress
          style={{ width: "100%", marginY: "1rem" }}
          label="District"
          id="district"
          color="var(--admin-color)"  
          menuList={districts}
          value={selectedDistrict}
          onChange={(e) => {
            setSelectedDistrict(e.target.value);
            setSelectedWard(null);
          }}
        />
        <SelectAddress
          style={{ width: "100%", marginY: "1rem" }}
          label="Ward"
          id="ward"
          color="var(--admin-color)"  
          menuList={wards}
          value={selectedWard}
          onChange={(e) => setSelectedWard(e.target.value)}
        />
        <MyTextField
          id="localAddress"
          label="Address"
          variant="outlined"
          color="var(--admin-color)"
          fullWidth
          style={{ marginY: "1rem" }}
          onChange={(e) => setLocalAddress(e.target.value)}
        />
      </Box>
      <Box sx={{ mt: "1rem", display: "flex", justifyContent: "center" }}>
        <Button
          variant="outlined"
          sx={{
            color: "var(--user-second-color)",
            borderColor: "var(--user-second-color)",
            marginRight: "1rem",
          }}
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "var(--user-second-color)",
            borderColor: "var(--user-second-color)",
          }}
          onClick={createNewAddress}
        >
          Create New Address
        </Button>
      </Box>
    </Box>
  );
}

export default AddAddress;
