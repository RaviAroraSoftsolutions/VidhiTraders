import React from 'react'
import {TextField,Box,Button,Grid} from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../../../Redux/Auth/Action';
import { Formik } from 'formik';
import { ProfileFormSchema } from '../../../../utils/schemas/addressSchema';
const ProfileInfo = ({userData,handleChange,jwt}) => {
    const [isEdit,setIsEdit]= useState(false)

    const dispatch= useDispatch()
    const handleSubmit=async(e)=>{
       console.log(e)
       const {firstName,lastName,mobile}= e
        await dispatch(updateUser({firstName,lastName,mobile},jwt))
        setIsEdit(false)
        
    }

  return (
    <div className='relative p-2 '>
  {!isEdit && <div onClick={()=>setIsEdit(!isEdit)} style={{justifyContent:"flex-end",top:"0.5rem",right:"0.75rem"}} className='flex justify-end w-full py-2 absolute hover:cursor-pointer'>
       <ModeEditIcon fontSize='medium' color='primary'/>
   </div>}
        <Box style={{marginTop:"3rem"}} className='px-5 py-3'  sx={{ mt: 3 }}>
           
         <Formik
          enableReinitialize
            initialValues={userData}
            validationSchema={ProfileFormSchema}
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
                  disabled={!isEdit}
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
                  disabled={!isEdit}
                  autoComplete="given-name"
                />
                <p className="text-xs text-red-600 mt-1">{errors.lastName && touched.lastName && errors.lastName}</p>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="address"
                  name="email"
                  label="Email Address"
                  fullWidth
                  autoComplete="email"
                  disabled={true}
                  onChange={handleChange}
                  value={values?.email || ""}
                />
                 <p className="text-xs text-red-600 mt-1">{errors.streetAddress && touched.streetAddress && errors.streetAddress}</p>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="phoneNumber"
                  name="mobile"
                  label="Mobile Number"
                  type="number"
                  onChange={handleChange}
                  disabled={!isEdit}
                  value={values?.mobile || ""}
                  fullWidth
                  autoComplete="tel"
                />
                 <p className="text-xs text-red-600 mt-1">{errors.mobile && touched.mobile && errors.mobile}</p>
              </Grid>
              <Grid item xs={12}>
              {isEdit &&<Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update
            </Button>
            }
              </Grid>
            </Grid>
                
               
              </form>
            )}
          </Formik>
            

          </Box>
    </div>
  )
}

export default ProfileInfo