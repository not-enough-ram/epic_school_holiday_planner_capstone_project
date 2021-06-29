import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
import { ListUnorderedIcon } from "@primer/octicons-react";
import { StyledOcticon } from "@primer/components";
import { Link } from "react-router-dom";

export default function MainMenu() {
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
        <MenuItem onClick={handleClose} component={Link} to={"/holidays"}>
          Alle Ferien
        </MenuItem>
        <MenuItem onClick={handleClose} component={Link} to="/booked">
          Meine Buchungen
        </MenuItem>
        <MenuItem onClick={handleClose} component={Link} to={"/profile"}>
          Profil
        </MenuItem>
        <MenuItem onClick={handleClose} component={Link} to={"/"}>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}
