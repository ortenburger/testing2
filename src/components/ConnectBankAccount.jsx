import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

// COMPONENTS
import Button from '../utils/Button';
import TextField from '../utils/TextField';
import Typography from '../utils/Typography';

// MATERIAL UI - CORE
import { Grid } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

// MATERIAL UI - ICONS
import SearchSharpIcon from '@material-ui/icons/SearchSharp';
import AccountBalanceSharpIcon from '@material-ui/icons/AccountBalanceSharp';

const useStyles = makeStyles(theme => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  margin: {
    margin: theme.spacing(2, 0, 2, 0)
  },
  button: {
    margin: theme.spacing(2, 0, 2, 0)
  }
}));

export default function ConnectBankAccount({ API_KEY, authKey, userInfo }) {
  const classes = useStyles();
  const { register, handleSubmit } = useForm();
  const [bankData, setBankData] = useState(null);
  const [userInput, setUserInput] = useState('postbank');

  const onSubmit = data => {
    const { bankNameOrIban } = data;

    async function fetchData() {
      await fetch(
        `https://a6rj1fhfi0.execute-api.eu-central-1.amazonaws.com/dev/banks?search=${userInput}`,
        {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': `${API_KEY}`,
            authkey: userInfo.authkey
          }
        }
      )
        .then(response => {
          return response.json();
        })
        .then(data => {
          setBankData(data);
        })
        .catch(error => {
          console.log('ERROR: ', error);
        });
    }
    fetchData();
  };

  return (
    <Paper className={classes.paper} elevation={24}>
      <Typography
        content='Connect Bank Account'
        variant='h5'
        className={classes.margin}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid
          container
          justify='center'
          alignItems='center'
          spacing={1}
          direction='column'
        >
          <Grid item>
            <TextField
              inputRef={register}
              label='Bank name / IBAN'
              id='bankNameOrIban'
              name='bankNameOrIban'
              variant='outlined'
              required
              type='search'
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <AccountBalanceSharpIcon />
                  </InputAdornment>
                )
              }}
              helperText='Search for bank name or IBAN'
            />
          </Grid>

          <Grid item>
            <Button
              className={classes.button}
              content='search'
              variant='contained'
              color='primary'
              type='submit'
              endIcon={<SearchSharpIcon />}
            />
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}

// USER FLOW:

// 1. User enters either the name of the bank (case-insensitive) or IBAN
// -> Throw error if no match

// 2. User chooses one of the available options
// -> POST request with bank ID send to API endpoint

// 3. User needs to authenticate bank-connection
// -> No clue how this works, will figure it out though

//

// TO DO:

// Add option to log out
