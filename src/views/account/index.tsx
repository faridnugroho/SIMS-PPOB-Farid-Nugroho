/* eslint-disable @next/next/no-img-element */

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
import { AppDispatch, RootState } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { getProfile, updateProfile, uploadImage } from "@/store/profile";
import { useForm } from 'react-hook-form';
import { AccountForm, accountSchema } from './account-schema';
import { zodResolver } from '@hookform/resolvers/zod'
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { CircularProgress } from '@mui/material';
import { logout } from "@/store/auth";
import { useRouter } from "next/router";
import toast from 'react-hot-toast'

const AccountView = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [isUpdate, setIsUpdate] = useState<boolean>(false)

  const { push } = useRouter()

  const store: any = useSelector((state: RootState) => state.profile)

  useEffect(() => {
    dispatch(getProfile())
  }, [dispatch])

  const form = useForm<AccountForm>({
    defaultValues: {
      email: store?.data?.email,
      first_name: store?.data?.first_name,
      last_name: store?.data?.last_name,
    },

    resolver: zodResolver(accountSchema)
  })

  const { handleSubmit, reset, register, formState: { errors } } = form

  useEffect(() => {
    reset({
      email: store?.data?.email,
      first_name: store?.data?.first_name,
      last_name: store?.data?.last_name,
    })
  }, [store.data, reset])

  const onSubmit = async (data: AccountForm) => {
    try {
      const { email, ...payload } = data;

      await dispatch(updateProfile(payload)).unwrap()

      reset()
      setIsUpdate(false)
    } catch (error) {
      console.log({ error })
    }
  }

  const [imageSrc, setImageSrc] = useState('/assets/profile-photo.png');

  useEffect(() => {
    const checkImage = async () => {
      if (store?.data?.profile_image) {
        try {
          const response = await fetch(store.data.profile_image);
          if (response.ok) {
            setImageSrc(store.data.profile_image);
          }
        } catch (error) {
          console.error('Error fetching the image:', error);
        }
      }
    };

    checkImage();
  }, [store?.data?.profile_image]);

  const handleImageUpload = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      dispatch(uploadImage({ imageFile: file })).then((action: any) => {
        if (action.meta.requestStatus === 'fulfilled') {
          setImageSrc(action.payload.url);
        }
      });
    }
  };

  const handleLogout = async () => {
    try {
      await dispatch(logout())

      localStorage.removeItem('accessToken');
      localStorage.removeItem('selectedService');

      push('/auth/login');

      toast.success('Logout success');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <Container maxWidth="xl">
      <Grid container justifyContent='center'>
        <Grid size={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <Box sx={{ position: 'relative', display: 'inline-block', mb: 1 }}>
            {store?.uploadLoading ? (
              <Box width={124} height={124}>
                <CircularProgress
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    margin: 'auto',
                    zIndex: 1,
                  }}
                />
              </Box>
            ) : (
              <img
                alt="icon-sims-ppob"
                width={120}
                height={120}
                style={{ borderRadius: '50%' }}
                src={imageSrc}
              />
            )}
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="upload-image"
              type="file"
              onChange={handleImageUpload}
            />
            <label htmlFor="upload-image">
              <IconButton
                sx={{
                  position: 'absolute',
                  right: 5,
                  bottom: 5,
                  backgroundColor: 'white',
                  borderRadius: '50%',
                  p: 0.5,
                  boxShadow: 1,
                  '&:hover': {
                    backgroundColor: '#f0f0f0',
                  },
                }}
                aria-label="edit image"
                component="span"
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </label>
          </Box>

          <Typography fontSize={28} fontWeight={'bold'} textAlign={'center'} marginBottom={'2.5rem'}>
            {store?.data.first_name} {store?.data.last_name}
          </Typography>

          <Box display='flex' flexDirection={'column'} gap={4} width={'100%'} marginBottom={'2.5rem'}>
            <FormControl>
              <Typography>Email</Typography>
              <TextField
                autoComplete='off'
                fullWidth
                disabled
                placeholder="masukkan email anda"
                error={!!errors.email}
                helperText={errors?.email?.message || ''}
                {...register(`email` as const)}
                slotProps={{
                  input: {
                    readOnly: true,
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
                disabled={!isUpdate}
                placeholder="nama depan"
                error={!!errors.first_name}
                helperText={errors?.first_name?.message || ''}
                {...register(`first_name` as const)}
                slotProps={{
                  input: {
                    readOnly: isUpdate ? false : true,
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
                disabled={!isUpdate}
                placeholder="nama belakang"
                error={!!errors.last_name}
                helperText={errors?.last_name?.message || ''}
                {...register(`last_name` as const)}
                slotProps={{
                  input: {
                    readOnly: isUpdate ? false : true,
                    startAdornment: <InputAdornment position="start"><PersonOutlinedIcon /></InputAdornment>,
                  },
                }}
              />
            </FormControl>
          </Box>

          {isUpdate ? (
            <Button
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: '#f42619',
                textTransform: 'capitalize',
                marginBottom: '2rem'
              }}
              onClick={handleSubmit(onSubmit)}
            >
              Simpan
            </Button>
          ) : (
            <>
              <Button
                fullWidth
                variant="contained"
                sx={{
                  backgroundColor: '#f42619',
                  textTransform: 'capitalize',
                  marginBottom: '2rem'
                }}
                onClick={() => setIsUpdate(true)}
              >
                Edit Profil
              </Button>

              <Button
                fullWidth
                variant="outlined"
                sx={{
                  textTransform: 'capitalize',
                  marginBottom: '2rem',
                  borderColor: '#f42619',
                  color: '#f42619'
                }}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          )}
        </Grid>
      </Grid>
    </Container>
  )
}

export default AccountView