import { FormControl, FormLabel, FormErrorMessage, Button, Input, Textarea } from '@chakra-ui/react'
import { Formik, Form } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiCalls from '../api/apiCalls';
import * as yup from 'yup'
import Calendar from 'react-calendar';
import '../styles/Calendar.css';
import 'react-calendar/dist/Calendar.css';

function ReservationForm(props) {
  const navigate = useNavigate();
  const [date, setDate] = useState();
  const [minDate, setMinDate] = useState(new Date())
  const [maxDate, setMaxDate] = useState(null)

  const validationSchema = yup.object().shape({
    num_persons:  yup.number('Must be a number'),
  });

  const initialValues = {
    num_persons: props.reservation ? props.reservation.num_persons : ''
  };

  const onSubmit = async (values, {setSubmitting, resetForm})=> {
    // this adds in the listing info and the total price based on number of days
    values['listing'] = props.listing.id
    values['date_start'] = new Date(date[0]).toISOString().split('T')[0]
    values['date_end'] = new Date(date[1]).toISOString().split('T')[0]
    let end = date[1]
    let start = date[0]
    values['total'] = (props.listing.price * ((end-start)/(1000*60*60*24))).toFixed(2)
    
    let response = await apiCalls.createReservation(values)
    if (response) {
      alert('new reservation created')
    } else {
      alert('error submitting reservation. try again')
    }
    setSubmitting(false);
    resetForm({initialValues:''})
    setDate(new Date())
    navigate("/account")
  }

  const disabledDates = (date, view)=>{
    if (props.listing && props.listing.dates_booked){
      return props.listing.dates_booked.indexOf(date.toISOString().split('T')[0]) > -1
    }
  }

  const limitDates = (value, event)=>{
    let newMin = null
    let newMax = null

    for (let i=0; i<props.listing.dates_booked.length; i++){
      if (props.listing.dates_booked[i] < value.toISOString().split('T')[0] && props.listing.dates_booked[i] > new Date().toISOString().split('T')[0]){       
        newMin = props.listing.dates_booked[i]
      } else if ( props.listing.dates_booked[i] > value.toISOString().split('T')[0] ){
        newMax = props.listing.dates_booked[i]
        if (newMin){
          setMinDate(new Date(newMin))
        }        
        setMaxDate(new Date(newMax))
        return
      }
    }
  }

  const resetCalendar = ()=>{
    setDate(null)
    setMaxDate(null)
    setMinDate(new Date())
  }

  return (
    <>
    <Calendar
        onChange={setDate}
        selectRange={true}
        value={date} 
        minDate={minDate}
        maxDate={maxDate}
        minDetail='year'
        tileDisabled={({date, view})=>disabledDates(date, view)}
        onClickDay={(value, event) => limitDates(value, event)}
    />
    <Button onClick={resetCalendar}>Reset Dates</Button>
    <Formik 
        validateOnBlur={true} 
        validateOnChange={false} 
        Calendar={Calendar}
        setDate={setDate}
        {...{initialValues, onSubmit, validationSchema }}
    >
    {({ handleSubmit, handleBlur, handleChange, values, errors, isSubmitting, touched }) => (
        <Form noValidate onSubmit={handleSubmit}>
            <FormControl 
                isInvalid={touched.num_persons && !!errors.num_persons}
            >
                <FormLabel>Number of visitors:</FormLabel>
                <Input 
                    name="num_persons"
                    value={values.num_persons}
                    placeholder="How many people will be staying" 
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            </FormControl>
            <Button
                mt={4}
                colorScheme='teal'
                isLoading={isSubmitting}
                type='submit'
            >
                Book it!
            </Button>
        </Form>
    )}
    </Formik>
    </>
  );
}
export default ReservationForm;