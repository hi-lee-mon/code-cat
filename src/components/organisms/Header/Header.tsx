import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import LogoutIcon from '@mui/icons-material/Logout';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../firebase/auth';
import { CustomDialog } from '../Common/CustomDialog';
import { useDialog } from '../../../hooks/useDialog';

const Header = () => {
  const { isOpen, close, open } = useDialog()

  const navigate = useNavigate();
  const handleLogout = async () => {
    await logout();
    navigate("/login")
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ><LunchDiningIcon />
          </IconButton>
          {/* TODO:ヘッダーをグローバルなstateにする */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            図書管理画面（登録）
          </Typography>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={open}
            sx={{ mr: 2 }}
          ><LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <CustomDialog open={isOpen} closeDialog={close} positive={handleLogout} display={{ title: "ログアウト", text: "ログアウトしますか？" }} />
    </Box>
  )
};

export default Header;
