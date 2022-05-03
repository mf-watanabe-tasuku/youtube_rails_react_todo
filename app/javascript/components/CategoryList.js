import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { ImCheckboxChecked } from 'react-icons/im'
import { AiFillEdit } from 'react-icons/ai';

const InputAndButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 50px 0 30px;
`;

const InputForm = styled.input`
  font-size: 20px;
  width: 100%;
  height: 40px;
  margin: 10px 0;
  padding: 10px;
`;

const AddCategoryButton = styled.button`
  width: 16%;
  height: 40px;
  background: #f54242;
  border: none;
  font-weight: 500;
  margin-left: 10px;
  padding: 5px 10px;
  border-radius: 3px;
  color: #fff;
  cursor: pointer;
`;

const CategoryName = styled.span`
  font-size: 27px;
  flex-grow: 1;
  padding: 0 10px;
  ${({ is_completed }) => is_completed && `opacity: 0.4;`}
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 7px auto;
  padding: 10px 0;
  font-size: 25px;
`;

const CheckedBox = styled.div`
  display: flex;
  align-items: center;
  margin: 0 7px;
  color: green;
  cursor: pointer;
`;

const EditButton = styled.span`
  display: flex;
  align-items: center;
  margin: 0 7px;
`;

function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    axios
      .get('/api/v1/todo_categories')
      .then((resp) => {
        console.log(resp.data);
        setCategories(resp.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const AddCategory = () => {
    const sure = window.confirm('Are you sure?');
    if (sure) {
      axios
        .post('/api/v1/todo_categories')
        .then(() => {
          setCategories([]);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  return (
    <>
      <InputAndButton>
        <InputForm
          type='text'
          placeholder='Add new category...'
          onChange={(e) => {
            setCategoryName(e.target.value);
          }}
        />
        <AddCategoryButton onClick={AddCategory}>Add</AddCategoryButton>
      </InputAndButton>

      <div>
        {categories.map((val, key) => {
          return (
            <Row key={key}>
              <CheckedBox>
                <ImCheckboxChecked />
              </CheckedBox>
              <CategoryName>{val.name}</CategoryName>
              <Link to={'/todos/' + val.id + '/edit'}>
                <EditButton>
                  <AiFillEdit />
                </EditButton>
              </Link>
            </Row>
          );
        })}
      </div>
    </>
  );
}

export default CategoryList;
