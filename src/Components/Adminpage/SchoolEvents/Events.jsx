import React from 'react'

const Events = () => {
  return (
  <>
  <h1>Events</h1>
<form >
<input type="text"  placeholder='Enter Event Name ' name="event"/>
  <input type="date"  placeholder='Enter Event Date' name='event-date'/>
  <input type="text"  placeholder='Enter place ' name='place'/>
  <input type="time" placeholder='Enter time ' name='time'/>
  <button>Submit</button>
</form>

  </>
  )
}

export default Events
