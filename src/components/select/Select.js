/* eslint-disable react/prop-types */
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';

export const TribeBlastSelect = ({ handleChange, label, children, ...props }) => (
    <FormControl error={props.error} fullWidth>
      <InputLabel id={`select-${label}`}>{label}</InputLabel>
      <Select labelId={`select-${label}`} label={label} onChange={handleChange} {...props}>
        {children.map((ele) => (
            <MenuItem key={ele.value} value={ele.value}>
              {ele.label}
            </MenuItem>
          ))}
      </Select>
      {props.helperText && <FormHelperText>{props.helperText}</FormHelperText>}
    </FormControl>
  );
