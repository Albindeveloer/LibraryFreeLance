import { BrowserRouter, Navigate, Route, Routes, } from "react-router-dom";
import Login from "./pages/login/Login"
import Home from "./pages/home/Home"
import New from "./pages/new/New";
import List from "./pages/list/List"
import NewBook from "./pages/newBook/NewBook";
import {  authorColumns, Bookcolumns, genreColumns, userColumns } from "./datatablesource";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import NewUser from "./pages/newUser/NewUser";
import NewGenre from "./pages/newGenre/NewGenre";
import NewAuthor from "./pages/newAuthor/NewAuthor";
function App() {

  const ProtectedRoute=({children})=>{
    const {user}=useContext(AuthContext)

    if(!user){
      return <Navigate to="/login" />
    }

    return children
  }
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path="/">
        <Route path="login" element={<Login/>}/>
        <Route index element={
          <ProtectedRoute>
            <Home/>
          </ProtectedRoute>
        }/>

      </Route>

      <Route path="users">
              <Route index element={
                <ProtectedRoute>
                  <List columns={userColumns}/>
                </ProtectedRoute>
                  } />
              <Route
                path="create"
                element={
                  <ProtectedRoute>
                    <NewUser/>
                  </ProtectedRoute>
                  }
              />
            </Route>

            <Route path="books">
              <Route index element={
                <ProtectedRoute>
                  <List columns={Bookcolumns}/>
                </ProtectedRoute>
                  } />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <New/>
                  </ProtectedRoute>
                  }
              />
              <Route
                path="create"
                element={
                  <ProtectedRoute>
                    <NewBook/>
                  </ProtectedRoute>
                  }
              />
            </Route>
                  
            <Route path="books/auther">
              <Route index element={
                <ProtectedRoute>
                  <List columns={authorColumns}/>
                </ProtectedRoute>
                  } />
              <Route
                path="create"
                element={
                  <ProtectedRoute>
                    <NewAuthor/>
                  </ProtectedRoute>
                  }
              />
            </Route>

            <Route path="books/genre">
              <Route index element={
                <ProtectedRoute>
                  <List columns={genreColumns}/>
                </ProtectedRoute>
                  } />
              <Route
                path="create"
                element={
                  <ProtectedRoute>
                    <NewGenre/>
                  </ProtectedRoute>
                  }
              />
            </Route>
            <Route path="*" element={ <Home/> } />

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
