cardContainerDIV = document.querySelector("#cardContainerDIV")

fetch('http://localhost:3000/meetups')
.then(response => response.json())
.then(meetups => {
  console.log(meetups)
  
  meetups.map(meetup => {
    const meetupCard = document.createElement('a')
    const infoContainer = document.createElement('div')
    const image = document.createElement('img')
    const boardgameName = document.createElement('h4')
    const location = document.createElement('p')
    const date = document.createElement('p')
    

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
    date.innerText = `On ${meetup.date.split("-")[1]}/${meetup.date.split("-")[2]}/${meetup.date.split("-")[0]} at ${meetup.time}`
    meetup.date.split("-")
    infoContainer.append(boardgameName, location, date)
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