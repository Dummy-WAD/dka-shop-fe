import { Popover, Button } from "@mui/material";
import css from "./NotificationDropdown.module.css";
import NotificationItem from "./NotificationItem";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useEffect, useState, useCallback } from "react";
import { getNotificationsForAdmin } from "../../api/notification";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { debounce } from "lodash";

const removeDuplicateUsingCheckArray = (array) => {
  const checkedArray = new Array(array.length).fill(false);
  const result = [];
  for (let i = 0; i < array.length; i++) {
    if (!checkedArray[array[i].id]) {
      checkedArray[array[i].id] = true;
      result.push(array[i]);
    }
  }
  return result;
};

const NotificationDropdown = ({ isOpen, anchorEl, setIsOpen }) => {
  const userRole = useSelector((state) => state.auth.userInfo.role);

  const handleClose = () => {
    setIsOpen(false);
  };

  const [notifications, setNotifications] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const limit = 5;

  const fetchNotifications = async () => {
    if (isLoading || page > totalPage) return;
    setIsLoading(true);
    try {
      const params = {
        page: page,
        limit: limit,
      };
      const response = await getNotificationsForAdmin(userRole, params);
      if (response) {
        setNotifications((prev) =>
          removeDuplicateUsingCheckArray([...prev, ...response.results])
        );
        setTotalPage(response.totalPages);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleScroll = useCallback(
    debounce(() => {
      if (!isLoading && page < totalPage) {
        setPage((prev) => prev + 1);
      }
    }, 300),
    [isLoading, page, totalPage]
  );

  useEffect(() => {
    return () => {
      handleScroll.cancel();
    };
  }, [handleScroll]);

  useEffect(() => {
    fetchNotifications();
  }, [page]);

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
            <Button variant="text" className={css.markAllButton}>
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
