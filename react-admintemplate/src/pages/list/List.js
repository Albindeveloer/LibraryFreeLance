import React from 'react'
import Datatable from '../../components/datatable/Datatable'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import {Link, useLocation} from "react-router-dom"

function List({columns}) {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
    console.log("loc",path)
  return (
    <React.Fragment>
        <div className="wrapper">
            <Navbar/>
            <Sidebar/>
            <div className="content-wrapper">
    {/* Main content */}
    <section className="content">
      <div className="container-fluid">
        {/* Small boxes (Stat box) */}
        <div className="row">
        <div className="w-100 p-3">
          <Link to={`/${path}/create`}>
            <button className='float-right'>Add new {path}</button>
          </Link>
      </div>
          
          {/* right col */}
            <Datatable columns={columns}/>
        </div>
        {/* /.row (main row) */}
      </div>{/* /.container-fluid */}
    </section>
    {/* /.content */}
  </div>

        </div>
    </React.Fragment>
  )
}

export default List