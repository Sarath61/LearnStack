const express = require("express");

const morgan = require("morgan");

const cors = require("cors");

const jwt = require("jsonwebtoken");



const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

let ADMIN = [];
let COURSE = [];
let USER = [];

const secretKey = "superset61";

const generateJwt = (user) => {
  const payload = { username: user.username };
  const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });
  return token;
};

const Authenticationjwt = (req, res, next) => {
  const autherHeader = req.headers.authorization;
  if ( (autherHeader.split(' ')[1] ) !== 'null' ) {
    const token = autherHeader.split(' ')[1];
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.status(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json({
      result: "Fail",
      Message: "No Authenticationtoken found...",
    });
  }
};


app.get("/admin/me", Authenticationjwt , (req , res)=> {
    res.status(200).json({
      username : req.user.username
    })
})

app.post("/admin/signup", (req, res) => {
  const admin = req.body;
  const existadmin = ADMIN.find((el) => el.username === admin.username);
  if (existadmin) {
    res.status(403).json({
      result: "Fail",
      Meassage: "User already exist..",
    });
  } else {
    ADMIN.push(admin);
    const token = generateJwt(admin);
    res.status(200).json({token})
  }
});

app.post("/admin/login", (req, res) => {
  const { username, password } = req.headers;
  const pastAdmin = ADMIN.find(
    (el) => el.username === username && el.password === password
  );
  if (pastAdmin) {
    const token = generateJwt(pastAdmin);
    res.status(200).json({
      result: "Success",
      Message: "Login was succesful....",
      token,
    });
  } else {
    res.status(404).json({
      result: "Fail",
      Meassage: "Admin Authentication faild..",
    });
  }
});

app.get("/admin/courses", Authenticationjwt, (req, res) => {
  res.status(200).json({
    result: "success",
    data: COURSE,
  });
});

app.get("/admin/courses/:id", Authenticationjwt, (req, res) => {
  const id = req.params.id * 1
  const courrr =  COURSE.find(el => el.id === id)
  res.status(200).json({
    result: "success",
    data: courrr,
  });
});

app.post("/admin/courses", Authenticationjwt, (req, res) => {
  const course = req.body;
  COURSE.push({ ...course, id: Date.now() });
  res.status(200).json({
    result: "Success",
    Message: "Course Added....",
    course: COURSE.length + 1,
  });
});

app.patch("/admin/courses/:id", Authenticationjwt, (req, res) => {
  const id = req.params.id * 1;
  const Courseid = COURSE.findIndex((el) => el.id === id);

  if (Courseid > -1) {
    const updatedCourse = { ...COURSE[Courseid], ...req.body };
    COURSE[Courseid] = updatedCourse;

    res.status(200).json({
      result: "success",
      Message: "cours had updated",
      data:{
        updatedCourse
      }
    });
  } else {
    res.status(400).json({
      result: "fail",
    });
  }
});

app.post("/user/signup", (req, res) => {
  const user = req.body;
  const existadmin = USER.find((el) => el.username === user.username);
  if (existadmin) {
    res.status(403).json({
      result: "Fail",
      Meassage: "User already exist..",
    });
  } else {
    USER.push(user);
    const token = generateJwt(user);
    res.status(200).json({
      result: "Success",
      Meassage: "The Account has Created successfully..",
      token,
    });
  }
});

app.post("/user/login", (req, res) => {
  const { username, password } = req.headers;
  const pastUser = USER.find(
    (el) => el.username === username && el.password === password
  );
  if (pastUser) {
    const token = generateJwt(pastUser);
    res.status(200).json({
      result: "Success",
      Message: "Login was succesful....",
      token,
    });
  } else {
    res.status(404).json({
      result: "Fail",
      Meassage: "Admin Authentication faild..",
    });
  }
});

app.get("/user/courses", Authenticationjwt, (req, res) => {
  res.status(200).json({
    result: "success",
    data: COURSE,
  });
});

app.patch("/user/courses/:id", Authenticationjwt, (req, res) => {
  const id = req.params.id * 1;
  const Course = COURSE.find((el) => el.id === id);
  if (Course) {
    const user = USER.find((el) => el.username === req.user.username);

    if (user) {
      if (!user.purchasedCourses) {
        user.purchasedCourses = [];
      }

      user.purchasedCourses.push(Course);
      res.status(200).json({
        result: "success",
      });
    } else {
      res.status(403).json({
        result: "fail",
        Meassage: "Username not found....",
      });
    }
  } else {
    res.status(200).json({
      result: "Fail",
      Meassage: "Course was not found",
    });
  }
});

app.get("/user/courses/:id", Authenticationjwt, (req, res) => {
  const user = USER.find((el) => el.username === req.user.username);
  if (user || user.purchasedCourses) {
    res.status(200).json({
      result: "success",
      purchasedCourses: user.purchasedCourses || [],
    });
  } else {
    res.status(404).json({
      result: "Fail",
      Message: "Either of User or purchaedcourse not found....",
    });
  }
});

app.listen(3000, () => {
  console.log("App runnig.....");
});
