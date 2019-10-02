import React, { useState, useEffect } from 'react'
import api from '../api'
import NavBar from './NavBar'
import Header from './Header'
import './eventdetails.css'

function EventDetail(props) {


  const [evt, setEvt] = useState({})

  const [vote, setVote] = useState("")


  function sendVote() {

    api
      .sendVote(props.match.params.id, JSON.parse(localStorage.user)._id, { vote })
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    api
      .getSingleEvent(props.match.params.id)
      .then(res => setEvt(res))
      .catch(err => console.log(err))

  }, [])


  return (
    <main>
      <Header props={props} />
      <div className="EventDetail">
        <div className="event-name">
          <h3>{evt.name}</h3>{' '}
        </div>
        <div className="container-for-event">
          <div>
            <div className="event-image">
              <img className="event-img" alt="event-image" src={evt.image} />
            </div>

            <div className="event-city">{evt.city} &nbsp;</div>

            <div className="badge">
              <div className="box">8</div>
              <div className="arrow-right"></div>
              <div className="arrow-left"></div>
            </div>

            {/* <div className="test love event-love">
              <i class="fab fa-gratipay"></i>
            </div> */}
            <div>They wanna go:</div>
            {evt.favs &&
              evt.favs.map(
                (e, i) =>
                  i < 5 && (
                    <a
                      href={`/profile/${e._id}`}
                      style={{ border: '1px solid black' }}
                      key={i}
                    >
                      {e.user === JSON.parse(localStorage.user)._id
                        ? ' you'
                        : e.username}
                      {e.emoji}
                    </a>
                  )
              )}
          </div>
          <div className="nothing"></div>

          <div className="description">
            {evt.description && evt.description.fr}
          </div>
        </div>
        {/* <h2>{evt.city}</h2> */}
        <br /> <br />
        <div>{evt.keywords && evt.keywords.fr}</div>
      </div>
      <NavBar props={props} />
    </main>
  )
}

export default EventDetail