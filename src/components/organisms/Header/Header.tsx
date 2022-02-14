import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import LogoutIcon from '@mui/icons-material/Logout';
import { Box } from '@mui/system';
import { useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../../../firebase/auth';
import { CustomDialog } from '../../molecules/CustomDialog';
import { useDialog } from '../../../hooks/useDialog';
import GitHubIcon from '@mui/icons-material/GitHub';
import { getCurrentLocationName } from './getCurrentLocationName';
import { SEVERITY } from '../../../constants/constants';
import { useOpenSnackbar } from '../../../hooks/useSetSnackbarState';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { useSetRecoilState } from 'recoil';
import { themeState } from '../../../globalState/themeState';



const Header = () => {
  const [isOpen, { close, open }] = useDialog()
  const loaction = useLocation();
  const { openBar } = useOpenSnackbar();
  const setTheme = useSetRecoilState(themeState);

  const navigate = useNavigate();
  const handleLogout = async () => {
    await logout();
    close();
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
            onClick={() => openBar("ELDEN RING 2月25日 発売", SEVERITY.SUCCESS)}
          ><LunchDiningIcon />
          </IconButton>
          {/* TODO:ヘッダーをグローバルなstateにする */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {
              getCurrentLocationName(loaction.pathname)
            }
          </Typography>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setTheme((prev) => !prev)}
            sx={{ mr: 2 }}
          ><Brightness4Icon />
          </IconButton>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => window.open("https://github.com/hi-lee-mon/code-cat", '_blank')}
            sx={{ mr: 2 }}
          ><GitHubIcon />
          </IconButton>
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
    </Box >
  )
};

export default Header;
