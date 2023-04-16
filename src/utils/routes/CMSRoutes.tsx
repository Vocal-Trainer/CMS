import { Navigate, Route, Routes } from "react-router-dom";
import { CMSLayout } from "../../components";
import { ArticlePage } from "../../pages";
import { ArticleListPage } from "../../pages/ArticleList/ArticleListPage";
import { ArticleCategoryList } from "../../pages/ArticleList/Categories";
import { ChangeOrderList } from "../../pages/ArticleList/ChangeOrderList";
import { TipsType } from "../commonEnums";
export const CMSRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<CMSLayout />}>
        <Route path={""} element={<Navigate to="articles/articles" />} />
        <Route path="articles">
          <Route path={"articles"}>
            <Route path={""} element={<ArticleListPage />} />
            <Route path={"new"} element={<ArticlePage />} />
            <Route path={":id"} element={<ArticlePage />} />
            <Route path={"changeorder"} element={<ChangeOrderList />} />
          </Route>
          <Route
            path={"article-categories"}
            element={<ArticleCategoryList />}
          />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/cms" />} />
    </Routes>
  );
};
