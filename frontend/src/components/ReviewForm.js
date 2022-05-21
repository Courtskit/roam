import { FormControl, FormLabel, FormErrorMessage, Button, Input, Textarea } from '@chakra-ui/react'
import { Formik, Form } from 'formik';
import apiCalls from '../api/apiCalls';
import * as yup from 'yup'
function ReservationForm(props) {

  const validationSchema = yup.object().shape({

    review_text:     yup.string()
                        
});


  const initialValues = {
    review_text:  props.review ? props.review.review_text : '',
};

const onSubmit = async (values, {setSubmitting, resetForm})=> {
  console.log("Inside onSubmit")
  if (props.new){
    console.log('creating a new review API call')
    console.log(initialValues)
    let response = await apiCalls.createReservation(initialValues)
    if (response) {
      console.log(response)
      alert('new reservation created')
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
                    isInvalid={touched.review_text && !!errors.review_text}
                >
                    <FormLabel>Review:</FormLabel>
                    <Input
                        name="review_text"
                        type="string"
                        value={values.review_text}
                        placeholder="Enter you review" 
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <FormErrorMessage>{errors.review_text}</FormErrorMessage>
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
export default ReservationForm;