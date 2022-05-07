import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import AddTodo from './AddTodo';
import TodoList from './TodoList';
import EditTodo from './EditTodo';
import Categories from './CategoryList';
import EditCategory from './EditCategory';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Nabvar = styled.div`
  background: #dbfffe;
  min-height: 8vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Logo = styled.div`
  font-weight: bold;
  font-size: 23px;
  letter-spacing: 3px;
`;

const NavItems = styled.ul`
  display: flex;
  width: 400px;
  max-width: 40%;
  justify-content: space-around;
  list-style: none;
`;

const NavItem = styled.li`
  font-size: 19px;
  font-weight: bold;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
`;

const Wrapper = styled.div`
  width: 700px;
  max-width: 85%;
  margin: 20px auto;
`;

function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <Nabvar>
          <Logo>
            <Link to='/todos'>TODO</Link>
          </Logo>
          <NavItems>
            <NavItem>
              <Link to='/todos'>Todos</Link>
            </NavItem>
            <NavItem>
              <Link to='/todos/new'>Add Todo</Link>
            </NavItem>
            <NavItem>
              <Link to='/categories'>Categories</Link>
            </NavItem>
          </NavItems>
        </Nabvar>
        <Wrapper>
          <Routes>
            <Route exact path='/todos' element={<TodoList />} />
            <Route exact path='/todos/new' element={<AddTodo />} />
            <Route path='/todos/:id/edit' element={<EditTodo />} />
            <Route path='/categories' element={<Categories />} />
            <Route path='/categories/:id/edit' element={<EditCategory />} />
          </Routes>
        </Wrapper>
      </Router>
    </>
  );
}

export default App;
