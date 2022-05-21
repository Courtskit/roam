import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import apiCalls from "../api/apiCalls";
import PasswordInput from "../components/form/PasswordInput";
import * as yup from 'yup';
import { Formik, Form } from "formik";
import {
  Center,
  Box,
  Heading,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";

const SignUp = (props) => {
  // router params
  const navigate = useNavigate();

  useEffect(()=>{
    if (props.user){
        navigate('/')
    }
  },[props.user])


  const validationSchema = yup.object().shape({
    email: yup.string()
      .required('Email is required')
      .email('Not a valid email'),
    first_name: yup.string()
      .required('First name is required')
      .max(50, 'First name length must be less than 50 characters'),
    last_name: yup.string()
      .required('Last name is required')
      .max(50, 'Last name length must be less than 50 characters'),
    password: yup.string()
      .required('Password is required')
      .min(4, 'Password length should be at least 4 characters'),
    password2: yup.string()
      .required('Confirm Password is required')
      .oneOf([yup.ref('password')], 'Passwords must match'),
  })

  const initialValues = {
    email:'',
    first_name:'',
    last_name:'',
    password:'',
    password2:''
  };

  // event handlers
  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    const response = await apiCalls.signup(values);
    if (response) {
      props.setUser(response)
      navigate("/")
      setSubmitting(false)
      resetForm()
    }
  };

  return (
    <Center>
      <div>
        <Heading
          fontWeight={600}
          fontSize={{ base: "xl", sm: "xl", md: "2xl" }}
          lineHeight={"110%"}
        >
          Sign Up
        </Heading>
        <br />
        <Box className="marginBottom" maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
          <Box p="6">
            <Box display="flex" alignItems="baseline">
                <Formik
                  validateOnBlur={true}
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={onSubmit}
                  validateOnChange={false}
                >
                    {({ handleSubmit, handleBlur, handleChange, values, errors, isSubmitting, touched }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                      <FormControl isRequired isInvalid={touched.email && !!errors.email}>
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <Input 
                          name="email" 
                          placeholder="Email"
                          value={values.email} 
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <FormErrorMessage>{errors.email}</FormErrorMessage>
                      </FormControl>
                      <FormControl isRequired isInvalid={touched.first_name && !!errors.first_name} >
                        <FormLabel htmlFor="first_name">First Name</FormLabel>
                        <Input
                          name="first_name"
                          placeholder="First Name"
                          value={values.first_name} 
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <FormErrorMessage>{errors.first_name}</FormErrorMessage>
                      </FormControl>
                      <FormControl isRequired isInvalid={touched.last_name && !!errors.last_name} >
                          <FormLabel htmlFor="last_name">Last Name</FormLabel>
                          <Input
                            name="last_name"
                            placeholder="Last Name" 
                            value={values.last_name} 
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          <FormErrorMessage>{errors.last_name}</FormErrorMessage>
                        </FormControl>
                        <FormControl isRequired isInvalid={touched.password && !!errors.password} >
                          <FormLabel htmlFor="password">Password</FormLabel>
                          <PasswordInput
                            name="password"
                            value={values.password} 
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          <FormErrorMessage>{errors.password}</FormErrorMessage>
                        </FormControl>
                        <FormControl isRequired isInvalid={touched.password2 && !!errors.password2}>
                          <FormLabel htmlFor="password2">Verify Password</FormLabel>
                          <Input
                            name="password2"
                            type='password'
                            placeholder="Verify Password"
                            value={values.password2} 
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          <FormErrorMessage>{errors.password2}</FormErrorMessage>
                      </FormControl>
                      <Button mt={4} bg="primary.500" color="white" type="submit" disabled={isSubmitting}>
                        Create Account
                      </Button>
                    </Form>
                    )}
                </Formik>
            </Box>
          </Box>
        </Box>
      </div>
    </Center>
  );
};

export default SignUp;
