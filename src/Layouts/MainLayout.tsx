import { NavLink, Outlet, useLocation } from "react-router-dom";
import { Layout, Space } from "antd";
import { ReactComponent as Logo } from "./../assets/logo-purpledark.svg";
import { ReactComponent as HeaderBackground } from "./../assets/header-background.svg";
import styles from "./../styles/header.module.scss";
import styled from "styled-components";
import {
  StyledHeaderMenuItem,
  StyledMenu,
} from "../components/theme/components/SiderNavBar";
import { useApplicationCommonContext, useAuth, useAuthToken } from "../context";
import BJButton from "../components/theme/atoms/Button";
import { cmsKey, GetCms } from "../routes";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const { Header } = Layout;

const BJHeader = () => {
  const { signOut, authUser } = useAuth();
  const location = useLocation();
  const { setTableSearchQuery } = useApplicationCommonContext();
  const [selectedNav, setselectedNav] = useState<string>(cmsKey);
  const { isAdmin, isAnalytic, isModerator, isnotificationHandler } =
    useAuthToken();

  useEffect(() => {
    const [, mainRoute] = location.pathname.split("/");
    setselectedNav(mainRoute);
  }, [location.pathname]);

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

      <HeaderBackground />
      <div className={styles.alignH}>
        <div>
          <Logo />
        </div>
        <MenuWrapper>
          <StyledMenu mode="horizontal" selectedKeys={[selectedNav]}>
            {(isAdmin || isModerator) && (
              <StyledHeaderMenuItem key={cmsKey}>
                <NavLink onClick={resetTableSearch} to={GetCms()}>
                  CMS
                </NavLink>
              </StyledHeaderMenuItem>
            )}
          </StyledMenu>
        </MenuWrapper>
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

const MenuWrapper = styled.div`
  z-index: 1;
  width: 50%;

  .ant-menu-horizontal > .ant-menu-item::after,
  .ant-menu-horizontal > .ant-menu-submenu::after {
    content: none !important;
  }
  &.ant-menu-horizontal,
  .ant-menu-item,
  .ant-menu-item-active {
    &:hover {
      background-color: ${props => props.theme.hover.menu} !important;
    }
  }

  .ant-menu-item-selected {
    background-color: ${props => props.theme.hover.menu} !important;
  }
`;
