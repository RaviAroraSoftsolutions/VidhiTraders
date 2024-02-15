import React from "react";
import { TextField, Box, Button, Grid } from "@mui/material";
import AddressCard from "../../adreess/AdreessCard";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useState } from "react";
import { addAddress, removeAddress, updateAddress } from "../../../../Redux/Auth/Action";
import { useDispatch } from "react-redux";
import { mobileRegex } from "../../../../utils/utils";
import { toast } from "react-toastify";
import { Formik } from "formik";
import { AddressFormSchema } from "../../../../utils/schemas/addressSchema";
const AddressInfo = ({ userData, jwt }) => {
  const [addressData, setAddressData] = useState({});
  const dispatch = useDispatch();


  const handleSubmit = async (values) => {
    if (addressData?._id) {
      await dispatch(updateAddress(values, jwt));
    } else {
      await dispatch(addAddress(values, jwt));
    }
    setAddressData({});
  };
const handleDeleteAdd=(id)=>{
    dispatch(removeAddress(id,jwt))
}
  return (
    <Grid className="mt-4 px-4 py-4" container spacing={4}>
      <Grid item xs={12} lg={5}>
        <Box className="border rounded-md shadow-md h-[30.5rem] overflow-y-scroll ">
          {userData.addresses.map((item) => (
            <div
              className={`p-5 py-7 border-b cursor-pointer relative ${
                item?._id === addressData?._id ? "bg-blue-200" : ""
              } `}
            >
              {" "}
              <div onClick={()=>handleDeleteAdd(item?._id)} className="absolute right-0 top-0 z-1">
                <DeleteForeverIcon color="error" fontSize="small"  />
              </div>
              <AddressCard
                onClick={() => setAddressData(item)}
                address={item}
              />
            </div>
          ))}
        </Box>
      </Grid>
      <Grid item xs={12} lg={7}>
        <Box className="border rounded-md shadow-md p-5">
          {/* <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  value={addressData?.firstName || ""}
                  fullWidth
                  onChange={handleChange}
                  autoComplete="given-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  value={addressData?.lastName || ""}
                  fullWidth
                  onChange={handleChange}
                  autoComplete="given-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="address"
                  name="streetAddress"
                  label="Address"
                  fullWidth
                  autoComplete="shipping address"
                  onChange={handleChange}
                  value={addressData?.streetAddress || ""}
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="city"
                  name="city"
                  label="City"
                  value={addressData?.city || ""}
                  onChange={handleChange}
                  fullWidth
                  autoComplete="shipping address-level2"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="state"
                  name="state"
                  label="State/Province/Region"
                  onChange={handleChange}
                  value={addressData?.state || ""}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="zip"
                  name="zipCode"
                  label="Zip / Postal code"
                  onChange={handleChange}
                  value={addressData?.zipCode || ""}
                  fullWidth
                  autoComplete="shipping postal-code"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="phoneNumber"
                  name="mobile"
                  label="Phone Number"
                  type="number"
                  onChange={handleChange}
                  value={addressData?.mobile || ""}
                  fullWidth
                  autoComplete="tel"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  sx={{ padding: ".9rem 1.5rem" }}
                  size="large"
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={(e) => handleSubmit(e)}
                >
                  {addressData?._id ? "Update Address" : "Add Address"}
                </Button>
              </Grid>
            </Grid>
          </form> */}
          <Formik
          enableReinitialize
            initialValues={addressData}
            validationSchema={AddressFormSchema}
            onSubmit={(values, { setSubmitting }) => {
               
              handleSubmit(values)
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => (
              <form onSubmit={handleSubmit}>
               
                  <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  value={values?.firstName || ""}
                  fullWidth
                  onChange={handleChange}
                  autoComplete="given-name"
                />
                 <p className="text-xs text-red-600 mt-1">{errors.firstName && touched.firstName && errors.firstName}</p>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  value={values?.lastName || ""}
                  fullWidth
                  onChange={handleChange}
                  autoComplete="given-name"
                />
                <p className="text-xs text-red-600 mt-1">{errors.lastName && touched.lastName && errors.lastName}</p>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="address"
                  name="streetAddress"
                  label="Address"
                  fullWidth
                  autoComplete="shipping address"
                  onChange={handleChange}
                  value={values?.streetAddress || ""}
                  multiline
                  rows={4}
                />
                 <p className="text-xs text-red-600 mt-1">{errors.streetAddress && touched.streetAddress && errors.streetAddress}</p>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="city"
                  name="city"
                  label="City"
                  value={values?.city || ""}
                  onChange={handleChange}
                  fullWidth
                  autoComplete="shipping address-level2"
                />
                 <p className="text-xs text-red-600 mt-1">{errors.city && touched.city && errors.city}</p>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="state"
                  name="state"
                  label="State/Province/Region"
                  onChange={handleChange}
                  value={values?.state || ""}
                  fullWidth
                />
                <p className="text-xs text-red-600 mt-1">{errors.state && touched.state && errors.state}</p>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="zip"
                  name="zipCode"
                  label="Zip / Postal code"
                  onChange={handleChange}
                  value={values?.zipCode || ""}
                  fullWidth
                  autoComplete="shipping postal-code"
                />
                 <p className="text-xs text-red-600 mt-1">{errors.zipCode && touched.zipCode && errors.zipCode}</p>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="phoneNumber"
                  name="mobile"
                  label="Phone Number"
                  type="number"
                  onChange={handleChange}
                  value={values?.mobile || ""}
                  fullWidth
                  autoComplete="tel"
                />
                 <p className="text-xs text-red-600 mt-1">{errors.mobile && touched.mobile && errors.mobile}</p>
              </Grid>
              <Grid item xs={12}>
                <Button
                  sx={{ padding: ".9rem 1.5rem" }}
                  size="large"
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  {addressData?._id ? "Update Address" : "Add Address"}
                </Button>
              </Grid>
            </Grid>
                
               
              </form>
            )}
          </Formik>
        </Box>
      </Grid>
    </Grid>
  );
};

export default AddressInfo;
