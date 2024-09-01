import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DialogContent from '@mui/material/DialogContent';
import Image from 'next/image';
import { useRouter } from 'next/router';

export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
  serviceName: string;
  totalAmount: string;
  onConfirm: () => void;
  statusPayment: string;
}

const ModalConfirmation = (props: SimpleDialogProps) => {
  const { onClose, open, serviceName, totalAmount, onConfirm, statusPayment } = props;

  const { push } = useRouter()

  const handleClose = () => {
    onClose();
  };

  const handleClickBeranda = () => {
    localStorage.removeItem('selectedService');

    handleClose()

    push('/')
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogContent sx={{ padding: '3rem' }}>
        <Box display='flex' flexDirection='column' alignItems='center' gap={1}>
          <Image
            alt='icon-transaction'
            width={40}
            height={40}
            src={statusPayment === '' ? '/assets/logo.png' : statusPayment === 'success' ? '/assets/success.jpg' : '/assets/failed.jpg'}
          />

          {statusPayment === '' && (
            <>
              <Box display='flex' flexDirection='column' alignItems='center'>
                <Typography>Beli {serviceName} senilai</Typography>
                <Typography fontWeight={700}>Rp{totalAmount} ?</Typography>
              </Box>
            </>
          )}

          {statusPayment === 'failed' && (
            <>
              <Typography>gagal</Typography>
              <Button variant="text" sx={{ color: '#f42619', fontSize: '12px', fontWeight: 600, textTransform: 'capitalize' }} onClick={handleClickBeranda}>Kembali ke Beranda</Button>
            </>
          )}

          {statusPayment === 'success' && (
            <>
              <Typography>Pembayaran {serviceName} sebesar</Typography>
              <Typography fontWeight={700}>Rp{totalAmount}</Typography>
              <Typography>berhasil!!!</Typography>
              <Button variant="text" sx={{ color: '#f42619', fontSize: '12px', fontWeight: 600, textTransform: 'capitalize' }} onClick={handleClickBeranda}>Kembali ke Beranda</Button>
            </>
          )}

          {statusPayment === '' && (
            <>
              <Button variant="text" sx={{ color: '#f42619', fontSize: '12px', fontWeight: 600, textTransform: 'capitalize' }} onClick={onConfirm}>Ya, lanjutkan Bayar</Button>

              <Button variant="text" sx={{ color: 'grey', textTransform: 'capitalize' }} onClick={handleClose}>Batalkan</Button>
            </>
          )}

        </Box>
      </DialogContent>
    </Dialog >
  )
}

export default ModalConfirmation