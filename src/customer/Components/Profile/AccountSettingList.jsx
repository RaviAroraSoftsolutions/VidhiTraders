import React from "react";
import { AccountSetting } from "../../../utils/utils";

const AccountSettingList = ({ handleSelect, selectedSetting }) => {
  return (
    <div className="">
      {AccountSetting.map((sett) => (
        <p
          key={sett?.key}
          onClick={() => handleSelect(sett)}
          className={`${
            selectedSetting === sett?.key ? "text-blue-500" : ""
          } py-2`}
        >
          {sett?.name}
        </p>
      ))}
    </div>
  );
};

export default AccountSettingList;
