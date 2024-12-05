import { Popover, Button } from "@mui/material";
import css from "./NotificationDropdown.module.css";
import NotificationItem from "./NotificationItem";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useEffect, useState, useCallback } from "react";
import {
  getNotificationsForAdmin,
  markNotificationsAsRead,
} from "../../api/notification";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { debounce } from "lodash";
import { setTotalNotificationItems } from "../../redux/slice/notificationSlice";

const removeDuplicateUsingCheckArray = (array) => {
  const checkedArray = new Array(array.length).fill(false);
  const result = [];
  for (let i = 0; i < array.length; i++) {
    if (!checkedArray[array[i].id]) {
      checkedArray[array[i].id] = true;
      result.push(array[i]);
    }
  }
  return result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

const NotificationDropdown = ({ isOpen, anchorEl, setIsOpen }) => {
  const userRole = useSelector((state) => state.auth.userInfo.role);

  const [notifications, setNotifications] = useState([]);
  const [after, setAfter] = useState(null);
  const [isLastNotification, setIsLastNotification] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const limit = 5;

  const dispatch = useDispatch();

  const handleClose = () => {
    setAfter(null);
    setIsOpen(false);
  };

  const fetchNotifications = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const params = {
        after,
        limit,
      };
      const response = await getNotificationsForAdmin(userRole, params);
      if (response) {
        setNotifications((prev) =>
          removeDuplicateUsingCheckArray([...prev, ...response.results])
        );
        setAfter(response.nextCursor);
        setIsLastNotification(response.isLast);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleScroll = useCallback(
    debounce(
      () => {
        if (!isLastNotification) fetchNotifications();
      },
      300,
      { trailing: true, leading: false }
    ),
    [isLastNotification, fetchNotifications]
  );
  const markAsRead = async () => {
    try {
      const response = await markNotificationsAsRead(userRole);
      if (response) {
        setNotifications((prev) =>
          prev.map((notification) => ({ ...notification, seen: true }))
        );
        dispatch(setTotalNotificationItems(0));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    return () => {
      handleScroll.cancel();
    };
  }, [handleScroll]);

  useEffect(() => {
    if (isOpen && !isLastNotification) fetchNotifications();
  }, [isOpen]);

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
      <PerfectScrollbar onYReachEnd={handleScroll}>
        <div className={css.dropdownContent}>
          <div className={css.header}>
            <h3 className={css.title}>Notifications</h3>
            <Button
              variant="text"
              className={css.markAllButton}
              onClick={markAsRead}
            >
              Mark all as read
            </Button>
          </div>
          <div>
            {notifications.map((notification) => (
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

NotificationDropdown.propTypes = {
  isOpen: PropTypes.bool,
  anchorEl: PropTypes.any,
  setIsOpen: PropTypes.func,
};

export default NotificationDropdown;
