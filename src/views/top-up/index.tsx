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
import Card from '@mui/material/Card';

const TopUpView = () => {
  return (
    <Container maxWidth="xl">
      <HeaderSection />

      <Grid container marginBottom={4} spacing={1}>
        <Grid size={12}>
          <Typography fontSize='18px'>Silahkan masukan</Typography>
          <Typography fontSize='28px' fontWeight='bold'>Nominal Top Up</Typography>
        </Grid>
      </Grid>

      <Grid container marginBottom={4} spacing={2}>
        <Grid size={7}>
          <TextField
            size='small'
            autoComplete='off'
            fullWidth
            placeholder="masukkan nominal Top Up"
            sx={{ marginBottom: '1rem' }}
            slotProps={{
              input: {
                startAdornment: <InputAdornment position="start"><MoneyOutlinedIcon /></InputAdornment>,
              },
            }}
          />

          <Button
            fullWidth
            variant="contained"
            disabled
            sx={{
              backgroundColor: '#f42619',
              textTransform: 'capitalize',
              marginBottom: '2rem'
            }}
          >
            Top Up
          </Button>
        </Grid>

        <Grid size={5}>
          <Box display='flex' justifyContent='space-between' gap={2} marginBottom={2}>
            <Card sx={{ width: '100%', padding: '6px', border: '1px solid grey', boxShadow: 'none', textAlign: 'center' }}>
              <Typography>Rp10.000</Typography>
            </Card>
            <Card sx={{ width: '100%', padding: '6px', border: '1px solid grey', boxShadow: 'none', textAlign: 'center' }}>
              <Typography>Rp10.000</Typography>
            </Card>
            <Card sx={{ width: '100%', padding: '6px', border: '1px solid grey', boxShadow: 'none', textAlign: 'center' }}>
              <Typography>Rp10.000</Typography>
            </Card>
          </Box>
          <Box display='flex' justifyContent='space-between' gap={2}>
            <Card sx={{ width: '100%', padding: '6px', border: '1px solid grey', boxShadow: 'none', textAlign: 'center' }}>
              <Typography>Rp10.000</Typography>
            </Card>
            <Card sx={{ width: '100%', padding: '6px', border: '1px solid grey', boxShadow: 'none', textAlign: 'center' }}>
              <Typography>Rp10.000</Typography>
            </Card>
            <Card sx={{ width: '100%', padding: '6px', border: '1px solid grey', boxShadow: 'none', textAlign: 'center' }}>
              <Typography>Rp10.000</Typography>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default TopUpView