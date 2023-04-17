import { Navigate, Route, Routes } from "react-router-dom";
import { CMSLayout } from "../../components";
import { ArticlePage, KaraokeListPage, KaraokePage } from "../../pages";
import { ArticleListPage } from "../../pages/ArticleList/ArticleListPage";

export const CMSRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<CMSLayout />}>
        {/* <Route path={""} element={<Navigate to="articles/articles" />} /> */}
        <Route path="articles">
          <Route path={""} element={<ArticleListPage />} />
          <Route path={"new"} element={<ArticlePage />} />
          <Route path={":id"} element={<ArticlePage />} />
        </Route>
        <Route path="karaokes">
          <Route path={""} element={<KaraokeListPage />} />
          <Route path={"new"} element={<KaraokePage />} />
          <Route path={":id"} element={<KaraokePage />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/cms" />} />
    </Routes>
  );
};
