/* eslint-disable @next/next/no-img-element */

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import MoneyOutlinedIcon from '@mui/icons-material/MoneyOutlined';
import HeaderSection from '@/components/layouts/HeaderSection';
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form';
import { TopupForm, topupSchema } from './topup-schema';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { topup } from '@/store/topup';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

type DataNominal = {
  title: string
  value: string
}

const DataNominal = [
  {
    title: 'Rp10.000',
    value: '10000'
  },
  {
    title: 'Rp20.000',
    value: '20000'
  },
  {
    title: 'Rp50.000',
    value: '50000'
  },
  {
    title: 'Rp100.000',
    value: '100000'
  },
  {
    title: 'Rp250.000',
    value: '250000'
  },
  {
    title: 'Rp500.000',
    value: '500000'
  },
]

const TopUpView = () => {
  const dispatch = useDispatch<AppDispatch>();

  const form = useForm<TopupForm>({
    defaultValues: {
      top_up_amount: '',
    },

    resolver: zodResolver(topupSchema)
  })

  const { handleSubmit, reset, setValue, register, watch, formState: { errors } } = form

  const onSubmit = async (data: TopupForm) => {
    try {

      const formattedData = {
        ...data,
        top_up_amount: data.top_up_amount !== null ? Number(data.top_up_amount.replace(/\./g, '')) : 0,
      };

      await dispatch(topup(formattedData)).unwrap()

      reset()
    } catch (error) {
      console.log({ error })
    }
  }

  const formatNumber = (value: string) => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const parseNumber = (value: string) => {
    return value.replace(/\./g, '');
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value;
    const parsedValue = parseNumber(rawValue);
    setValue('top_up_amount', formatNumber(parsedValue));
  };

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
        <Grid container size={{ xs: 12, sm: 12, md: 7 }} spacing={2}>
          <Grid size={12}>
            <TextField
              size='small'
              autoComplete='off'
              fullWidth
              placeholder="masukkan nominal Top Up"
              error={!!errors.top_up_amount}
              helperText={errors?.top_up_amount?.message || ''}
              value={watch('top_up_amount')}
              {...register(`top_up_amount` as const, {
                onChange: handleChange,
              })}
              slotProps={{
                input: {
                  startAdornment: <InputAdornment position="start"><MoneyOutlinedIcon /></InputAdornment>,
                },
              }}
            />
          </Grid>

          <Grid size={12}>
            <Button
              fullWidth
              variant="contained"
              disabled={watch('top_up_amount') === '' || watch('top_up_amount') === '0'}
              onClick={handleSubmit(onSubmit)}
              sx={{
                backgroundColor: '#f42619',
                textTransform: 'capitalize',
              }}
            >
              Top Up
            </Button>
          </Grid>
        </Grid>

        <Grid container size={{ xs: 12, sm: 12, md: 5 }} spacing={2}>
          {DataNominal.map((item: DataNominal, index: number) => {
            return (
              <Grid size={{ xs: 6, sm: 4, md: 4 }} key={index}>
                <Item onClick={() => setValue('top_up_amount', formatNumber(item.value))} sx={{ cursor: 'pointer' }}>{item.title}</Item>
              </Grid>
            )
          })}
        </Grid>
      </Grid>
    </Container>
  )
}

export default TopUpView