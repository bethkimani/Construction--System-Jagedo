import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AppBar, Toolbar, Button, Menu, MenuItem, Typography, Avatar } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleLogout = () => {
    logout();
    navigate('/login');
    handleMenuClose();
  };

  return (
    <AppBar position="static" className="bg-blue-600">
      <Toolbar>
        <Typography variant="h6" className="flex-grow">
          Healthcare System
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        {user?.user_type === 'doctor' && (
          <Button color="inherit" component={Link} to="/doctor-availability">
            Availability
          </Button>
        )}
        {user?.user_type === 'doctor' && (
          <Button color="inherit" component={Link} to="/appointments">
            Appointments
          </Button>
        )}
        {user?.user_type === 'patient' && (
          <Button color="inherit" component={Link} to="/doctors">
            Doctors
          </Button>
        )}
        <Button color="inherit" onClick={handleMenuOpen}>
          <span className="mr-2">Welcome, {user?.user_type}</span>
          <Avatar>
            <PersonIcon />
          </Avatar>
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem component={Link} to="/profile" onClick={handleMenuClose}>
            Edit Profile
          </MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;