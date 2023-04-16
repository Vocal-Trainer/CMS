import { useCallback, useEffect, useState } from "react";
import { useArticles } from "../context";
import { AppNavigationType } from "../utils";

type InAppOptionProps = {
  key: string;
  value: string;
};

export const useFilteredList = (type: AppNavigationType) => {
  const { articles, loading: loadingArticles } = useArticles();
  const [filterList, setFilterList] = useState<InAppOptionProps[]>([]);
  const loading = loadingArticles;

  const getFilterableList = useCallback(() => {
    if (type === AppNavigationType.ARTICLE) {
      setFilterList(
        articles.map(article => ({ key: article.id, value: article.title }))
      );
    }
  }, [articles, type]);

  useEffect(() => {
    if (loadingArticles) {
      return;
    }
    getFilterableList();
  }, [getFilterableList, loadingArticles, type]);

  return { filterList, loading };
};
