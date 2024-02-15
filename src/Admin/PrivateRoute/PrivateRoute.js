import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

const PrivateRoute = () => {
    const { auth } = useSelector((store) => store);
    const navigate= useNavigate()
    useEffect(() => {
        if (auth.user){          
           if(auth.user?.role!=="ADMIN"){
            navigate('/')
           }
          }
         
      }, [auth.user]);
  return (
    <div><Outlet/></div>
  )
}

export default PrivateRoute