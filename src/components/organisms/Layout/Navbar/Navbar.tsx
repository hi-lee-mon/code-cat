import { Divider, Drawer, List, ListItem } from '@mui/material';
import { Box } from '@mui/system';
import { useSetNavbar } from '../../../../hooks/useNavbar/useSetNavbar';
import { useNavbar } from '../../../../hooks/useNavbar/useNavbar';
import { Link } from 'react-router-dom';
import { links } from './links';

export const Navbar = () => {
  const closeNavbar = useSetNavbar()["closeNavbar"];
  const isOpen = useNavbar();
  return (
    <Drawer open={isOpen} onClose={closeNavbar}>
      <Box sx={{ width: 250 }} role="presentation">
        <List>
          {links.map((link) => (
            <ListItem button key={link.title} component={Link} to={link.to} onClick={closeNavbar}>
              {link.title}
            </ListItem>
          ))}
        </List>
        <Divider />
      </Box>
    </Drawer>
  )
}


