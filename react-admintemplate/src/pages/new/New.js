import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Datatable from "../../components/datatable/Datatable";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { bookNumberColumns } from "../../datatablesource";
import { subBookInputs } from "../../formsource";
import UseFetch from "../../hooks/UseFetch";

function New() {
  const [bookdata, setBookdata] = useState({});
  const [info, setInfo] = useState({});
  const location = useLocation();
  const { id } = location.state;
  console.log("loc data is", location);
  const [openModal,setOpenModal]=useState(false)


  const { data, loading, reFetch} = UseFetch(`/books/byfield/book/${id}`);
  console.log("data is", data && data[0]);

  useEffect(()=>{
      setBookdata(data)
   
  },[data])
  console.log("bookdata",bookdata && bookdata[0])
  const handleChange = (e) => {
    setInfo({ ...info, [e.target.id]: e.target.value });
    console.log("info is", info);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    console.log(info);
    try{

      await axios.put(`/books/addbook/${id}`, info);
      reFetch()
      console.log("refteched",data)
      setOpenModal(true)
    }
    catch(err){

    }
  };
  return (
    <React.Fragment>
      <div className="wrapper">
        <Navbar />
        <Sidebar />

        <div className="content-wrapper">
          <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1>Sub Books</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item">
                      <a href="#">Home</a>
                    </li>
                    <li className="breadcrumb-item active">Blank Page</li>
                  </ol>
                </div>
              </div>
            </div>
          </section>
          <section className="content">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Book</h3>
                <div className="card-tools">
                  <button
                    type="button"
                    className="btn btn-tool"
                    data-card-widget="collapse"
                    title="Collapse"
                  >
                    <i className="fas fa-minus" />
                  </button>
                  <button
                    type="button"
                    className="btn btn-tool"
                    data-card-widget="remove"
                    title="Remove"
                  >
                    <i className="fas fa-times" />
                  </button>
                </div>
              </div>
              <div className="card-body">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="card card-widget widget-user shadow">
                        <div className="widget-user-header bg-info">
                          <h3 className="widget-user-username">
                            {bookdata && bookdata[0]?.title}
                          </h3>
                          <h5 className="widget-user-desc">
                            {bookdata && bookdata[0]?.language}
                          </h5>
                        </div>
                        <div className="widget-user-image">
                          <img
                            className="img-circle elevation-2"
                            src="../dist/img/user1-128x128.jpg"
                            alt="User Avatar"
                          />
                        </div>
                        <div className="card-footer">
                          <div className="row">
                            <div className="col-sm-4 border-right">
                              <div className="description-block">
                                <h5 className="description-header">Auther</h5>
                                <span className="description-text">
                                  {bookdata && bookdata[0]?.authors[0].name}
                                </span>
                              </div>
                            </div>
                            <div className="col-sm-4 border-right">
                              <div className="description-block">
                                <h5 className="description-header">Genre</h5>
                                {bookdata && bookdata[0]?.genres[0].name}
                              </div>
                            </div>
                            <div className="col-sm-4">
                              <div className="description-block">
                                <h5 className="description-header">{bookdata && bookdata[0]?.bookNumber.length}</h5>
                                <span className="description-text">Books</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="card card-primary">
                        <div className="card-header">
                          <h3 className="card-title">Add Subbook</h3>
                        </div>
                        <form>
                          <div className="card-body">
                            {subBookInputs.map((input) => (
                              <div className="form-group" key={input.id}>
                                <label>{input.label}</label>
                                <input
                                  id={input.id}
                                  type={input.type}
                                  placeholder={input.placeholder}
                                  onChange={handleChange}
                                  className="form-control"
                                />
                              </div>
                            ))}
                          </div>
                          <div className="card-footer">
                            <button
                              type="submit"
                              className="btn btn-primary"
                              onClick={handleClick}
                            >
                              Submit
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div>
                <button className="btn btn-tool" onClick={()=>{setOpenModal(true)}}>
                  <ion-icon name="book-outline" size="large"></ion-icon>
                </button>
                </div>
                {openModal &&
                  <div>
                  <Datatable
                    columns={bookNumberColumns}
                    bookRow={bookdata && bookdata[0]?.bookNumber}
                    bookid={bookdata && bookdata[0]?._id}
                  />
                  </div>
                }
              </div>
            </div>
          </section>
        </div>
      </div>
    </React.Fragment>
  );
}

export default New;
