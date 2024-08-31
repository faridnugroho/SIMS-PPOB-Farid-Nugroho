/* eslint-disable @next/next/no-img-element */

import Image from 'next/image';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import MoneyOutlinedIcon from '@mui/icons-material/MoneyOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import HeaderSection from '@/components/layouts/HeaderSection';

const PurchaseView = () => {
  return (
    <Container maxWidth="xl">
      <HeaderSection />

      <Grid container marginBottom={4} spacing={1}>
        <Grid size={12}>
          <Typography fontSize='18px'>Pembayaran</Typography>
        </Grid>

        <Box display='flex' gap={1}>
          <Image alt='icon-sims-ppob' width={20} height={20} src={'/assets/Listrik.png'} />
          <Typography fontSize='18px' fontWeight='bold'>Listrik Prabayar</Typography>
        </Box>
      </Grid>

      <Grid container marginBottom={4} spacing={2}>
        <TextField
          size='small'
          autoComplete='off'
          fullWidth
          placeholder="masukkan email anda"
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start"><MoneyOutlinedIcon /></InputAdornment>,
            },
          }}
        />

        <Button variant="contained" fullWidth sx={{ backgroundColor: '#f42619', textTransform: 'capitalize', marginBottom: '2rem' }}>Bayar</Button>
      </Grid>
    </Container>
  )
}

export default PurchaseView