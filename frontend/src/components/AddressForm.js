import { FormControl, FormLabel, FormErrorMessage, Button, Input, Textarea } from '@chakra-ui/react'
import { Formik, Form } from 'formik';
import apiCalls from '../api/apiCalls';
import * as yup from 'yup'

function AddressForm(props) {

  const validationSchema = yup.object().shape({

    line_1:     yup.string().required('Line 1 is required'),
    line_2:     yup.string('Line_2'),
    city:       yup.string().required('City is required'),
    state:      yup.string().required('state is required'),
    country:    yup.string().required('country is required'),
      
                        
});


  const initialValues = {
    line_1:  props.address ? props.address.line_1 : '',
    line_2:  props.address ? props.address.line_2 : '',
    city:  props.address ? props.address.city : '',
    state:  props.address ? props.address.state : '',
    country:  props.address ? props.address.country : '',
    
};

const onSubmit = async (values, {setSubmitting, resetForm})=> {
  console.log("Inside onSubmit")
  if (props.new){
    console.log('creating a new address API call')
    console.log(initialValues)
    let response = await apiCalls.createAddress(initialValues)
    if (response) {
      console.log(response)
      alert('new address created')
    }
  } else {
    console.log('updating API call')
    console.log(values)
  }
  setSubmitting(false);
  resetForm({initialValues:''})
}
  return (
    <Formik validateOnBlur={true}
    validateOnChange={false} {...{initialValues, onSubmit, validationSchema }}>
        {({ handleSubmit, handleBlur, handleChange, values, errors, isSubmitting, touched }) => (
            <Form noValidate onSubmit={handleSubmit}>

                <FormControl 
                isRequired
                    isInvalid={touched.line_1 && !!errors.line_1}
                >
                    <FormLabel>Line_1:</FormLabel>
                    <Input
                        name="line_1"
                        type="string"
                        value={values.line_1}
                        placeholder="Enter your line_1 address" 
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <FormErrorMessage>{errors.line_1}</FormErrorMessage>
                </FormControl>

                <FormControl 
                    isInvalid={touched.line_2 && !!errors.line_2}
                >
                    <FormLabel>Line_2:</FormLabel>
                    <Input
                        name="line_2"
                        type="string"
                        value={values.line_2}
                        placeholder="Enter your line_2 address" 
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <FormErrorMessage>{errors.line_2}</FormErrorMessage>
                </FormControl>

                <FormControl 
                isRequired
                    isInvalid={touched.city && !!errors.city}
                >
                    <FormLabel>city:</FormLabel>
                    <Input
                        name="city"
                        type="string"
                        value={values.city}
                        placeholder="Enter your city" 
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <FormErrorMessage>{errors.city}</FormErrorMessage>
                </FormControl>

                <FormControl 
                isRequired
                    isInvalid={touched.state && !!errors.state}
                >
                    <FormLabel>state:</FormLabel>
                    <Input
                        name="state"
                        type="string"
                        value={values.state}
                        placeholder="Enter your state" 
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <FormErrorMessage>{errors.state}</FormErrorMessage>
                </FormControl>

                <FormControl 
                isRequired
                    isInvalid={touched.country && !!errors.country}
                >
                    <FormLabel>country:</FormLabel>
                    <Input
                        name="country"
                        type="string"
                        value={values.country}
                        placeholder="Enter your country" 
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <FormErrorMessage>{errors.country}</FormErrorMessage>
                </FormControl>
              
                <Button
                    mt={4}
                    colorScheme='teal'
                    isLoading={props.isSubmitting}
                    type='submit'
                >
                    Submit
                </Button>
            </Form>
        )}
    </Formik>
   
  );
}
export default AddressForm;