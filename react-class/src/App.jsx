import { useState } from 'react';
import './App.css';

function App() {

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
