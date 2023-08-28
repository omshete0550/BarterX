import React from "react";
import { Menu, MenuItem, MenuButton, SubMenu } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import { FaUser } from "react-icons/fa";

const AccountMenu = () => {
  return (
    <Menu  menuButton={<MenuButton style={{ fontSize: '1.8rem', marginLeft: '1em', color: '#777' }}><FaUser /></MenuButton>} >
      <MenuItem>Your Profile</MenuItem>
      <MenuItem>Trade History</MenuItem>
      <MenuItem>Chat</MenuItem>
      <MenuItem>Logout</MenuItem>
    </Menu>
  );
};

export default AccountMenu;
