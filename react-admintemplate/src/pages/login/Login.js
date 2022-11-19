import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

function Login() {
  const [credentials,setCredentials] = useState({
    username: undefined,
    password: undefined
  })
  
  const {user,loading,error,dispatch} = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) =>{
    const value =e.target.value;
    setCredentials({
      ...credentials,
      [e.target.name] : value
    })

  }

  const handleClick = async (e)=>{
    e.preventDefault();
    // dispatch({type:"LOGIN_START"})
    console.log("when submit",credentials)
   try{
    const res= await axios.post("/auth/login",credentials);
    console.log("res is",res) 
    //admin annel mathram localstorageil keriyathi and home pageillek povam
    console.log("role",res.data.role)
    if(res.data.role == "admin"){
      dispatch({type:"LOGIN_SUCCESS", payload: res.data.details});  //only otherDetails store cheyathathi localstoragil isadmin venda
      navigate("/")

    }else{
      dispatch({type:"LOGIN_FAILURE",payload: {message:"You are not allowed"} })
    }

   }
  catch(err){
    dispatch({type:"LOGIN_FAILURE", payload: err.response.data});
  }

  }
  console.log("user is",user)

  return (
    <React.Fragment>
      <body className="hold-transition login-page">
      <div className="login-box">
  <div className="card card-outline card-primary">
    <div className="card-header text-center">
      <a className="h1"><b>Library</b>WK</a>
    </div>
    <div className="card-body">
      <p className="login-box-msg">Sign in to start your session</p>
      <p className=" bg-danger text-white" >{error && <span>{error.message}</span>}</p>
      <form action="../../index3.html" method="post">
        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="userName" name="username"  onChange={handleChange}/>
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-envelope" />
            </div>
          </div>
        </div>
        <div className="input-group mb-3">
          <input type="password" className="form-control" placeholder="Password" name="password" onChange={handleChange}/>
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-lock" />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-8">
            <div className="icheck-primary">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">
                Remember Me
              </label>
            </div>
          </div>
          <div className="col-4">
            <button type="submit" className="btn btn-primary btn-block" onClick={handleClick}>Sign In</button>
          </div>
        </div>
      </form>
      <div className="social-auth-links text-center mt-2 mb-3">
        <a href="#" className="btn btn-block btn-primary">
          <i className="fab fa-facebook mr-2" /> Sign in using Facebook
        </a>
        <a href="#" className="btn btn-block btn-danger">
          <i className="fab fa-google-plus mr-2" /> Sign in using Google+
        </a>
      </div>
      <p className="mb-1">
        <a href="forgot-password.html">I forgot my password</a>
      </p>
      <p className="mb-0">
        <a href="register.html" className="text-center">Register a new membership</a>
      </p>
    </div>
  </div>
</div>
</body>

    </React.Fragment>
  )
}

export default Login