export type routeType = routeItemType[];

export interface routeItemType {
  href: string;
  icon?: string;
  label: string;
}

export const routeList: routeType = [
  {
    href: "/",
    label: "首页",
  },
  {
    href: "/nft-market",
    label: "nft市场",
  },
  {
    href: "/personal",
    label: "个人中心",
  },
];
