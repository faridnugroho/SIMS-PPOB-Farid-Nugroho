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
import HeaderSection from '@/components/layouts/HeaderSection';
import { useState, useEffect } from 'react';
import { purchaseSchema, PurchaseForm } from './purchase-schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { transaction } from '@/store/transaction';
import ModalConfirmation from './modal-confirmastion';
import { useRouter } from 'next/router';

type ServiceType = {
  service_code: string
  service_icon: string
  service_name: string
  service_tariff: string
}

const PurchaseView = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { push } = useRouter()

  const [openModal, setOpenModal] = useState(false);

  const [service, _] = useState<ServiceType | null>(() => {
    const item = localStorage.getItem('selectedService');
    return item ? JSON.parse(item) : null;
  });

  const [imageSrc, setImageSrc] = useState('/assets/PBB.png');

  useEffect(() => {
    const checkImage = async () => {
      if (typeof service === 'string') {
        try {
          const response = await fetch(service);
          if (response.ok) {
            setImageSrc(service);
          }
        } catch (error) {
          console.error('Error fetching the image:', error);
        }
      }
    };

    checkImage();
  }, [service]);

  const form = useForm<PurchaseForm>({
    defaultValues: {
      total_amount: '',
      service_code: service?.service_code,
      transaction_type: 'PAYMENT'
    },

    resolver: zodResolver(purchaseSchema)
  })

  const { handleSubmit, reset, setValue, register, watch, formState: { errors } } = form

  const [statusPayment, setStatusPayment] = useState<string>('')

  const onSubmit = async (data: PurchaseForm) => {
    try {
      const formattedData = {
        ...data,
        total_amount: data.total_amount !== null ? Number(data.total_amount.replace(/\./g, '')) : 0,
      };

      await dispatch(transaction(formattedData)).unwrap()

      setStatusPayment('success')
    } catch (error) {
      setStatusPayment('failed')
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
    setValue('total_amount', formatNumber(parsedValue));
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <>
      <Container maxWidth="xl">
        <HeaderSection />

        <Grid container marginBottom={4} spacing={1}>
          <Grid size={12}>
            <Typography fontSize='18px'>Pembayaran</Typography>
          </Grid>

          <Box display='flex' alignItems='center' gap={1}>
            <Image alt='icon-sims-ppob' width={30} height={30} src={imageSrc} />
            <Typography fontSize='18px' fontWeight='bold'>{service?.service_name}</Typography>
          </Box>
        </Grid>

        <Grid container marginBottom={4} spacing={2}>
          <TextField
            size='small'
            autoComplete='off'
            fullWidth
            placeholder="masukkan nominal pembayaran"
            error={!!errors.total_amount}
            helperText={errors?.total_amount?.message || ''}
            value={watch('total_amount')}
            {...register(`total_amount` as const, {
              onChange: handleChange,
            })}
            slotProps={{
              input: {
                startAdornment: <InputAdornment position="start"><MoneyOutlinedIcon /></InputAdornment>,
              },
            }}
          />

          <Button
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: '#f42619',
              textTransform: 'capitalize',
              marginBottom: '2rem'
            }}
            disabled={watch('total_amount') === '' || watch('total_amount') === '0'}
            onClick={() => setOpenModal(true)}
          >
            Bayar
          </Button>
        </Grid>
      </Container>

      {openModal && (
        <ModalConfirmation
          open={openModal}
          onClose={handleClose}
          serviceName={service?.service_name || ''}
          totalAmount={watch('total_amount')}
          onConfirm={handleSubmit(onSubmit)}
          statusPayment={statusPayment}
        />
      )}
    </>
  )
}

export default PurchaseView