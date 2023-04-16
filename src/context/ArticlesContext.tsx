import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { ArticleService } from "../services";

type ContextState = {
  articles: FullArticle[];
  categories: ArticleCategory[];
  loading: boolean;
  error: Error | null;
  getById: (id: Article["id"]) => FullArticle | null;
};

const ArticlesContext = createContext<ContextState>({
  articles: [],
  categories: [],
  loading: false,
  error: null,
  getById: () => null,
});

export const ArticlesProvider = ({ ...rest }) => {
  const [articlesData, setArticlesData] = useState<Article[]>([]);
  const [categoriesData, setCategoriesData] = useState<ArticleCategory[]>([]);
  const [articles, setArticles] = useState<FullArticle[]>([]);
  const [categories, setCategories] = useState<ArticleCategory[]>([]);
  const [loadingArticles, setLoadingArticles] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoadingArticles(true);
    setLoadingCategories(true);

    const unsubArticles = ArticleService.subscribe((_error, _articles) => {
      setArticlesData(_articles);
      setError(_error);
      setLoadingArticles(false);
    });

    const unsubCategories = ArticleService.subscribeToCategories(
      (_error, _categories) => {
        setCategoriesData(_categories);
        setError(_error);
        setLoadingCategories(false);
      }
    );

    return () => {
      unsubArticles();
      unsubCategories();
    };
  }, []);

  useEffect(() => {
    if (loadingArticles || loadingCategories) {
      return;
    }

    const categoryMap = new Map<ArticleCategory["id"], ArticleCategory>();
    categoriesData.forEach(category => {
      categoryMap.set(category.id, category);
    });

    const _articles: FullArticle[] = articlesData.map(article => {
      return {
        ...article,
        category: categoryMap.get(article.categoryId) || null,
      };
    });
    setArticles(_articles);
    setCategories(categoriesData);
  }, [loadingArticles, loadingCategories, articlesData, categoriesData]);

  const getById = useCallback(
    (id: Article["id"]) => {
      const article = articles.find(a => a.id === id);
      return article || null;
    },
    [articles]
  );

  const loading = loadingArticles || loadingCategories;

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
