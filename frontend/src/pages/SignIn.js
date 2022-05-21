import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiCalls from "../api/apiCalls";
import PasswordInput from "../components/form/PasswordInput";
import { Formik, Form } from "formik";
import * as yup from "yup";
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

const SignIn = (props) => {
  // router params
  const navigate = useNavigate();

  useEffect(() => {
    if (props.user) {
      navigate("/");
    }
  }, [props.user]);

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .required("Email is required")
      .email("Not a valid email"),
    password: yup
      .string()
      .required("Password is required")
      .min(4, "Password length should be at least 4 characters"),
  });
  const initialValues = {
    email: "",
    password: "",
  };

  // event handlers
  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    const response = await apiCalls.login(values);
    if (response) {
      props.setUser(response);
      navigate("/");
      setSubmitting(false);
      resetForm();
    }
  };

  const renderForm = () => {
    return (
      <Center>
        <div>
          <Heading
            fontWeight={600}
            fontSize={{ base: "xl", sm: "xl", md: "2xl" }}
            lineHeight={"110%"}
          >
            Sign In
          </Heading>
          <br />
          <Box className="marginBottom" maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Box p="6">
              <Box display="flex" alignItems="baseline">
                <Box>
                  <Formik
                    validateOnBlur={true}
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                    validateOnChange={false}
                  >
                    {({
                      handleSubmit,
                      handleBlur,
                      handleChange,
                      values,
                      errors,
                      isSubmitting,
                      touched,
                    }) => (
                      <Form noValidate onSubmit={handleSubmit}>
                        <FormControl
                          id="emailGroup"
                          isRequired
                          isInvalid={touched.email && !!errors.email}
                        >
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
                        <FormControl
                          id="passwordGroup"
                          isRequired
                          isInvalid={touched.password && !!errors.password}
                        >
                          <FormLabel htmlFor="password">Password</FormLabel>
                          <PasswordInput
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          <FormErrorMessage>{errors.password}</FormErrorMessage>
                        </FormControl>
                        <Button
                          mt={4}
                          bg="primary.500"
                          color="white"
                          type="submit"
                          disabled={isSubmitting}
                        >
                          Signin
                        </Button>
                      </Form>
                    )}
                  </Formik>
                </Box>
              </Box>
            </Box>
          </Box>
        </div>
      </Center>
    );
  };

  return <>{renderForm()}</>;
};
export default SignIn;
