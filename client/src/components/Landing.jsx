import {Typography} from "@mui/material";
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useRecoilValue} from "recoil";
import {userEmailState} from "../store/selectors/userEmail.js";
import {isUserLoading} from "../store/selectors/isuserLoading.js";

function Landing(){
    const navigate = useNavigate()
    const isLoading = useRecoilValue(isUserLoading)
    const userEmail = useRecoilValue(userEmailState)
    if(isLoading){
        return<></>
    }
        return <div style={{display:'flex',justifyContent:'space-evenly',paddingTop:100}}>
            <div style={{paddingTop:100}}>
                <Typography variant={"h2"} style={{paddingBottom:10}}>
                    LearnStacks Admin
                </Typography>
                <Typography variant={'h4'}>Learn and Teach The Excellence</Typography>
                {!userEmail && !isLoading && <div>
                    <div style={{display:'flex', paddingTop:20}}>
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
                </div>}
            </div>
            <div>
                <img width={"600px"} src={'data:image/jpeg;base64,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'}/>
            </div>
        </div>

}

export default Landing