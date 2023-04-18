import { Navigate, Route, Routes } from "react-router-dom";
import { CMSLayout } from "../../components";
import {
  ArticlePage,
  ArticleListPage,
  KaraokeListPage,
  KaraokePage,
  ExerciseListPage,
  ExercisePage,
  CompetitionListPage,
  CompetitionPage,
} from "../../pages";
import {
  articles,
  karaokes,
  exercises,
  competitions,
} from "../../routes/routeConsts";

export const CMSRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<CMSLayout />}>
        <Route path={articles}>
          <Route path={""} element={<ArticleListPage />} />
          <Route path={"new"} element={<ArticlePage />} />
          <Route path={":id"} element={<ArticlePage />} />
        </Route>
        <Route path={karaokes}>
          <Route path={""} element={<KaraokeListPage />} />
          <Route path={"new"} element={<KaraokePage />} />
          <Route path={":id"} element={<KaraokePage />} />
        </Route>
        <Route path={competitions}>
          <Route path={""} element={<CompetitionListPage />} />
          <Route path={"new"} element={<CompetitionPage />} />
          <Route path={":id"} element={<CompetitionPage />} />
        </Route>
        <Route path={exercises}>
          <Route path={""} element={<ExerciseListPage />} />
          <Route path={"new"} element={<ExercisePage />} />
          <Route path={":id"} element={<ExercisePage />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/cms" />} />
    </Routes>
  );
};
