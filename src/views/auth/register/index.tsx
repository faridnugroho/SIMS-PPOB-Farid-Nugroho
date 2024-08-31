import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Grid from '@mui/material/Grid2';
import Image from "next/image";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import { useRouter } from 'next/router';

const RegisterView = () => {
  const { push } = useRouter()

  const handleClickLogin = () => {
    push('/auth/login')
  }

  return (
    <>
      <Grid container height={'100vh'}>
        <Grid size={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', paddingX: '4rem' }}>
          <Box display='flex' alignItems={'center'} marginBottom={'2rem'}>
            <Image alt='icon-sims-ppob' width={20} height={20} src={'/assets/logo.png'} />
            <Typography fontWeight={'bold'}>SIMS PPOB</Typography>
          </Box>

          <Typography fontSize={25} fontWeight={'bold'} textAlign={'center'} marginBottom={'2.5rem'}>Lengkapi data untuk membuat akun</Typography>

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
              placeholder="nama depan"
              slotProps={{
                input: {
                  startAdornment: <InputAdornment position="start"><PersonOutlinedIcon /></InputAdornment>,
                },
              }}
            />

            <TextField
              autoComplete='off'
              fullWidth
              placeholder="nama belakang"
              slotProps={{
                input: {
                  startAdornment: <InputAdornment position="start"><PersonOutlinedIcon /></InputAdornment>,
                },
              }}
            />

            <TextField
              autoComplete='off'
              fullWidth
              placeholder="buat password"
              slotProps={{
                input: {
                  startAdornment: <InputAdornment position="start"><LockOutlinedIcon fontSize="small" /></InputAdornment>,
                  endAdornment: <InputAdornment position="start"><VisibilityOutlinedIcon fontSize="small" /></InputAdornment>,
                },
              }}
            />

            <TextField
              autoComplete='off'
              fullWidth
              placeholder="konfirmasi password"
              slotProps={{
                input: {
                  startAdornment: <InputAdornment position="start"><LockOutlinedIcon fontSize="small" /></InputAdornment>,
                  endAdornment: <InputAdornment position="start"><VisibilityOutlinedIcon fontSize="small" /></InputAdornment>,
                },
              }}
            />
          </Box>

          <Button variant="contained" fullWidth sx={{ backgroundColor: '#f42619', textTransform: 'capitalize', marginBottom: '2rem' }} onClick={handleClickLogin}>Registrasi</Button>

          <Typography>sudah punya akun? login <span style={{ color: '#f42619', cursor: 'pointer' }} onClick={handleClickLogin}>di sini</span></Typography>
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

export default RegisterView