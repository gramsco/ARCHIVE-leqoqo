import React, {useState} from 'react'
import NavBar from "./NavBar"
import mapboxgl from 'mapbox-gl/dist/mapbox-gl'
import Map from './Map'
import api from '../api'
import Header from "./Header"
import Container from './Container'
import EventDetail from './EventDetail'

mapboxgl.accessToken = 'pk.eyJ1IjoiZ3JhbXNjbyIsImEiOiJjazB3ZG5oaXQwMjNrM2NtbTh1bWh0NWtzIn0.5zWaES3a2JH0EZbd7t8aMA'



function Home(props) {

  

    // const [connected, setConnected] = useState(true)
    const [users, setUsers] = useState([])
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState("events")
    const [eventDetail, setEventDetail] = useState("")
    const [userProfile, setUserProfile] = useState({})
    
    console.log(events)

  function fetchUserProfile() {
    console.log("fetching user profile")
      // api
      //   .getUserProfile()
      //   .then(res => setUserProfile(res))
      //   .catch(err => console.log(err))
    }  
  
    function fetchEvents() {
        api
        .getEvents()
        .then(res => setEvents(res))
        .catch(err => console.log(err))
    }

    function fetchUsers() {
        api
            .getUsers()
            .then(res => setUsers(res))
            .catch(err => console.log(err))
    }
    
    //connected is to be changed with api.isLoggedIn() 

    return (
      <div className="Home">
        <Header
          setSearch={setSearch}
          setUsers={setUsers}
          setEvents={setEvents}
          search={search}
        />

        {!api.isLoggedIn() && <Map />}
        {eventDetail && api.isLoggedIn() && (
          <EventDetail
            setEventDetail={setEventDetail}
            eventDetail={eventDetail}
          />
        )}
        {!eventDetail && api.isLoggedIn() && (
          <Container
            search={search}
            fetchUsers={fetchUsers}
            fetchEvents={fetchEvents}
            events={events}
            users={users}
            setEventDetail={setEventDetail}
            fetchUserProfile={fetchUserProfile}
          />
        )}
        {!api.isLoggedIn() && (
          <div className="NotConnected">
            You're not connected! Please<a href="/signup"> log in </a>{' '}
          </div>
        )}
        {api.isLoggedIn() && <NavBar props={props} />}
      </div>
    )

}
export default Home;