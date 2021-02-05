import { withStyles } from '@material-ui/core/styles'
import { TableCell } from '@material-ui/core'

// helper component for styling tables
export const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#2C3845',
    color: theme.palette.common.white,
  },
  body: {
    color: theme.palette.common.white,
    backgroundColor: '#3F5369'
  },
}))(TableCell)