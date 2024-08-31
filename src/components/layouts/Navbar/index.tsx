import Image from 'next/image';
import { useRouter } from 'next/router';
import * as React from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

type ListMenuType = {
  name: string
  pathname: string
}

const listMenu = [
  {
    name: 'Top Up',
    pathname: '/top-up'
  },
  {
    name: 'Transaction',
    pathname: '/transaction'
  },
  {
    name: 'Akun',
    pathname: '/account'
  },
]

const Navbar = () => {
  const { push } = useRouter()

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" sx={{ marginBottom: '2rem' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1, cursor: 'pointer' }} onClick={() => push('/')}>
            <Image
              alt='icon-sims-ppob'
              width={20}
              height={20}
              src={'/assets/logo.png'}
            />

            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              SIMS PPOB
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {listMenu.map((menu: ListMenuType, index: number) => (
                <MenuItem key={index} onClick={() => push(menu.pathname)}>
                  <Typography sx={{ textAlign: 'center' }}>{menu.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} onClick={() => push('/')}>
            <Image
              alt='icon-sims-ppob'
              width={20}
              height={20}
              src={'/assets/logo.png'}
            />

          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            onClick={() => push('/')}
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            SIMS PPOB
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
            {listMenu.map((menu: ListMenuType, index: number) => (
              <Button
                key={index}
                onClick={() => push(menu.pathname)}
                sx={{ my: 2, ml: 4, color: 'white', display: 'block', textTransform: 'capitalize' }}
              >
                {menu.name}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Navbar