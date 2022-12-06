import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { bookNumberColumns, owedColumns } from '../../datatablesource';
import UseFetch from '../../hooks/UseFetch';
import Issue from '../issue/Issue';

function UserBookDatatable({userid,issued}) {

  const [openModal,setOpenModal]=useState(false)
  const [subBookId,setSubBookId]=useState()
  const [available,setAvailable]=useState()
  const [bookId,setBookId]=useState()


    console.log(userid)
    const[pageState,setPageState]=useState();
    
    const { data, loading} = ((issued)? UseFetch("/books/issuedBooks") : UseFetch(`/users/findBook/${userid}`));
    console.log("data is",data&&data)
    const [sub,setSub]=useState(false)
   
    useEffect(()=>{
        setPageState(data?.data)
    },[data])

    console.log("maaped book",pageState)

    //fetch suBooks
    const fetchSubBooks=async(bookid)=>{
      let data=null;
      if( issued){
        
          data= await axios.get(`/books/find/issuedSubBooks/${bookid}`);
      }else{
          data= await axios.get(`/users/findBook/${userid}/${bookid}`);
      }
      console.log("subbook",data&&data)
      const subData=data?.data.data[0].data
      setPageState(subData)
      //to open subookdatable
      setSub(true)
      //to return
      setBookId(bookid)
    }
    //return
    const handleIssueClick=(id,available)=>{
      console.log("subid is",id)
      console.log("bookid is",bookId)
      setOpenModal(true)
      setSubBookId(id)
      setAvailable(available)
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
                <div className={`btn btn-danger `} onClick={()=>{handleIssueClick(params.row._id,params.row.available)}}> Retun</div>
                </div>
               
          );
        },
      },
    ];

  return (
    <Box sx={{ height: 700, width: '100%', }}>
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

{openModal && <Issue open={setOpenModal} bookid={bookId} subBookId={subBookId} available={available}/>}
</div>

  </Box>
  )
}

export default UserBookDatatable