import './App.css';
import React, {useState, useEffect, useRef} from 'react';
import Alert from './Alert';
import List from './List';

const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if(list) {
    return (JSON.parse(localStorage.getItem('list')));
  }else {
    return [];
  }
}

const App = () => {

  const [list, setList] = useState(getLocalStorage());
  const [toDo, setToDo] = useState('');
  const [alert, setAlert] = useState({show: false, type: '', msg: ''});
  const inputField = useRef('');

  useEffect(() => {
    inputField.current.focus();
  }, []);

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!toDo) {
      showAlert(true, "danger", "Please enter value!");
    }else {
      const newItem = {
        id: new Date().getTime().toString(),
        content: toDo
      };
      showAlert(true, "success", "Item added to the list!");
      setList([...list, newItem]);
      setToDo('');
    }
  };

  const clearList = () => {
    showAlert(true, "danger", "Empty list!");
    setList([]);
  };

  const showAlert = (show=false, type="", msg="") => {
    setAlert({show, type, msg});
  };

  const removeItem = (id, str) => {
    if(str === "delete") {
      showAlert(true, "danger", "Item deleted from the list!");  
    }
    if(str === "done") {
      showAlert(true, "success", "Done!");
    }
    setList(list.filter((item) => {
      return item.id !== id;
    }));
  };

  return (
    <section className="container">
      <div className="header">
        <h1>To-Do List</h1>
        <div className="alert-box">
          {alert.show && <Alert 
                          {...alert}
                          removeAlert={showAlert}
                          list={list}
                        />
        }
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="what to do"
            className="input" 
            value={toDo}
            ref={inputField}
            onChange={(e) => setToDo(e.target.value)}
          />
          <button type="submit" className="btn">Submit</button>
        </form>
        <button className="btn" onClick={clearList}>Clear List</button>
      </div>
      <div>
        {list.length > 0 && <List items={list} removeItem={removeItem}/>}
      </div>
    </section>
  );
}

export default App;
