const searchParams = new URLSearchParams(window.location.search)
const id = searchParams.get('id')

fetch(`http://localhost:3000/users/${id}`)
  .then(response => response.json())
  .then(user => {
    console.log(user.boardgames)
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