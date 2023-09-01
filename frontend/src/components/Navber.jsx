import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MoreIcon from '@mui/icons-material/MoreVert';
import jwt_decode from 'jwt-decode'
import {GoogleLogin} from '@react-oauth/google'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function Navber({setSearchterm,searchTerm}) {
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();

  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const responseGoogle = (response) => {
    console.log(response)
    const userResponse = jwt_decode(response.credential);
    const { name, sub, picture } = userResponse;
    localStorage.setItem('user', JSON.stringify(userResponse));
   console.log(name,sub,picture)
   window.location.reload()
};

//google auth users
const userinfo =localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear()

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
            <MenuItem className=' gap-2' onClick={()=>{
            setAnchorEl(null);
            handleMobileMenuClose();
            navigate('/')
      }}>
        <DashboardIcon className=' text-purple-950'/>
                  <p>DashBord</p>
                </MenuItem>
      <MenuItem onClick={handleMenuClose}>{userinfo?.name || 'Profile'}</MenuItem>
      <MenuItem onClick={()=>{
          localStorage.clear()
          setAnchorEl(null);
          handleMobileMenuClose()
          window.location.reload()
          }}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >

{ userinfo &&  <MenuItem className=' flex justify-start flex-1' onClick={handleProfileMenuOpen}>
      { userinfo && 
            <img className=' w-[25px] h-[25px] rounded-full' src={userinfo?.picture ||'https://www.pngkey.com/png/full/72-729716_user-avatar-png-graphic-free-download-icon.png'} alt="" />
            }
        <p className=' ml-2'>Profile</p>
      </MenuItem>}
      <MenuItem className=' gap-2' onClick={()=>{
            setAnchorEl(null);
            handleMobileMenuClose();
            navigate('/')
      }}>
        <DashboardIcon className=' text-purple-950'/>
                  <p>DashBord</p>
                </MenuItem>
{ !userinfo &&  <MenuItem >
      { !userinfo && <GoogleLogin 
    size='small'
    text='continue_with'
    theme='filled_blue'
    shape='circle'
    onSuccess={responseGoogle}
    cookiePolicy="single_host_origin"
    onError={(res)=>{
      console.log(res)
    }}
    />}
    </MenuItem>}
    </Menu>
  );

  return (
    <GoogleOAuthProvider  clientId='Your client id here'>
    <Box  sx={{ flexGrow: 1 }}>
      <AppBar sx={{background:'white',borderBottom:'2px solid #d7d4d9'}} position="static">
        <Toolbar className=' flex justify-between'>
          <div className=' flex '>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2,color:'#4c0569' }}
          >
            <MenuIcon />
          </IconButton>
          <img onClick={()=>navigate('/')} className='  transition-all duration-200 hover:animate-[spin_0.9s] cursor-pointer' src="https://www.gstatic.com/images/branding/product/1x/forms_2020q4_48dp.png" alt="" />
          <p className=' w-[70px] md:flex hidden truncate font-bold text-fuchsia-950 text-2xl cursor-pointer mt-[6px]'>
            Forms
          </p>
          </div>
          <form  onSubmit={()=>navigate(`/search/${searchTerm}`)} >
          <Search sx={{borderRadius:'20px'}} className=' bg-slate-200 rounded-md '>
            <SearchIconWrapper  className=' bg-slate-200 text-gray-900 rounded-md '>
              <SearchIcon className=' text-slate-950 z-50' />
            </SearchIconWrapper>
            <StyledInputBase
           
             onChange={(e)=>setSearchterm(e.target.value)} sx={{color:'black',width:{lg:'550px',md:'400px',sm:'380px',xs:'100%'}}} className=' bg-slate-200 rounded-md shadow-md placeholder:text-slate-900 text-indigo-950'
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          </form>

          <Box sx={{ display: { xs: 'none', md: 'flex',mb:1 } }}>
{ !userinfo && <GoogleLogin 
    size='large'
    text='continue_with'
    theme='filled_blue'
    onSuccess={responseGoogle}
    cookiePolicy="single_host_origin"
    onError={(res)=>{
      console.log(res)
    }}
    />}
  
{ userinfo && <IconButton sx={{height:'45px',width:'45px',mt:'9px'}}
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
             <img className=' w-[25px]' src="https://cdn.icon-icons.com/icons2/1129/PNG/512/buttonsymbolofninedots_80014.png" alt="" />
            </IconButton>}
            { userinfo && <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
            <img className=' w-[40px] h-[40px] rounded-full' src={userinfo?.picture ||'https://www.pngkey.com/png/full/72-729716_user-avatar-png-graphic-free-download-icon.png'} alt="" />
            </IconButton>}
          
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
             <img className=' w-[15px] mb-1' src="https://cdn.icon-icons.com/icons2/1129/PNG/512/buttonsymbolofninedots_80014.png" alt="" />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
    </GoogleOAuthProvider>
  );
}
