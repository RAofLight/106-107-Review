import { useState } from 'react';
import './App.css';


function App() {
  // A list (array) of tasks. Each task is a unique object.
  // STATE: the list of tasks. When it changes, React updates
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Learn React'},
    { id: 2, text: 'Practice Code'},
  ]);

  //STATE: what the user is typing in the box
  const [text, setText] = useState('');

  // ADD: runs when the add button is clicked
  function handleAdd() {
    // stop here if the box is empty
    if (text.trim() === ''){
      return;
    }

    const newTask = { id: Date.now(), text: text};
    setTasks([...tasks, newTask]); // copy old task + add new ones
    setText(''); // empty input box
  }

  return(
    <div>
      <h1>Task Manager</h1>

      <input type="text" placeholder='Write a task...' value={text} onChange={(event) => setText(event.target.value)}/>
      <button onClick={handleAdd}>Add</button>

      <p>You Typed: {text}</p>

      <ul>
        {tasks.map((task) => (<li key={task.id}>{task.text}</li>))}
      </ul>

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
