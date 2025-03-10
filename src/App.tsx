import { useState } from 'react'
import Form from './Form'
import { Item } from './List'


function App() {
  const [modal, setModal] = useState(true)
  const [items, setItems] = useState<Item[]>([])
  const handleModal = () => {
    setModal(!modal)
    
  }
  const handleSubmit = (item : Item) => {
    setItems([...items, item])
  }
  
  return (
    <div className='font-roboto min-h-[100vh] bg-main-blue relative z-10'>
      <header>
        <h1 className='py-4 text-4xl md:text-5xl text-center text-blue-primary font-Dancingscript'>Repetition<span className='text-yellow-primary'>Genie!</span></h1>
      </header>
      <main>

      </main>
      <footer className='absolute bottom-1 left-4 right-4'>
        <button onClick={handleModal}>Add Reminder</button>
      </footer>
      {modal && <Form onClose={handleModal} onSubmit={handleSubmit}/>}
    </div>
  )
}

export default App
