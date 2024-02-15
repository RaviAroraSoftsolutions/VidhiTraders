import { Avatar, Box, Card, CardHeader, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'

import React from 'react'
import { dressPage1 } from '../../Data/dress/page1'
import { useNavigate } from 'react-router-dom'


const RecentOrders = ({orders}) => {
    const navigate=useNavigate();
  return (
    <Card>
       <CardHeader
          title='Recent Orders'
          sx={{ pt: 2, alignItems: 'center', '& .MuiCardHeader-action': { mt: 0.6 } }}
          action={<Typography onClick={()=>navigate("/admin/orders")} variant='caption' sx={{color:"blue",cursor:"pointer",paddingRight:".8rem"}}>View All</Typography>}
          titleTypographyProps={{
            variant: 'h5',
            sx: { lineHeight: '1.6 !important', letterSpacing: '0.15px !important' }
          }}
        />
    <TableContainer>
      <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
        <TableHead>
          <TableRow>
             <TableCell>Image</TableCell>
            <TableCell>Title</TableCell>
          
            <TableCell>Price</TableCell>
             <TableCell>Order Id</TableCell>
             <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders?.length>0?orders?.map((item,index) => (
            <TableRow hover key={item.name} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
             <TableCell> <Avatar alt={item?.title} src={item.product.imageUrl[0]} /> </TableCell>
             
              <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{item.product.title}</Typography>
                  <Typography variant='caption'>{item.brand}</Typography>
                </Box>
              </TableCell>
              
              <TableCell>{item.discountedPrice}</TableCell>
              <TableCell>{item?._id}</TableCell>
              <TableCell><Chip sx={{color:"white"}} label={item?.orderStatus} size='small' color="success" className='text-white' /></TableCell>
             
            </TableRow>
          )):
          <TableRow>
            <TableCell rowSpan={5}>No Data Found</TableCell>
          </TableRow>
          }
        </TableBody>
      </Table>
    </TableContainer>
  </Card>
  )
}

export default RecentOrders