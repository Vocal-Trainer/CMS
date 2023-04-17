import { Outlet } from "react-router-dom";
import { Layout, Space } from "antd";
import styles from "./../styles/header.module.scss";
import { useApplicationCommonContext, useAuth } from "../context";
import BJButton from "../components/theme/atoms/Button";
import { Link } from "react-router-dom";

const { Header } = Layout;

const BJHeader = () => {
  const { signOut, authUser } = useAuth();
  const { setTableSearchQuery } = useApplicationCommonContext();

  const resetTableSearch = () => {
    setTableSearchQuery({});
  };

  return (
    <Header className={styles.headerd}>
      <div className={styles.headerLogout}>
        <Space size={"large"}>
          <Link onClick={resetTableSearch} to={"./profile/edit"}>
            {authUser?.displayName ?? "Profile"}
          </Link>
          <BJButton size="large" rounded onClick={signOut}>
            Logout
          </BJButton>
        </Space>
      </div>
    </Header>
  );
};

export const BJMainLayout = () => {
  return (
    <>
      <BJHeader />
      <Outlet />
    </>
  );
};
