import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { toast } from 'react-toastify';

const InputName = styled.input`
  font-size: 20px;
  width: 100%;
  height: 40px;
  padding: 2px 7px;
  margin: 12px 0;
`;

const EditButton = styled.button`
  color: #fff;
  font-weight: 500;
  font-size: 17px;
  padding: 5px 10px;
  margin: 0 10px 0 0;
  background: #0ac620;
  border-radius: 3px;
  border: none;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  color: #fff;
  font-size: 17px;
  font-weight: 500;
  padding: 5px 10px;
  background: #f54242;
  border: none;
  border-radius: 3px;
  cursor: pointer;
`;

function EditCategory() {
  const initialCategoryState = {
    name: '',
  };

  const [currentCategory, setCurrentCategory] = useState(initialCategoryState);

  const navigate = useNavigate();
  const { id } = useParams();

  const updateNotify = () => {
    toast.success('Category successfully updated!', {
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

  const getCategory = (id) => {
    axios
      .get(`/api/v1/todo_categories/${id}`)
      .then((resp) => {
        setCurrentCategory(resp.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getCategory(id);
    console.log(id);
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentCategory({ ...currentCategory, [name]: value });
  };

  const updateCategory = () => {
    const data = {
      name: currentCategory.name,
    };
    console.log(data);
    axios
      .patch(`/api/v1/todo_categories/${id}`, data)
      .then(() => {
        updateNotify();
        navigate('/categories');
      })
      .catch((e) => console.log(e));
  };

  const deleteCategory = () => {
    const sure = window.confirm('Are you sure?');
    if (sure) {
      axios
        .delete(`/api/v1/todo_categories/${id}`)
        .then((resp) => {
          console.log(resp.data);
          deleteNotify();
          navigate('/categories');
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  return (
    <>
      <h1>Edit Category</h1>
      <div>
        <div>
          <label htmlFor='name'>Current Name</label>
          <InputName
            type='text'
            id='name'
            name='name'
            value={currentCategory.name}
            onChange={handleInputChange}
          />
          <EditButton type='submit' onClick={updateCategory}>
            Update
          </EditButton>
          <DeleteButton
            className='badge badge-danger mr-2'
            onClick={deleteCategory}
          >
            Delete
          </DeleteButton>
        </div>
      </div>
    </>
  );
}

export default EditCategory;
