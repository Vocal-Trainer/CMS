import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { KaraokeService } from "../services";

type ContextState = {
  karaokes: Karaoke[];
  categories: string[];
  difficulty: string[];
  loading: boolean;
  error: Error | null;
  getById: (id: Karaoke["id"]) => Karaoke | null;
};

const KaraokesContext = createContext<ContextState>({
  karaokes: [],
  categories: [],
  difficulty: [],
  loading: false,
  error: null,
  getById: () => null,
});

export const KaraokesProvider = ({ ...rest }) => {
  const [karaokes, setKaraokes] = useState<Karaoke[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);

    const unsubKaraokes = KaraokeService.subscribe((_error, _karaokes) => {
      setKaraokes(_karaokes);
      setError(_error);
      setLoading(false);
    });

    return () => {
      unsubKaraokes();
    };
  }, []);

  const getById = useCallback(
    (id: Karaoke["id"]) => {
      const _karaoke = karaokes.find(a => a.id === id);
      return _karaoke || null;
    },
    [karaokes]
  );

  const categories: string[] = useMemo(
    () => [
      "Hip hop",
      "Rock",
      "Rhythm and blues",
      "Soul music",
      "Reggae",
      "Country",
      "Funk",
      "Jazz",
      "Blues",
      "Vocal",
    ],
    []
  );

  const difficulty: string[] = useMemo(
    () => ["Easy", "Intermediate", "Hard"],
    []
  );

  const value = useMemo(
    () => ({ karaokes, categories, difficulty, loading, error, getById }),
    [karaokes, categories, difficulty, loading, error, getById]
  );

  return <KaraokesContext.Provider value={value} {...rest} />;
};

export const useKaraokes = () => {
  const context = React.useContext(KaraokesContext);
  if (context === undefined) {
    throw new Error("useKaraokes must be used within an KaraokesProvider");
  }
  return context;
};

export const useKaraoke = (karaokeId: Karaoke["id"]) => {
  const [karaoke, setKaraoke] = useState<Karaoke | null>(null);
  const [loading, setLoading] = useState(true);

  const { getById, loading: _loading } = useKaraokes();

  useEffect(() => {
    if (_loading) {
      return;
    }
    if (karaokeId) {
      setKaraoke(getById(karaokeId));
    }
    setLoading(false);
  }, [getById, _loading, karaokeId]);

  return { karaoke, loading };
};
