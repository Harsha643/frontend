import React from 'react'
import Newstudent from '../Adminpage/Newstudent/Newstudent'
import Newstaff from '../Adminpage/Newstaft/Newstaff'
import Assign from '../Adminpage/SubjectAndClass/Assign'
import Events from '../Adminpage/SchoolEvents/Events'
import Gallery from '../Adminpage/Gallery/Gallery'

const Actions = () => {
  return (
   <>
    <Newstudent />
    <Newstaff />
    <Assign />
    <Events />
    <Gallery />
    
    
   </>
  )
}

export default Actions
