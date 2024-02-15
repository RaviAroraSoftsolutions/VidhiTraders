import React from "react";
import { Avatar } from "@mui/material";
import { Rating, Box, Typography, Grid } from "@mui/material";
import moment from "moment";

const ProductReviewCard = ({item}) => {
  const [value, setValue] = React.useState(4.5);
  console.log({item})
  return (
    <div className="border p-2 px-3">
      <Grid container spacing={2} gap={3}>
        <Grid item xs={1}>
          <Box>
            <Avatar
              className="text-white"
              sx={{ width: 56, height: 56, bgcolor: "#9155FD" }}
              alt={item?.user?.firstName}
              src=""
            >
              {item?.user?.firstName?.slice(0,1)?.toUpperCase()}
            </Avatar>
          </Box>
        </Grid>
        <Grid item xs={9}>
          <div className="space-y-2">
           
            <div>
            
             <div className={`py-1 px-3 text-xs rounded ${item?.review?.rating>=4?"bg-green-950":item?.review?.rating>=3?"bg-yellow-500":item?.review?.rating<=2&&"bg-red-700"} flex items-center justify-center w-min text-white`}>
             <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMyIgaGVpZ2h0PSIxMiI+PHBhdGggZmlsbD0iI0ZGRiIgZD0iTTYuNSA5LjQzOWwtMy42NzQgMi4yMy45NC00LjI2LTMuMjEtMi44ODMgNC4yNTQtLjQwNEw2LjUuMTEybDEuNjkgNC4wMSA0LjI1NC40MDQtMy4yMSAyLjg4Mi45NCA0LjI2eiIvPjwvc3ZnPg==" alt="rating" height={"10px"} class="_1wB99o"/>
             <span className="mx-1 font-medium">{item?.review?.rating}</span>
             </div>
              {/* <Rating
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                name="half-rating"
                defaultValue={2.5}
                precision={0.5}
              /> */}
              
            </div>
            <p>
              {item?.review?.title}
            </p>
          </div>
          <div>{item?.review?.description}</div>
          <div className="flex gap-2 items-center text-sm">
              <p className="font-semibold ">{item.user?.firstName}</p>
              <p className="opacity-70 text-xs">{moment(item?.createdAt).format("MMM-YYYY")}</p>
            </div>
        </Grid>
      </Grid>
      <div className="col-span-1 flex"></div>
    </div>
  );
};

export default ProductReviewCard;
