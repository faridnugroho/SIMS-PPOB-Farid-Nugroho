/* eslint-disable @next/next/no-img-element */

import Image from 'next/image';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { getSaldo } from '@/store/balance';
import { useEffect, useState } from 'react';
import { formatNumberWithSeparator } from '@/utils/format-number';
import { getProfile } from '@/store/profile';

const HeaderSection = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [visibility, setVisibility] = useState<boolean>(false);

  const store: any = useSelector((state: RootState) => state.balance)

  const storeProfile: any = useSelector((state: RootState) => state.profile)

  useEffect(() => {
    dispatch(getSaldo())
    dispatch(getProfile())
  }, [dispatch])

  const [imageSrc, setImageSrc] = useState('/assets/profile-photo.png');

  useEffect(() => {
    const checkImage = async () => {
      if (storeProfile?.data?.profile_image) {
        try {
          const response = await fetch(storeProfile.data.profile_image);
          if (response.ok) {
            setImageSrc(storeProfile.data.profile_image);
          }
        } catch (error) {
          console.error('Error fetching the image:', error);
        }
      }
    };

    checkImage();
  }, [storeProfile?.data?.profile_image]);

  return (
    <Grid container marginBottom={4}>
      <Grid size={4}>
        <img alt='icon-sims-ppob' style={{ borderRadius: '50%' }} width={50} height={50} src={imageSrc} />
        <Typography>Selamat datang,</Typography>
        <Typography fontSize={28} fontWeight='bold'>{storeProfile?.data?.first_name} {storeProfile?.data?.last_name}</Typography>
      </Grid>

      <Grid size={8} sx={{ backgroundColor: '#f13b2f', borderRadius: '14px', padding: '20px', color: '#FFF' }}>
        <Box display='flex' flexDirection='column' gap={1.5}>
          <Typography fontSize='16px'>Saldo anda</Typography>

          {visibility ?
            <Typography fontSize='28px'>Rp {formatNumberWithSeparator(store?.data?.balance)}</Typography>
            :
            <Typography fontSize='28px'>
              Rp
              {[...Array(7)].map((_, index) => (
                <span
                  key={index}
                  style={{
                    display: 'inline-block',
                    width: '8px',
                    height: '8px',
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    marginRight: '6px',
                    marginLeft: index === 0 ? '8px' : '0px',
                    marginBottom: '4px'
                  }}
                />
              ))}
            </Typography>
          }

          <Box display='flex' alignItems='center' gap={1}>
            <Typography fontSize='12px'>Lihat Saldo</Typography>
            {visibility ?
              <VisibilityOutlinedIcon sx={{ fontSize: '12px', cursor: 'pointer' }} onClick={() => setVisibility(!visibility)} />
              :
              <VisibilityOffOutlinedIcon sx={{ fontSize: '12px', cursor: 'pointer' }} onClick={() => setVisibility(!visibility)} />
            }
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}

export default HeaderSection