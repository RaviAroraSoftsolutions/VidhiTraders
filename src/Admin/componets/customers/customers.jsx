// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import { Avatar, CardHeader, FormControl, IconButton, InputAdornment, Pagination, TextField,Grid } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UserType } from '../../../utils/utils'
import { getCustomerList } from '../../../Redux/Customers/Users/Action'
import BackdropComponent from '../../../customer/Components/BackDrop/Backdrop'

import { useDebounceSearch } from '../../../utils/useDebounce'
import SearchIcon from "@mui/icons-material/Search";



const Customers = () => {
  const navigate=useNavigate();
  const location = useLocation();
  const [searchTerm,setSearchTerm]= useState("")
  const debounceSearch = useDebounceSearch(searchTerm)
  const dispatch =useDispatch()
  const {userList,loading,userCount}= useSelector(state=>state?.customers)


  const searchParams = new URLSearchParams(location.search);
  const pageNumber = searchParams.get("page") || 1;

  const handlePaginationChange = (event, value) => {
    searchParams.set("page", value);
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };

  useEffect(()=>{
    dispatch(getCustomerList({list_type:UserType?.CUSTOMER,pageNumber:pageNumber,pageSize:10,searchTerm:debounceSearch}))

  },[pageNumber,debounceSearch])
  return (
    <Box>
      <BackdropComponent open={loading} />
         <Card>
      <CardHeader
          title='All Customers'
          sx={{ pt: 2, alignItems: 'center', '& .MuiCardHeader-action': { mt: 0.6 } }}
          
        />
         <Grid item xs={4}>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="outlined-adornment-password"
                name="searchTerm"
                value={searchTerm}
                onChange={(e)=>setSearchTerm(e?.target?.value)}
                type={"text"}
                placeholder="Search By Name,Email,Mobile No..,..."
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"  
                      edge="end"
                    >
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                }
                label="Search Term"
              />
            </FormControl>
          </Grid>
      <TableContainer>
        <Table sx={{ minWidth: 390 }} aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
            <TableCell>User Id</TableCell>
            <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Mobile</TableCell>
              <TableCell>Addresses</TableCell>
              <TableCell>Cities</TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
            {userList.slice(0,10).map((item,index) => (
              <TableRow hover key={item.name} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell>{index+1}</TableCell>
                <TableCell> <Avatar alt={item.name} src={item.image} /> </TableCell>
                <TableCell>{item.firstName+" "+item?.lastName}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.addresses?.map(add=>add.mobile).slice(0,3).join(",")}</TableCell>
                <TableCell>{item.addresses?.map(add=>add?.streetAddress).slice(0,3).join(",")}</TableCell>
                <TableCell>{item.addresses?.map(add=>add?.city).slice(0,3).join(",")}</TableCell>
                
                
               
               
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
    <Card className="mt-2 felx justify-center items-center">
        <Pagination
          className="py-5 w-auto"
          size="large"
          page={Number(pageNumber)}
          count={Math.ceil(userCount / 10)}
          color="primary"
          onChange={handlePaginationChange}
        />
      </Card>
    </Box>
   
  )
}

export default Customers;
