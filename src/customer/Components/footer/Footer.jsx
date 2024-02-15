import { Grid, Link, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Grid className='bg-black text-white mt-10 text-center' container color={'white' } sx={{ bgcolor: 'black', color: 'white', py: 3 }}>
      
      <Grid className='pt-20' item xs={12} >
        <Typography variant="body2" component="p" align="center">
          &copy; 2023 My Company. All rights reserved.
        </Typography>
        <Typography variant="body2" component="p" align="center">
          Shipping Policy : The cost of shipping the product will be borne by the customer
        </Typography>
        <div className='flex w-full justify-center px-2 flex-col text-white text-xs'>
          <div className='flex items-center gap-2 mx-auto my-1'>
            <Link className='text-white' href='https://doc-hosting.flycricket.io/vidhiricetraders-privacy-policy/30c8b32c-5677-497e-80d6-574be881f242/privacy' target='_blank'>Privacy Policy</Link>
            <Link className='text-white' href='https://www.freeprivacypolicy.com/live/1d11abd9-805d-4fb1-8f8b-2f234200bd59' target='_blank'>Refund Policy</Link>
          </div>
          <Link className='text-white' href='https://doc-hosting.flycricket.io/vidhiricetraders-terms-of-use/9428c152-c835-4a21-b974-658a427e0a94/terms' target='_blank'>Terms & Conditions</Link>
        </div>
        {/* <Typography variant="body2" component="p" align="center">
          Icons made by{' '}
          <Link href="https://www.freepik.com" color="inherit" underline="always">
            Freepik
          </Link>{' '}
          from{' '}
          <Link href="https://www.flaticon.com/" color="inherit" underline="always">
            www.flaticon.com
          </Link>
        </Typography> */}
      </Grid>
    </Grid>
  );
};

export default Footer;
