import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Appbar from "./components/Appbar.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import Addcourse from "./components/Addcourse.jsx";
import Courses from "./components/Courses.jsx";
import Course from "./components/Course.jsx";
import Landing from "./components/Landing.jsx";
import {RecoilRoot, useSetRecoilState} from 'recoil';
import {userState} from "./store/atoms/user.js";
import axios from "axios";
import {useEffect} from "react";

function App() {
  return (
      <RecoilRoot>
        <div
          style={{
            width: "100vw",
            height: "100vh",
            backgroundColor: "#eeeeee",
          }}
        >

          <Router>
              <Appbar />
              <InitUser />
            <Routes>
              <Route path="/addcourse" element={<Addcourse/>} />
              <Route path="/courses" element={<Courses/>} />
              <Route path="/course/:id" element={<Course/>} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
                <Route path="/" element={<Landing />} />
            </Routes>
          </Router>
        </div>
      </RecoilRoot>
  );
}
function InitUser(){
    const setUser = useSetRecoilState(userState)
    const init = async () => {
        try{
            const res = await axios.get('http://localhost:3000/admin/me',{
                headers:{
                    'authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            if(res.data.username){
                setUser({
                    isLoading: false,
                    userEmail: res.data.username
                })
            }
            else{
                setUser({
                    isLoading: false,
                    userEmail: null
                })
            }
        }catch (e){
            setUser({
                isLoading: false,
                userEmail: null
            })
        }
    }
    useEffect(() => {
        init();
    },[] );
    return <></>
}

export default App;
