import React, { useState } from 'react';
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
import AlternateEmailSharpIcon from '@material-ui/icons/AlternateEmailSharp';
import InputSharpIcon from '@material-ui/icons/InputSharp';
import LockOpenSharpIcon from '@material-ui/icons/LockOpenSharp';
import PersonAddSharpIcon from '@material-ui/icons/PersonAddSharp';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  margin: {
    margin: theme.spacing(2, 0, 2, 0),
  },
  bottomText: {
    margin: theme.spacing(2, 0, 2, 0),
    cursor: 'pointer',
  },
  button: {
    margin: theme.spacing(2, 0, 2, 0),
    width: '130px',
  },
}));

export default function LogInUser({ API_KEY, setUserInfo, setStatus }) {
  const classes = useStyles();

  const [login, setLogin] = useState(true);
  const [open, setOpen] = useState(false);

  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const switchMode = () => {
    setLogin(!login);
    reset({
      email: '',
      password: '',
    });
  };

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    const { email, password } = data;

    async function fetchData() {
      await fetch(
        `https://a6rj1fhfi0.execute-api.eu-central-1.amazonaws.com/dev/users?login=${login}`,
        {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': `${API_KEY}`,
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      )
        .then((response) => {
          setStatus(response.status);
          if (response.status === 401) {
            setOpen(true);
          }
          return response.json();
        })
        .then((data) => {
          setUserInfo(data);
        })
        .catch((error) => {
          console.log('ERROR: ', error);
        });
    }
    fetchData();
  };

  return (
    <>
      <Paper className={classes.paper} elevation={24}>
        <Typography content='Log In' variant='h5' className={classes.margin} />
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
                id='email'
                label='E-Mail'
                name='email'
                variant='outlined'
                required
                type='email'
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <AlternateEmailSharpIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item>
              <TextField
                inputRef={register}
                id='password'
                label='Password'
                name='password'
                variant='outlined'
                required
                type='password'
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <LockOpenSharpIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item>
              <Button
                className={classes.button}
                content={login ? 'Log In' : 'Register'}
                variant='contained'
                color={login ? 'primary' : 'secondary'}
                type='submit'
                endIcon={login ? <InputSharpIcon /> : <PersonAddSharpIcon />}
              />
            </Grid>
          </Grid>
        </form>
        {login ? (
          <Typography
            className={classes.bottomText}
            content='Create a new account'
            variant='caption'
            onClick={switchMode}
          />
        ) : (
          <Typography
            className={classes.bottomText}
            content='Already have an account?'
            variant='caption'
            onClick={switchMode}
          />
        )}
      </Paper>
    </>
  );
}
