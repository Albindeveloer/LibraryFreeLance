import React, { useEffect, useState } from 'react'
import axios from "axios"
import {Link, useLocation} from "react-router-dom"

import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Bookcolumns, bookNumberColumns, columns, userColumns } from '../../datatablesource';
import UseFetch from '../../hooks/UseFetch';
import Issue from '../issue/Issue';



function Datatable({columns,bookRow,bookid}) {
  const [openModal,setOpenModal]=useState(false)
  const [subBookId,setSubBookId]=useState()
  const [available,setAvailable]=useState()

  const location = useLocation();
  const path = location.pathname;      // used for delete operaions avoid complexity in integrating all routes in one datatable
  const firstPath = location.pathname.split("/")[1];  
  console.log("location is now", path)
  console.log("firstPath is now", firstPath)
  console.log("rebookrow",bookRow)

  //for server side pagination in mui datagrid 
  const [pageState, setPageState] = useState({
    isLoading: false,
    data: [],
    total: 0,
    page: 1,
    pageSize: 5
  })

  
  //const {data,loading}=UseFetch(`${path}`)
  useEffect(()=>{
    if(bookRow){

        setPageState(old => ({ ...old, isLoading: false, data: bookRow }))
      }
      else{
      //to fetch data
      const fetchData = async () => {
      setPageState(old => ({ ...old, isLoading: true }))
      const res= await axios.get(`${path}?page=${pageState.page}&limit=${pageState.pageSize}`);    // can't use hooks in other hook ,so we diidn't use UseFectch
     
      console.log("server pgintion dt",res.data.data)
      setPageState(old => ({ ...old, isLoading: false, data: res.data.data, total: res.data.total }))

    }
    fetchData()
    }
  },[path,bookRow,pageState.page, pageState.pageSize])

  const handleDelete=async(id,columns)=>{
    try{
      if(columns === bookNumberColumns){
        await axios.delete(`/${firstPath}/${id}/${bookid}`)
      }
      else if(columns === userColumns){
        await axios.delete(`/${firstPath}/${id}`)    //urls is /users/67834280878
      }
      else{
        await axios.delete(`${path}/${id}`)   //   urls like /books/auther/6083652639
      }
      console.log("*****pd*********",pageState.data)
      setPageState(old => ({...old,  data: pageState.data.filter((item) => item._id !== id) , total: pageState.data?.total}) );
     
    }catch(err){
      console.log(err)
    }
  }

  const handleIssueClick=(id,available)=>{
    console.log("subid is",id)
    console.log("bookid is",bookid)
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
            <Link to={`/${firstPath}/new`} state={{ id: params.row._id }} style={{ textDecoration: "none" }}>
              <div className="btn btn-primary">View</div>
            </Link>
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
        let myVariable = (params.row.available===true) ? "info" : "secondary"
        return (
          <div>
              <div className="btn btn-danger m-3" onClick={()=>{handleDelete(params.row._id,columns)}} >Delete</div>
              <div className={`btn btn-${myVariable} `}   onClick={()=>{handleIssueClick(params.row._id,params.row.available)}} > Issue</div>
              </div>
             
        );
      },
    },
  ];

  const actionColumn3 = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
              <div className="btn btn-danger m-3" onClick={()=>{handleDelete(params.row._id,columns)}} >Delete</div>
        );
      },
    },
  ];

  return (

    <Box sx={{ height: 700, width: '100%', }}>
      
      <DataGrid
        rows={pageState.data?pageState.data:""}
        rowCount={pageState.total&&pageState.total}
        loading={pageState.isLoading}
        columns={(columns === Bookcolumns)?columns.concat(actionColumn):(columns === bookNumberColumns)?columns.concat(actionColumn2):columns.concat(actionColumn3)}
        getRowId={(row) => row._id}
        pagination
        page={pageState.page - 1}
        pageSize={pageState.pageSize}
        paginationMode="server"
        rowsPerPageOptions={[5,10, 30, 50, 70, 100]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
        onPageChange={(newPage) => {
          setPageState(old => ({ ...old, page: newPage + 1 }))
        }}
        onPageSizeChange={(newPageSize) => setPageState(old => ({ ...old, pageSize: newPageSize }))}

        />
  
 
<div>

 {openModal && <Issue open={setOpenModal} bookid={bookid} subBookId={subBookId} available={available}/>}
</div>

    </Box>

   
  )
}

export default Datatable