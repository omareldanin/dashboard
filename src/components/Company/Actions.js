import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import useTranslate from "../../hooks/useTranslate";
import { Link } from "react-router-dom";
export default function LongMenu(props) {
  const { t } = useTranslate();
  const ITEM_HEIGHT = 48;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "10ch",
          },
        }}
      >
        <MenuItem
          key="details"
          selected={"details" === "Pyxis"}
          onClick={handleClose}
        >
          <Link to={`/companies/details/${props.id}`}>{t("details")}</Link>
        </MenuItem>
        <MenuItem
          key="edit"
          selected={"edit" === "Pyxis"}
          onClick={handleClose}
        >
          <Link to={`/companies/edit/${props.id}`}>{t("edit")}</Link>
        </MenuItem>
        <MenuItem
          key="delete"
          selected={"delete" === "Pyxis"}
          onClick={handleClose}
        >
          <Link
            to=""
            onClick={() => {
              props.openDelete(props.id);
            }}
          >
            {t("delete")}
          </Link>
        </MenuItem>
      </Menu>
    </div>
  );
}
