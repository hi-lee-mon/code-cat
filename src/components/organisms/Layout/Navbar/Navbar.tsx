import { Divider, Drawer, List, ListItem } from '@mui/material';
import { Box } from '@mui/system';
import { useSetNavbarState } from '../../../../hooks/useNavbar/useSetNavbarState';
import { useNavbar } from '../../../../hooks/useNavbar/useNavbar';
import { Link, useNavigate } from 'react-router-dom';
import { links } from './links';
import { CustomDialog } from '../../../molecules/CustomDialog';
import { useDialog } from '../../../../hooks/useDialog';
import { logout } from '../../../../firebase/auth';
import { useOpenSnackbar } from '../../../../hooks/useSetSnackbarState';
import { SEVERITY } from '../../../../constants/constants';

export const Navbar = () => {
  const closeNavbar = useSetNavbarState()["closeNavbar"];
  const isNavbarOpen = useNavbar();
  const [isDialogOpen, logoutDialog] = useDialog()
  const navigate = useNavigate();
  const { openSnackbar } = useOpenSnackbar();

  const handleLogout = async () => {
    try {
      await logout();
      logoutDialog.close();
      closeNavbar();
      navigate("/login")
    } catch (e) {
      const error = e as Error
      openSnackbar(error.message, SEVERITY.ERROR);
    }

  }
  return (
    <Drawer open={isNavbarOpen} onClose={closeNavbar}>
      <Box sx={{ width: 250 }} role="presentation">
        <List>
          {links.map((link) => (
            <ListItem button key={link.title} component={Link} to={link.to} onClick={closeNavbar}>
              {link.title}
            </ListItem>
          ))}
          <Divider sx={{ my: 2 }} />
          <ListItem button onClick={() => window.open("https://github.com/hi-lee-mon/code-cat", '_blank')}>
            GitHub
          </ListItem>
          <ListItem button onClick={logoutDialog.open}>
            ログアウト
          </ListItem>
        </List>
      </Box>
      <CustomDialog open={isDialogOpen} closeDialog={logoutDialog.close} positive={handleLogout} display={{ title: "ログアウト", text: "ログアウトしますか？" }} />
    </Drawer >
  )
}


