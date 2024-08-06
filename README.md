## `useEffect` Hook in React

The `useEffect` hook is a fundamental part of React's functional components, allowing you to perform side effects in your components. Side effects can include data fetching, subscriptions, or manually changing the DOM.

### Pseudocode Explanation

1. **Import `useEffect`**: Ensure you import `useEffect` from React.
2. **Define the Effect**: Inside your component, call `useEffect` and pass it a function.
3. **Specify Dependencies**: Optionally, pass a second argument to `useEffect`, which is an array of dependencies. The effect will only re-run if one of these dependencies changes.

### Detailed Steps

1. **Basic Usage**:
    - `useEffect` takes a function as its first argument. This function will run after the component renders.
    - If you return a function from the effect, React will run it when the component unmounts or before the effect runs again.

2. **Dependencies**:
    - The second argument to `useEffect` is an array of dependencies. The effect will only re-run if one of these dependencies changes.
    - If you omit the second argument, the effect runs after every render.
    - If you pass an empty array, the effect runs only once after the initial render.

### Code Example

```javascript
import React, { useEffect, useState } from 'react';

function ExampleComponent() {
  const [count, setCount] = useState(0);

  // Basic useEffect usage
  useEffect(() => {
    console.log('Component rendered or count changed');

    // Cleanup function (optional)
    return () => {
      console.log('Cleanup before next effect or component unmount');
    };
  }, [count]); // Dependency array

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}

export default ExampleComponent;
```

### Key Points

- **Side Effects**: `useEffect` is used for side effects like data fetching, subscriptions, or manually changing the DOM.
- **Dependencies**: The dependency array controls when the effect runs. If dependencies change, the effect re-runs.
- **Cleanup**: The cleanup function runs before the component unmounts or before the effect re-runs.

This is a basic overview of how `useEffect` works in React.

--------------------------------------

## Explanation of `React.memo`

`React.memo` is a higher-order component that optimizes functional components by memoizing their output. This means that React will skip rendering the component if its props have not changed, thus improving performance by avoiding unnecessary re-renders.

### How `React.memo` Works

1. **Memoization**: `React.memo` stores the result of the last render and compares the new props with the previous ones.
2. **Shallow Comparison**: By default, `React.memo` performs a shallow comparison of the props. If the props are the same, the component is not re-rendered.
3. **Custom Comparison Function**: You can provide a custom comparison function to control when the component should re-render.

### Using `React.memo` Effectively

1. **Wrap the Component**: Use `React.memo` to wrap the component you want to optimize.
2. **Stable Props**: Ensure that the props passed to the component are stable and do not change unnecessarily.
3. **Memoize Callbacks**: Use `useCallback` to memoize functions passed as props to prevent them from being recreated on every render.

### Example

#### Pseudocode

1. Import `memo` from React.
2. Wrap the `MovieDetails` component with `memo`.
3. Optionally, provide a custom comparison function to control re-renders.

#### Code

```javascript
import React, { useEffect, memo } from 'react';
import { KEY } from '../config.js';

function MovieDetails({ id, onCloseMovie }) {
  useEffect(() => {
    console.log('useEffect triggered for id:', id);
    const getMovieDetails = async function() {
      const res = await fetch(`https://www.omdbapi.com/?apikey=${KEY}&i=${id}`);
      const data = await res.json();
      console.log(data);
    };

    getMovieDetails();
  }, [id]);

  console.log('MovieDetails component rendered with id:', id);

  return (
    <div className="details">
      <button className="btn-back" onClick={onCloseMovie}>&larr;</button>
      {id}
    </div>
  );
}

export default memo(MovieDetails);
```

#### Custom Comparison Function

```javascript
function areEqual(prevProps, nextProps) {
  return prevProps.id === nextProps.id && prevProps.onCloseMovie === nextProps.onCloseMovie;
}

export default memo(MovieDetails, areEqual);
```

### Summary

- **Import `memo`**: Import `memo` from React.
- **Wrap Component**: Wrap the component with `memo`.
- **Stable Props**: Ensure props are stable.
- **Custom Comparison**: Optionally, use a custom comparison function for more control.
