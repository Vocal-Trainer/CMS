import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { CompetitionsService } from "../services";

type ContextState = {
  competitions: Competition[];
  loading: boolean;
  error: Error | null;
  getById: (id: Competition["id"]) => Competition | null;
  getParticipant: (id: Competition["id"]) => Promise<Participant[] | []>;
};

const CompetitionsContext = createContext<ContextState>({
  competitions: [],
  loading: false,
  error: null,
  getById: () => null,
  getParticipant: () => null,
});

export const CompetitionProvider = ({ ...rest }) => {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    const unsubExercises = CompetitionsService.subscribe(
      (_error, _competitions) => {
        setCompetitions(_competitions);
        setError(_error);
        setLoading(false);
      }
    );

    return () => {
      unsubExercises();
    };
  }, []);

  const getById = useCallback(
    (id: Competition["id"]) => {
      const _competition = competitions.find(a => a.id === id);
      return _competition || null;
    },
    [competitions]
  );

  const getParticipant = useCallback(async (id: Competition["id"]) => {
    return CompetitionsService.subscribeParticipants(id)
      .then(_participants => {
        return (_participants as Participant[]) ?? [];
      })
      .catch(() => {
        return [];
      });
  }, []);

  const value = useMemo(
    () => ({ competitions, loading, error, getById, getParticipant }),
    [competitions, loading, error, getById, getParticipant]
  );

  return <CompetitionsContext.Provider value={value} {...rest} />;
};

export const useCompetitions = () => {
  const context = React.useContext(CompetitionsContext);
  if (context === undefined) {
    throw new Error(
      "useCompetitions must be used within an CompetitionProvider"
    );
  }
  return context;
};

export const useCompetition = (competitionId: Competition["id"]) => {
  const [competition, setCompetition] = useState<Competition | null>(null);
  const [participants, setParticipants] = useState<Participant[] | []>([]);
  const [loading, setLoading] = useState(true);

  const { getById, loading: _loading, getParticipant } = useCompetitions();

  useEffect(() => {
    if (_loading) {
      return;
    }
    if (competitionId) {
      setCompetition(getById(competitionId));
      getParticipant(competitionId).then(_participants => {
        setParticipants(_participants);
      });
    }
    setLoading(false);
  }, [getById, _loading, competitionId, getParticipant]);

  return { competition, participants, loading };
};
