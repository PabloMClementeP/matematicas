import { useState, useEffect } from "react";
import {
  HeaderContainer,
  LogoContainer,
  MenuButton,
  MobileNav,
  MobileNavList,
  Nav,
  NavList,
  Sheet,
  StyledLink,
} from "./style";
import { useUserContext } from "../../context/UserContext";
import UserAvatar from "./components/UserAvatar";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logoutUser } = useUserContext(); // Obtén directamente `user` y `logoutUser`

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    localStorage.removeItem("user");
    logoutUser();
  };

  const NavLinks = () => (
    <>
      <li onClick={() => setIsOpen(false)}>
        <StyledLink to="/">Inicio</StyledLink>
      </li>
      {user && user.isLogued ? (  // Verifica que `user` no sea `null` antes de usar `isLogued`
        <>
          <li onClick={() => setIsOpen(false)}>
            <StyledLink to="/game">Jugar</StyledLink>
          </li>
          <li
            onClick={() => {
              setIsOpen(false);
              handleLogout();
            }}
          >
            <StyledLink to="/">Salir</StyledLink>
          </li>
          <UserAvatar />
        </>
      ) : (
        <li onClick={() => setIsOpen(false)}>
          <StyledLink to="/login">Ingresar</StyledLink>
        </li>
      )}
    </>
  );

  return (
    <HeaderContainer>
      <LogoContainer>
        <img src="/logo.webp" width={38} height={"auto"} alt="Math-Kid Logo" />
        <span style={{ fontWeight: "bold" }}>Math-Kid</span>
      </LogoContainer>

      {/* Navegación en Desktop */}
      <Nav>
        <NavList>
          <NavLinks />
        </NavList>
      </Nav>

      {/* Navegación en Móvil */}
      <MobileNav>
        <MenuButton onClick={toggleMenu} aria-label="Menu">
          {isOpen ? <span>&#x2716;</span> : <span>&#9776;</span>}
        </MenuButton>
        <Sheet $isOpen={isOpen}>
          <nav style={{ padding: "16px", marginTop: "16px" }}>
            <MobileNavList>
              <NavLinks />
            </MobileNavList>
          </nav>
        </Sheet>
      </MobileNav>
    </HeaderContainer>
  );
};

export default Header;
