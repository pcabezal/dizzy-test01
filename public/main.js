const updateButton = document.querySelector('#update-button')

updateButton.addEventListener('click', _ => {
  fetch('/death-list', {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        playerName: 'David Hasselhoff',
        deathX: '42',
        deathY: '69',
        sector: '12',
        deathTime: '60:00'
      })
  })
    .then(res => {
      if (res.ok) return res.json()
  })
    .then(response => {
      window.location.reload(true)
  })
})

const testmanButton = document.querySelector('#testman-button')

testmanButton.addEventListener('click', _ => {
  fetch('/death-list', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        playerName: 'testman',
        deathX: '50',
        deathY: '60',
        sector: '3',
        deathTime: '5:00'
      })
  })
    .then(res => {
      if (res.ok) return res.json()
  })
    .then(response => {
      window.location.reload(true) // dunno why this reload isnt working like in the function above
  })
  window.location.reload(true); // but this one is
})

const deleteButton = document.querySelector('#delete-button')
const messageDiv = document.querySelector('#message')

deleteButton.addEventListener('click', _ => {
  fetch('/death-list', {
    method: 'delete',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      playerName: 'David Hasselhoff'
    })
  })
    .then(res => {
      if (res.ok) return res.json()
  })  
    .then(response => {
        if (response === 'Nothing to delete') {
          messageDiv.textContent = 'No Hass to delete'
        } else {
          window.location.reload(true)
        }
  })
    .catch(error => console.error(error))
})

