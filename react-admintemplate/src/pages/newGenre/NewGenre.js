import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";

function NewGenre() {
  const [name, setName] = useState();
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/books/genre", name);
      navigate("/books/genre");
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <div className="wrapper">
        <Navbar />
        <Sidebar />
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
                    <li className="breadcrumb-item">
                      <a href="#">Home</a>
                    </li>
                    <li className="breadcrumb-item active">Create Genre</li>
                  </ol>
                </div>
              </div>
            </div>
            {/* /.container-fluid */}
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
                            <div className="form-group">
                              <label>Name</label>
                              <input
                                id="name"
                                type="text"
                                placeholder="Novel"
                                onChange={(e) => {
                                  setName({ [e.target.id]: e.target.value });
                                }}
                                className="form-control"
                              />
                            </div>
                          </div>
                          {/* col-1 end */}
                        </div>
                        {/* row end */}
                        <div className="card-footer">
                          <button
                            type="submit"
                            onClick={handleClick}
                            className="btn btn-primary"
                          >
                            Submit
                          </button>
                        </div>
                      </form>
                    </div>
                    {/* /.card-body */}
                  </div>
                </div>
                {/*/.col (right) */}
              </div>
              {/* /.row */}
            </div>
            {/* /.container-fluid */}
          </section>
        </div>
      </div>
    </React.Fragment>
  );
}

export default NewGenre;
