import { Typography} from "@mui/material";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {userEmailState} from "../store/selectors/userEmail.js";
import {userState} from "../store/atoms/user.js";
import {isUserLoading} from "../store/selectors/isuserLoading.js";

function Appbar() {
    const navigate = useNavigate()
    const setUser = useSetRecoilState(userState)
    const userEmail = useRecoilValue(userEmailState)
    const userLoading = useRecoilValue(isUserLoading)
    if(userLoading){
        return <></>
    }
    if(userEmail){
        return <div style={{
            display:"flex",
            justifyContent:"space-between",
            padding:10}}>
            <div onClick={()=>{
                navigate('/')}}>
                <Typography variant={'h6'}>LearnStacks</Typography>
            </div>

            <div style={{display:"flex",justifyContent:"space-around"}}>
                <div style={{marginRight:10}}>
                    {userEmail}
                </div>
                <div style={{marginRight:10}}>
                    <Button
                        variant="outlined"
                        onClick={()=>{
                            navigate('/addcourse');
                        }}
                    >Add Course</Button>
                </div>
                <div style={{marginRight:10}}>
                    <Button
                        variant="outlined"
                        onClick={()=>{
                            navigate('/courses')
                        }}
                    >Courses</Button>
                </div>
                <div>
                    <Button
                        variant="contained"
                        onClick={()=>{
                            localStorage.setItem('token',null)
                            setUser({
                                isLoading: false,
                                userEmail: null
                            })
                            // navigate('/')
                        }}
                    >Logout</Button>
                </div>
            </div>
            </div>;
    }
    else{
        return <div style={{

            display:"flex",
            justifyContent:"space-between",
            padding:10}}>

            <div>
                <Typography variant={'h6'}>Coursera</Typography>
            </div>

            <div style={{display:"flex",justifyContent:"space-between"}}>
                <div style={{paddingRight:5}}>
                    <Button
                        variant="contained"
                        onClick={()=>{
                            navigate('/signup')
                        }}
                    >Sign up</Button>
                </div>
                <div>
                    <Button
                        variant="contained"
                        onClick={()=>{
                            navigate("/login")
                        }}
                    >Log in</Button>
                </div>
            </div>
        </div>;
    }

}
export default Appbar;
