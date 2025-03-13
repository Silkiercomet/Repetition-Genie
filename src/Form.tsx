import React, { useState } from 'react';
import { Item } from './List';

interface Props {
  onClose: () => void;
  onSubmit: (item: Item) => void;
}

const Modal: React.FC<Props> = ({ onClose, onSubmit }) => {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    const id = Math.floor(Math.random() * 1000); // Generate random ID
    const date = new Date();
    const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    const newItem: Item = {
      header: text,
      id: id,
      date: formattedDate,
      cicle: 1, // Default cicle value
    };
    onSubmit(newItem);
    onClose();
  };

  return (
    <div className="flex items-center justify-center ">
      <div onClick={onClose} className='fixed inset-0 bg-modal z-20'></div>
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 fixed top-1/2 -translate-y-1/2 z-30 ">
        <h2 className="text-xl font-bold mb-4">Create New Item</h2>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 mb-4 w-full"
          placeholder="Enter text"
        />
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-300 ease-in-out cursor-pointer duration-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-light ease-in-out cursor-pointer duration-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
