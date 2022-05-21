import { Box, Button, Image, Badge, Stack } from "@chakra-ui/react";
import defaultImage from "../static/branding/listing-default-image.png";

function ReservationCard({
  imageUrl,
  imageAlt = "Roam placeholder image",
  name = "We couldn't find a name",
  price,
  startDate,
  endDate,
  key,
  buttonClick,
}) {
  return (
    <Box
      key={key}
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >
      <Image src={imageUrl || defaultImage} alt={imageAlt} />
      <Box p="6">
        <Stack>
          <Box display="flex">
            <Badge borderRadius="full" px="2" backgroundColor={["primary.100"]}>
              Dates
            </Badge>
            <Box
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="xs"
              ml="2"
            >
              {startDate} - {endDate}
            </Box>
          </Box>
          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            {name}
          </Box>

          <Box color="green" pr={20}>
            total: {price}
          </Box>

          <Box>
            <Button onClick={buttonClick} color={["white"]} bg={["red"]}>
              Cancel
            </Button>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}

export default ReservationCard;
