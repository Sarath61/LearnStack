import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import { useState } from "react";

function Addcourse() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image , SetImage] = useState("")

  return (
    <div>
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
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              label="Title"
              variant="outlined"
            />
            <br />
            <br />
            <TextField
              fullWidth={true}
              onChange={(e) => {
                setDesc(e.target.value);
              }}
              label="Description"
              variant="outlined"
            />
            <br />
            <br />
            <TextField
              fullWidth={true}
              onChange={(e) => {
                SetImage(e.target.value);
              }}
              label="imagelink"
              variant="outlined"
            />
            <br />
            <br />
            <Button
              size="large"
              variant="contained"
              onClick={() => {

                
                fetch("http://localhost:3000/admin/courses", {
                  method: "POST",
                  body: JSON.stringify({
                    title,
                    desc,
                    image
                  }),
                  headers: {
                    "content-type": "Application/json",
                    "authorization": "Bearer " + localStorage.getItem("token"),
                  },
                }).then((res) => {
                  res.json().then(() =>alert("Course Added..."));
                });
              }}
            >
              Add Course
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
export default Addcourse;
