import styles from "./NotificationItem.module.css";
import { CircleAlert } from "../../icon/Icon";
import PropTypes from "prop-types";

function timeAgo(inputTime) {
  const now = new Date();
  const timeDiff = now.getTime() - new Date(inputTime).getTime();

  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.max(Math.floor(days / 30.44), 1);
  const years = Math.max(Math.floor(days / 365.25), 1);

  if (seconds < 60) {
    return "Just now";
  } else if (minutes < 60) {
    return minutes === 1 ? `${minutes} min ago` : `${minutes} mins ago`;
  } else if (hours < 24) {
    return hours === 1 ? `${hours} hour ago` : `${hours} hours ago`;
  } else if (days < 7) {
    return days === 1 ? `${days} day ago` : `${days} days ago`;
  } else if (weeks < 4) {
    return weeks === 1 ? `${weeks} week ago` : `${weeks} weeks ago`;
  } else if (months < 12) {
    return months === 1 ? `${months} month ago` : `${months} months ago`;
  } else {
    return years === 1 ? `${years} year ago` : `${years} years ago`;
  }
}
const NotificationItem = ({ notification }) => {
  return (
    <div
      key={notification.id}
      className={`${styles.containerNotificationItem} ${
        !notification.seen ? styles.unseen : ""
      }`}
    >
      <div className={styles.iconContainer}>
        <CircleAlert width={24} height={24} color="blue" />
      </div>

      <div className={styles.contentContainer}>
        <div
          className={`${styles.contentText} ${
            notification.seen
              ? styles.contentTextSeen
              : styles.contentTextUnseen
          }`}
          title={notification.content}
        >
          <div className={styles.title}>{notification.title}</div>
          <span className={styles.content}>{notification.content}</span>
        </div>
        <div className={styles.timestamp}>
          {timeAgo(notification.createdAt)}
        </div>
      </div>
    </div>
  );
};

NotificationItem.propTypes = {
  notification: PropTypes.shape({
    id: PropTypes.number,
    type: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    seen: PropTypes.bool,
    createdAt: PropTypes.string,
  }),
};

export default NotificationItem;
