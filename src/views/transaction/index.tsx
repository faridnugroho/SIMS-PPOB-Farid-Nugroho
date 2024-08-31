/* eslint-disable @next/next/no-img-element */

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import HeaderSection from '@/components/layouts/HeaderSection';
import Card from '@/components/fragments/Card';

type dataType = {
  nominal: string
  date: string
  description: string
  flag: string
}

const Data = [
  {
    nominal: 'Rp.10.000',
    date: '17 Agustus 2023 13:12 WIB',
    description: 'Top Up Saldo',
    flag: '+'
  },
  {
    nominal: 'Rp.40.000',
    date: '17 Agustus 2023 13:12 WIB',
    description: 'Pulsa Prabayar',
    flag: '-'
  },
  {
    nominal: 'Rp.10.000',
    date: '17 Agustus 2023 13:12 WIB',
    description: 'Listrik Pascabayar',
    flag: '-'
  },
  {
    nominal: 'Rp.50.000',
    date: '17 Agustus 2023 13:12 WIB',
    description: 'Top Up Saldo',
    flag: '+'
  },
  {
    nominal: 'Rp.50.000',
    date: '17 Agustus 2023 13:12 WIB',
    description: 'Top Up Saldo',
    flag: '+'
  },
]

const TransactionView = () => {
  return (
    <Container maxWidth="xl">
      <HeaderSection />

      <Grid container marginBottom={4} spacing={1}>
        <Grid size={12}>
          <Typography fontSize='18px' fontWeight='bold'>Semua Transaksi</Typography>
        </Grid>

        <Grid size={12}>
          <Box display='flex' flexDirection='column' marginBottom={2} gap={2}>
            {Data?.map((item: dataType, index: number) => {
              return (
                <Card
                  key={index}
                  nominal={item.nominal}
                  date={item.date}
                  description={item.description}
                  flag={item.flag}
                />
              )
            })}
          </Box>

          <Box display='flex' justifyContent='center'>
            <Button variant="text" sx={{ color: 'red', fontWeight: 600, textTransform: 'capitalize' }}>Show more</Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default TransactionView