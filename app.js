cardContainerDIV = document.querySelector("#cardContainerDIV")
// localStorage.setItem("userID","")
// localStorage.getItem("userID")

fetch('http://localhost:3000/meetups')
.then(response => response.json())
.then(meetups => {
  
  meetups.map(meetup => {
    const meetupCard = document.createElement('a')
    const infoContainer = document.createElement('div')
    const image = document.createElement('img')
    const boardgameName = document.createElement('h4')
    const location = document.createElement('p')
    const date = document.createElement('p')
    const currentNumOfPlayers= document.createElement('p')
    

    meetupCard.className="card"
    meetupCard.href=`meetupshow.html?id=${meetup.id}`
    meetupCard.style="cursor: pointer"
    

    image.src = meetup.boardgame.image
    image.className="image"

    boardgameName.className = "boardGameInfo"
    boardgameName.innerText = meetup.boardgame.name

    location.className = "boardGameInfo"
    location.innerText = `Where: ${meetup.location}`

    date.className = "boardGameInfo"
    date.innerText = formatDateAndTime(meetup)

    currentNumOfPlayers.innerText = `${meetup.users.length}/${meetup.boardgame.max_players} Players`
    currentNumOfPlayers.className = "boardGameInfo"
    
    infoContainer.append(boardgameName, location, date, currentNumOfPlayers)
    meetupCard.append(image, infoContainer)
    cardContainerDIV.appendChild(meetupCard)
  })  
})

  const boardGameDropdown = document.querySelector("#boardGamesSelect")
  
  fetch('http://localhost:3000/boardgames')
    .then(response => response.json())
    .then(games => games.map(game =>{
      const gameOption = document.createElement('option')

      gameOption.value = game.id
      gameOption.innerText = game.name

      boardGameDropdown.appendChild(gameOption)
    }))

    function formatDateAndTime(meetup){
      let newDate = ""
      let newTime = ""

      newDate = `${meetup.date.split("-")[1]}/${meetup.date.split("-")[2]}/${meetup.date.split("-")[0]}`
      
      if (parseInt(meetup.time.split(':')[0]) < 12) {
        newTime = `${meetup.time} A.M.`
      } else if (parseInt(meetup.time.split(':')[0]) === 12) {
        newTime = `${meetup.time} P.M.`
      } else { 
        newTime = `${parseInt(meetup.time.split(":")[0]) - 12}:${meetup.time.split(":")[1]} P.M.`
      }
      
      return `On ${newDate} at ${newTime}`
    }

    