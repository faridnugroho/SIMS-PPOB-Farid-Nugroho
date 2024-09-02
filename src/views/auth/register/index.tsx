import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Grid from '@mui/material/Grid2';
import Image from "next/image";
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { RegisterForm, registerSchema } from './register-schema';
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form';
import { registration } from '@/store/auth';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { VisibilityOutlined as VisibilityOutlinedIcon, VisibilityOffOutlined as VisibilityOffOutlinedIcon, LockOutlined as LockOutlinedIcon } from '@mui/icons-material';

const RegisterView = () => {
  const { push } = useRouter()

  const dispatch = useDispatch<AppDispatch>();

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleClickLogin = () => {
    push('/auth/login')
  }

  const form = useForm<RegisterForm>({
    defaultValues: {
      email: '',
      first_name: '',
      last_name: '',
      password: '',
      confirmPassword: '',
    },

    resolver: zodResolver(registerSchema)
  })

  const { handleSubmit, reset, register, formState: { errors } } = form

  const onSubmit = async (data: RegisterForm) => {
    try {
      const { confirmPassword, ...payload } = data;

      await dispatch(registration(payload)).unwrap()

      reset()
      push('/auth/login')
    } catch (error) {
      console.log({ error })
    }
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
              error={!!errors.email}
              helperText={errors?.email?.message || ''}
              {...register(`email` as const)}
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
              error={!!errors.first_name}
              helperText={errors?.first_name?.message || ''}
              {...register(`first_name` as const)}
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
              error={!!errors.last_name}
              helperText={errors?.last_name?.message || ''}
              {...register(`last_name` as const)}
              slotProps={{
                input: {
                  startAdornment: <InputAdornment position="start"><PersonOutlinedIcon /></InputAdornment>,
                },
              }}
            />

            <TextField
              autoComplete='off'
              type={showPassword ? 'text' : 'password'}
              fullWidth
              placeholder="buat password"
              error={!!errors.password}
              helperText={errors?.password?.message || ''}
              {...register(`password` as const)}
              slotProps={{
                input: {
                  startAdornment: <InputAdornment position="start"><LockOutlinedIcon fontSize="small" /></InputAdornment>,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                        {showPassword ? <VisibilityOutlinedIcon fontSize="small" /> : <VisibilityOffOutlinedIcon fontSize="small" />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            <TextField
              autoComplete='off'
              type={showConfirmPassword ? 'text' : 'password'}
              fullWidth
              placeholder="konfirmasi password"
              error={!!errors.confirmPassword}
              helperText={errors?.confirmPassword?.message || ''}
              {...register(`confirmPassword` as const)}
              slotProps={{
                input: {
                  startAdornment: <InputAdornment position="start"><LockOutlinedIcon fontSize="small" /></InputAdornment>,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleToggleConfirmPasswordVisibility} edge="end">
                        {showConfirmPassword ? <VisibilityOutlinedIcon fontSize="small" /> : <VisibilityOffOutlinedIcon fontSize="small" />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Box>

          <Button variant="contained" fullWidth sx={{ backgroundColor: '#f42619', textTransform: 'capitalize', marginBottom: '2rem' }} onClick={handleSubmit(onSubmit)}>Registrasi</Button>

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