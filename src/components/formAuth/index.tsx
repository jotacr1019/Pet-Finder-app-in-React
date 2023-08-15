import React from "react";
import { TextField, FormControl, InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
    Button } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


export function FormAuth(){
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    
    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log(e.target.email.value);
        console.log(e.target.password.value);
    }

    return (<form onSubmit={handleFormSubmit}>
                {/* <input type="email" placeholder="Email" name="email"></input>
                <input type="password" placeholder="Password" name="password"></input>
                <button type="submit">Login</button> */}
                <TextField
                      required
                      id="outlined-required"
                      label="Email"
                      defaultValue=""
                      placeholder="ejemplo@mail.com"
                      helperText="Incorrect entry."
                      name="email"
                    />
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="filled">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            required
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            name="password"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Contraseña"
          />
        </FormControl>
        <Button type="submit" variant="contained">Submit</Button>
            </form>)
}