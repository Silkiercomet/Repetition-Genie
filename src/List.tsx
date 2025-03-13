 export interface Item {
  header: string;
  id: number;
  date: string;
  cicle: number;
}

interface Props {
  items: Item[];
  setList: (itemId: number) => void;
  review: boolean;
}

const ItemList: React.FC<Props> = ({ items, setList, review = false }) => {

  const handleAddItem = (id: number) => {
    setList(id)
  };

  return (
    <div className="p-4">
      {items.length > 0 ? (
        items.map((item) => (
          <div key={item.id} className={`flex justify-between border-transparent border-2  hover:border-blue-primary ease-in-out duration-300 hover:bg-transparent rounded-lg p-4 mb-4 ${review ? 'bg-blue-primary' : 'bg-gray-100'} group`}>
          <div>
            <h2 className={`text-lg font-bold group-hover:text-black ${review ? "text-white" : ""}`}>{item.header}</h2>
            <p className={`font-bold group-hover:text-black ${review ? "text-white" : ""}`}>Fecha: {item.date}</p>
          </div>
          { review && <button
            onClick={() => handleAddItem(item.id)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Repasado
          </button>}
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