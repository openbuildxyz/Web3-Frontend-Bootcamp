import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function Header() {
  return (
    <AppBar>
      <Toolbar>
        <Typography variant="h6" component="div">
          React Todo List
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Header
