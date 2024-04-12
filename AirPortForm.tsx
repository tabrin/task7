import React, { useState } from "react";
import Data from "./data.json";
import "./AirPortForm.css";
import Modal from "./Modal";
import { BsFillTrashFill, BsFillPencilFill } from 'react-icons/bs';

const Form1: React.FC = () => {
  const [data, setData] = useState(Data);
  const [show, setShow] = useState(true);
  const [editIndex, setEditIndex] = useState<number | null>(null); 
  const [editData, setEditData] = useState<any>(null);

  const closeModel = () => {
    setShow(false);
  };

  const addData = (newData: any) => {
    setData([...data, newData]);
  };

  const handleDelete = (targetIndex: number) => {
    const newData = data.filter((_, idx) => idx !== targetIndex);
    setData(newData);
  };

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setEditData(data[index]);
  };

  const handleSaveEdit = (index: number, newData: any) => {
    const updatedData = [...data];
    updatedData[index] = newData; 
    setData(updatedData);
    setEditIndex(null);
    setEditData(null); 
  };

  const handleCancelEdit = () => {
    setEditIndex(null); 
    setEditData(null);
  };

  return (
    <>
      <div>
        <div>
          <p className="form-text text-center"><strong><h2>Add new Data</h2></strong></p>
          <button className="add-btn" onClick={() => setShow(true)}>
            Add
          </button>
          {show && <Modal closeModel={closeModel} addData={addData} />}
        </div>
        <table>
          <thead>
            <tr>
              <th>AirPort code</th>
              <th>Name</th>
              <th>Country</th>
              <th>State</th>
              <th>City</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.map((current, i) => {
              return (
                <tr key={i}>
                  <td>{current.airPortCode}</td>
                  <td>{current.name}</td>
                  <td>{current.country}</td>
                  <td>{current.state}</td>
                  <td>{current.city}</td>
                  <td>
                    {editIndex === i ? (
                      <>
                       <input type="text" value={editData.airPortCode} onChange={(e) => setEditData({...editData, airPortCode: e.target.value})} />
    <input type="text" value={editData.name} onChange={(e) => setEditData({...editData, name: e.target.value})} />
    <input type="text" value={editData.country} onChange={(e) => setEditData({...editData, country: e.target.value})} />
    <input type="text" value={editData.state} onChange={(e) => setEditData({...editData, state: e.target.value})} />
    <input type="text" value={editData.city} onChange={(e) => setEditData({...editData, city: e.target.value})} />
    
                        <button onClick={() => handleSaveEdit(i, editData)}>Save</button>
                        <button onClick={handleCancelEdit}>Cancel</button>
                      </>
                    ) : (
                      <span className="actions">
                        <BsFillTrashFill className="delete-btn" onClick={() => handleDelete(i)} />
                        <BsFillPencilFill className="edit-btn" onClick={() => handleEdit(i)} />
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Form1;
