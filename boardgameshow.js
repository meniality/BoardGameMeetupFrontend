const searchParams = new URLSearchParams(window.location.search)
const id = searchParams.get('id')

fetch(`http://localhost:3000/boardgames/${id}`)
  .then(response => response.json())
  .then(game => {
    const name_pic = document.createElement('div')

    const name = document.createElement('h2')
    const image = document.createElement('img')

    name.innerText = game.name
    image.src = game.image

    name_pic.append(name, image)


    const description_div = document.createElement('div')
    const description = document.createElement('p')

    description.innerText = game.description

    description_div.appendChild(description)


    const info_div = document.createElement('div')
    const info_list_left = document.createElement('ul')
    const info_list_right = document.createElement('ul')
    const players = document.createElement('li')
    const playtime = document.createElement('li')
    const age = document.createElement('li')
    const rating = document.createElement('li')
    const msrp = document.createElement('li')

    players.innerText = `Players: ${game.min_players}-${game.max_players}`
    playtime.innerText = `Playtime: ${game.min_playtime}-${game.max_playtime} mins`
    age.innerText = `Recommended age: ${game.min_age}+`

    rating.innerText = `Average user rating: ${parseFloat(game.average_rating).toFixed(2)}/5`
    msrp.innerText = `$${game.msrp}`

    info_list_left.append(players,playtime,age)
    info_list_right.append(rating, msrp)
    info_div.append(info_list_left, info_list_right)


    const designer = document.createElement('div')
    const sentence = document.createElement('p')

    sentence.innerText = `Designed by ${game.designers.map(designer => `${designer},`)} in ${game.year_published} and published by ${game.primary_publisher}.`

    designer.appendChild(sentence)

    document.body.append(name_pic, description_div, info_div, designer)

  })