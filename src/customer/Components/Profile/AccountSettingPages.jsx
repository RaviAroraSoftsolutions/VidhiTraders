import React from "react";
import ProfileInfo from "./component/ProfileInfo";
import AddressInfo from "./component/AdressInfo";

const AccountSettingPages = ({
  userData,
  selectedSetting,
  handleChange,
  
}) => {
    const jwt=localStorage.getItem("jwt");
  const AccountPages = [
    {
      key: "profileInfo",
      component: (
        <ProfileInfo userData={userData} handleChange={handleChange} jwt={jwt} />
      ),
    },
    { key: "addressInfo", component: <AddressInfo userData={userData} jwt={jwt} /> },
  ];
  console.log({selectedSetting})
  return <div>
    {AccountPages.map(page=>page?.key===selectedSetting &&page.component)}
  </div>;
};

export default AccountSettingPages;
