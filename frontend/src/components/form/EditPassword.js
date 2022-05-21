import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import apiCalls from "../api/apiCalls";
import * as yup from 'yup';
import { Formik, Form } from "formik";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";

// needs props: user and setUser
const EditUserForm = (props) => {
  // router params
  const navigate = useNavigate();

  const validationSchema = yup.object().shape({
    password: yup.string()
      .required('Password is required')
      .min(4, 'Password length should be at least 4 characters'),
    password2: yup.string()
      .required('Confirm Password is required')
      .oneOf([yup.ref('password')], 'Passwords must match'),
  })

  const initialValues = {
    password:'',
    password2:''
  };

  // event handlers
  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    const response = await apiCalls.updateUser(props.user.id, values);
    if (response) {
      const logOut = await apiCalls.logout();
      setSubmitting(false)
      resetForm()
      props.setUser(null)
      navigate("/signin")
    }
  };

  const renderForm = () => {
    return (
      <Formik
        validateOnBlur={true}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        validateOnChange={false}
      >
          {({ handleSubmit, handleBlur, handleChange, values, errors, isSubmitting, touched }) => (
          <Form noValidate onSubmit={handleSubmit}>
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
    );
  };
};

export default EditUserForm;