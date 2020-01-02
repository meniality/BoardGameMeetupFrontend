const searchParams = new URLSearchParams(window.location.search)
const id = searchParams.get('id')


fetch(`http://localhost:3000/users/${id}`)
  .then(response => response.json())
  .then(user => {
    
    const name = document.createElement('h2')
    const boardGamesOwnedLabel = document.createElement('h3')

    name.innerText = user.name
    boardGamesOwnedLabel.innerText=`Board Games That ${user.name.split(" ")[0]} owns.`

    document.body.append(name, boardGamesOwnedLabel)

    user.boardgames.map(game => {
      const name = document.createElement("h4")

      name.innerHTML = `<a href="boardgameshow.html?id=${game.id}"> ${game.name}`

      document.body.appendChild(name)
    })

  })

  const gameDropDown = document.querySelector('#addBoardGameSelect')
  const user_id = document.querySelector('#user_id')
 
  fetch("http://localhost:3000/boardgames")
    .then(response => response.json())
    .then(games => games.map(game => {
      const gameOption = document.createElement('option')
     

      gameOption.innerText = game.name
      gameOption.value = game.id

      user_id.value = id
      
      gameDropDown.append(gameOption, user_id)
    }))