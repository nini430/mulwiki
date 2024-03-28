import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Fib = () => {
  const [index, setIndex]=useState('')
  const [seenIndexes, setSeenIndexes]=useState([])
  const [values, setValues]=useState({})

  const fetchIndexes=async()=>{
    const response = await axios.get('/api/values/all');
    setSeenIndexes(response.data);
  }

  const fetchCalculatedValues=async()=>{
    const response = await axios.get('/api/values/current');
    setValues(response.data)
  }

  const renderIndexes=()=>{
    return seenIndexes.map(item=>item.number).join(',')
  }

  const renderValues=()=>{
    const entries=[];
    for(const index in values) {
      entries.push(<div key={index}>
        For the value {index} I calculated a value {values[index]}
      </div>)
    }

    return entries;
  }

  useEffect(()=>{
    fetchIndexes()
    fetchCalculatedValues()
  },[])
  return (
    <div>
      <form onSubmit={async e=>{
        e.preventDefault();
        await axios.post('/api/values', {index});
      }}>
        <label>ENter a index</label>
        <input type="text" value={index} onChange={e=>setIndex(e.target.value)}  />
        <button>Submit</button>
      </form>
      <h3>Indexes I have seen</h3>
      {renderIndexes()}
      <h3>Calculated values</h3>
      {renderValues()}
    </div>
  )
}

export default Fib