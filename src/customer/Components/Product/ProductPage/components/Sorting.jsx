import { Box, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material'
import React from 'react'

const Sorting = ({searchParams,navigate,sort}) => {
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const settings = [{title:'Price -- Low to High',value:"price_low"}, {title:'Price -- High to Low',value:"price_high"},];
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
      };
    
      const handleSortChange = (event, value) => {
        searchParams.set("sort", value);
        const query = searchParams.toString();
        navigate({ search: `?${query}` });
      };
      const handleCloseUserMenu = (e,value) => {
        handleSortChange(e,value)
        setAnchorElUser(null);
      };
      console.log({sort})
  return (
    <div className='mt-1'>
           <Box sx={{ display:"flex",flexGrow: 0,alignItems:"center",gap:"1rem" }}>
            
            <Typography textAlign="center">Sort By</Typography>
            {/* <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={(e)=>handleCloseUserMenu(e,setting?.value)}>
                  <Typography textAlign="center">{setting?.title}</Typography>
                </MenuItem>
              ))}`
            </Menu> */}
            <div className='flex translate-y-0.5 gap-2'>
              {settings.map((setting) => (
                  <div key={setting} className={`py-1 px-2  hover:cursor-pointer hover:border-b-2 ${sort===setting?.value && "border-b-2 border-b-blue-800 font-medium"} hover:border-b-blue-800`} onClick={(e)=>handleCloseUserMenu(e,setting?.value)}>
                    <p className='text-sm ' textAlign="center">{setting?.title}</p>
                  </div>
                ))}
            </div>
          </Box>
    </div>
  )
}

export default Sorting