fetch(`http://localhost:3000/users`)
  .then(response => response.json())
  .then(users => users.map(user => {
    const name = document.createElement('h2')
    
    // console.log(user)
    name.innerHTML = `<a href="usershow.html?id=${user.id}"> ${user.name}</a>`
    
    document.body.append(name)
    
  }))
  
  

