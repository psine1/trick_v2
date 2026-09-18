import { useState, useEffect } from 'react';
import { db } from '@/firebase/firebase';
import { collection, addDoc, updateDoc, deleteDoc, getDocs, doc } from "firebase/firestore"; 

const EditPanel = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ title: '', content: '', filterName: '', cta: '', linkUrl: '' });
  const [editState, setEditState] = useState({});
  const [confirmation, setConfirmation] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "oportunities"));
      setItems(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchData();
  }, []);

  const handleAddItem = async () => {
    try {
      const docRef = await addDoc(collection(db, "oportunities"), newItem);
      setItems([...items, { id: docRef.id, ...newItem }]);
      setNewItem({ title: '', content: '', filterName: '', cta: '', linkUrl: '' });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleInputChange = (id, field, value) => {
    setEditState(prevState => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        [field]: value
      }
    }));
  };

  const handleApplyChanges = async (id) => {
    if (editState[id]) {
      await handleEditItem(id, editState[id]);
      setEditState(prevState => {
        const newState = { ...prevState };
        delete newState[id];
        return newState;
      });
      setConfirmation({ ...confirmation, [id]: true });
      setTimeout(() => {
        setConfirmation(prevState => ({ ...prevState, [id]: false }));
      }, 2000);  // Ocultar la confirmación después de 2 segundos
    }
  };

  const handleEditItem = async (id, updatedItem) => {
    const itemDoc = doc(db, "oportunities", id);
    await updateDoc(itemDoc, updatedItem);
    setItems(items.map(item => (item.id === id ? { id, ...updatedItem } : item)));
  };

  const handleDeleteItem = async (id) => {
    await deleteDoc(doc(db, "oportunities", id));
    setItems(items.filter(item => item.id !== id));
  };

  return (

<>

     
    <div className='flex flex-col  w-1/2 m-auto bg-white mt-12 p-6 rounded-lg'>
      <h2 className='text-2xl pb-6'>Edit Oportunities</h2>
        {items.map((item, index) => (
          <div key={item.id} className={`flex flex-col gap-4 p-6 border ${index % 2 === 0 ? `bg-white` : `bg-zinc-100`}`}>
            <label className='text-slate-400'>Title</label>
            <input className='p-2 border'
              type="text" 
              value={editState[item.id]?.title || item.title} 
              onChange={(e) => handleInputChange(item.id, 'title', e.target.value)} 
            />
            <label className='text-slate-400'>Content</label>
            <textarea className='p-2 border'
              value={editState[item.id]?.content || item.content} 
              onChange={(e) => handleInputChange(item.id, 'content', e.target.value)} 
            />

            <label className='text-slate-400'>Filter Name</label>
            <input className='p-2 border'
              type="text" 
              value={editState[item.id]?.filterName || item.filterName} 
              onChange={(e) => handleInputChange(item.id, 'filterName', e.target.value)} 
            />

            <label className='text-slate-400'>Call to action</label>
            <input className='p-2 border'
              type="text" 
              value={editState[item.id]?.cta || item.cta} 
              onChange={(e) => handleInputChange(item.id, 'cta', e.target.value)} 
            />   

            <label className='text-slate-400'>URL</label>
            <input className='p-2 border'
              type="text" 
              value={editState[item.id]?.linkUrl || item.linkUrl} 
              onChange={(e) => handleInputChange(item.id, 'linkUrl', e.target.value)} 
            />                        

            <div className="flex gap-2 items-center">
              <button 
                onClick={() => handleApplyChanges(item.id)} 
                className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded'>
                Apply
              </button>
              <button 
                onClick={() => handleDeleteItem(item.id)} 
                className='bg-purple-800 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded'>
                Delete
              </button>
              {confirmation[item.id] && (
                <span className="text-green-500 font-semibold ml-2 transition-opacity duration-500 ease-in-out">
                  Edit ready!
                </span>
              )}
            </div>
          </div>
        ))}
      </div>





</>


  );
};

export default EditPanel;
