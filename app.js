
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
    

    meetupCard.class="card"
    meetupCard.href=`meetupshow.html?id=${meetup.id}`
    meetupCard.style="cursor: pointer"
    infoContainer.class="cardContainer"

    image.src = meetup.boardgame.image

    boardgameName.innerText = meetup.boardgame.name
    location.innerText = `Where: ${meetup.location}`
    date.innerText = `On ${meetup.date} at ${meetup.time}`
    
    infoContainer.append(boardgameName, location, date)
    meetupCard.append(image, infoContainer)
    document.body.appendChild(meetupCard)

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