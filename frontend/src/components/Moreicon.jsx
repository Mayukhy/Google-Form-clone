import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteForm } from '../redux/action/forms';

function Moreicon({form,currentId,setCurrentId}) {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };


  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0,zIndex:9 }}>
                <MoreHorizIcon/>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
                <MenuItem  onClick={handleCloseUserMenu}>
                  <Typography onClick={(e)=>{
                    e.preventDefault()
                  setCurrentId(form?._id)
                  navigate('/form')  
                  }
                  } textAlign="center"><EditIcon className=' mr-2 mt-[-5px] text-purple-800'/>Edit</Typography>
                </MenuItem>
                <MenuItem onClick={()=>{
                    dispatch(deleteForm(form?._id))
                    setAnchorElUser(null);
                  }
                  }>
                  <Typography  textAlign="center"><DeleteForeverIcon  className=' mr-2 mt-[-5px] text-red-400' />
                  Delete</Typography>
                </MenuItem>
            </Menu>
          </Box>

  );
}
export default Moreicon;
