import { Layout } from "antd";
import { Article } from "../assets/icons/icons";
import SiderNavigationBar from "../components/theme/components/SiderNavBar";
import styled from "styled-components";
import { BJContainer } from "../components/theme/atoms/BJContainer";
import { articles, exercises, karaokes } from "../routes/routeConsts";
import { Outlet } from "react-router";
const { Content } = Layout;

const menuItems = () => {
  const menuItemList: MenuItemInfo[] = [
    {
      displayName: "Articles",
      url: articles,
      icon: <Article />,
    },
    {
      displayName: "Karaokes",
      url: karaokes,
      icon: <Article />,
    },
    {
      displayName: "Exercises",
      url: exercises,
      icon: <Article />,
    },
  ];
  return menuItemList;
};

export const CMSLayout = () => {
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
`;

const StyledLayoutContent = styled(Layout)`
  padding: 1rem 1rem 1rem;
`;
