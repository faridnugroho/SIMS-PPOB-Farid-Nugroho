/* eslint-disable @next/next/no-img-element */

import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Image from "next/image";

const Custom404 = () => {
  return (
    <Box sx={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <img alt='404' src={'/assets/404.png'} />
      <Typography fontSize='18px' fontWeight='bold' color='#f13b2f'>404 | Halaman Tidak Ditemukan</Typography>
    </Box>
  )
}

export default Custom404