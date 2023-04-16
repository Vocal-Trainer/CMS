import styled from "styled-components";
import { Menu } from "antd";
import { Layout } from "antd";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useWindowSize } from "../../../../hooks/useWindowSize";
import { useApplicationCommonContext } from "../../../../context";

const { Item } = Menu;
const { Sider } = Layout;

const NavItem = (url: string, name: string) => {
  return <StyledNavLink to={`${url}`}>{name}</StyledNavLink>;
};

const SiderNavigationBar = ({ items }: { items: MenuItemInfo[] }) => {
  const navigate = useNavigate();
  const windowSize = useWindowSize();
  const [selectedSubMenus, setselectedSubMenus] = useState<string[]>([]);
  const [openedSubMenuKeys, setOpenedSubMenuKeys] = useState<string[]>([]);
  const location = useLocation();
  const { setTableSearchQuery } = useApplicationCommonContext();

  const subMenuKeys = useMemo(() => {
    const sub = items.reduce((acc: SubMenuItemInfo[], item) => {
      if (item.subMenu) {
        return [...acc, ...item.subMenu];
      }
      return acc;
    }, []);
    return sub;
  }, [items]);

  useEffect(() => {
    const [, , subRoute, secoundarySubRoute] = location.pathname.split("/");
    const matching = subMenuKeys.find(x => x.value === secoundarySubRoute);
    if (matching) {
      setOpenedSubMenuKeys([subRoute]);
      setselectedSubMenus([matching.key]);
    } else {
      setselectedSubMenus([subRoute ? subRoute : "dashboard"]);
      setOpenedSubMenuKeys([]);
    }
  }, [location, items, subMenuKeys]);

  const onOpenChange = (keys: React.Key[]) => {
    const latestOpenKey = keys.find(
      key => openedSubMenuKeys.indexOf(key as string) === -1
    );

    const rootSubmenuKeys = items
      .filter(x => x.subMenuKey!)
      .map(y => y.subMenuKey!);

    if (rootSubmenuKeys.some(x => x === latestOpenKey)) {
      const selectedSubMenu = items.find(x => x.subMenuKey === latestOpenKey!);
      const selectedSubMenuHeaderItem = selectedSubMenu!.subMenu![0].value;
      setOpenedSubMenuKeys(latestOpenKey ? [latestOpenKey as string] : []);
      setselectedSubMenus([selectedSubMenuHeaderItem as string]);
      const url = `${selectedSubMenu!.url}/${selectedSubMenuHeaderItem}`;
      resetTableSearch();
      navigate(url);
    }
  };

  const resetTableSearch = () => {
    setTableSearchQuery({});
  };

  return (
    <Sider width={250} collapsed={windowSize.width <= 834}>
      <StyledMenuCMS
        mode="inline"
        openKeys={openedSubMenuKeys}
        onOpenChange={onOpenChange}
        onClick={(e: any) => {
          setselectedSubMenus([e.key]);
          resetTableSearch();
        }}
        selectedKeys={selectedSubMenus}
      >
        {items
          .sort((a: MenuItemInfo, b: MenuItemInfo) =>
            a.displayName.localeCompare(b.displayName)
          )
          .map((menuItem: MenuItemInfo) =>
            menuItem.subMenu ? (
              <StyledSubMenu
                key={menuItem.subMenuKey}
                icon={menuItem.icon}
                title={menuItem.displayName}
                popupClassName="navbarcustom"
              >
                {menuItem.subMenu?.map(value => {
                  return (
                    <StyledSubMenuItem key={value.key}>
                      {NavItem(
                        `${menuItem.url}/${value.value}`,
                        value.displayName ?? value.key
                      )}
                    </StyledSubMenuItem>
                  );
                })}
              </StyledSubMenu>
            ) : (
              <StyledMenuItem
                key={menuItem.url}
                onClick={() => setOpenedSubMenuKeys([])}
              >
                {menuItem.icon && menuItem.icon}
                {NavItem(`${menuItem.url}`, menuItem.displayName)}
              </StyledMenuItem>
            )
          )}
      </StyledMenuCMS>
    </Sider>
  );
};

export default SiderNavigationBar;

export const StyledMenu = styled(Menu)`
  background-color: transparent;
`;

export const StyledMenuCMS = styled(Menu)`
  height: 100%;
  border-right: 0;
  background-color: ${props => props.theme.secondary};
  padding-left: 0.5rem;
  padding-right: 0.5rem;
`;

export const StyledMenuItem = styled(Item)`
  border-radius: 1.375rem;
  font-size: 1rem !important;

  &:hover {
    background-color: ${props => props.theme.primary};
  }

  &::after {
    border-right-color: ${props => props.theme.primary} !important;
  }

  &.ant-menu-item-active,
  &.ant-menu-item-selected {
    background-color: ${props => props.theme.primary} !important;
  }
`;

export const StyledSubMenu = styled(Menu.SubMenu)`
  border-radius: 1.375rem;

  &:hover {
    background-color: ${props => props.theme.primary} !important;
  }

  &.ant-menu-submenu-selected {
    border-radius: 1.375rem;
    background-color: ${props => props.theme.primary};
  }

  & > .ant-menu-submenu-title {
    display: flex;
    align-items: center;
    border-radius: 1.375rem;

    &:hover {
      background-color: ${props => props.theme.primary} !important;
    }
  }

  &.ant-menu-submenu-open,
  .ant-menu-submenu-active {
    background-color: ${props => props.theme.primary} !important;
  }

  &.ant-menu-submenu-open > .ant-menu-submenu-title {
    background-color: ${props => props.theme.active.background} !important;
  }

  .ant-menu-inline {
    background-color: ${props => props.theme.primary} !important;
    border-bottom-left-radius: 1.375rem;
    border-bottom-right-radius: 1.375rem;
  }

  .ant-menu-inline > .ant-menu-item,
  .ant-menu-sub > .ant-menu-submenu > .ant-menu-submenu-title {
    border-radius: 0rem;
    &:hover {
      background-color: ${props => props.theme.active.background} !important;
      opacity: 0.6;
    }
  }

  .ant-menu-vertical > .ant-menu-item,
  .ant-menu-sub > .ant-menu-submenu > .ant-menu-submenu-title {
    border-radius: 0rem !important;
    &:hover {
      background-color: ${props => props.theme.active.background} !important;
      opacity: 0.6;
    }
  }

  .ant-menu-submenu-arrow {
    position: absolute !important;
    right: 0.625rem;
  }

  & .ant-menu-submenu-title > .ant-menu-title-content {
    margin-left: 1.1rem !important;
    font-size: 1rem !important;
  }

  li > .ant-menu-item-active,
  .ant-menu-item-selected {
    background-color: ${props => props.theme.active.background} !important;
  }

  ul li:last-child {
    border-bottom-left-radius: 1.375rem !important;
    border-bottom-right-radius: 1.375rem !important;
  }
`;

export const StyledSubMenuItem = styled(Item)`
  border-radius: 1.375rem;
  &:hover {
    background-color: ${props => props.theme.primary};
  }

  &::after {
    border-right-color: ${props => props.theme.primary} !important;
  }
`;

export const StyledHeaderMenuItem = styled(Item)`
  margin-left: 1rem;
  font-size: 1.3rem;
  border-radius: 1rem;
`;

const StyledNavLink = styled(NavLink)`
  padding: 1rem;
`;
