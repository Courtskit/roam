import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/ListingForm.css";
import * as yup from 'yup'
import { Formik, Form,Field } from "formik";
import { FormControl, FormLabel, FormErrorMessage, Button, Input, Textarea } from '@chakra-ui/react'
import MapElement from "./SelectLocationMap";
import apiCalls from '../api/apiCalls';


function ListingForm(props) {
    const [lat, setlat] = useState(null)
    const [long, setlong] = useState(null)
    const navigate = useNavigate();

    useEffect(()=>{
        if (props.listing){
            setlat(props.listing.location_lat)
            setlong(props.listing.location_lng)
        }
    },[props.listing])

    const validationSchema = yup.object().shape({
        title:          yup.string()
                            .required('A site title required'),
        price:          yup.number('Must be a number')
                            .min(0, 'Cannot be a negative number'),
        description:    yup.string()
                            .required('Must give a description')
    });

    const initialValues = {
        title:          props.listing ? props.listing.title : '',
        price:          props.listing ? props.listing.price : '',
        description:    props.listing ? props.listing.description : '',
        image:          props.listing ? props.listing.image : ''
    };

    const onSubmit = async (values, { setSubmitting, resetForm })=> {
        values['is_boondock'] = props.is_boondock
        values['location_lng'] = long
        values['location_lat'] = lat
        // this block sends a post request for a new listing object or a 
        // put request for updating a listing
        if (props.new){

            let form_data = new FormData(); 
            console.log(values.file)       
            if (values.file[0]){
                form_data.append("image", values.file[0]);
            }
            form_data.append("title", values.title);
            form_data.append("description", values.description);
            form_data.append("is_boondock", values.is_boondock);
            form_data.append("location_lat", values.location_lat);
            form_data.append("location_lng", values.location_lng);
            form_data.append("price", values.price);
            let response = await apiCalls.createListing(form_data)
            if (response) {
                console.log(response)
                alert('New Listing Created')
                navigate('/account')
            }
        } else {
            let update_form_data = new FormData();  
            update_form_data.append("image", values.file[0]);

            update_form_data.append("title", values.title);
            update_form_data.append("description", values.description);
            update_form_data.append("is_boondock", values.is_boondock);
            update_form_data.append("location_lat", values.location_lat);
            update_form_data.append("location_lng", values.location_lng);
            update_form_data.append("price", values.price);

            let response = await apiCalls.updateListingById(props.listing.id, update_form_data)
            if (response) {
                alert('Updated')
                navigate('/account')
            }
        }
        setSubmitting(false);
        resetForm({values:''})
    }

    const mapOnChange = (event, newLngLat)=>{
        setlat(newLngLat.lat)
        setlong(newLngLat.lng)
        console.log(newLngLat)
    }


    return (
        <Formik validateOnBlur={true}
        validateOnChange={false} {...{initialValues, onSubmit, validationSchema }}>
            {({ handleSubmit, handleBlur, handleChange, values, errors, isSubmitting, touched ,setFieldValue }) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <FormControl 
                        isRequired 
                        isInvalid={touched.title && !!errors.title}
                    >
                        <FormLabel>Title:</FormLabel>
                        <Input
                            name="title"
                            value={values.title}
                            placeholder="Enter a title for your site" 
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <FormErrorMessage>{errors.title}</FormErrorMessage>
                    </FormControl>
                    <FormControl 
                        isInvalid={touched.price && !!errors.price}
                    >
                        <FormLabel>Price:</FormLabel>
                        <Input
                            name="price"
                            value={values.price}
                            placeholder="Enter a price for your site" 
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <FormErrorMessage>{errors.price}</FormErrorMessage>
                    </FormControl>
                    <FormControl 
                        isRequired 
                        isInvalid={touched.description && !!errors.description}
                    >
                        <FormLabel>Description:</FormLabel>
                        <Textarea 
                            name="description"
                            value={values.description}
                            placeholder="Give your site a description" 
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <FormErrorMessage>{errors.description}</FormErrorMessage>
                    </FormControl>

                    <FormControl 
                        isRequired 
                        isInvalid={touched.image && !!errors.image}
                    >
                        <FormLabel>Image:</FormLabel>
                                <input id="file" name="file" 
                                type="file" 
                                onChange={(event) => {
                                setFieldValue("file", event.currentTarget.files);
                                }} />
                        <FormErrorMessage>{errors.image}</FormErrorMessage>
                    </FormControl>


                    <FormLabel>Put a pin on your site's location:</FormLabel>
                    <MapElement onChange={mapOnChange}/>
                    <Button
                        mt={4}
                        colorScheme='teal'
                        disabled={isSubmitting}
                        type='submit'
                    >
                        Submit
                    </Button>
                </Form>
            )}
        </Formik>
    );
}

export default ListingForm;