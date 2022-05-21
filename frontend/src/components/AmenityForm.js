import { FormControl, FormLabel, FormErrorMessage, Button, Input, Textarea } from '@chakra-ui/react'
import { Formik, Form } from 'formik';
import apiCalls from '../api/apiCalls';
import * as yup from 'yup'

function AmenityForm(props) {

  const validationSchema = yup.object().shape({

    name:     yup.string()
                        
});


  const initialValues = {
    name:  props.amenity ? props.amenity.name : '',
};

const onSubmit = async (values, {setSubmitting, resetForm})=> {
  console.log("Inside onSubmit")
  if (props.new){
    console.log('creating a new amenity API call')
    console.log(initialValues)
    let response = await apiCalls.createAmenity(initialValues)
    if (response) {
      console.log(response)
      alert('new amenity created')
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
                    isInvalid={touched.name && !!errors.name}
                >
                    <FormLabel>Amenities:</FormLabel>
                    <Input
                        name="name"
                        type="string"
                        value={values.name}
                        placeholder="Enter your amenity/ies" 
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <FormErrorMessage>{errors.name}</FormErrorMessage>
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
export default AmenityForm;