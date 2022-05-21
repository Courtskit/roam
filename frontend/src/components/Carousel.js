import { HStack } from "@chakra-ui/react";
import '../styles/carousel.css';

function Carousel ({children}){
  return (
    <HStack id="carousel">
      {children}
    </HStack>
  );
}

export default Carousel;
