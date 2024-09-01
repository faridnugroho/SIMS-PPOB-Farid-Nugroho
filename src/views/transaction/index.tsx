/* eslint-disable @next/next/no-img-element */

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import HeaderSection from '@/components/layouts/HeaderSection';
import Card from '@/components/fragments/Card';
import { AppDispatch, RootState } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getTransactionHistory } from '@/store/transaction';

type dataType = {
  created_on: string
  description: string
  invoice_number: string
  total_amount: string
  transaction_type: string
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
  const dispatch = useDispatch<AppDispatch>();

  const store: any = useSelector((state: RootState) => state.transaction);

  const [limit, setLimit] = useState<number>(5)

  const [offset, setOffset] = useState<number>(0)

  useEffect(() => {
    dispatch(getTransactionHistory({
      offset: offset,
      limit: limit,
    }))
  }, [dispatch, offset, limit])

  const handleShowMore = () => {
    setLimit(prevLimit => prevLimit + 5);
  };

  return (
    <Container maxWidth="xl">
      <HeaderSection />

      <Grid container marginBottom={4} spacing={1}>
        <Grid size={12}>
          <Typography fontSize='18px' fontWeight='bold'>Semua Transaksi</Typography>
        </Grid>

        <Grid size={12}>
          <Box display='flex' flexDirection='column' marginBottom={2} gap={2}>
            {store?.data?.records?.map((item: dataType, index: number) => {
              return (
                <Card
                  key={index}
                  createdOn={item.created_on}
                  description={item.description}
                  invoiceNumber={item.invoice_number}
                  totalAmount={item.total_amount}
                  transactionType={item.transaction_type}
                />
              )
            })}
          </Box>

          <Box display='flex' justifyContent='center'>
            <Button variant="text" sx={{ color: 'red', fontWeight: 600, textTransform: 'capitalize' }} onClick={handleShowMore}>Show more</Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default TransactionView