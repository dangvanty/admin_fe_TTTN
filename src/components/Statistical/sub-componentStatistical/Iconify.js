import { forwardRef } from 'react';
// icons
import { Icon } from '@iconify/react';
// @mui
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

const IconStatiscal = ({ icon, sx }) => {
  return (
    <div style={sx}>
      <div className="icon">{icon}</div>
    </div>
  );
};
const Iconify = forwardRef(({ icon, width = 20, sx, ...other }, ref) => (
  // <Box ref={ref} component={Icon} icon={icon} sx={{ width, height: width, ...sx }} {...other} />
  <IconStatiscal sx={{ width, height: width, ...sx }} icon={icon} />
));

export default Iconify;
