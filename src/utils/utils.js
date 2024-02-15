export const Category_level = { TOP: 1, SECONDARY: 2, THIRD: 3 };
export const SearchParmas = {
  CATEGORY: "category",
  PARENT_CATEGORY: "parent_category",
  SORT: "sort",
  PRICE_RANGE_FROM: "price_range.from",
  PRICE_RANGE_TO: "price_range.to",
  DISCOUNT: "discount",
};
export const MinPrice = [
  { title: "Min", value: 0 },
  // {title:"₹250",value:250},
  // {title:"₹500",value:500},
  { title: "₹1000", value: 1000 },
  { title: "₹2000", value: 2000 },
  { title: "₹3000", value: 3000 },
  { title: "₹4000", value: 4000 },
  { title: "₹5000", value: 5000 },
  { title: "₹6000", value: 6000 },
  { title: "₹7000", value: 7000 },
  { title: "₹8000", value: 8000 },
  { title: "₹9000", value: 9000 },
];
export const MaxPrice = [
  { title: "₹1000", value: 1000 },
  { title: "₹2000", value: 2000 },
  { title: "₹3000", value: 3000 },
  { title: "₹4000", value: 4000 },
  { title: "₹5000", value: 5000 },
  { title: "₹6000", value: 6000 },
  { title: "₹7000", value: 7000 },
  { title: "₹8000", value: 8000 },
  { title: "₹9000", value: 9000 },
  { title: "₹10000", value: 10000 },
];
export const DiscountPercentage = [
  { title: "50% or more", checked: false, value: 50 },
  { title: "40% or more", checked: false, value: 40 },
  { title: "30% or more", checked: false, value: 30 },
  { title: "20% or more", checked: false, value: 20 },
  { title: "10% or more", checked: false, value: 10 },
];
export const UserType = {
  CUSTOMER: "CUSTOMER",
  ADMIN: "ADMIN",
};
export const OrderStatus = {
  PENDING: "PENDING",
  PLACED: "PLACED",
  COMPLETED: "COMPLETED",
  CONFIRMED: "CONFIRMED",
  SHIPPED: "SHIPPED",
  DELIVERED: "DELIVERED",
  CANCELLED: "CANCELLED",
};
export function capitalizeFirstLetter(string) {
  console.log(string);
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
export const AccountSetting=[
  {name:"Profile Information",key:"profileInfo",isActive:false},
  {name:"Manage Address",key:"addressInfo",isActive:false},
]
export const mobileRegex=/^(\+\d{1,3}[- ]?)?\d{10}$/
export const alphabetRegex=/^[aA-zZ\s]+$/
export const image_extensions = ["jpg", "jpeg", "png", "gif", "tiff", "bmp", "webp"]
export const video_extensions = ['mp4', 'mkv', 'avi', 'mov', 'flv', 'wmv', '3gp', 'ogg', 'webm'] 