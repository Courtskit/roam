import { useNavigate } from "react-router-dom";
import apiCalls from "../../api/apiCalls";
import * as yup from "yup";
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
    email: yup
      .string()
      .required("Email is required")
      .email("Not a valid email"),
    first_name: yup
      .string()
      .required("First name is required")
      .max(50, "First name length must be less than 50 characters"),
    last_name: yup
      .string()
      .required("Last name is required")
      .max(50, "Last name length must be less than 50 characters"),
  });

  const initialValues = {
    email: props.user ? props.user.email : "",
    first_name: props.user ? props.user.first_name : "",
    last_name: props.user ? props.user.last_name : "",
  };

  // event handlers
  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    const response = await apiCalls.updateUser(props.user.id, values);
    if (response) {
      props.setUser(response);
      setSubmitting(false);
      resetForm();
      props.onClose();
      // navigate("/account");
    }
  };

  return (
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
          <FormControl
            isRequired
            isInvalid={touched.first_name && !!errors.first_name}
          >
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
          <FormControl
            isRequired
            isInvalid={touched.last_name && !!errors.last_name}
          >
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
          <Button
            mt={4}
            bg="primary.500"
            color="white"
            type="submit"
            disabled={isSubmitting}
          >
            Save Changes
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default EditUserForm;
