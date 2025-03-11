import { useState, useEffect } from 'react'
import Form from './Form'
import ItemList, { Item } from './List'

function App() {
  const [modal, setModal] = useState(false)
  const [items, setItems] = useState<Item[]>([
    { id: 1, header: 'Example Item 1', date: new Date().toISOString().slice(0, 10), cicle: 0 },
    { id: 2, header: 'Example Item 2', date: new Date(Date.now() + 86400000).toISOString().slice(0, 10), cicle: 2 }, // Tomorrow
    { id: 3, header: 'Example Item 3', date: new Date(Date.now() + 172800000).toISOString().slice(0, 10), cicle: 1 }, // Two days from now

  ])
  const [todayItems, setTodayItems] = useState<Item[]>([]);
  const [upcomingItems, setUpcomingItems] = useState<Item[]>([]);

  const handleModal = () => {
    setModal(!modal)
  }
  const handleSubmit = (newItem: Item) => {
    setItems([...items, newItem]);
    console.log(newItem)
  };

  const updateItemCycle = (itemId: number) => {
    const updatedItems = items.map((item) =>
      item.id === itemId ? { ...item, cicle: item.cicle + 1 } : item
    );
    setItems(updatedItems);
    console.log(updatedItems);
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

  return (
    <div className='font-roboto min-h-[100vh] bg-main-blue relative z-10'>
      <header>
        <h1 className='py-4 text-4xl md:text-5xl text-center text-blue-primary font-Dancingscript'>Repetition<span className='text-yellow-primary'>Genie!</span></h1>
      </header>
      <main>
        <h3>Repasar hoy</h3>
        <ItemList items={todayItems} setList={updateItemCycle} review={true}/>
        <h3>Próximas a repasar</h3>
        <ItemList items={upcomingItems} setList={updateItemCycle} review={false}/>
        
      </main>
      <footer className='absolute bottom-1 left-4 right-4'>
        <button onClick={handleModal}>Add Reminder</button>
      </footer>
      {modal && <Form onClose={handleModal} onSubmit={handleSubmit} />}
    </div>
  )
}

export default App