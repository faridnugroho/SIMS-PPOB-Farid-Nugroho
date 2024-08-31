import Image from 'next/image';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

const HeaderSection = () => {
  return (
    <Grid container marginBottom={4}>
      <Grid size={4}>
        <Image alt='icon-sims-ppob' width={50} height={50} src={'/assets/profile-photo.png'}></Image>
        <Typography>Selamat datang,</Typography>
        <Typography fontSize={28} fontWeight='bold'>Farid Nugroho</Typography>
      </Grid>

      <Grid size={8} sx={{ backgroundColor: '#f13b2f', borderRadius: '14px', padding: '20px', color: '#FFF' }}>
        <Box display='flex' flexDirection='column' gap={1.5}>
          <Typography fontSize='16px'>Saldo anda</Typography>

          <Typography fontSize='28px'>Rp *******</Typography>

          <Box display='flex' alignItems='center' gap={1}>
            <Typography fontSize='12px'>Lihat Saldo</Typography>
            <VisibilityOutlinedIcon sx={{ fontSize: '12px' }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}

export default HeaderSection