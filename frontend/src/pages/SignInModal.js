// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useDisclosure } from "@chakra-ui/react";

// import {
//   Center,
//   Box,
//   Heading,
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalCloseButton,
//   ModalBody,
//   Button,
//   FormControl,
//   FormLabel,
//   Input,
// } from "@chakra-ui/react";

// const SignIn = (props) => {
//   const {
//     isOpen: isOpenSignInModal,
//     onOpen: onOpenSignInModal,
//     onClose: onCloseSignInModal,
//   } = useDisclosure();

//   // router params
//   const navigate = useNavigate();

//   // event handlers
//   const handleSignIn = async (evt) => {
//     evt.preventDefault();

//     let signInData = {
//       email: evt.target.elements["email"].value,
//       password: evt.target.elements["password"].value,
//     };
//     const data = {};
//     console.log("LOGIN INFO:", signInData);
//     const user = {};
//     console.log(user);
//     props.setUsername(user.username);

//     if (data) {
//       navigate("/");
//     }
//   };
//   const renderForm = () => {
//     return (
//       <Center>
//         <div>
//           <Heading
//             fontWeight={600}
//             fontSize={{ base: "xl", sm: "xl", md: "2xl" }}
//             lineHeight={"110%"}
//           >
//             Sign In
//           </Heading>
//           <br />
//           <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
//             <Box p="6">
//               <Box display="flex" alignItems="baseline">
//                 <Box>
//                   <form onSubmit={handleSignIn} method="POST">
//                     <FormControl>
//                       <FormLabel htmlFor="email">Email</FormLabel>
//                       <Input id="email" placeholder="Email" />
//                       <FormLabel htmlFor="password">Password</FormLabel>
//                       <Input id="password" placeholder="Password" />
//                     </FormControl>
//                     <Button mt={4} bg="primary.500" color="white" type="submit">
//                       Sign In
//                     </Button>
//                   </form>
//                 </Box>
//               </Box>
//             </Box>
//           </Box>
//         </div>
//       </Center>
//     );
//   };

//   return (
//     <>
//       <Button
//         onClick={onOpenSignInModal}
//         size="sm"
//         rounded="md"
//         color={["white", "white", "primary.500", "primary.500"]}
//         bg={["transparent", "transparent", "transparent", "transparent"]}
//       >
//         Sign In
//       </Button>
//       <Modal
//         isCentered
//         onClose={onCloseSignInModal}
//         isOpen={isOpenSignInModal}
//         motionPreset="slideInBottom"
//       >
//         <ModalOverlay />
//         <ModalContent p={5}>
//           <ModalCloseButton />
//           <ModalBody>{renderForm()}</ModalBody>
//         </ModalContent>
//       </Modal>
//     </>
//   );
// };
// export default SignIn;
