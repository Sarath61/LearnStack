import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Typography , TextField , Button} from "@mui/material";
import Card from "@mui/material/Card";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {courseState} from "../store/atoms/course.js";
import axios from "axios";
import {courseImage, coursePrice, courseTitle, isCourseLoading} from "../store/selectors/course.js";

function Course() {
  let { id } = useParams();
  const setCourse = useSetRecoilState(courseState)
  const courseLoading = useRecoilValue(isCourseLoading)

  useEffect( () => {
      axios.get(`http://localhost:3000/admin/courses/${id}`,{
          headers : {
              'authorization' : 'Bearer ' + localStorage.getItem("token")
          }
      }).then(res => {
          setCourse({
              isLoading: false,
              course: res.data.data
          })
      }).catch(err => {
          setCourse({
              isLoading: false,
              course: null
          })
      })

  }, []);

  if (courseLoading) {
    return <div>loading.....</div>;
  }

  return (
    <div>
      <CourseCard Course/>
      <UpdateCard  setCourse/>
    </div>
  );
}

function UpdateCard() {
    const [courseDetails,setCourse] = useRecoilState(courseState)
    const [title ,setTitle] = useState(courseDetails.course.title)
    const [description,setDescription] = useState(courseDetails.course.description)
    const [image , setImage] = useState(courseDetails.course.image)
    const [price , setPrice] = useState(courseDetails.course.price)
  return (
    <div>
      <div
        style={{
          display: "flex",
        }}
      >
        <Card varint="outlined" style={{ width: 400, padding: 30 }}>
          <div>
            <TextField
              fullWidth={true}
              value={title}
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
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              label="Description"
              variant="outlined"
            />
            <br />
            <br />
            <TextField
              fullWidth={true}
              value={image}
              onChange={(e) => {
                setImage(e.target.value);
              }}
              label="imagelink"
              variant="outlined"
            />
              <br/>
              <br/>
              <TextField
              fullWidth={true}
              value={price}
              onChange={(e) => {
                  setPrice(e.target.value);
              }}
              label="Price"
              variant="outlined"
            />
            <br />
            <br />
            <Button
              size="large"
              variant="contained"
              onClick={() => {
                      axios.patch(`http://localhost:3000/admin/courses/${courseDetails.course.id}`,{
                              body : {
                                  title: title,
                                  description: description,
                                  image :image,
                                  published: true,
                                  price
                                }
                              }, {
                                  headers: {
                                      'content-type': 'application/json',
                                      'authorization': 'Bearer ' + localStorage.getItem('token')
                                  }
                              }
                        )
                  console.log( {
                      title: title,
                      description: description,
                      image :image,
                      published: true,
                      price
                  })
                  let updateCourse = {
                      id: courseDetails.course.id,
                      title: title,
                      description: description,
                      image: image,
                      price
                  }
                  setCourse({
                      course: updateCourse,
                      isLoading: false
                  })
                }}
            >
              Update Course
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

function CourseCard() {
    const title= useRecoilValue(courseTitle)
    const price = useRecoilValue(coursePrice)
    const image = useRecoilValue(courseImage)
  return (
    <Card style={{ width: 300, margin: 10, minHeight: 200 }}>
      <Typography textAlign={"center"} variant={"h6"}>
        {title}
      </Typography>
      <Typography textAlign={"center"} variant={"h6"}>
        {price}
      </Typography>
      <img style={{ width: 300 }} src={image} alt="" />
    </Card>
  );
}
export default Course;
