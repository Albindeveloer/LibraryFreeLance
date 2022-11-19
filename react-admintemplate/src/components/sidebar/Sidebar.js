import { Link, useNavigate } from "react-router-dom"
import React, { useContext } from 'react'
import { AuthContext } from "../../context/AuthContext"

function Sidebar() {
  const {user,dispatch}=useContext(AuthContext)
  const navigate=useNavigate()

  const handleClick = () =>{
    dispatch({type:"LOGOUT"})
    navigate("/")
  }

  return (
    <React.Fragment>
        {/* Main Sidebar Container */}
  <aside className="main-sidebar sidebar-dark-primary elevation-4">
    {/* Brand Logo */}
    <a className="brand-link">
      <img src="" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} />
      <span className="brand-text font-weight-light">AdminLTE 3</span>
    </a>
    {/* Sidebar */}
    <div className="sidebar">
      {/* Sidebar user panel (optional) */}
      <div className="user-panel mt-3 pb-3 mb-3 d-flex">
        <div className="image">
          <img src="" className="img-circle elevation-2" alt="User Image" />
        </div>
        <div className="info">
          <span className="d-block text-light">{user.username}</span>
        </div>
      </div>
      {/* Sidebar Menu */}
      <nav className="mt-2">
        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          {/* Add icons to the links using the .nav-icon class
       with font-awesome or any other icon font library */}
          <li className="nav-item">
          <Link to="/" className="nav-link" style={{ textDecoration: "none" }}>
              <i className="nav-icon fas fa-tachometer-alt" />
              <p>
                Dashboard
              </p>
          </Link>
          </li>

          <li className="nav-item">
          <Link to="/users" className="nav-link" style={{ textDecoration: "none" }}>
          <ion-icon name="people" className="nav-icon"></ion-icon>
                  <p>users</p>
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/books" className="nav-link" style={{ textDecoration: "none" }}>
          <ion-icon name="book-outline" className="nav-icon"></ion-icon>
                  <p>Books</p>
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/books/genre" className="nav-link" style={{ textDecoration: "none" }}>
          <ion-icon name="book-outline" className="nav-icon"></ion-icon>
                  <p>Genres</p>
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/books/auther" className="nav-link" style={{ textDecoration: "none" }}>
          <ion-icon name="book-outline" className="nav-icon"></ion-icon>
                  <p>Authors</p>
            </Link>
          </li>
          
<li className="nav-item">
  <a className="nav-link">
    <i className="nav-icon fas fa-tachometer-alt" />
    <p>
      operations
      <i className="right fas fa-angle-left" />
    </p>
  </a>
  <ul className="nav nav-treeview">
    <li className="nav-item">
    <Link to="/books/create" className="nav-link" style={{ textDecoration: "none" }}>
        <i className="far fa-circle nav-icon" />
        <p>Add new Book</p>
      </Link>
    </li>
    <li className="nav-item">
    <Link to="/users/create" className="nav-link" style={{ textDecoration: "none" }}>
        <i className="far fa-circle nav-icon" />
        <p>Add new user</p>
      </Link>
    </li>
    <li className="nav-item">
    <Link to="/books/genre/create" className="nav-link" style={{ textDecoration: "none" }}>
        <i className="far fa-circle nav-icon" />
        <p>create Genre</p>
    </Link>
    </li>
    <li className="nav-item">
    <Link to="/books/auther/create" className="nav-link" style={{ textDecoration: "none" }}>
        <i className="far fa-circle nav-icon" />
        <p>create Author</p>
    </Link>
    </li>
  </ul>
</li>
   <button type="button" className="btn btn-info btn-sm" onClick={handleClick}>Logout</button>
        </ul>
      </nav>
      {/* /.sidebar-menu */}
    </div>
    {/* /.sidebar */}
  </aside>
    </React.Fragment>
  )
}

export default Sidebar