import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Grid from '@mui/material/Grid2';
import Image from "next/image";
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginForm, loginSchema } from './login-schema';
import { useDispatch } from 'react-redux';
import { login } from '@/store/auth';
import { AppDispatch } from '@/store';
import { useState } from 'react';
import Alert from '@mui/material/Alert';
import axios from 'axios';
import { VisibilityOutlined as VisibilityOutlinedIcon, VisibilityOffOutlined as VisibilityOffOutlinedIcon, LockOutlined as LockOutlinedIcon } from '@mui/icons-material';

const LoginView = () => {
  const { push } = useRouter();

  const dispatch = useDispatch<AppDispatch>();

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleClickRegister = () => {
    push('/auth/register')
  }

  const form = useForm<LoginForm>({
    defaultValues: {
      email: '',
      password: ''
    },

    resolver: zodResolver(loginSchema)
  })

  const { handleSubmit, reset, register, formState: { errors } } = form

  const [errorMessage, setErrorMessage] = useState<string>('')

  const onSubmit = async (data: LoginForm) => {
    try {
      const result = await dispatch(login(data)).unwrap()

      const expires = new Date(Date.now() + 24 * 60 * 60 * 1000).toUTCString();

      localStorage.setItem('accessToken', result.data.token);

      document.cookie = `accessToken=${result.data.token}; path=/; secure; samesite=strict; expires=${expires}`;

      reset()
      push('/')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || 'Terjadi kesalahan';

        setErrorMessage(message);
      }

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

          <Typography fontSize={25} fontWeight={'bold'} textAlign={'center'} marginBottom={'2.5rem'}>Masuk atau buat akun untuk memulai</Typography>

          <Box display='flex' flexDirection={'column'} gap={4} width={'100%'} marginBottom={'2.5rem'}>
            <TextField
              autoComplete='off'
              fullWidth
              placeholder="masukkan email anda"
              error={!!errors.email}
              helperText={errors?.email?.message || ''}
              {...register(`email` as const)}
              onChange={() => setErrorMessage('')}
              slotProps={{
                input: {
                  startAdornment: <InputAdornment position="start">@</InputAdornment>,
                },
              }}
            />

            <TextField
              type={showPassword ? 'text' : 'password'}
              autoComplete='off'
              fullWidth
              placeholder="masukkan password anda"
              error={!!errors.password}
              helperText={errors?.password?.message || ''}
              {...register(`password` as const)}
              onChange={() => setErrorMessage('')}
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
          </Box>

          <Button variant="contained" fullWidth sx={{ backgroundColor: '#f42619', textTransform: 'capitalize', marginBottom: '2rem' }} onClick={handleSubmit(onSubmit)}>Masuk</Button>

          <Typography>
            belum punya akun? register <span style={{ color: '#f42619', cursor: 'pointer' }} onClick={handleClickRegister}>
              di sini</span>
          </Typography>

          {errorMessage &&
            <Alert severity="error" icon={false} onClose={() => setErrorMessage('')}
              sx={{
                position: 'fixed',
                bottom: 50,
                left: 25,
                zIndex: 9999
              }}
            >
              {errorMessage}
            </Alert>
          }
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

export default LoginView