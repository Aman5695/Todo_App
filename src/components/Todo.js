import logo from "../Images/todo.png";
import {useEffect, useState} from 'react';

const getLocalItems = () => {
    let items = localStorage.getItem('data');
    if(items) {
        return JSON.parse(localStorage.getItem('data'));
    } else {
        return [];
    }
}
const Todo = () => {
  const [inputData, setInputData] = useState('');
    const [item, setItem] = useState(getLocalItems());


  const addItem = ()=> {
      if(!inputData) {

      } else {
        setItem([ ...item, inputData]);
        setInputData('');
      }
   
  }

const submit = (e) => {
    if(e.keyCode === 13) {
        // console.log('enter')
        addItem();    }
}

  const deleteItem = (id) => {
    console.log(id);
    const updateItem = item.filter((elem, ind) => {
        return ind !== id;

    });
    setItem(updateItem);
  }

  const removeAll = ()=> {
      setItem([]);
  }

  useEffect(() => {
   localStorage.setItem('data', JSON.stringify(item))   
    
  }, [item])

  return (
    <>
      <div className="main-div">
        <div className="content-div">
          <figure>
            <img src={logo} alt="todo-logo" />
            <figcaption>Add your List Here</figcaption>
          </figure>
          <div className="addItems">
            <input type="text"  placeholder="Add items here... " value={inputData} onKeyDown={(e)=> submit(e)} onChange={(e) => setInputData(e.target.value)} />
            <i className="fas fa-plus add-btn" title="Add item" onClick={addItem} type="submit"></i>
          </div>
          <div className="showitems">
          {
              item.map((elem, ind) => {
                  return(
                    <div className="eachitem" key={ind}>
              <h2>{elem}</h2>
              <i className="far fa-trash-alt add-btn" title="Delete item" onClick={() => deleteItem(ind)}></i>
            </div>
                  )
              })
          }
            
          </div>
          <div className="showitems">
            <button onClick={removeAll} >Delete All </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
