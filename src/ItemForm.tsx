import React from 'react';
import './index.css'; 

const ItemForm = ({ onSubmit, item, closeModal }) => {
  const [name, setName] = React.useState(item ? item.name : '');
  const [description, setDescription] = React.useState(item ? item.description : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, description });
    closeModal();
  };
  
  return (
    <div className="modal">
      <div className="form-container">
        <form className="item-form" onSubmit={handleSubmit}>
          <h2>{item ? 'Update Item' : 'Create Item'}</h2>
          
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          
          <label htmlFor="description">Description:</label>
          <input
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          
          <div className="button-group">
            <button type="submit">{item ? 'Update' : 'Create'}</button>
            <button type="button" onClick={closeModal}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItemForm;