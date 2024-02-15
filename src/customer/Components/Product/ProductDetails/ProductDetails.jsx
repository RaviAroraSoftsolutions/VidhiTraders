import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { useNavigate, useParams } from "react-router-dom";
import ProductReviewCard from "./ProductReviewCard";
import { Box, Button, Grid, LinearProgress, Rating } from "@mui/material";
import HomeProductCard from "../../Home/HomeProductCard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findProductById } from "../../../../Redux/Customers/Product/Action";
import { addItemToCart } from "../../../../Redux/Customers/Cart/Action";
import { getAllReviews } from "../../../../Redux/Customers/Review/Action";
import { lengha_page1 } from "../../../../Data/Women/LenghaCholi";
import { gounsPage1 } from "../../../../Data/Gouns/gouns";
import BackdropComponent from "../../BackDrop/Backdrop";

const product = {
  name: "Basic Tee 6-Pack",
  price: "₹996",
  href: "#",
  breadcrumbs: [
    { id: 1, name: "Men", href: "#" },
    { id: 2, name: "Clothing", href: "#" },
  ],
  images: [
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
      alt: "Two each of gray, white, and black shirts laying flat.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg",
      alt: "Model wearing plain black basic tee.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg",
      alt: "Model wearing plain gray basic tee.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg",
      alt: "Model wearing plain white basic tee.",
    },
  ],
  colors: [
    { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
    { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
    { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
  ],
  sizes: [
    { name: "S", inStock: true },
    { name: "M", inStock: true },
    { name: "L", inStock: true },
  ],
  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  highlights: [
    "Hand cut and sewn locally",
    "Dyed with our proprietary colors",
    "Pre-washed & pre-shrunk",
    "Ultra-soft 100% cotton",
  ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
};
const reviews = { href: "#", average: 4, totalCount: 117 };

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetails() {
  const { auth, cart } = useSelector((store) => store);
  const [selectedSize, setSelectedSize] = useState();
  const [activeImage, setActiveImage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { customersProduct, review } = useSelector((store) => store);
  const { productId } = useParams();
  const jwt = localStorage.getItem("jwt");
  const totalReviews= review?.reviews?.length
  const ExcellentRatings= review?.reviews.filter(data=>data?.review?.rating>4)?.length
  const GoodRatings= review?.reviews.filter(data=>data?.review?.rating===4)?.length
  const AverageRatings= review?.reviews.filter(data=>data?.review?.rating>=3&&data?.review?.rating<4)?.length
  const BadRatings= review?.reviews.filter(data=>data?.review?.rating<=2)?.length
  const totalRatings= Math.ceil((review?.reviews.reduce((init,rev)=>{return init+Number(rev?.review?.rating)},0)/totalReviews))
  // console.log("param",productId,customersProduct.product)

  const handleSetActiveImage = (image) => {
    setActiveImage(image);
  };

  const handleSubmit = (e) => {
    const data = { productId };

    dispatch(addItemToCart({ data, jwt, navigate }));
  };

  useEffect(() => {
    const data = { productId: productId, jwt };
    dispatch(findProductById(data));
    dispatch(getAllReviews(productId));
  }, [productId]);

  // console.log("reviews ",review)

  return (
    <>
      <BackdropComponent open={customersProduct?.loading} />
      <BackdropComponent open={cart?.loading} />

      <div className="bg-white lg:px-20">
        <div className="pt-6">
          

          {/* product details */}
          <section className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2 px-4 pt-10">
            {/* Image gallery */}
            <div className="flex flex-row-reverse  justify-start gap-2">
              <div className=" overflow-hidden rounded-lg max-w-[30rem] max-h-[35rem]">
                <img
                  src={activeImage || customersProduct.product?.imageUrl[0]}
                  alt={product.images[0].alt}
                  className="h-full w-full object-fill object-center"
                />
              </div>
              <div className="flex flex-wrap flex-col w-[10rem] justify-start items-start gap-2 hover:cursor-pointer">
              {customersProduct.product?.imageUrl.map((image) => (
                <div
                  onMouseOver={() => handleSetActiveImage(image)}
                  className="ml-0 overflow-hidden rounded-lg max-w-[10rem] max-h-[10rem] "
                >
                  <img
                    src={image}
                    alt={product.images[1].alt}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              ))}
            </div>
            </div>

            {/* Product info */}
            <div className="lg:col-span-1 mx-auto max-w-2xl px-4 pb-16 sm:px-6  lg:max-w-7xl  lg:px-8 lg:pb-24">
              <div className="lg:col-span-2">
                <h1 className="text-lg lg:text-xl font-semibold tracking-tight text-gray-900  ">
                  {customersProduct.product?.brand}
                </h1>
                <h1 className="text-lg lg:text-xl tracking-tight text-gray-900 opacity-60 pt-1">
                  {customersProduct.product?.title}
                </h1>
              </div>

              {/* Options */}
              <div className="mt-4 lg:row-span-3 lg:mt-0">
                <h2 className="sr-only">Product information</h2>
                <div className="flex space-x-5 items-center text-lg lg:text-xl tracking-tight text-gray-900 mt-6">
                  <p className="font-semibold">
                    ₹{customersProduct.product?.discountedPrice}
                  </p>
                  <p className="opacity-50 line-through">
                    ₹{customersProduct.product?.price}
                  </p>
                  <p className="text-green-600 font-semibold">
                    {Math.round(customersProduct.product?.discountPersent)}% Off
                  </p>
                </div>

                {/* Reviews */}
                
                

                <form className="mt-10">
                  {/* Sizes */}
                  {/* <div className="mt-10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">Size</h3>
                  </div>

                  <RadioGroup
                    value={selectedSize}
                    onChange={setSelectedSize}
                    className="mt-4"
                  >
                    <RadioGroup.Label className="sr-only">
                      Choose a size
                    </RadioGroup.Label>
                    <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-10">
                      {product.sizes.map((size) => (
                        <RadioGroup.Option
                          key={size.name}
                          value={size}
                          disabled={!size.inStock}
                          className={({ active }) =>
                            classNames(
                              size.inStock
                                ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                                : "cursor-not-allowed bg-gray-50 text-gray-200",
                              active ? "ring-1 ring-indigo-500" : "",
                              "group relative flex items-center justify-center rounded-md border py-1 px-1 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
                            )
                          }
                        >
                          {({ active, checked }) => (
                            <>
                              <RadioGroup.Label as="span">
                                {size.name}
                              </RadioGroup.Label>
                              {size.inStock ? (
                                <span
                                  className={classNames(
                                    active ? "border" : "border-2",
                                    checked
                                      ? "border-indigo-500"
                                      : "border-transparent",
                                    "pointer-events-none absolute -inset-px rounded-md"
                                  )}
                                  aria-hidden="true"
                                />
                              ) : (
                                <span
                                  aria-hidden="true"
                                  className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                >
                                  <svg
                                    className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                    viewBox="0 0 100 100"
                                    preserveAspectRatio="none"
                                    stroke="currentColor"
                                  >
                                    <line
                                      x1={0}
                                      y1={100}
                                      x2={100}
                                      y2={0}
                                      vectorEffect="non-scaling-stroke"
                                    />
                                  </svg>
                                </span>
                              )}
                            </>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div> */}

                  {customersProduct?.product?.quantity < 1 ? (
                    <div className="w-full py-2 text-center bg-gray-300 hover:cursor-not-allowed align-bottom mt-auto mb-0 text-white">
                      <p className="text-sm">Sold Out</p>
                    </div>
                  ) : !cart?.cartItems.find(
                      (item) =>
                        item?.product?._id === customersProduct?.product?._id
                    ) ? (
                    <Button
                      variant="contained"
                      
                      onClick={() => handleSubmit()}
                      sx={{ padding: ".8rem 2rem", marginTop: "2rem" }}
                    >
                      Add To Cart
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      className="bg-lime-500 text-white"
                      onClick={() => navigate("/cart")}
                      sx={{ padding: ".8rem 2rem", marginTop: "2rem" }}
                    >
                      View Cart
                    </Button>
                  )}
                </form>
              </div>

              <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                {/* Description and details */}
                <div>
                  <h3 className="sr-only">Description</h3>

                  <div className="space-y-6">
                    <p className="text-base text-gray-900">
                      {customersProduct.product?.description}
                    </p>
                  </div>
                </div>

                {/* <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">
                  Highlights
                </h3>

                <div className="mt-4">
                  <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                    {product.highlights.map((highlight) => (
                      <li key={highlight} className="text-gray-400">
                        <span className="text-gray-600">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div> */}

                <div className="mt-10">
                  <h2 className="text-sm font-medium text-gray-900">Details</h2>

                  <div className="mt-4 space-y-6">
                    <p className="text-sm text-gray-600">{product.details}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* rating and review section */}
          <section className="">
            <h1 className="font-semibold text-lg pb-4">
              Recent Review & Ratings
            </h1>

            <div className="border p-5">
              <Grid container spacing={7}>
                <Grid item xs={7}>
                  <div className="space-y-5 h-[270px] overflow-y-auto">
                    {review.reviews?.map((item, i) => (
                      <ProductReviewCard item={item} />
                    ))}
                  </div>
                </Grid>

                <Grid item xs={5}>
                  <h1 className="text-xl font-semibold pb-1">
                    Product Ratings
                  </h1>
                  <div className="flex items-center space-x-3 pb-10">
                    <Rating
                      name="read-only"
                      value={totalRatings}
                      precision={0.5}
                      readOnly
                    />

                    <p className="opacity-60">{totalReviews} Ratings</p>
                  </div>
                  <Box>
                    <Grid
                      container
                      justifyContent="center"
                      alignItems="center"
                      gap={2}
                    >
                      <Grid xs={2}>
                        <p className="p-0">Excellent</p>
                      </Grid>
                      <Grid xs={7}>
                        <LinearProgress
                          className=""
                          sx={{
                            bgcolor: "#d0d0d0",
                            borderRadius: 4,
                            height: 7,
                          }}
                          variant="determinate"
                          value={Math.ceil((ExcellentRatings/totalReviews)*100)}
                          color="success"
                        />
                      </Grid>
                      <Grid xs={2}>
                        <p className="opacity-50 p-2">{ExcellentRatings}</p>
                      </Grid>
                    </Grid>
                  </Box>
                  <Box>
                    <Grid
                      container
                      justifyContent="center"
                      alignItems="center"
                      gap={2}
                    >
                      <Grid xs={2}>
                        <p className="p-0">Very Good</p>
                      </Grid>
                      <Grid xs={7}>
                        <LinearProgress
                          className=""
                          sx={{
                            bgcolor: "#d0d0d0",
                            borderRadius: 4,
                            height: 7,
                          }}
                          variant="determinate"
                          value={Math.ceil((GoodRatings/totalReviews)*100)}
                          color="success"
                        />
                      </Grid>
                      <Grid xs={2}>
                        <p className="opacity-50 p-2">{GoodRatings}</p>
                      </Grid>
                    </Grid>
                  </Box>
                  
                  <Box>
                    <Grid
                      container
                      justifyContent="center"
                      alignItems="center"
                      gap={2}
                    >
                      <Grid xs={2}>
                        <p className="p-0">Avarage</p>
                      </Grid>
                      <Grid xs={7}>
                        <LinearProgress
                          className=""
                          sx={{
                            bgcolor: "#d0d0d0",
                            borderRadius: 4,
                            height: 7,
                            "& .MuiLinearProgress-bar": {
                              bgcolor: "#885c0a", // stroke color
                            },
                          }}
                          variant="determinate"
                          value={Math.ceil((AverageRatings/totalReviews)*100)}
                          color="success"
                        />
                      </Grid>
                      <Grid xs={2}>
                        <p className="opacity-50 p-2">{AverageRatings}</p>
                      </Grid>
                    </Grid>
                  </Box>
                  <Box>
                    <Grid
                      container
                      justifyContent="center"
                      alignItems="center"
                      gap={2}
                    >
                      <Grid xs={2}>
                        <p className="p-0">Poor</p>
                      </Grid>
                      <Grid xs={7}>
                        <LinearProgress
                          className=""
                          sx={{
                            bgcolor: "#d0d0d0",
                            borderRadius: 4,
                            height: 7,
                          }}
                          variant="determinate"
                          value={Math.ceil((BadRatings/totalReviews)*100)}
                          color="error"
                        />
                      </Grid>
                      <Grid xs={2}>
                        <p className="opacity-50 p-2">{BadRatings}</p>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </div>
          </section>

          {/* similer product */}
          {/* <section className=" pt-10">
          <h1 className="py-5 text-xl font-bold">Similer Products</h1>
          <div className="flex flex-wrap space-y-5">
            {gounsPage1.map((item) => (
              <HomeProductCard product={item} />
            ))}
          </div>
        </section> */}
        </div>
      </div>
    </>
  );
}
