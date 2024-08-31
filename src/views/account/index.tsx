import Image from "next/image";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';

const AccountView = () => {
  return (
    <Container maxWidth="xl">
      <Grid container justifyContent='center'>
        <Grid size={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <Image alt='icon-sims-ppob' width={120} height={120} style={{ marginBottom: '10px' }} src={'/assets/profile-photo.png'} />

          <Typography fontSize={28} fontWeight={'bold'} textAlign={'center'} marginBottom={'2.5rem'}>Kristanto Wibowo</Typography>

          <Box display='flex' flexDirection={'column'} gap={4} width={'100%'} marginBottom={'2.5rem'}>
            <FormControl>
              <Typography>Email</Typography>
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
            </FormControl>

            <FormControl>
              <Typography>Nama Depan</Typography>
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
            </FormControl>

            <FormControl>
              <Typography>Nama Belakang</Typography>
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
            </FormControl>
          </Box>

          <Button variant="contained" fullWidth sx={{ backgroundColor: '#f42619', textTransform: 'capitalize', marginBottom: '2rem' }}>Edit Profil</Button>

          <Button variant="outlined" fullWidth sx={{ textTransform: 'capitalize', marginBottom: '2rem', borderColor: '#f42619', color: '#f42619' }}>Logout</Button>
        </Grid>
      </Grid>
    </Container>
  )
}

export default AccountView