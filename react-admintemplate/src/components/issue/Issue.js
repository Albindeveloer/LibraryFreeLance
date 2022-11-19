import React, { createContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Select from "react-select";
import UseFetch from "../../hooks/UseFetch";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  height:500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};


function Issue({ open,bookid,subBookId,available}) {
  const [dbUsers,setDbUsers]=useState()
  const [selectedOptions, setSelectedOptions] = useState();
  const [startDate, setStartDate] = useState(new Date());
  

  console.log("tart date ",startDate)


   //use two or more customHook in one component😎🦾
   const {data:users,loading:usersLoading}=UseFetch("/users") 
   console.log("users",users?.data)
   
   const { data:details, loading:detaisLoading, reFetch} = UseFetch(`/books/${subBookId}/${bookid}`);    //for clculate fine
   console.log("details",details)
    

     let dDate= new Date(details && details[0].items[0])
     let cDate=new Date();
     let fine=0;
      if(cDate>=dDate){
        let difference = cDate.getTime() - dDate.getTime();
        let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
        console.log(TotalDays + ' days to world Cup');
        fine =(TotalDays-1)*5;
  
      }
   
   useEffect(()=>{
    
     setDbUsers(users?.data)
     //console.log("geners",dbGenres)
    
   },[users])
   // Array of all options
   const userList =dbUsers?.map(user=>({ value: user._id, label: user.username }))

   function handleSelect(data) {
    setSelectedOptions(data);
    console.log(data)
  }

  const handleIssue= async(e)=>{
    e.preventDefault();
    console.log("selecteusres",typeof(selectedOptions.value) )
    console.log("bookid",bookid )
    console.log("subookid",typeof(subBookId) )
    try{
      const issueBook={
        name : selectedOptions.value,
        dueDate : startDate
      }
      
      await axios.put(`/books/${subBookId}/${bookid}`,issueBook)
      open(false)
      window.location.reload();
    }
    catch(err){
console.log(err)
    }
  }

  const handleReturn= async(e)=>{
    try{
      await axios.put(`/books/return/${subBookId}/${bookid}`)
      window.location.reload();
    }catch(err)
    {
      console.log(err)
    }
  }

  return (
    <React.Fragment>
      <Modal
        disableEnforceFocus
        open={true}
        onClose={() => open(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {available ?
        <Box sx={style}>
          <i class="ionicons ion-close" onClick={() => open(false)}></i>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          <div className="form-group">
                  <label>User</label>
                   <Select
                          options={userList}
                          placeholder="Select User"
                          onChange={handleSelect}
                          value={selectedOptions}
                          isSearchable={true}
                        />
              </div>
          </Typography>
          <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <button className="btn btn-primary" onClick={handleIssue}>issue</button>
          </Typography>
          </Box>
          :
          <Box sx={style}>
          <i class="ionicons ion-close" onClick={() => open(false)}></i>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          <div className="form-group">
           <b><h5>borrowed by :</h5> {details && details[0].items[1]}</b><br/>
           <b><h6>due date :</h6> {details && details[0].items[0]}</b>
           <b><h6>fine :</h6> {fine}</b>
          </div>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <button className="btn btn-primary" onClick={handleReturn}>return</button>
          </Typography>
        </Box>
        
      }
        
      </Modal>
      </React.Fragment>
  );
}

export default Issue;
