import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ViewGridIcon } from "@heroicons/react/solid";

const NavLink = ({
  title,
  icon,
  menuList,
  draggable,
  href,
}) => {
  const [selected_category, setSelected_category] = useState("");

  // console.log(menuList)
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <Link
      to={{ pathname: href }}
      className="nav_link_container"
      onClick={() => {}}
    >
      <div
        className={`nav-link ${selected_category === title ? "active" : ""}`}
        draggable={draggable}
        onClick={() => menuList && setMenuVisible(!menuVisible)}
        onMouseLeave={(e) => setMenuVisible(false)}
        id={`item-category-${title?.toLowerCase()}`}
      >
        <>
          {icon}
          <p>
            {draggable && (
              <ViewGridIcon
                style={{
                  minWidth: "1rem",
                  maxWidth: "1rem",
                  marginRight: 10,
                  cursor: "move",
                }}
              />
            )}
            <span
              className={`nav_title ${
                window.location.pathname.includes("/page2") ? "page2" : ""
              }`}
            >
              {title?.slice(0, 31)}
              {title?.length > 32 && "..."}
            </span>
          </p>
        </>
        {/* Submenu popup*/}
        {menuList && (
          <div
            className="menu"
            style={{ display: menuVisible ? "block" : "none" }}
          >
            {menuList
              .filter((a) => a)
              .map((menu) => (
                <div
                  className="item"
                  key={Math.random()}
                  onClick={() => {
                    return menu.name;
                  }}
                >
                  <Link to={menu.link}>{menu.name}</Link>
                </div>
              ))}
          </div>
        )}
      </div>
    </Link>
  );
};

export default NavLink;
