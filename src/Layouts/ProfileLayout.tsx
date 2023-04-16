import { Layout } from "antd";
import styled from "styled-components";
import { Outlet, useNavigate } from "react-router";
import SiderNavigationBar from "../components/theme/components/SiderNavBar";
import { BJContainer } from "../components/theme/atoms/BJContainer";
import { GrUserAdmin } from "react-icons/gr";
import { ErrorFallback } from "../components";
const { Content } = Layout;

const menuItems = () => {
  const menuItemList: MenuItemInfo[] = [
    { displayName: "Edit Profile", url: `edit`, icon: <GrUserAdmin /> },
  ];
  return menuItemList;
};

export const ProfileLayout = () => {
  const navigate = useNavigate();
  const items: MenuItemInfo[] = menuItems();

  return (
    <Layout>
      <StyledLayout>
        <SiderNavigationBar items={items} />
        <StyledLayoutContent>
          <Content>
            <BJContainer>
              <Outlet />
            </BJContainer>
          </Content>
        </StyledLayoutContent>
      </StyledLayout>
    </Layout>
  );
};

const StyledLayout = styled(Layout)`
  background-color: ${props => props.theme.white};
  height: 100vh;
`;

const StyledLayoutContent = styled(Layout)`
  padding: 1rem 1rem 1rem;
`;
