import React, {useState,useEffect} from 'react'
import { Link, NavLink } from "react-router-dom"
import { HashLink} from 'react-router-hash-link';
import api from "../api"



function NavBar({ props }) {

  let users_infos = JSON.parse(localStorage.user)

  const [userProfile,setUserProfile] = useState({})
  useEffect(() => {
      api
        .getUserProfileWithUser(users_infos._id)
        .then(res => {
          setUserProfile(res)
          console.log(userProfile)
          console.log(res)
        })
        .catch(err => console.log(err))
    },[])
  
    return (
      <nav className="Navbar">
      
        <NavLink
          activeClassName="selected"
          to={`/profile/${userProfile._id}`}>
          
          <div className="Navbar__emoji" >{userProfile.emoji}</div>
          <p>Profile</p>
        </NavLink>


        <NavLink activeClassName="selected" to="/home">
          <i class="fas fa-home"></i>
          <p>Home</p>
        </NavLink>


        <div className="goToFavs">
          <i class="fas fa-heart"></i>
        </div>
        
  
      </nav>
    )
}
export default NavBar
