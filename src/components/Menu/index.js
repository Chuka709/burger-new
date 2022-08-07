import React, { useContext } from "react";
import css from "./style.module.css";
import MenuItem from "../MenuItem";
import UserContext from "../../context/UserContext";

const Menu = (props) => {
  const userContext = useContext(UserContext);
  return (
    <div>
      <ul className={css.Menu}>
        {userContext.state.userId ? (
          <>
            <MenuItem exact link="/">
              ШИНЭ ЗАХИАЛГА
            </MenuItem>
            <MenuItem link="/orders">ЗАХИАЛГА</MenuItem>
            <MenuItem link="/logout">ГАРАХ</MenuItem>
          </>
        ) : (
          <>
            <MenuItem link="/login">НЭВТРЭХ</MenuItem>
            <MenuItem link="/signup">БҮРТГҮҮЛЭХ</MenuItem>
          </>
        )}
      </ul>
    </div>
  );
};

export default Menu;
