import { useState, useEffect } from 'react'
import Form from './Form'
import ItemList, { Item } from './List'

function App() {
  const [modal, setModal] = useState(false)
  const [items, setItems] = useState<Item[]>([]);
  const [todayItems, setTodayItems] = useState<Item[]>([]);
  const [upcomingItems, setUpcomingItems] = useState<Item[]>([]);

  const handleModal = () => {
    setModal(!modal)
  }
  const handleSubmit = (newItem: Item) => {
    setItems([...items, newItem]);
    localStorage.setItem('items', JSON.stringify([...items, newItem]));
  };

  const updateItemCycle = (itemId: number) => {
    const updatedItems = items.map((item) =>
      item.id === itemId ? { ...item, cicle: item.cicle + 1 } : item
    );
    setItems(updatedItems);
    localStorage.setItem('items', JSON.stringify(updatedItems));
  };

  useEffect(() => {
    const today = new Date();
    const filteredItems = items.map(item => {
      let comparisonDate = new Date(item.date);
      let daysToAdd = 0;

      switch (item.cicle) {
        case 1:
          daysToAdd = 1;
          break;
        case 2:
          daysToAdd = 3;
          break;
        case 3:
          daysToAdd = 7;
          break;
        case 4:
          daysToAdd = 14;
          break;
        case 5:
          daysToAdd = 30;
          break;
        case 6:
          return null; // Remove item if cycle is 6
        default:
          daysToAdd = 0;
      }

      comparisonDate.setDate(comparisonDate.getDate() + daysToAdd);
      return { ...item, comparisonDate };
    }).filter(item => item !== null); //remove null items
    const filteredToday = filteredItems.filter(item => item.comparisonDate <= today);
    setTodayItems(filteredToday);
    const upcoming = filteredItems.filter(item => item.comparisonDate > today);
    setUpcomingItems(upcoming);

  }, [items])

  useEffect(() => {
    const storedItems = localStorage.getItem('items');
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
  }, []);
  return (
    <div className='font-roboto min-h-[100vh] bg-main-blue relative z-10'>
      <header>
        <h1 className='py-4 text-4xl md:text-5xl text-center text-blue-primary font-Dancingscript'>Repetition<span className='text-yellow-primary'>Genie!</span></h1>
      </header>
      <main>
        <h3 className='px-4'>Repasar hoy</h3>
        <ItemList items={todayItems} setList={updateItemCycle} review={true}/>
        <h3 className='px-4'>Próximas a repasar</h3>
        <ItemList items={upcomingItems} setList={updateItemCycle} review={false}/>
        
      </main>
      <footer className='absolute bottom-4 left-4 right-4 grid place-items-center'>
        <button  onClick={handleModal} className="bg-blue-primary ease-in-out cursor-pointer border-2 border-transparent hover:text-blue-primary hover:border-blue-primary hover:bg-transparent duration-300 text-white font-medium py-2 px-4 rounded-lg shadow-md">Add Reminder</button>
      </footer>
      {modal && <Form onClose={handleModal} onSubmit={handleSubmit} />}
    </div>
  )
}

export default App