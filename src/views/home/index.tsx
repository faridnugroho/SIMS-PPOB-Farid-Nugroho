/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import Image from 'next/image';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import HeaderSection from '@/components/layouts/HeaderSection';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import './Swiper.module.css';
import { AppDispatch, RootState } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { getServices } from '@/store/services';
import { useRouter } from 'next/router';

type ServiceType = {
  service_code: string
  service_icon: string
  service_name: string
  service_tariff: string
}

const DataService = [
  {
    name: 'PBB',
    image: '/assets/PBB.png',
  },
  {
    name: 'Listrik',
    image: '/assets/Listrik.png',
  },
  {
    name: 'Pulsa',
    image: '/assets/Pulsa.png',
  },
  {
    name: 'PDAM',
    image: '/assets/PDAM.png',
  },
  {
    name: 'PGN',
    image: '/assets/PGN.png',
  },
  {
    name: 'TV Langganan',
    image: '/assets/Televisi.png',
  },
  {
    name: 'Musik',
    image: '/assets/Musik.png',
  },
  {
    name: 'Voucher Game',
    image: '/assets/Game.png',
  },
  {
    name: 'Voucher Makanan',
    image: '/assets/Voucher Makanan.png',
  },
  {
    name: 'Kurban',
    image: '/assets/Kurban.png',
  },
  {
    name: 'Zakat',
    image: '/assets/Zakat.png',
  },
  {
    name: 'Paket Data',
    image: '/assets/Paket Data.png',
  },
]

const HomeView = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { push } = useRouter()

  const store: any = useSelector((state: RootState) => state.services);

  const [imageStatus, setImageStatus] = useState<Record<number, boolean>>({});

  const checkImage = async (url: string, index: number) => {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      if (response.ok) {
        setImageStatus(prev => ({ ...prev, [index]: true }));
      } else {
        setImageStatus(prev => ({ ...prev, [index]: false }));
      }
    } catch {
      setImageStatus(prev => ({ ...prev, [index]: false }));
    }
  };

  useEffect(() => {
    store?.data?.forEach((item: ServiceType, index: number) => {
      checkImage(item.service_icon, index);
    });
  }, [store?.data]);

  useEffect(() => {
    dispatch(getServices())
  }, [dispatch])

  const handleClickService = (item: ServiceType) => {
    localStorage.setItem('selectedService', JSON.stringify(item));

    push('/purchase')
  };

  return (
    <Container maxWidth="xl">
      <HeaderSection />

      <Grid container marginBottom={4}>
        {store?.data?.map((item: ServiceType, index: number) => {
          const isImageAvailable = imageStatus[index];
          const imageUrl = isImageAvailable ? item.service_icon : '/assets/PBB.png';

          return (
            <Grid size={{ xs: 3, sm: 2, md: 1 }} key={index}>
              <Box display='flex' flexDirection='column' alignItems='center' gap={.5} sx={{ cursor: 'pointer' }} onClick={() => handleClickService(item)}>
                <img width={50} height={50} src={imageUrl} />
                <Typography textAlign={'center'}>{item.service_name}</Typography>
              </Box>
            </Grid>
          )
        })}
      </Grid>

      <Grid container marginBottom={4} sx={{ position: 'relative' }}>
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          breakpoints={{
            395: {
              slidesPerView: 1.4,
              spaceBetween: 20,
            },
            700: {
              slidesPerView: 2.4,
              spaceBetween: 20,
            },
            950: {
              slidesPerView: 3.4,
              spaceBetween: 30,
            },
            1210: {
              slidesPerView: 4.4,
              spaceBetween: 40,
            },
            1375: {
              slidesPerView: 5,
              spaceBetween: 50,
            },
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          <SwiperSlide><img alt='icon-sims-ppob' src={'/assets/banner-1.png'}></img></SwiperSlide>
          <SwiperSlide><img alt='icon-sims-ppob' src={'/assets/banner-2.png'}></img></SwiperSlide>
          <SwiperSlide><img alt='icon-sims-ppob' src={'/assets/banner-3.png'}></img></SwiperSlide>
          <SwiperSlide><img alt='icon-sims-ppob' src={'/assets/banner-4.png'}></img></SwiperSlide>
          <SwiperSlide><img alt='icon-sims-ppob' src={'/assets/banner-5.png'}></img></SwiperSlide>
        </Swiper>
      </Grid>
    </Container>
  )
}

export default HomeView