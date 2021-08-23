import React, { useState } from 'react';
import {
  Button,
  TextField
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { register } from '../api/api';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '400px',
    margin: '50px auto',
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
  header: {
    color: theme.palette.secondary.main,
    fontSize: '48px',
    margin: '30px 0 10px'
  },
  subheader: {
    color: '#000',
    fontSize: '24px',
    fontWeight: '400',
    margin: '0'
  }
}));

function Register() {
  const classes = useStyles();
  let history = useHistory();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleInputChange = (e, setValue) => {
    const {value} = e.target;
    setValue(value);
  }

  const formSubmit = (e) => {
    e.preventDefault();
    register({
      firstName,
      lastName,
      email,
      password,
      confirmPassword
    }).then(isAuthenticated => {
      if (isAuthenticated) {
        history.push('/');
      }
    });
    
  }

  return (
    <div>
      <h1 className={classes.header}>Shelfinator</h1>
      <h3 className={classes.subheader}>A virtual bookshelf.</h3>
      <div className={classes.formContainer}>
        <h1>Register</h1>
        <form className={classes.form} onSubmit={formSubmit}>
          <TextField 
            className={classes.textfield} 
            required 
            label="First Name" 
            value={firstName}
            onChange={(e) => handleInputChange(e, setFirstName)}
          />
          <TextField 
            className={classes.textfield} 
            required 
            label="Last Name" 
            value={lastName}
            onChange={(e) => handleInputChange(e, setLastName)}
          />
          <TextField 
            className={classes.textfield} 
            required 
            label="Email" 
            value={email}
            onChange={(e) => handleInputChange(e, setEmail)}
          />
          <TextField 
            className={classes.textfield} 
            required 
            label="Password" 
            type="password" 
            value={password}
            onChange={(e) => handleInputChange(e, setPassword)}
          />
          <TextField 
            className={classes.textfield} 
            required 
            label="Confirm Password" 
            type="password" 
            value={confirmPassword}
            onChange={(e) => handleInputChange(e, setConfirmPassword)}
          />
          <br />
          <Button type="submit" variant="contained" color="secondary" className={classes.submitButton}>Submit</Button>
        </form>
        <Link to="/login" className={classes.createLink}>Login to Account</Link>
      </div>
    </div>
  );
}

export default Register;