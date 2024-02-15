import * as Yup from 'yup';

export const AddressFormSchema=Yup.object().shape({
    firstName:Yup.string()
    .required("Please enter the first Name")
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
    lastName:Yup.string()
    .required("Please enter the last Name")
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
    streetAddress:Yup.string().required("Please enter address"),
    city:Yup.string()
    .required("Please enter the City")
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
   state:Yup.string().required("Please enter the State").matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
   zipCode:Yup.number("Only Numbers between 0-9").min(6,"Postal code should be of 6 Digits"),
   mobile:Yup.number("Only Numbers between 0-9").min(10,"Mobile No should be of 10 Digits")
})
export const ProfileFormSchema= Yup.object().shape({
    firstName:Yup.string()
    .required("Please enter the first Name")
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
    lastName:Yup.string()
    .required("Please enter the last Name")
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
    email:Yup.string().email("Enter a Valid Email"),
    mobile:Yup.number("Only Numbers between 0-9").min(10,"Mobile No should be of 10 Digits")
})