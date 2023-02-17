import React from 'react'
import Chats from './Chats'
import NavBar from './NavBar'
import SearchBar from './SearchBar'

const SideBar = () => {
  return (
    <div className='sidebar'>
      <NavBar/>
      <SearchBar />
      <Chats />
    </div>
  )
}

export default SideBar
