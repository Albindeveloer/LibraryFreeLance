import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import UserBookDatatable from "../../components/datatable/UserBookDatatable";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { owedColumns } from "../../datatablesource";
import { userInputs } from "../../formsource";
import UseFetch from "../../hooks/UseFetch";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ViewUser() {
  const location = useLocation();
  const { id, user } = location.state;
  console.log("loc data is", location);
  console.log(id);
  const [openModal, setOpenModal] = useState(false);
  const [userdata, setUserdata] = useState({});
  
  //edit user
  const [info, setInfo] = useState({});
  const [error,setError]=useState(null)

  const { data,reFetch, loading } = UseFetch(`/users/findBook/${id}`);
  console.log("dsd", openModal);

  useEffect(() => {
    if(location.state.reload){
      reFetch()
      setOpenModal(false)
      location.state.reload=false   //prevent indefinte loading
    }
    setUserdata(data);
  }, [data,location]);
  console.log("userDataad", userdata);

  //edit user
  const handleChange = (e) => {
    setInfo({ ...info, [e.target.id]: e.target.value });
    console.log("info is", info);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/users/${id}`, info);
      toast("user updated successfully 👱‍♂️!");
    } catch (err) {
      console.log(err);
      setError(err.response.data.message)
      console.log("erorr",error)
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
                  <h1>User details</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item">
                      <a href="#">Home</a>
                    </li>
                    <li className="breadcrumb-item active">Blank Page</li>
                  </ol>
                  <ToastContainer />
                </div>
              </div>
            </div>
          </section>
          <section className="content">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">User</h3>
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
                          <h3 className="widget-user-username">{user}</h3>
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
                            <div className="col-sm-4">
                              <div className="description-block">
                                <h5 className="description-header">
                                  {userdata?.total}
                                </h5>
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
                          <h3 className="card-title">edit user</h3>
                        </div>
                        <div className="card-body">
                        <p className="text-danger" >{error && <span>{error}</span>}</p>
                          <form>
                            <div className="row">
                              <div className="col-sm-6">
                                {userInputs.map((input) => (
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
                              {/* col-1 end */}

                              <div className="col-sm-6">
                                <div className="form-group">
                                  <label htmlFor="exampleInputFile">
                                    File input
                                  </label>
                                  <div className="input-group">
                                    <div className="custom-file">
                                      <input
                                        type="file"
                                        className="custom-file-input"
                                        id="exampleInputFile"
                                      />
                                      <label
                                        className="custom-file-label"
                                        htmlFor="exampleInputFile"
                                      >
                                        Choose file
                                      </label>
                                    </div>
                                    <div className="input-group-append">
                                      <span className="input-group-text">
                                        Upload
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/* col-2 end */}
                            </div>
                            {/* row end */}
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
              </div>

              <div>
                <div>
                  <button
                    className="btn btn-tool "
                    onClick={() => {
                      setOpenModal(!openModal);
                    }}
                  >
                    <ion-icon name="book-outline" size="large"></ion-icon>
                  </button>
                </div>
                {openModal && (
                  <div>
                    <UserBookDatatable userid={id} columns={owedColumns} />
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ViewUser;
