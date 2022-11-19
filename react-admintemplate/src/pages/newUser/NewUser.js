import React, { useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import { userInputs } from '../../formsource'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function NewUser() {
    const [info,setInfo]=useState({})
    const [error,setError]=useState()
    const navigate=useNavigate()

    const handleChange=(e)=>{
        setInfo({...info, [e.target.id] : e.target.value})
        console.log("info is",info)
      }

    const handleClick=async(e)=>{
        e.preventDefault();
        try{
            await axios.post("/auth/register",info)
            navigate("/users")
        }catch(err){
            console.log(err)
            setError(err.response.data.message)
            console.log("erorr",error)
        }
    }
  return (
    <React.Fragment>
        <div className="wrapper">
            <Navbar/>
            <Sidebar/>
                       {/* Content Header (Page header) */}

                       <div className="content-wrapper">
            <section className="content-header">
            <div className="container-fluid">
                <div className="row mb-2">
                <div className="col-sm-6">
                    <h1>Create User</h1>
                </div>
                <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item active">Create User</li>
                    </ol>
                </div>
                </div>
            </div>{/* /.container-fluid */}
            </section>
        <section className="content">
  <div className="container-fluid">
    <div className="row">
      {/* left column */}
      <div className="col-md-6">
        {/* general form elements */}
        <div className="card card-primary">
          <div className="card-header">
            <h3 className="card-title">User</h3>
          </div>
            <p className="text-danger" >{error && <span>{error}</span>}</p>
          {/* /.card-header */}
          {/* form start */}
            <div className="card-body">
          <form>
          <div className="row">
          <div className="col-sm-6">

             {userInputs.map((input)=>(
               <div className="form-group" key={input.id}>
              <label>{input.label}</label>
              <input id={input.id} type={input.type} placeholder={input.placeholder} onChange={handleChange} className="form-control" />
            </div>
             ))}

          </div>{/* col-1 end */}

          <div className="col-sm-6">   
              <div className="form-group">
                <label htmlFor="exampleInputFile">File input</label>
                <div className="input-group">
                  <div className="custom-file">
                    <input type="file" className="custom-file-input" id="exampleInputFile" />
                    <label className="custom-file-label" htmlFor="exampleInputFile">Choose file</label>
                  </div>
                  <div className="input-group-append">
                    <span className="input-group-text">Upload</span>
                  </div>
                </div>
            </div>
              
            </div>{/* col-2 end */}
            </div>{/* row end */}
            <div className="card-footer">
              <button type="submit"  className="btn btn-primary" onClick={handleClick}>Submit</button>
            </div>
            
          </form>
            </div>
            {/* /.card-body */}
        </div>
        
      </div>
      {/*/.col (right) */}
    </div>
    {/* /.row */}
  </div>{/* /.container-fluid */}
</section>
</div>
</div>
    </React.Fragment>
  )
}

export default NewUser