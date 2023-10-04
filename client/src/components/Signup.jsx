import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import { useState } from "react";


function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
          Welcome to LearnStack Sign Up below.
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
              onChange={(el) => {
                setEmail(el.target.value);
              }}
              label="Email"
              variant="outlined"
            />
            <br />
            <br />
            <TextField
              fullWidth={true}
              onChange={(el) => {
                setPassword(el.target.value);
              }}
              label="Password"
              variant="outlined"
              type="password"
            />
            <br />
            <br />
            <Button
              size="large"
              variant="contained"
              onClick={() => {
                fetch("http://localhost:3000/admin/signup", {
                  method: "POST",
                  body: JSON.stringify({
                    username: email,
                    password: password,
                  }),
                  headers: {
                    "content-type": "application/json",
                  },
                }).then((res) => {
                    console.log(res)
                  res.json().then((data) => {
                    localStorage.setItem("token", data.token)
                    window.location ="/";
                  });
                });
              }}
            >
              SignUp
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Signup;
