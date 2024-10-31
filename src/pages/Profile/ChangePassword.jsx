import { useSelector } from "react-redux";
import SidebarProfile from "../../components/SidebarProfile/SidebarProfile";
import classes from "./ChangePassword.module.css";
import { CUSTOMER } from "../../config/roles";
import { Typography, Button, Grid2 } from "@mui/material";
import MyTextField from "../../components/MyTextField/MyTextField";
import { toast } from "react-toastify";
import { useState } from "react";
import { password as ValidPassword } from "../../validator";
import { Navigate } from "react-router-dom";
import { handleChangePassword } from "../../api/personal";

const ChangePassword = () => {
  const { isAuthenticated, userInfo: profile } = useSelector(
    (state) => state.auth
  );
  const {
    role,
    firstName: firstNameProfile,
    lastName: lastNameProfile,
  } = useSelector((state) => state.auth.userInfo);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSaveChanges = async () => {
    let isValided = true;
    let error = "";

    isValided =
      oldPassword.trim() !== "" &&
      newPassword.trim() !== "" &&
      confirmPassword.trim() !== "";
    if (!isValided) {
      error = "Please fill out all fields.";
    }

    else if (!ValidPassword(newPassword)) {
      isValided = false;
      error =
        "Invalid password! Must be at least 8 characters with one uppercase, one lowercase, one number, and one special character.";
    }

    else if (newPassword !== confirmPassword) {
      isValided = false;
      error = "New password and confirm password do not match.";
    }

    else if (newPassword === oldPassword) {
        isValided = false;
        error = "New password must be different from the old password.";
    }

    if (isValided) {
      try {
        await handleChangePassword({
          oldPassword,
          password: newPassword,
          confirmPassword,
        });
        toast.success("Password changed successfully!", { autoClose: 3000 });
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } catch (err) {
        toast.error(
          "Failed to change password. Please check your information and try again.",
          { autoClose: 3000 }
        );
      }
    } else {
      toast.error(error, { autoClose: 3000 });
    }
  };

  const handleCancel = () => {
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };
  if (!isAuthenticated || role !== CUSTOMER)
    return <Navigate to="/unauthorized" />;
  return (
    <>
      {isAuthenticated && role === CUSTOMER && (
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
              CHANGE PASSWORD
            </Typography>
            <Grid2 sx={{ mb: "1rem" }}>
              <form>
                <Typography variant="h6" sx={{ fontWeight: "500" }}>
                  Change password
                </Typography>
                <div className={classes.row}>
                  <MyTextField
                    id="oldPassword"
                    label="Old password"
                    variant="outlined"
                    color="var(--admin-color)"
                    type="password"
                    smallSize
                    style={{ width: "100%" }}
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>
                <div className={classes.row}>
                  <MyTextField
                    id="newPassword"
                    label="New password"
                    variant="outlined"
                    type="password"
                    color="var(--admin-color)"
                    smallSize
                    style={{ width: "100%" }}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className={classes.row}>
                  <MyTextField
                    id="confirmPassword"
                    label="Confirm new password"
                    variant="outlined"
                    type="password"
                    color="var(--admin-color)"
                    smallSize
                    style={{ width: "100%" }}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <div className={classes.button}>
                  {
                    <>
                      <Button
                        variant="outlined"
                        sx={{
                          backgroundColor: "#000",
                          color: "#fff",
                          textTransform: "none",
                          fontSize: "16px",
                        }}
                        onClick={handleSaveChanges}
                      >
                        Save changes
                      </Button>

                      <Button
                        variant="outlined"
                        sx={{
                          color: "#000",
                          textTransform: "none",
                          fontSize: "16px",
                          border: "1px solid #000",
                        }}
                        onClick={handleCancel}
                      >
                        Cancel
                      </Button>
                    </>
                  }
                </div>
              </form>
            </Grid2>
          </div>
        </div>
      )}
    </>
  );
};

export default ChangePassword;
