import { useState } from 'react';
import './App.css';


function App() {
  // A list (array) of tasks. Each task is a unique object.
  // STATE: the list of tasks. When it changes, React updates
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Learn React', done: false},
    { id: 2, text: 'Practice Code', done: false},
  ]);

  // STATE: what the user is typing in the box
  const [text, setText] = useState('');

  //STATE: which task to show: 'all', 'active' (not done) or 'done'
  const[show, setShow] = useState('all');

  // ADD: runs when the add button is clicked
  function handleAdd() {
    // stop here if the box is empty
    if (text.trim() === ''){
      return;
    }

    const newTask = { id: Date.now(), text: text, done: false};
    setTasks([...tasks, newTask]); // copy old task + add new ones
    setText(''); // empty input box
  }

  // DELETE: keep every task EXCEPT the one with this id
  function handleDelete(id) {
    const remainingTasks = tasks.filter((task) => task.id !== id);
    setTasks(remainingTasks);
  }

  // COMPONENT: shows ONE task. It gets its data through props
  function TaskItem({task, number, onDelete, onToggle}) {
    return(
      <li>
        <input type="checkbox" checked={task.done} onChange={() => onToggle(task.id)} />
        {number}: {task.done ? <s>{task.text}</s> : task.text} <button onClick= {() => onDelete(task.id)}>Delete</button>
      </li>
    )
  }

  //DONE: flip done (fals-> true, true -> false) for ONE task at a time
  function handleToggle(id) {
    const updatedTasks = tasks.map((task) => {
      if (task.id == id) {
        return {...task, done: !task.done}; // copy the task, changes only done
      }
      return task; // all other tasks stay the same
    });
    setTasks(updatedTasks);
  }

  // CLEAR DONE: keep only the tasks taht are NOT done
  function handleClearDone() {
    const notDoneTasks = tasks.filter((task) => task.done === false);
    setTasks(notDoneTasks);
  }

  // ALL DONE: make a copy of every task with done set to true
  function handleAllDone() {
    const allDoneTasks =tasks.map((task) => {
      return{...task, done: true};
    });
    setTasks(allDoneTasks);
  }

  // COUNT: how many tasks are done, how many are left
  const doneCount = tasks.filter((task) => task.done === true).length;
  const leftCount = tasks.filter((task) => task.done === false).length;

  // SHOW: keep only the tasks that match the dropdown
  const visibleTasks = tasks.filter((task) => {
    if (show === 'active') {
      return task.done === false;
    }
    if (show === 'done') {
      return task.done === true;
    }
    return true; // 'all' = keep every task
  })

  return(
    <div>
      <h1>Task Manager</h1>

      <input type="text" placeholder='Write a task...' value={text} onChange={(event) => setText(event.target.value)}/>
      <button onClick={handleAdd}>Add</button>

      <p>You Typed: {text}</p>
      <p>Total Tasks: {tasks.length}</p>
      <p>Done: {doneCount} | Left: {leftCount}</p>
      {tasks.length === 0 && <p>No tasks yet. Add one</p>}

      <p>
        Show: <select value={show} onChange={(event) => setShow(event.target.value)}>
          <option value='all'>All</option>
          <option value='active'>Not Done</option>
          <option value='done'>Done</option>
        </select>
      </p>

      <ul>
        {visibleTasks.map((task, index) => (<TaskItem key={task.id} number={index + 1} task={task} onDelete={handleDelete} onToggle={handleToggle}/>))}
      </ul>
        <p><button onClick={handleAllDone}>Mark all as done</button></p>

        <p><button onClick={handleClearDone}>Clear done tasks</button></p>
      <hr />
      <CounterDemo />
    </div>
  );
}




function CounterDemo() {

  // State is something that is going to survive re-renders and hold data for the component
  // This State is the parent of the component and is shared with the child components via props
  const[count, setCount] = useState(0);
  return(
    <>
     <h1>Hello, World!</h1>
     <p>Welcome to my Online Portal!</p>
     <CounterwithSharedState title="Counter 1" count={count} setCount={setCount} />
     <CounterwithSharedState title="Counter 2" count={count} setCount={setCount} />
     <CounterwithSharedState title="Counter 3" count={count} setCount={setCount} />

     <Counter />
     <Counter />
     <Counter />
   </>
  )
}

// React component nam of component: CounterwithSharedState
// Props: count setCount
// State: Shared through props
function CounterwithSharedState({ title, count, setCount}) {
  
  return(
    <div>
      <h2>{title}</h2>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

// React component name of component: Counter
// Props: none
// State: Local
function Counter() {
  const[count, setCount] = useState(0);

  return(
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );

  function increment(){
    setCount(count + 1);
  }
}

function CourseCard({title, description}){}

export default App;
