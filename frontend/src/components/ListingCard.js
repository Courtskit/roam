import {
  Box,
  Button,
  Image,
  Badge,
  Stack,
  Flex,
  Spacer,
} from "@chakra-ui/react";

import FavoriteButton from "./FavoriteButton";
import defaultImage from "../static/branding/listing-default-image.png";

function ListingCard({
  imageUrl,
  imageAlt = "Roam placeholder image",
  name = "We couldn't find a name",
  price,
  key,
  buttonText = "Click Me",
  buttonClick,
  is_boondock,
  nearPark,
  ...props
}) {
  return (
    <Box
      key={key}
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg="white"
    >
      <Image src={imageUrl || defaultImage} alt={imageAlt} />
      <Box p="6">
        <Stack>
          {props.user && (
            <FavoriteButton
              user={props.user}
              setUser={props.setUser}
              listingId={props.listingId}
            />
          )}
          <Box display="flex" alignItems="baseline">
            <Badge borderRadius="full" px="2" colorScheme="teal">
              {is_boondock ? "BoonDock" : "Roam Listing"}
            </Badge>
            {nearPark ? (
              <Box
                color="gray.500"
                fontWeight="semibold"
                letterSpacing="wide"
                fontSize="xs"
                ml="2"
              >
                Near: {nearPark}
              </Box>
            ) : (
              <Box></Box>
            )}
          </Box>
          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
            color="black"
          >
            {name}
          </Box>

          <Flex>
            <Box color="green" pr={20}>
              price: ${price}
            </Box>
            <Spacer />
            <Box>
              <Button
                onClick={buttonClick}
                color={["white"]}
                bg={["primary.500"]}
              >
                {buttonText}
              </Button>
            </Box>
          </Flex>
        </Stack>
      </Box>
    </Box>
  );
}

export default ListingCard;
