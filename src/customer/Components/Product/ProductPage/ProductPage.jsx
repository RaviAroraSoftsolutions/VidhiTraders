import React from "react";

import ProductCard from "../ProductCard/ProductCard";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findProducts } from "../../../../Redux/Customers/Product/Action";
import BackdropComponent from "../../BackDrop/Backdrop";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Images } from "../../../../assets/images";
import {
  Autocomplete,
  Pagination,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  getCategory,
  getCategoryById,
  getProductCategory,
  getSubCategory,
} from "../../../../Redux/Category/Action";
import {
  Category_level,
  DiscountPercentage,
  MaxPrice,
  MinPrice,
  SearchParmas,
} from "../../../../utils/utils";
import Sorting from "./components/Sorting";
import MultiRangeSlider, { ChangeResult } from "multi-range-slider-react";
import Checkbox from "../../Checkbox";
import { useRef } from "react";
import { GET_SUBCATEGORY_BY_ID_SUCCESS } from "../../../../Redux/Category/ActionTypes";
import Breadcrumbs from "../../../../Admin/componets/BreadCrumbs";

const ProductPage = () => {
  const [filterValue, setFilterValue] = useState({
    availability: "",
    category: "",
    sort: "",
    minPrice: 0,
    maxPrice: 100000,
    minDiscount: 0,
    searchTerm: "",
  });
  const [activeFilters, setActiveFilters] = useState([]);
  const [discountList, setDiscountList] = useState(DiscountPercentage);
  const { products, loading,totalCount } = useSelector((store) => store.customersProduct);
  const { auth, cart } = useSelector((store) => store);
  const {
    category: MainCategory,
    subcategory,
   
  } = useSelector((store) => store?.adminCategory);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // query
  const searchParams = new URLSearchParams(location.search);
  const availability = searchParams.get("availability");
  const sort = searchParams.get("sort");
  const page = searchParams.get("page") || 1;
  const price_range_from = searchParams.get("price_range.from");
  const price_range_to = searchParams.get("price_range.to");
  const discount = searchParams.get("discount");

  const handlePaginationChange = (event, value) => {
    searchParams.set("page", value);
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };

  // const [Loading,setLoading]=useState(false)
  const [productData, setProductData] = useState({
    topLavelCategory: "",
    secondLavelCategory: "",
    minPrice: 0,
    maxPrice: 10000,
  });
  const minPriceRef = useRef(productData?.minPrice);
  const maxPriceRef = useRef(productData?.maxPrice);
  const [isOpen, setIsOpen] = useState(false);
  const [isCatOpen, setIsCatOpen] = useState(true);
  const filters = [
    {
      name: `${
        price_range_from
          ? price_range_from +
            "-" +
            (price_range_to ||
              MaxPrice.find((price) => price?.value === 10000)?.title)
          : MinPrice.find((price) => !price.value).title +
              "-" +
              price_range_to ||
            MaxPrice.find((price) => price?.value === 10000)?.title
      }`,
      isActive: price_range_from || price_range_to,
      value: SearchParmas.PRICE_RANGE_FROM || SearchParmas.PRICE_RANGE_TO,
    },

    {
      name: `Discount-${
        DiscountPercentage.find(
          (dis) => Number(dis?.value) === Number(discount)
        )?.title
      }`,
      isActive: discount,
      value: SearchParmas.DISCOUNT,
    },
  ];

  useEffect(() => {
    // setFilterValue({ availability, category, sort })
    const data = {
      category: productData?.category || "",
      colors: [],
      sizes: [],
      minPrice:
        Number(
          MinPrice.find((data) => data.title === price_range_from)?.value
        ) || 0,
      maxPrice:
        Number(MaxPrice.find((data) => data.title === price_range_to)?.value) ||
        "",
      minDiscount: discount ||"",
      sort: sort || "price_low",
      pageNumber: page || 1,
      pageSize: 20,
      stock: availability,
      parent_category:productData?.parent_category||"",
      searchTerm: productData?.searchTerm || "",
    };

    let active_filters = filters.filter((data) => data?.isActive);
    setActiveFilters(active_filters);
    setProductData((data) => {
      return {
        ...data,
        minPrice: Number(
          MinPrice.find((data) => data.title === price_range_from)?.value || 0
        ),
        maxPrice: Number(
          MaxPrice.find((data) => data.title === price_range_to)?.value || 10000
        ),
      };
    });

    let updated_list = DiscountPercentage.map((dis) =>
      Number(dis?.value) === Number(discount) ? { ...dis, checked: true } : dis
    );

    setDiscountList(updated_list);
    dispatch(findProducts(data));
  }, [
    availability,
    productData?.secondLavelCategory,
    sort,
    page,
    products.deleteProduct,
    price_range_from,
    price_range_to,
    discount,
    
    productData?.parent_category,
    productData?.category
  ]);
  useEffect(() => {
    let data2 = {
      level: Category_level?.TOP,
      pageNumber: 1,
      pageSize: 0,
      searchTerm:""
    };
    dispatch(getCategory(data2));
  }, []);

  const handleSetSearchParams = (filter, value) => {
    searchParams.set(filter, value);
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };
  const handleRemoveSearchParams = (filter) => {
    if (filter === SearchParmas?.PRICE_RANGE_FROM) {
      searchParams.delete(SearchParmas?.PRICE_RANGE_FROM);
      searchParams.delete(SearchParmas?.PRICE_RANGE_TO);
    } else {
      searchParams.delete(filter);
    }
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };
  const handleRangeInput = (e) => {
    console.log(e, minPriceRef.current, maxPriceRef?.current);
    if (e?.minValue !== minPriceRef?.current) {
      handleSetSearchParams(
        SearchParmas.PRICE_RANGE_FROM,
        MinPrice.find((data) => data?.value === Number(e?.minValue)).title
      );
      return (minPriceRef.current = e?.minValue);
    }
    if (e?.maxValue !== maxPriceRef?.current) {
      handleSetSearchParams(
        SearchParmas.PRICE_RANGE_TO,
        MaxPrice.find((data) => data?.value === Number(e?.maxValue)).title
      );
      return (maxPriceRef.current = e?.maxValue);
    }
  };
  const handleCatSelect = (e, valueAssociate) => {
    dispatch({
      type: GET_SUBCATEGORY_BY_ID_SUCCESS,
      payload: [],
    });
    handleChange(e, valueAssociate);
    dispatch(
      getCategoryById({
        parentCatId: e?.target?.value,
        level: Category_level?.SECONDARY,
      })
    );
  };
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
  const handleChange = (e, valueAssociate) => {
    const { name, value } = e?.target;
    console.log(name, value);
    if (name === "parent_category" || name === "category") {
      return setProductData((pData) => ({
        ...pData,
        [name]: value,
        // searchTerm:name==="category"?"": valueAssociate,
        // category:name==="parent_category"?"":value
      }));
    }

    setProductData((pData) => ({ ...pData, [name]: value }));
  };
  return (
    <>
      <BackdropComponent open={loading} />
      <BackdropComponent open={cart?.loading} />
      <div className="px-3 pt-1 bg-slate-100">
       

        {/* <div className="flex justify-between gap-9 py-5 bg-white">
          <p className="font-bold basis-1/5  ">Filter</p>
          <div className="flex basis-4/5 justify-between items-center pr-2  ">
           

            
          </div>
        </div> */}

        {/* bottom part */}
        <div className="grid grid-cols-9 gap-2 mt-4 justify-between  ">
          {/* filter */}

          <div className="col-span-2 bg-white px-6 py-3">
            {/* {activeFilters && activeFilters?.length >= 0 && (
              <>
                <p className="font-bold text-sm">Filters</p>
                <div className="flex gap-2 flex-wrap">
                  {activeFilters.map((data) => (
                    <div className="px-2 py-1 bg-slate-400 text-sm flex justify-center items-center ">
                      <span
                        onClick={() => handleRemoveSearchParams(data?.value)}
                        className="px-1 hover:rounded-full  hover:bg-slate-600 pb-1 hover:cursor-pointer"
                      >
                        <CloseIcon fontSize="12" />
                      </span>
                      <span className="ml-1 text-xs">{data?.name}</span>
                    </div>
                  ))}
                </div>
              </>
            )} */}
             <div className="w-full  my-2">
              <div
                onClick={() => setIsCatOpen(!isCatOpen)}
                className="w-full flex justify-between items-center py-2 hover:cursor-pointer  mt-3"
              >
                <span>All Categories</span>
                <span
                  className={`transition ${
                    isCatOpen ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <ExpandMoreIcon fontSize="medium" />
                </span>
              </div>
              {isCatOpen &&
                MainCategory.map((cat) => (
                  <>
                    <Checkbox
                      name="parent_category"
                      key={cat?._id}
                      checked={productData?.parent_category === cat?._id}
                      value={cat?._id}
                      title={capitalizeFirstLetter(cat?.name)}
                      onChange={handleCatSelect}
                    />
                    {productData?.parent_category === cat?._id &&
                      subcategory?.length > 0 && (
                        <div className={`-mt-1 ml-11  text-gray-800 space-y-1 `}>
                          {subcategory.map((subCat) => (
                            <p
                              onClick={() =>
                                handleChange(
                                  {
                                    target: {
                                      name: "category",
                                      value: subCat?._id,
                                    },
                                  },
                                  subCat?.name
                                )
                              }
                              className={`text-xs mb-1 hover:cursor-pointer hover:underline ${
                                productData?.category === subCat?._id &&
                                "underline font-medium"
                              } `}
                            >
                              {capitalizeFirstLetter(subCat?.name)}
                            </p>
                          ))}
                        </div>
                      )}
                  </>
                ))}
            </div>
            <div className="relative ">
              <label className="mb-3">Price</label>
              <div className="_1nneZ0 relative h-max w-full flex items-end">
                <div className="_2TbXIJ h-3 w-full"></div>
                <div className="_2TbXIJ h-4 w-full"></div>
                <div className="_2TbXIJ h-6 w-full"></div>
                <div className="_2TbXIJ h-5 w-full"></div>
                <div className="_2TbXIJ h-1 w-full"></div>
              </div>
              <MultiRangeSlider
                min={0}
                max={10000}
                minValue={productData?.minPrice}
                maxValue={productData?.maxPrice}
                step={1000}
                label={false}
                ruler={false}
                barInnerColor="#00308F"
                className="border-none"
                // labels={[...MinPrice.map(price=>price?.value)]}
                stepOnly={true}
                onChange={(e) => {
                  handleRangeInput(e);
                }}
              />
              {/* <MultiRangeSlider min={0} max={60000} onChange={(e)=>handleRangeInput(e)} /> */}
              <div className="flex items-center justify-between mt-3">
                <select
                  id="countries"
                  name="minPrice"
                  value={productData?.minPrice}
                  onChange={(e) => {
                    setProductData((prevState) => {
                      return {
                        ...prevState,
                        [e?.target?.name]: e?.target?.value,
                      };
                    });
                    handleSetSearchParams(
                      SearchParmas.PRICE_RANGE_FROM,
                      MinPrice.find(
                        (data) => data?.value === Number(e?.target?.value)
                      ).title
                    );
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  {MinPrice.map((data) => (
                    <option value={data?.value}>{data?.title}</option>
                  ))}
                </select>
                <p className="text-sm mx-2">to</p>
                <select
                  id="countries"
                  value={productData?.maxPrice}
                  name="maxPrice"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e) => {
                    setProductData((prevState) => {
                      return {
                        ...prevState,
                        [e?.target?.name]: e?.target?.value,
                      };
                    });
                    handleSetSearchParams(
                      SearchParmas.PRICE_RANGE_TO,
                      MaxPrice.find(
                        (data) => data?.value === Number(e?.target?.value)
                      ).title
                    );
                  }}
                >
                  {MaxPrice.filter(
                    (data) => data?.value > Number(productData?.minPrice)
                  ).map((data) => (
                    <option value={data?.value}>{data?.title}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="w-full  mt-2">
              <div
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center py-2 hover:cursor-pointer  mt-3"
              >
                <span>Discount</span>
                <span
                  className={`transition ${isOpen ? "rotate-180" : "rotate-0"}`}
                >
                  <ExpandMoreIcon fontSize="medium" />
                </span>
              </div>
              {isOpen &&
                discountList.map((discount) => (
                  <Checkbox
                    key={discount?.title}
                    name="discount"
                    checked={Number(productData?.discount) === discount?.value}
                    value={discount?.value}
                    title={discount?.title}
                    onChange={handleChange}
                  />
                ))}
            </div>
           
          </div>
          {/* product */}

          <div className="col-span-7 bg-white p-3 px-4">
            
            <Breadcrumbs/>
            
          {MainCategory.find(cat=>cat?._id===productData?.parent_category)?.description &&<p className="text-xs text-slate-400 py-1 ">{MainCategory.find(cat=>cat?._id===productData?.parent_category)?.description}</p>}
          <Sorting searchParams={searchParams} sort={sort} navigate={navigate} />
            <div className="w-full border-t">
              {products?.length > 0 ? (
                <div className="grid xs:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 p-5 ">
                  {products?.map((item) => (
                    <ProductCard key={item?._id} product={item} />
                  ))}
                </div>
              ) : (
                <div className="grid w-full h-[70dvh] place-items-center ">
                  {!loading && (
                    <img
                      className="mx-auto"
                      src={Images.NO_PRODUCT_FOUND}
                      alt="no-product-found"
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mx-auto px-4 py-5 flex justify-center shadow-lg rounded-md">
          <Pagination
            className="py-5 w-auto"
            size="large"
            count={Math.ceil(totalCount/20)}
            page={Number(page)}
            color="primary"
            onChange={handlePaginationChange}
          />
        </div>
      </div>
    </>
  );
};

export default ProductPage;
