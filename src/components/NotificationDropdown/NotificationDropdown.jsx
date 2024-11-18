import { Popover, Button } from "@mui/material";
import { useState } from "react";
import css from "./NotificationDropdown.module.css";
import NotificationItem from "./NotificationItem";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";
const NotificationDropdown = ({ isOpen, anchorEl, setIsOpen }) => {
  const handleClose = () => {
    setIsOpen(false);
  };

  const notifications = [
    {
      id: 1,
      type: "SUCCESS",
      content: "Your order has been successfully placed!",
      createdAt: "2024-11-19T09:30:00Z",
      seen: true,
    },
    {
      id: 2,
      type: "ERROR",
      content: "There was an issue with your payment. Please try again.",
      createdAt: "2024-11-18T14:15:00Z",
      seen: true,
    },
    {
      id: 3,
      type: "WARNING",
      content: "Your subscription is about to expire. Renew soon.",
      createdAt: "2024-11-17T08:45:00Z",
      seen: true,
    },
    {
      id: 4,
      type: "INFORMATION",
      content: "New features have been added to your account. Check them out.",
      createdAt: "2024-11-16T12:00:00Z",
      seen: false,
    },
    {
      id: 5,
      type: "SUCCESS",
      content: "Your password has been changed successfully.",
      createdAt: "2024-11-15T16:20:00Z",
      seen: false,
    },
    {
      id: 6,
      type: "ERROR",
      content: "Failed to fetch your data. Please try again later.",
      createdAt: "2024-11-14T10:10:00Z",
      seen: false,
    },
    {
      id: 7,
      type: "WARNING",
      content: "Your profile information is incomplete. Please update it.",
      createdAt: "2024-11-13T11:00:00Z",
      seen: false,
    },
    {
      id: 8,
      type: "INFORMATION",
      content: "We have updated our privacy policy. Review it here.",
      createdAt: "2024-11-12T09:45:00Z",
      seen: false,
    },
  ];

  return (
    <Popover
      open={isOpen}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <PerfectScrollbar onYReachEnd={() => console.log("check")}>
        <div className={css.dropdownContent}>
          <div className={css.header}>
            <h3 className={css.title}>Notifications</h3>
            <Button variant="text" className={css.markAllButton}>
              Mark all as read
            </Button>
          </div>
          <div>
            {notifications &&
              notifications.map((notification) => (
                <NotificationItem
                  notification={notification}
                  key={notification.id}
                />
              ))}
          </div>
        </div>
      </PerfectScrollbar>
    </Popover>
  );
};

export default NotificationDropdown;
