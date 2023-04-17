type AdminRole = "editor" | "admin" | "superadmin" | "partner";
declare module "*.scss";

interface Admin {
  id: string;
  name: string | null;
  roles: AdminRole[];
  partnerId: Partner["id"] | null;
  freshAccount: boolean;
}

interface Article {
  id: string;
  title: string;
  content: string;
  shortDescription: string;
  author: string;
  source: string;
  category: string;
  imageUrl: string;
  squareImageUrl: string;
  publishedDate: string;
}

interface MenuItemInfo {
  displayName: string;
  url: string;
  icon?: JSX.Element;
  subMenu?: SubMenuItemInfo[];
  subMenuKey?: string;
}

interface SubMenuItemInfo {
  key: string;
  value: string;
  displayName?: string;
}

interface NotificationTypes {
  type: "success" | "info" | "error" | "warning";
  message: string;
  description: string;
}

interface IFilterItem {
  text: string;
  value: string;
}

interface IFilter {
  data: IFilterItem[];
  selected: Set<string>;
}

interface IListFilters {
  weeks: IFilter;
  months: IFilter;
  types: IFilter;
  influencers: IFilter;
}
