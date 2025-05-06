import { useState } from "react"

const Counter = () => {
    const [count, setCount] = useState(0)
  return (
    <div className="flex flex-col justify-center items-center m-8 gap-6">
        <h1 className="text-center text-2xl">My Counter</h1>
        <p className="text-center text-2xl font-bold">{count}</p>
        <button className="" onClick={()=> setCount(count + 1)}>Increment</button>
        <button onClick={()=> setCount(count - 1)}>Decrement</button>
    </div>
  )
}

export default Counter