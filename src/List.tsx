import React, { useState } from 'react';

 export interface Item {
  header: string;
  id: number;
  date: string;
  cicle: number;
}

interface Props {
  items: Item[];
  setList: (items: Item[]) => void;
}

const ItemList: React.FC<Props> = ({ items, setList }) => {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const handleAddItem = (id: number) => {
    setSelectedItems([...selectedItems, id]);
    setList(items.filter(item => selectedItems.includes(item.id)));
  };

  return (
    <div className="p-4">
      {items.length > 0 ? (
        items.map((item) => (
        <div key={item.id} className="bg-gray-100 rounded-lg p-4 mb-4">
          <h2 className="text-lg font-bold">{item.header}</h2>
          <p>ID: {item.id}</p>
          <button
            onClick={() => handleAddItem(item.id)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Repasado
          </button>
        </div>
        ))
      ) : (
        <div className="bg-gray-100 rounded-lg p-4 mb-4">
          <p>No hay nada que repasar hoy</p>
    </div>
      )}
    </div>
  );
};

export default ItemList;