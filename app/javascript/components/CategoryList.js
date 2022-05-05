import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { toast } from 'react-toastify';

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

const EditButton = styled.span`
  display: flex;
  align-items: center;
  margin: 0 7px;
  cursor: pointer;
`;

const DeleteButton = styled.span`
  display: flex;
  align-items: center;
  margin: 0 7px;
  cursor: pointer;
`;

function CategoryList() {
  const initialCategoryState = {
    id: null,
    name: '',
  };

  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState(initialCategoryState);

  useEffect(() => {
    axios
      .get('/api/v1/todo_categories')
      .then((resp) => {
        console.log(resp);
        setCategories(resp.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategory({ ...newCategory, [name]: value });
  };

  const createNotify = () => {
    toast.success('Category successfully created!', {
      position: 'bottom-center',
      hideProgressBar: true,
    });
  };

  const deleteNotify = () => {
    toast.success('Category successfully destroyed!', {
      position: 'bottom-center',
      hideProgressBar: true,
    });
  };

  const saveCategory = () => {
    const data = {
      name: newCategory.name,
    };

    axios
      .post('/api/v1/todo_categories', data)
      .then((resp) => {
        createNotify();
        setNewCategory(initialCategoryState);
        const newCategories = [...categories, resp.data];
        setCategories(newCategories);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteCategory = (id) => {
    const sure = window.confirm('Are you sure?');
    if (sure) {
      axios
        .delete('/api/v1/todo_categories/' + id)
        .then((resp) => {
          deleteNotify();
          const newCategories = categories.filter((cat) => cat.id != id);
          setCategories(newCategories);
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
          required
          name='name'
          value={newCategory.name}
          placeholder='Add new category...'
          onChange={handleInputChange}
        />
        <AddCategoryButton onClick={saveCategory}>Add</AddCategoryButton>
      </InputAndButton>
      <div>
        {categories &&
          categories.map((val, key) => {
            return (
              <Row key={key}>
                <CategoryName>{val.name}</CategoryName>
                <Link to={'/categories/' + val.id + '/edit'}>
                  <EditButton>
                    <AiFillEdit />
                  </EditButton>
                </Link>
                <DeleteButton onClick={() => deleteCategory(val.id)}>
                  <AiFillDelete />
                </DeleteButton>
              </Row>
            );
          })}
      </div>
    </>
  );
}

export default CategoryList;
