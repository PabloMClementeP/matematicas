import { Link } from "react-router-dom";
import styled from "styled-components";

export const HeaderContainer = styled.header`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;

  background-color: #fee140;
  background-image: linear-gradient(315deg, #fee140 0%, #fa709a 100%);

  -webkit-box-shadow: 0px 4px 6px 0px rgba(84, 84, 84, 1);
  -moz-box-shadow: 0px 4px 6px 0px rgba(84, 84, 84, 1);
  box-shadow: 0px 4px 6px 0px rgba(84, 84, 84, 1);
`;

export const Nav = styled.nav`
  display: none;

  @media (min-width: 768px) {
    display: block;
  }
`;

export const MobileNav = styled.div`
  display: block;

  @media (min-width: 768px) {
    display: none;
  }
`;

export const NavList = styled.ul`
  display: flex;
  gap: 24px;
  list-style: none;
  margin-right: 16px;
  align-items: center;
  justify-content: center;
`;

export const MobileNavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
  list-style: none;
`;

export const StyledLink = styled(Link)`
  font-size: 18px;
  text-decoration: none;
  font-weight: 700;
  cursor: pointer;
  padding: 8px;
  border-radius: 16px;

  &:hover {
    background-color: #fad961;
    background-image: linear-gradient(90deg, #fad961 0%, #f76b1c 100%);
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const MenuButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
`;

export const Sheet = styled.div<{
  $isOpen: boolean;
}>`
  position: fixed;
  top: 0;
  right: 0;
  width: 250px;
  height: 100%;
  background-color: white;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.2);
  transform: ${({ $isOpen }) =>
    $isOpen ? "translateX(0)" : "translateX(100%)"};
  transition: transform 0.3s ease-in-out;
  z-index: 20;
`;
