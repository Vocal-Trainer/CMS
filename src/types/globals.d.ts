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
  categoryId: string;
  intro: string;
  title: string;
  body: string;
  imageUrl: string;
  stretchedImageUrl: string;
  squareImageUrl: string;
  bannerImage1Url: string | null;
  bannerImage2Url: string | null;
  videoUrl: string | null;
  audioUrl: string | null;
  sortOrder: number | null;
}

interface FullArticle extends Article {
  category: ArticleCategory | null;
}

type articleCategoryTemplateTypes =
  | "Health"
  | "Birth"
  | "Exercise"
  | "Baby"
  | "BreastFeeding"
  | "Pregnancy";

interface ArticleCategory {
  id?: string;
  sortOrder: number;
  template: articleCategoryTemplateTypes;
  show: boolean;
  icon: string;
  translations: {
    sv: {
      title: string;
      description: string;
    };
    en: {
      title: string;
      description: string;
    };
  };
  restricted: boolean;
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
