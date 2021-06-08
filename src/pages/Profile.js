import React, { useState, useEffect } from 'react';
import { AppBar, Tabs, Tab, Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import NavBar from '../components/NavBar';
import { getBooks, getUserBooks } from '../api/api';
import BooksTable from '../components/BooksTable';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '400px',
    margin: '100px auto',
    padding: '15px',
    borderRadius: '25px',
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)'
  },
  form: {
  },
  textfield: {
    width: '250px'
  },
  submitButton: {
    color: '#FFF',
    margin: '25px 0 40px'
  },
  createLink: {
    textDecoration: 'none',
    color: theme.palette.secondary.main,
  },
  book: {
    display: 'flex'
  }
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `tab-${index} `,
    'aria-controls': `tabpanel-${index}`
  };
}

function Profile() {
  const classes = useStyles();
  let user = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : null;
  const [booksData, setBooksData] = useState({ userBooks: [], books: []});
  const [tabValue, setTabValue] = useState(0)

  useEffect(() => {
    getBooks().then(booksVal => {
      const books = booksVal.data;
      getUserBooks().then(userBooksVal => {
        const userBooks = userBooksVal.data;
        setBooksData({ books, userBooks });
      });
    });
  }, []);

  const handleTabChange = (e, newValue) => {
    setTabValue(newValue);
  }  

  return (
    <div>
      <NavBar />
      <h1>Profile</h1>
      <p>Hello, { user ? user.name : 'No user logged in' }</p>
      <AppBar position="static">
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="tabs">
          <Tab label="My Shelf" {...a11yProps(0)} />
          <Tab label="My Details" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={tabValue} index={0}>
        <BooksTable 
          booksData={booksData} 
          user={user}
        />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        My Details
      </TabPanel>
    </div>
  );
}

export default Profile;