import { useDispatch, useSelector } from "react-redux";
import SidebarProfile from "../../components/SidebarProfile/SidebarProfile";
import classes from "./Profile.module.css"
import { CUSTOMER } from "../../config/roles";
import { Typography, Button, Grid2 } from "@mui/material";
import MyTextField from "../../components/MyTextField/MyTextField";
import DateInput from "../../components/DateInput/DateInput";
import SelectCustom from "../../components/SelectCustom/SelectCustom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { phoneNumber as validPhoneNumber } from "../../validator";
import { Navigate } from "react-router-dom";
import { handleGetUserInfo } from "../../api/user";
import moment from "moment/moment";
import { handleUpdateProfileCustomer } from "../../api/personal";
import { setAuthInfo } from "../../redux/slice/authSlice";
import { MALE, FEMALE } from "../../config/gender";

const genderList = [
    {
        key: "none",
        value: "Select gender"
    },
    {
        key: MALE,
        value: "Male",
    },
    {
        key: FEMALE,
        value: "Female",
    }
]

const Profile = () => {
    const dispatch = useDispatch();
    const { isAuthenticated, userInfo : profile } = useSelector(state => state.auth);
    const { role, firstName : firstNameProfile, lastName: lastNameProfile } = useSelector(state => state.auth.userInfo);
    const [isEdited, setIsEdited] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [gender, setGender] = useState("");

    const handleSetAttribute = (profile) => {
        setFirstName(profile?.firstName);
        setLastName(profile?.lastName);
        setPhoneNumber(profile?.phoneNumber);
        setGender(profile?.gender || "none");
    }

    const fetchData = async () => {
        // call API
        const res = await handleGetUserInfo();
        dispatch(setAuthInfo({
            userInfo: res,
        }));
        handleSetAttribute(res);
    }

    useEffect(()=>{
        fetchData();
    },[]);

    const handleValid = () => {
        let isValided = true;

        isValided = (firstName && firstName.trim() != "") && (lastName && lastName.trim() != "") && (phoneNumber && phoneNumber.trim() != "") && (gender != "none");
        if (!isValided) return { isValided : false, error: "Fill full information"}

        isValided = validPhoneNumber(phoneNumber);
        if (!isValided) return { isValided : false, error: "Incorrect format phone number"}

        return { isValided: true}
    }

    const handleSaveChanges = async () => {
        const {isValided, error } = handleValid();

        if (isValided) {
            try {
                // send request
                await handleUpdateProfileCustomer({firstName, lastName, phoneNumber, gender})
                // update profile
                fetchData();
                toast.success("Update profile successfully", {
                    autoClose: 3000,
                });
            } catch (err) {
                toast.error("Update profile failed", {
                    autoClose: 3000,
                });
                handleSetAttribute(profile);
            }
            setIsEdited(false);
        } else {
            toast.error(error, {
                autoClose: 3000,
            });
        }
    }

    const handleCancel = (()=>{
        handleSetAttribute(profile);
        setIsEdited(false);
    })
    if (!isAuthenticated || role !== CUSTOMER) return <Navigate to="/unauthorized" />
    return (
        <>
            {isAuthenticated && role == CUSTOMER && (
                <div className={classes.container}>
                    <div className={classes.container_left}>
                        <SidebarProfile firstName={firstNameProfile} lastName={lastNameProfile}/>
                    </div>
                    <div className={classes.container_right}>
                        <Typography variant="h5" sx={{textAlign: "center", fontWeight: "500", mb: "3rem"}}>MY PROFILE</Typography>
                        <Grid2 sx={{mb: "1rem"}}>
                            <form>
                                <Typography variant="h6" sx={{fontWeight: "500"}}>
                                    Personal information
                                </Typography>
                                <div className={classes.row}>
                                    <MyTextField 
                                        id="firstName" 
                                        label="First name" 
                                        variant="outlined" 
                                        color="var(--admin-color)" 
                                        smallSize 
                                        disabled={!isEdited} 
                                        style={{width: "40%"}} 
                                        value={firstName}
                                        onChange={(e)=>setFirstName(e.target.value)}
                                    />
                                    <MyTextField 
                                        id="lastName" 
                                        label="Last name" 
                                        variant="outlined" 
                                        color="var(--admin-color)" 
                                        smallSize 
                                        disabled={!isEdited} 
                                        style={{width: "40%"}} 
                                        value={lastName}
                                        onChange={(e)=>setLastName(e.target.value)}
                                    />
                                </div>
                                <div className={classes.row}>
                                    <MyTextField 
                                        id="email" 
                                        label="Email" 
                                        variant="outlined" 
                                        color="var(--admin-color)" 
                                        smallSize 
                                        disabled
                                        fullWidth 
                                        value={profile?.email}
                                    />
                                </div>
                                <div className={classes.row}>
                                    <MyTextField 
                                        id="phone" 
                                        label="Phone number" 
                                        variant="outlined" 
                                        color="var(--admin-color)" 
                                        smallSize 
                                        disabled={!isEdited} 
                                        fullWidth 
                                        value={phoneNumber}
                                        onChange={(e)=>setPhoneNumber(e.target.value)}
                                    />
                                </div>
                                <div className={classes.row}>
                                    <DateInput 
                                        id="date" 
                                        label="Join date" 
                                        variant="outlined" 
                                        color="var(--admin-color)" 
                                        smallSize 
                                        disabled
                                        style={{width: "60%"}} 
                                        value={moment(profile?.createdAt).format("DD/MM/YYYY")}
                                    />
                                    <SelectCustom
                                        id="label"
                                        label="Gender"
                                        menuList={genderList}
                                        style={{width: "30%"}}
                                        value={gender}
                                        onChange={(e)=>setGender(e.target.value)}
                                        disabled={!isEdited}
                                        smallSize
                                    />
                                </div>
                                <div className={classes.button}>
                                    {isEdited ? (
                                        <>
                                            <Button
                                                variant="outlined"
                                                sx={{ backgroundColor: "#000", color: "#fff" ,textTransform: "none", fontSize: "16px" }}
                                                onClick={handleSaveChanges}
                                            >
                                                Save changes
                                            </Button>

                                            <Button
                                                variant="outlined"
                                                sx={{ color: "#000", textTransform: "none", fontSize: "16px", border: "1px solid #000" }}
                                                onClick={handleCancel}
                                            >
                                                Cancel
                                            </Button>
                                        </>
                                    ) : (
                                        <Button
                                            variant="outlined"
                                            sx={{ color: "#000", textTransform: "none", fontSize: "16px", border: "1px solid #000" }}
                                            onClick={()=>setIsEdited(true)}
                                        >
                                            Change
                                        </Button>
                                    )}
                                </div>
                            </form>
                        </Grid2>
                    </div>
                </div>
            )}
        </>
    )
}

export default Profile;