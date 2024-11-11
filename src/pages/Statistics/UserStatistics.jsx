import { ChartIcon } from "../../icon/Icon";
import classes from "./UserStatistics.module.css";
import StatisticsTabMenu from "./StatisticsTabMenu";

const UserStatistics = () => {
  return (
    <>
      <div className={classes.main_title}>
        <div className={classes.title_page}>
          <ChartIcon className={classes.icon_style} />
          <p>STATISTICS</p>
        </div>
      </div>
      <div style={{ marginTop: '10px', display: "flex", flexDirection: "column" }}>
        <StatisticsTabMenu/>
        <div>
          user
        </div>
      </div>
    </>
  );
};

export default UserStatistics;
