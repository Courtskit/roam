import { Box, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import logo from "../static/branding/roam-logo.svg";

const Logo = () => {
  return (
    <Link to="/">
      <Box width={150}>
        <Image src={logo} />
      </Box>
    </Link>
  );
};

export default Logo;
