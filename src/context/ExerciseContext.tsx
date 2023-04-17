import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { ExerciseService } from "../services";

type ContextState = {
  exercises: Exercise[];
  loading: boolean;
  error: Error | null;
  getById: (id: Exercise["id"]) => Exercise | null;
};

const ExercisesContext = createContext<ContextState>({
  exercises: [],
  loading: false,
  error: null,
  getById: () => null,
});

export const ExercisesProvider = ({ ...rest }) => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);

    const unsubExercises = ExerciseService.subscribe((_error, _exercises) => {
      setExercises(_exercises);
      setError(_error);
      setLoading(false);
    });

    return () => {
      unsubExercises();
    };
  }, []);

  const getById = useCallback(
    (id: Exercise["id"]) => {
      const _exercise = exercises.find(a => a.id === id);
      return _exercise || null;
    },
    [exercises]
  );

  const value = useMemo(
    () => ({ exercises, loading, error, getById }),
    [exercises, loading, error, getById]
  );

  return <ExercisesContext.Provider value={value} {...rest} />;
};

export const useExercises = () => {
  const context = React.useContext(ExercisesContext);
  if (context === undefined) {
    throw new Error("useExercises must be used within an ExercisesProvider");
  }
  return context;
};

export const useExercise = (exerciseId: Exercise["id"]) => {
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [loading, setLoading] = useState(true);

  const { getById, loading: _loading } = useExercises();

  useEffect(() => {
    if (_loading) {
      return;
    }
    if (exerciseId) {
      setExercise(getById(exerciseId));
    }
    setLoading(false);
  }, [getById, _loading, exerciseId]);

  return { exercise, loading };
};
