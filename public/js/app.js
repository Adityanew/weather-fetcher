

console.log(" here in js folder")






const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
//messageOne.textContent = ''

const $sendLocation = document.querySelector('#send-location')

$sendLocation.addEventListener('click', () => {
    messageOne.textContent = 'Loading....'
    messageTwo.textContent = ''
   // $sendLocation.setAttribute('disabled', 'disabled')
    if(!navigator.geolocation) {
        return alert('geolocation not supported')
    }
    navigator.geolocation.getCurrentPosition( (position) => {

        fetch('/v2/weather?latitude='+position.coords.latitude+'&longitude='+position.coords.longitude).then( (response) => {
            response.json().then((data) => {
                if(data.error) {
                    console.log(data.error)
                    messageOne.textContent = data.error
                }
                else {
                    messageOne.textContent = data.location,
                    messageTwo.textContent = data.weatherInfo
                }
            })
        })
        //console.log(position)

    })

})


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    messageOne.textContent = 'Loading....'
    messageTwo.textContent = ''
    fetch('/weather?address='+location).then( (response) => {
    response.json().then((data) => {
        if(data.error) {
                console.log(data.error)
                messageOne.textContent = data.error
        }
        else {
            console.log(data)
            console.log(data.location)
            
            messageOne.textContent = data.location
            messageTwo.textContent = data.weatherInfo
        }
    })
})
    console.log('title')
})
