import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

export default function CircularSize() {
    return (
        <div className='h-screen flex justify-center items-center'>
            <Stack spacing={2} direction="row" sx={{ alignItems: 'center' }}>
                <CircularProgress size={70} aria-label="Loading…" />
            </Stack>
        </div>
    );
}
