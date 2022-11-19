
import React,{ useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import { bookInputs } from '../../formsource'
import Select from "react-select";
import UseFetch from '../../hooks/UseFetch';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function NewBook() {
  const [info,setInfo] = useState({})
  const navigate=useNavigate()

   // React state to manage selected options
   const [selectedOptions, setSelectedOptions] = useState();
   const [selectedAuthers, setSelectedAuthers] = useState();
   const [dbGenres,setDbGenres]=useState()
   const [dbAuthers,setDbAuthers]=useState()

   //use two or more customHook in one component😎🦾
   const {data:GenreData,loading:GenreLoading}=UseFetch("/books/genre") 
   const {data:AutherData,loading:AutherLoading}=UseFetch("/books/auther")
   //console.log(GenreData)
   
   useEffect(()=>{
     setDbGenres(GenreData?.data)
     setDbAuthers(AutherData?.data)
     //console.log("geners",dbGenres)
    
   })
   // Array of all options
   const optionList =dbGenres?.map(genre=>({ value: genre._id, label: genre.name }))
   const autherList =dbAuthers?.map(auther=>({ value: auther._id, label: auther.name }))
   // console.log("optionList is", optionList)
 
   // Function triggered on selection
   function handleSelect(data) {
     setSelectedOptions(data);
     console.log(data)
   }
   function handleAutherSelect(data) {
    setSelectedAuthers(data);
  }

  const handleChange=(e)=>{
    setInfo({...info, [e.target.id] : e.target.value})
    console.log("info is",info)
  }
  //form submit
  const handleClick= async(e)=>{
    e.preventDefault();

    try{
      //selectbox data, arr of obj to arr of properties
      const genre= selectedOptions?.map((genre)=>{
        return genre.value
      })
      const author= selectedAuthers?.map((auther)=>{
        return auther.value
      })

      let {ISBN,price,...others}=info
      const newBook={
        bookNumber:[{ISBN,price}],
        ...others,
        genre,
        author
      }
      console.log("newbook is",newBook)
      await axios.post("/books",newBook)

      navigate("/books")
      
    }
    catch(err){
      console.log("err",err)
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
                    <h1>Create Book</h1>
                </div>
                <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item active">Create Book</li>
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
            <h3 className="card-title">Book</h3>
          </div>
          {/* /.card-header */}
          {/* form start */}
            <div className="card-body">
          <form>
          <div className="row">
          <div className="col-sm-6">

             {bookInputs.map((input)=>(
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

                <div className="form-group">
                  <label>Genre</label>
                  <Select
                          options={optionList}
                          placeholder="Select Genres"
                          value={selectedOptions}
                          onChange={handleSelect}
                          isSearchable={true}
                          isMulti
                        />
              </div>
              <div className="form-group">
                  <label>Auther</label>
                   <Select
                          options={autherList}
                          placeholder="Select Authers"
                          value={selectedAuthers}
                          onChange={handleAutherSelect}
                          isSearchable={true}
                          isMulti
                        />
              </div>

              </div>

            </div>{/* col-2 end */}
            </div>{/* row end */}
            <div className="card-footer">
              <button type="submit" onClick={handleClick} className="btn btn-primary">Submit</button>
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

export default NewBook