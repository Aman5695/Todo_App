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
    const [toggleBtn, setToggleBtn] = useState(true)
  const [isEditItem, setIsEditItem] = useState(null)

  const addItem = ()=> {
      if(!inputData) {
        alert('Fill the data');
      } else if(inputData && !toggleBtn){
        setItem(
          item.map((elem) => {
            if (elem.id === isEditItem){
                return{ ...elem, name:inputData}
            }
            return elem;
          })
        
        )
        setToggleBtn(true);

        setInputData('');
    
        setIsEditItem(null);
      }
       else {
        const allInputData = { id: new Date().getTime().toString(), name:inputData}
        setItem([ ...item,allInputData]);
        setInputData('');
      }
   
  }

const submit = (e) => {
    if(e.keyCode === 13) {
        // console.log('enter')
        addItem();    }
}

  const deleteItem = (index) => {
    // console.log(id);
    const updateItem = item.filter((elem) => {
        return index !== elem.id;

    });
    setItem(updateItem);
  }

  const editItem= (id)=> {
    let newEditItem = item.find((elem)=> {
      return elem.id === id
    });
    console.log(newEditItem);
    setToggleBtn(false);

    setInputData(newEditItem.name);

    setIsEditItem(id);
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
            {
              toggleBtn ?  <i className="fas fa-plus add-btn" title="Add item" onClick={addItem} type="submit"></i> :  
                           <i className="far fa-edit add-btn" title="Update item" onClick={addItem}></i>

            }
           
          </div>
          <div className="showitems">
          {
              item.map((elem) => {
                  return(
                    <div className="eachitem" key={elem.id}>
              <h2>{elem.name}</h2>
              <div className="todo-btn">
              <i className="far fa-edit add-btn" title="Edit item" onClick={() => editItem(elem.id)}></i>

              <i className="far fa-trash-alt add-btn" title="Delete item" onClick={() => deleteItem(elem.id)}></i>
              </div>
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
