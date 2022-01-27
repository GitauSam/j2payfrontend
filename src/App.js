import CustomerList from './components/CustomerList';
import Container from '@mui/material/Container';

import useStyles from './styles';

function App() {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <CustomerList />
      </Container>
    </div>
  );
}

export default App;
