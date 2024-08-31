import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

type typeCardProps = {
  nominal: string
  date: string
  description: string
  flag: string
}

const Card = (props: typeCardProps) => {
  const { nominal, date, description, flag } = props

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', border: '1px solid grey', borderRadius: '10px', paddingX: '25px', paddingY: '10px', width: '100%' }}>
      <Box>
        <Typography fontSize='20px' fontWeight={700} color={flag === '-' ? 'red' : 'green'}>{flag} {nominal}</Typography>
        <Typography fontSize='10px' color='grey'>{date}</Typography>
      </Box>

      <Typography fontSize='10px' fontWeight={600} color='grey'>{description}</Typography>
    </Box>
  )
}

export default Card