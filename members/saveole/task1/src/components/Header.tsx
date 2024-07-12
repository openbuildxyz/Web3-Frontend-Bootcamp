import { Box, Container, Flex, Text } from "@chakra-ui/react";

const Header = () => {
  return (
    <Container maxW={"900px"}>
      <Box bg={"gray.400"}>
        <Flex justifyContent={"center"} borderRadius={"5px"} px={4} my={4}>
          <Text
            fontSize={40}
            bgGradient="linear(to-l, #7928CA, #FF0080)"
            bgClip="text"
            fontWeight={"extrabold"}
          >
            Another To Do Task Manager
          </Text>
        </Flex>
      </Box>
    </Container>
  );
};

export default Header;
