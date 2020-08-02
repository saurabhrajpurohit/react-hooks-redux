import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import RestoreIcon from '@material-ui/icons/Restore';
import VisibilityIcon from '@material-ui/icons/Visibility';
import MenuIcon from '@material-ui/icons/Menu';
import { useSelector } from 'react-redux';
import { WATCHED_MOVIES, MY_LIST } from '../../redux/actions';
import { HeaderDesign } from './classes';

const useStyles = HeaderDesign;

export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const globalState = useSelector(state => state.state)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  /**
   * Mobile menu close method
   */
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  /**
   * Mobile menu open method
   */
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = 'primary-search-account-menu-mobile';

  /**
   * Renders menu for mobile screen
   */
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton color="inherit">
          <Badge badgeContent={Object.values(globalState[MY_LIST]).length} color="secondary">
            <RestoreIcon />
          </Badge>
        </IconButton>
        <p>Watch List</p>
      </MenuItem>
      <MenuItem>
        <IconButton color="inherit">
          <Badge badgeContent={Object.values(globalState[WATCHED_MOVIES]).length} color="secondary">
            <VisibilityIcon />
          </Badge>
        </IconButton>
        <p>Watched</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Movies
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton color="inherit">
              <Badge badgeContent={Object.values(globalState[MY_LIST]).length} color="secondary">
                <RestoreIcon />
              </Badge>
            </IconButton>
            <IconButton color="inherit">
              <Badge badgeContent={Object.values(globalState[WATCHED_MOVIES]).length} color="secondary">
                <VisibilityIcon />
              </Badge>
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </div>
  );
}
