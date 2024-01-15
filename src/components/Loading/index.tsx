import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

type LoadingOverlayProps = {
    open: boolean;
    title?: string;
};



export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ open, 
    title = 'Loading...',
}) => {
    return (
        <Backdrop open={open} style={{ zIndex: 9999, color: '#fff' }}>
            <CircularProgress color="inherit" />
            <div style={{ marginLeft: 10 }}>{title}</div>
        </Backdrop>
    );
};

export default LoadingOverlay;
