import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { bookNumberColumns, owedColumns } from '../../datatablesource';
import UseFetch from '../../hooks/UseFetch';
import Issue from '../issue/Issue';
import { ToastContainer, toast } from 'react-toastify';   //for toast
import { useLocation } from 'react-router-dom';

function UserBookDatatable({userid,issued}) {
 //useEffectil location pass cheyanil,we use refetch  function 
  const location = useLocation();
  console.log("useLoc",location)

  const [openModal,setOpenModal]=useState(false)
  const [subBookId,setSubBookId]=useState()
  const [available,setAvailable]=useState()
  const [bookId,setBookId]=useState()
  const [currentTab,setCurrentTab]=useState("");
  const [sub,setSub]=useState(false)

    console.log(userid)
    const[pageState,setPageState]=useState();
    console.log("Isuued",issued)
    console.log("sub boolean",sub)
    
    const { data, reFetch, loading} = ((issued)? UseFetch("/books/issuedBooks") : UseFetch(`/users/findBook/${userid}`));
    console.log("data is",data&&data)
   
    useEffect(()=>{
      if(location.state?.reload){
        //set reload as false to pervent infinite renders
        console.log("working")
        location.state.reload=false 
        reFetch()
        setPageState(data?.data)
      }
      //want to  close  subbook table ,
        setSub(false)
        setPageState(data?.data)
        console.log("useeffect called")
      
      },[data,location])

      if(location.state?.reload){
        //want to  close  subbook table , and set reload as false to pervent infinite renders
        console.log("working")
        setSub(false)
        location.state.reload=false 
        reFetch()
        setPageState(data?.data)
      }
      console.log("maaped book",pageState&&pageState)
      console.log("now sub bool",sub)
      

    //fetch suBooks
    const fetchSubBooks=async(bookid)=>{
      let subBook=null;
      if( issued){
        
          subBook= await axios.get(`/books/find/issuedSubBooks/${bookid}`);  //getall issued sub books
      }else{
          subBook= await axios.get(`/users/findBook/${userid}/${bookid}`);   //get user sub books
      }
      console.log("subbook",subBook&&subBook)
      const subData=subBook?.data.data[0].data
      setPageState(subData)
      //to open subookdatable
      setSub(true)
      //to return
      setBookId(bookid)
    }
    //for return book, 
    //for user tab and issued book tab not for book tab
    const handleReturn=(id,available)=>{
      console.log("subid is",id)
      console.log("bookid is",bookId)
      setOpenModal(true)
      setSubBookId(id)
      setAvailable(available)
      ((issued === true)?setCurrentTab("issuedBookTab"):setCurrentTab("userTab"))
      console.log("vo",currentTab)
      
    }


    const actionColumn = [
      {
        field: "action",
        headerName: "Action",
        width: 200,
        renderCell: (params) => {
          return (
            <div>
                <div className="btn btn-primary" onClick={()=>{fetchSubBooks(params.row._id)}} >View</div>
            </div>
          );
        },
      },
    ];

    const actionColumn2 = [
      {
        field: "action",
        headerName: "Action",
        width: 200,
        renderCell: (params) => {
          return (
            <div>
                <div className={`btn btn-danger `} onClick={()=>{handleReturn(params.row._id,params.row.available)}}> Retun</div>
                </div>
               
          );
        },
      },
    ];

  return (
    <Box sx={{ height: 700, width: '100%', }}>
      <ToastContainer/>
      <div>
        <strong>{(issued === true)?"All Issued Books":""}</strong>
      </div>
      {
        loading?"loading":
      <DataGrid
      className="datagrid"
      rows={pageState?pageState:""}
      columns={(sub === false)?owedColumns.concat(actionColumn):bookNumberColumns.concat(actionColumn2)}
      pageSize={9}
      rowsPerPageOptions={[9]}
      getRowId={(row) => row._id}
      checkboxSelection
      />
    }

<div>

{openModal && <Issue open={setOpenModal} bookid={bookId} subBookId={subBookId} available={available} currentTab={currentTab} userid={userid}/>}
</div>

  </Box>
  )
}

export default UserBookDatatable