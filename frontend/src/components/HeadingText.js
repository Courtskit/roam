import { Text } from "@chakra-ui/react";

const HeadingText = ({ text, pb = "2", pt = "2" }) => {
  return (
    <Text fontSize={32} pb={pb} pt={pt}>
      {text}
    </Text>
  );
};

export default HeadingText;
