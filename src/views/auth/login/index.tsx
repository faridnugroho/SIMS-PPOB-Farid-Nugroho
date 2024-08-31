import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Grid from '@mui/material/Grid2';
import Image from "next/image";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useRouter } from 'next/router';

const LoginView = () => {
  const { push } = useRouter()

  const handleClickRegister = () => {
    push('/auth/register')
  }

  const handleClickLogin = () => {
    push('/')
  }

  return (
    <>
      <Grid container height={'100vh'}>
        <Grid size={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', paddingX: '4rem' }}>
          <Box display='flex' alignItems={'center'} marginBottom={'2rem'}>
            <Image alt='icon-sims-ppob' width={20} height={20} src={'/assets/logo.png'} />
            <Typography fontWeight={'bold'}>SIMS PPOB</Typography>
          </Box>

          <Typography fontSize={25} fontWeight={'bold'} textAlign={'center'} marginBottom={'2.5rem'}>Masuk atau buat akun untuk memulai</Typography>

          <Box display='flex' flexDirection={'column'} gap={4} width={'100%'} marginBottom={'2.5rem'}>
            <TextField
              autoComplete='off'
              fullWidth
              placeholder="masukkan email anda"
              slotProps={{
                input: {
                  startAdornment: <InputAdornment position="start">@</InputAdornment>,
                },
              }}
            />

            <TextField
              autoComplete='off'
              fullWidth
              placeholder="masukkan password anda"
              slotProps={{
                input: {
                  startAdornment: <InputAdornment position="start"><LockOutlinedIcon fontSize="small" /></InputAdornment>,
                  endAdornment: <InputAdornment position="start"><VisibilityOutlinedIcon fontSize="small" /></InputAdornment>,
                },
              }}
            />
          </Box>

          <Button variant="contained" fullWidth sx={{ backgroundColor: '#f42619', textTransform: 'capitalize', marginBottom: '2rem' }} onClick={handleClickLogin}>Masuk</Button>

          <Typography>belum punya akun? register <span style={{ color: '#f42619', cursor: 'pointer' }} onClick={handleClickRegister}>di sini</span></Typography>
        </Grid>

        <Grid size={6} sx={{ backgroundColor: '#fff1f0', display: 'flex', justifyContent: 'end' }}>
          <Box
            component={'img'}
            src={'/assets/illustration-login.png'}
            height={'100vh'}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default LoginView