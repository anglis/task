import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    background: {
      default: '#fafafa'
    }
  },
  overrides: {
    MuiFormControlLabel: {
      label: {
        whiteSpace: 'nowrap',
        fontSize: '0.875rem',
      }
    }
  }
});