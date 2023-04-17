import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { ArticleService } from "../services";

type ContextState = {
  articles: Article[];
  categories: string[];
  loading: boolean;
  error: Error | null;
  getById: (id: Article["id"]) => Article | null;
};

const ArticlesContext = createContext<ContextState>({
  articles: [],
  categories: [],
  loading: false,
  error: null,
  getById: () => null,
});

export const ArticlesProvider = ({ ...rest }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loadingArticles, setLoadingArticles] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoadingArticles(true);

    const unsubArticles = ArticleService.subscribe((_error, _articles) => {
      setArticles(_articles);
      setError(_error);
      setLoadingArticles(false);
    });

    return () => {
      unsubArticles();
    };
  }, []);

  const getById = useCallback(
    (id: Article["id"]) => {
      const article = articles.find(a => a.id === id);
      return article || null;
    },
    [articles]
  );

  const loading = loadingArticles;

  const categories: string[] = useMemo(
    () => [
      "Basic Skills",
      "Beginners",
      "Career",
      "CCM (Contemporary Commercial Music)",
      "Crossing Over",
      "Exercises",
      "Online Lessons",
      "Online Voice Lessons",
      "Songs",
      "Students",
      "Tips",
      "Vocal Coaches ",
      "Voice Teachers",
      "Warmups",
    ],
    []
  );

  const value = useMemo(
    () => ({ articles, categories, loading, error, getById }),
    [articles, categories, loading, error, getById]
  );

  return <ArticlesContext.Provider value={value} {...rest} />;
};

export const useArticles = () => {
  const context = React.useContext(ArticlesContext);
  if (context === undefined) {
    throw new Error("useArticles must be used within an ArticlesProvider");
  }
  return context;
};

export const useArticle = (articleId: Article["id"]) => {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  const { getById, loading: loadingArticles } = useArticles();

  useEffect(() => {
    if (loadingArticles) {
      return;
    }
    if (articleId) {
      setArticle(getById(articleId));
    }
    setLoading(false);
  }, [loadingArticles, getById, articleId]);

  return { article, loading };
};
