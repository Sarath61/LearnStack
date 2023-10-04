import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import {Button, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

function Courses() {
  const [course, setCourse] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/admin/courses", {
      method: "GET",
      headers: {
        'authorization': "Bearer " + localStorage.getItem("token"),
      },
    }).then((res) => {
      res.json().then((da) => {
        setCourse(da.data);
      });
    });
  }, []);

  return (
    <div style={{display:'flex',flexWrap:"wrap",justifyContent:'center'}}>
        LearnStack
      {course.map((el) => {
        return <Source cour={el}> </Source>;
      })}
    </div>
  );
}

export function Source(props) {
  return (
        <Card 
            style={
                {width:300,
                margin:10,
                minHeight:200}}>

                <Typography textAlign={'center'} variant={"h6"}>{props.cour.title} </Typography>
                <Typography textAlign={"center"} variant={"h6"}>{props.cour.desc}</Typography>
                <img  style={{width:300}} src={props.cour.image} alt="" />
            <center><Button
                variant ="outlined"
                onClick={()=>{
                    window.location = `/course/${props.cour.id}`
                }
                }
                >Edit</Button> </center>
            
        </Card>
  );
}

export default Courses;
