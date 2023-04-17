import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
  useContext,
  useCallback,
} from "react";

import { firebase } from "../firebase";
import { UserService } from "../services";

interface State {
  authUser: firebase.User | null;
  user: Admin | null;
  loading: boolean;
  signingIn: boolean;
  signInWithEmail: (email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  updateName: (name: string) => Promise<void>;
}

const defaultState: State = {
  authUser: null,
  user: null,
  loading: false,
  signingIn: false,
  signInWithEmail: async () => false,
  signOut: async () => null,
  updateName: async () => null,
};

export const AuthContext = createContext(defaultState);

export const AuthProvider = ({ children }: any) => {
  const [authUser, setAuthUser] = useState<firebase.User | null>(null);
  const [user, setUser] = useState<Admin | null>(null);
  const [loading, setLoading] = useState(true);
  const [signingIn, setSigningIn] = useState(false);

  useEffect(() => {
    if (authUser === null) {
      setUser(null);
      setLoading(false);
      return;
    }

    const unsub = UserService.subscribe(authUser.uid, async (err, _user) => {
      if (err) {
        console.log("err", err);
        throw err;
      }
      setUser(_user);
      setLoading(false);
      setSigningIn(false);
    });

    return unsub;
  }, [authUser, loading]);

  useEffect(() => {
    setLoading(true);

    const unsub = firebase.auth().onAuthStateChanged(async _user => {
      console.log("_user", _user);
      if (_user === null) {
        setAuthUser(null);
        setUser(null);
        setLoading(false);
      } else {
        setAuthUser(_user);
      }
    });

    return unsub;
  }, []);

  const signInWithEmail = useCallback(
    async (email: string, password: string) => {
      try {
        setSigningIn(true);
        const userCredential = await firebase
          .auth()
          .signInWithEmailAndPassword(email, password);

        const currentUserToken = await firebase
          .auth()
          .currentUser.getIdTokenResult();
        //User is authenticated after sign in based on the claims, logic of this might change in future.
        const userAuthenticated =
          currentUserToken.claims.moderator ||
          currentUserToken.claims.admin ||
          currentUserToken.claims.analytic ||
          currentUserToken.claims.notificationHandler;
        console.log("userCredential", userCredential);
        console.log("userCredential", userCredential.user);
        if (userCredential === null || userCredential.user === null) {
          setSigningIn(false);
          setUser(null);
          setAuthUser(null);
          await firebase.auth().signOut();
          return false;
        }

        const userExists = await UserService.exists(userCredential.user.uid);
        if (!userExists) {
          await UserService.createUser(userCredential.user.uid);
          return true;
        }
        return true;
      } catch (err) {
        setSigningIn(false);
        console.log(err);
        return false;
      }
    },
    []
  );

  const signOut = useCallback(async () => {
    return firebase.auth().signOut();
  }, []);

  const updateName = useCallback(
    async (name: string) => {
      if (user !== null) {
        return UserService.updateName(user.id, name);
      }
    },
    [user]
  );

  const value = useMemo(
    () => ({
      authUser,
      user,
      loading,
      signingIn,
      signInWithEmail,
      signOut,
      updateName,
    }),
    [authUser, user, loading, signingIn, signInWithEmail, signOut, updateName]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export const useAuthToken = () => {
  const [token, setToken] = useState<firebase.auth.IdTokenResult>(null);
  const { authUser, loading } = useAuth();
  const [userTokenLoading, setUserTokenLoading] = useState(false);

  const userToken = useCallback(async () => {
    setUserTokenLoading(true);
    const token = await authUser?.getIdTokenResult();
    setToken(token);
    setUserTokenLoading(false);
  }, [authUser]);

  useEffect(() => {
    if (loading) return;
    userToken();
  }, [userToken, loading]);

  return {
    token,
    userTokenLoading,
    isAdmin: token?.claims?.admin,
    isModerator: token?.claims?.moderator,
    isAnalytic: token?.claims?.analytic,
    isnotificationHandler: token?.claims?.notificationHandler,
  };
};
