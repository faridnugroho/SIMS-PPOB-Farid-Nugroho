import { formatNumberWithSeparator } from '@/utils/format-number';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs'

type typeCardProps = {
  createdOn: string
  description: string
  invoiceNumber: string
  totalAmount: string
  transactionType: string
}

const Card = (props: typeCardProps) => {
  const { createdOn, description, invoiceNumber, totalAmount, transactionType } = props

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', border: '1px solid grey', borderRadius: '10px', paddingX: '25px', paddingY: '10px', width: '100%' }}>
      <Box>
        <Typography fontSize='20px' fontWeight={700} color={transactionType === 'PAYMENT' ? 'red' : 'green'}>Rp.{formatNumberWithSeparator(Number(totalAmount))}</Typography>
        <Typography fontSize='10px' color='grey'>{dayjs(createdOn).format('DD MMMM YYYY HH:mm')} WIB</Typography>
      </Box>

      <Typography fontSize='10px' fontWeight={600} color='grey'>{description}</Typography>
    </Box>
  )
}

export default Card