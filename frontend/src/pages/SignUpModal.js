// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useDisclosure } from "@chakra-ui/react";
// import apiHelpers from "..apiHelpers";

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

// const SignUp = (props) => {
//   const {
//     isOpen: isOpenSignUpModal,
//     onOpen: onOpenSignUpModal,
//     onClose: onCloseSignUpModal,
//   } = useDisclosure();

//   // router params
//   const navigate = useNavigate();

//   // event handlers
//   const handleSignUp = async (evt) => {
//     evt.preventDefault();

//     let signUpData = {
//       email: evt.target.elements["email"].value,
//       firstName: evt.target.elements["firstName"].value,
//       lastName: evt.target.elements["lastName"].value,
//       password: evt.target.elements["password"].value,
//     };
//     const data = await apiHelpers.signUp(signUpData);
//     console.log("LOGIN INFO:", signUpData);
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
//             Sign Up
//           </Heading>
//           <br />
//           <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
//             <Box p="6">
//               <Box display="flex" alignItems="baseline">
//                 <Box>
//                   <form onSubmit={handleSignUp} method="POST">
//                     <FormControl>
//                       <FormLabel htmlFor="email">Email</FormLabel>
//                       <Input id="email" placeholder="Email" />
//                       <FormLabel htmlFor="firstName">First Name</FormLabel>
//                       <Input id="firstName" placeholder="First Name" />
//                       <FormLabel htmlFor="lastName">Last Name</FormLabel>
//                       <Input id="lastName" placeholder="Last Name" />
//                       <FormLabel htmlFor="password">Password</FormLabel>
//                       <Input id="password" placeholder="Password" />
//                     </FormControl>
//                     <Button mt={4} bg="primary.500" color="white" type="submit">
//                       Create Account
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
//         onClick={onOpenSignUpModal}
//         size="sm"
//         rounded="md"
//         color={["primary.500", "primary.500", "white", "white"]}
//         bg={["white", "white", "primary.500", "primary.500"]}
//         _hover={{
//           bg: ["primary.100", "primary.100", "primary.600", "primary.600"],
//         }}
//       >
//         Sign Up
//       </Button>
//       <Modal
//         isCentered
//         onClose={onCloseSignUpModal}
//         isOpen={isOpenSignUpModal}
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
// export default SignUp;
