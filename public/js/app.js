const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const p1Message = document.querySelector('#p1')
const p2Message = document.querySelector('#p2')

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const location = search.value
    p1Message.textContent = 'Loading...'
    p2Message.textContent = ''
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            p1Message.textContent = data.error
        } else {
            p1Message.textContent = data.location 
            p2Message.textContent = data.forecast
        }
    })
})
})