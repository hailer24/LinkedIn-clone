import React from "react";
import "./HeaderOptions.css";
import { Avatar } from "@material-ui/core";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";

function HeaderOptions({ avatar, Icon, title, onClick }) {
  const user = useSelector(selectUser);
  return (
    <div className="headerOption" onClick={onClick}>
      {Icon && <Icon className="headerOptions_icon" />}
      {avatar && (
        <Avatar className="headerOptions_icon" src={user.photoUrl}>
          {user.email[0]}
        </Avatar>
      )}
      <h3 className="headerOptions_title">{title}</h3>
    </div>
  );
}

export default HeaderOptions;
