import React, { useEffect, useState } from "react";
import {
  getAddressDetail,
  getDistrictsByProvice,
  getProvinces,
  getWardsByDistrict,
} from "../../api/address";
import { Box, Button, Typography } from "@mui/material";
import MyTextField from "../MyTextField/MyTextField";
import SelectAddress from "./SelectAddress";
import { toast } from "react-toastify";

function UpdateAddress({ addressId, ...props }) {
  const [provinces, setProvinces] = useState([{ id: "", nameEn: "" }]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState({});
  const [selectedDistrict, setSelectedDistrict] = useState({});
  const [selectedWard, setSelectedWard] = useState({});
  const [localAddress, setLocalAddress] = useState("")
  console.log(localAddress);

  const fetchAddressDetail = async () => {
    try {
      const res = await getAddressDetail(addressId);
      setSelectedProvince(res.province.id);
      setSelectedDistrict(res.district.id);
      setSelectedWard(res.ward.id);
      setLocalAddress(res.localAddress)
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProvinces = async () => {
    try {
      const res = await getProvinces();
      setProvinces(res);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDistrictsByProvince = async () => {
    try {
      const res = await getDistrictsByProvice(selectedProvince);
      setDistricts(res);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchWardsByDistrict = async () => {
    try {
      const res = await getWardsByDistrict(selectedDistrict);
      setWards(res);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProvinces();
    fetchAddressDetail();
  }, []);
  useEffect(() => {
    fetchDistrictsByProvince();
  }, [selectedProvince]);
  useEffect(() => {
    fetchWardsByDistrict();
  }, [selectedDistrict]);

  const  updateAddress = async () => {
    if(localAddress == "" ) {
      toast.error("Please fill your address", {
        autoClose: 3000,
    });
    } else {
      try {
        
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <Box sx={{ width: "500px" }}>
      <Typography variant="h5" sx={{ fontWeight: "500", textAlign: "center" }}>
        Address
      </Typography>
      <Box sx={{ mt: "1rem" }}>
        <SelectAddress
          style={{ width: "100%", marginY: "1rem" }}
          label="Province"
          id="province"
          color="var(--admin-color)"
          menuList={provinces}
          value={selectedProvince ? selectedProvince : ""}
          onChange={(e) => setSelectedProvince(e.target.value)}
        />
        <SelectAddress
          style={{ width: "100%", marginY: "1rem" }}
          label="District"
          id="district"
          color="var(--admin-color)"
          menuList={districts}
          value={selectedDistrict}
          onChange={(e) => setSelectedDistrict(e.target.value)}
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
          value={localAddress}
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
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "var(--user-second-color)",
            borderColor: "var(--user-second-color)",
          }}
        >
          Update Address
        </Button>
      </Box>
    </Box>
  );
}

export default UpdateAddress;
