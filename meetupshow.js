const searchParams = new URLSearchParams(window.location.search)
const id = searchParams.get('id')

const meetupID = document.querySelector('#meetupid')
meetupID.value = id

const deleteMeetupButton = document.createElement('button')

deleteMeetupButton.innerText = "Delete Meetup"
deleteMeetupButton.addEventListener('click', () => {
  deleteMeetupSubmit(id)
  window.location ="http://localhost:3001/index.html"
})



  

document.body.appendChild(deleteMeetupButton)



fetch(`http://localhost:3000/meetups/${id}`)
.then(response => response.json())
.then(meetup => {
  console.log(meetup)
  const meetupCard = document.createElement('a')
  const infoContainer = document.createElement('div')
  const image = document.createElement('img')
  const boardgameName = document.createElement('h4')
  const location = document.createElement('p')
  const updateLocation = document.createElement('button')
  const updateLocationTextField = document.createElement('input')
  const updateLocationSubmitButton = document.createElement('button')
  const date = document.createElement('p')

  
  meetupID.value = meetup.id
  meetupCard.class="card"
  meetupCard.style.display = "block"

  infoContainer.class="cardContainer"
  
  image.src = meetup.boardgame.image
  
  boardgameName.innerText = meetup.boardgame.name
  location.innerText = `Where: ${meetup.location}`

  
  updateLocation.innerText = "update"
  updateLocation.addEventListener('click', () =>{
    event.target.remove()
    unhideUpdateTextField(updateLocationTextField)
  })
  
  date.innerText = `On ${meetup.date} at ${meetup.time}`
  
  updateLocationTextField.style.display = "none"
  updateLocationTextField.id = "updateLocationTextField"

  updateLocationSubmitButton.innerText = "submit"
  updateLocationSubmitButton.style.display = "none"
  updateLocationSubmitButton.id ="updateLocationSubmitButton"
  updateLocationSubmitButton.addEventListener('click',() => {
    updateLocationSumbit(id, updateLocationTextField.value)
    event.target.parentNode.innerText = `Where: ${updateLocationTextField.value}`
  })
  

  location.append(updateLocation, updateLocationTextField, updateLocationSubmitButton)
  infoContainer.append(boardgameName, location, date)
  meetupCard.append(image, infoContainer)
  document.body.appendChild(meetupCard)
  
  meetup.user_meetups.map(user_meetup => {
    
    const name = document.createElement('h3')
    const removeUserButton = document.createElement('button')
    
    name.innerHTML = `<a href = "usershow.html?id=${user_meetup.user.id}"> ${user_meetup.user.name}`

    removeUserButton.innerText = "remove"
    removeUserButton.addEventListener('click', () =>{
    event.target.parentNode.remove()
    deleteUserMeetup(user_meetup.id)
    })
    
    name.appendChild(removeUserButton)
    document.body.appendChild(name)
  })
  
})

const dropDown=document.querySelector('#userDropdown')

fetch(`http://localhost:3000/users`)
.then(response => response.json())
.then(users => users.map(user =>{
  const userOption = document.createElement('option')
  
  userOption.value = user.id
  userOption.innerText = user.name

  dropDown.appendChild(userOption)
}))


  function deleteUserMeetup(id){
    fetch(`http://localhost:3000/user_meetups/${id}`,{
      method: 'delete'
    })
  }
    
  function unhideUpdateTextField(element){
    document.querySelector('#updateLocationTextField').style.display = "inline"
    document.querySelector('#updateLocationSubmitButton').style.display = "inline"
  }

  function updateLocationSumbit(id, value){
    fetch(`http://localhost:3000/meetups/${id}`,{
      method:"put",
      headers:{
        'Content-Type':'application/json',
        'Accept':'application/json'
      },
      body:JSON.stringify({location: value})
    })
  }

  function deleteMeetupSubmit(id){
    fetch(`http://localhost:3000/meetups/${id}`,{
      method:"delete"
    })
  }