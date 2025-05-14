import React from 'react'

const Assign = () => {
  return (
    <>
    <h1>Subject and class</h1>
        <form >
        <input type="text" placeholder=' Enter Class' name='class' />
        <input type="text"  placeholder='Enter Subject'/>
        <input list="teacher" name='teacher' id='teacher' />
        <datalist id='teacher'>
            <option value=""></option>
        </datalist>
        <input type="text"  placeholder='Enter time ' />
        

    </form>
    </>
  )
}

export default Assign
