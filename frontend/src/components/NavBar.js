import { Box, Flex, Stack, Text, Button } from "@chakra-ui/react";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import apiCalls from "../api/apiCalls";
import "../styles/NavBar.css";

export const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <NavBarContainer props={props}>
      <Logo
        w="100px"
        color={["primary.900", "primary.900", "primary.500", "primary.500"]}
      />
      <MenuToggle toggle={toggle} isOpen={isOpen} />
      <MenuLinks isOpen={isOpen} props={props} />
    </NavBarContainer>
  );
};

const MenuToggle = ({ toggle, isOpen }) => {
  return (
    <Box display={{ base: "block", md: "none" }} onClick={toggle}>
      {isOpen ? <AiOutlineClose /> : <FiMenu />}
    </Box>
  );
};

// USE THIS CODE TO CHANGE NAV ITEMS BASED ON LOGIN STATE
const MenuItem = ({ children, isLast, isButton, to = "/", ...rest }) => {
  return (
    <Link to={to}>
      <Text display="block" {...rest}>
        {children}
      </Text>
    </Link>
  );
};

const MenuLinks = ({ isOpen, props }) => {
  const navigate = useNavigate();

  const doLogout = async () => {
    const data = await apiCalls.logout();
    if (data) {
      props.setUser(null);
      navigate("/");
    }
  };

  const renderNavItems = () => {
    if (!props.user) {
      return (
        <>
          <MenuItem to="/signin">Sign In </MenuItem>
          <MenuItem to="/signup" isLast>
            <Button
              size="sm"
              rounded="md"
              color={["white", "white", "white", "white"]}
              bg={["primary.900", "primary.900", "primary.900", "primary.900"]}
              _hover={{
                bg: [
                  "primary.500",
                  "primary.500",
                  "primary.500",
                  "primary.500",
                ],
              }}
            >
              Create Account
            </Button>
          </MenuItem>
        </>
      );
    } else {
      return (
        <>
          <MenuItem to="/account">Account</MenuItem>
          <MenuItem to="/listing/search">Popular</MenuItem>
          <MenuItem to="/listing/search">Listings</MenuItem>
          <MenuItem onClick={doLogout} isLast>
            <Button
              size="sm"
              rounded="md"
              color={["white", "white", "white", "white"]}
              bg={["primary.900", "primary.900", "primary.900", "primary.900"]}
              _hover={{
                bg: [
                  "primary.500",
                  "primary.500",
                  "primary.500",
                  "primary.500",
                ],
              }}
            >
              Logout
            </Button>
          </MenuItem>
        </>
      );
    }
  };
  return (
    <Box
      display={{ base: isOpen ? "block" : "none", md: "block" }}
      flexBasis={{ base: "100%", md: "auto" }}
      bg={["white", "transparent", "transparent", "transparent"]}
      zIndex={9998}
      pb={5}
    >
      <Stack
        spacing={8}
        align="center"
        justify={["center", "space-between", "flex-end", "flex-end"]}
        direction={["column", "row", "row", "row"]}
        pt={[4, 4, 0, 0]}
        m
      >
        {renderNavItems()}
      </Stack>
    </Box>
  );
};

const NavBarContainer = ({ children, ...props }) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      p={8}
      bg={["transparent", "transparent", "transparent", "transparent"]}
      color={["primary.700", "primary.700", "primary.700", "primary.700"]}
      zIndex={9999}
      {...props}
    >
      {children}
    </Flex>
  );
};

export default NavBar;
