import TabMenu from "../../components/TabMenu/TabMenu";

const statisticsTabIds = {
    ORDER: 'order',
    USER: 'user',
    REVENUE: 'revenue',
    TOP_PRODUCTS: 'top-products',
    TOP_CATEGORIES: 'top-categories',
}

const tabList = [
  {
    id: statisticsTabIds.ORDER,
    name: "ORDER",
    href: "/admin/statistics/order",
  },
  {
    id: statisticsTabIds.USER,
    name: "USER",
    href: "/admin/statistics/user",
  },
  {
    id: statisticsTabIds.REVENUE,
    name: "REVENUE",
    href: "/admin/statistics/revenue",
  },
  {
    id: statisticsTabIds.TOP_PRODUCTS,
    name: "TOP PRODUCTS",
    href: "/admin/statistics/top-products",
  },
  {
    id: statisticsTabIds.TOP_CATEGORIES,
    name: "TOP CATEGORIES",
    href: "/admin/statistics/top-categories",
  },
];

const StatisticsTabMenu = () => {
    return <TabMenu tabList={tabList}/>
}

export default StatisticsTabMenu