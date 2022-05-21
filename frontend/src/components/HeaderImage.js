import { Box, Image } from "@chakra-ui/react";

const HeaderImage = ({ imageUrl = "" }) => {
  return (
      <Box width="100%">
        <Image
          src={imageUrl}
          bgSize={"cover"}
          display={"flex"}
          position={"relative"}
          width="100%"
          zIndex={-1}
        />
      </Box>
  );
};

export default HeaderImage;
