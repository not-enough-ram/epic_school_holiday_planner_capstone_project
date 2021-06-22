import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
import { ListUnorderedIcon } from "@primer/octicons-react";
import { StyledOcticon } from "@primer/components";
import { NavLink, useHistory } from "react-router-dom";
import { Link } from "@material-ui/core";

export default function MainMenu() {
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [page, setPage] = useState("");
  const handleChange = (event, newPage) => {
    history.push(newPage);
    setPage(newPage);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls="fade-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <StyledOcticon icon={ListUnorderedIcon} size={32} mr={2} /> Menu
      </Button>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose}>
          <NavLink to={"/holidays"}>Alle Ferien</NavLink>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link>Meine Buchungen</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link>Profil</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link>Logout</Link>
        </MenuItem>
      </Menu>
    </div>
  );
}
