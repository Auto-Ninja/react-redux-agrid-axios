import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProductData, editProductData } from '../redux/productSlice';

const DataForm = ({ isEdit, currentData, onClose }) => {
  const [formData, setFormData] = useState(
    isEdit ? currentData : { title: '' }
  );
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      dispatch(editData(formData));
    } else {
      dispatch(addData(formData));
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
      Product Name':
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </label>
      <button type="submit">{isEdit ? 'Edit' : 'Add'}</button>
    </form>
  );
};

export default DataForm;
