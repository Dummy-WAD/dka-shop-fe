import { useSelector } from "react-redux";
import SidebarProfile from "../../components/SidebarProfile/SidebarProfile";
import classes from "./Profile.module.css"
import { CUSTOMER } from "../../config/roles";
import { Typography, Button, Grid2 } from "@mui/material";
import { Formik } from "formik";
import MyTextField from "../../components/MyTextField/MyTextField";
import DateInput from "../../components/DateInput/DateInput";
import SelectCustom from "../../components/SelectCustom/SelectCustom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { phoneNumber } from "../../validator";

const genderList = [
    {
        key: "male",
        value: "Male",
    },
    {
        key: "female",
        value: "Female",
    }
]

const initialProfile = {
    firstName: "Ha",
    lastName: "Phuong",
    email: "phuongha@gmail.com",
    phone: "0905478854",
    joinDate: "24/07/2024",
    gender: "male",
}

const Profile = () => {
    const { isAuthenticated } = useSelector(state => state.auth);
    const { role, firstName : firstNameProfile, lastName: lastNameProfile } = useSelector(state => state.auth.userInfo);
    const [isEdited, setIsEdited] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState("");
    const [profile, setProfile] = useState(initialProfile);

    const handleSetAttribute = (profile) => {
        setFirstName(profile.firstName);
        setLastName(profile.lastName);
        setPhone(profile.phone);
        setGender(profile.gender);
    }

    const fetchData = async () => {
        // call API
        const res = initialProfile;
        setProfile(res);
        handleSetAttribute(res);
    }

    useEffect(()=>{
        fetchData();
    },[])

    const handleSaveChanges = () => {
        let isValided = true;
        let error = "";

        isValided = (firstName.trim() != "") && (lastName.trim() != "") && (phone.trim() != "") && (gender != "male" || gender != "female");
        error = isValided ? "" : "Fill full information";

        isValided = isValided ?? phoneNumber(phone);
        error = isValided ? "Phone number has 10 ligit" : error;

        if (isValided) {
            console.log({firstName, lastName, phone, gender});
            // send request

            // update profile
            fetchData();

            //show toast
            toast.success("Update profile successfully", {
                autoClose: 3000,
            });
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
    if (isAuthenticated || role !== CUSTOMER) return <Navigate to="/unauthorized" />
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
                                        value={profile.email}
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
                                        value={phone}
                                        onChange={(e)=>setPhone(e.target.value)}
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
                                        value={profile.joinDate} 
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