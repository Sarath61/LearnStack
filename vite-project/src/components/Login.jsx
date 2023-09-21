import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";

function Login() {
  return (
    <div>
      <div
        style={{
          paddingTop: 120,
          paddingBottom:20,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant={"h6"}>
          Welcome to LearnStack Log In below.
        </Typography>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Card varint="outlined" style={{ width: 400, padding: 30 }}>
          <div>
            <TextField
              fullWidth={true}
              id="outlined-basic"
              label="Email"
              variant="outlined"
            />
            <br />
            <br />
            <TextField
              fullWidth={true}
              id="outlined-basic"
              label="Password"
              variant="outlined"
              type="password"
            />
            <br />
            <br />
            <Button size="large" variant="contained">
              Log in
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Login;
