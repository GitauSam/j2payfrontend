import { makeStyles } from "@material-ui/core/styles"

export default makeStyles((theme) => ({
    root: {
      background: '#e2e2e2',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
    },

    searchBar: {
        background: '#fff',
        display: 'flex',
        justifyContent: 'space-between',
        padding: 8,
        marginBottom: 8,
        borderRadius: 10,
    },

    pagination: {
        marginTop: 8,
        background: '#fff',
        borderRadius: 10,
        padding: 8,
    },

    searchIcon: {
        background: '#e2e2e2',
        padding: 4,
        marginTop: 8,
        borderRadius: 10,
        cursor: 'pointer',
    }
  }));