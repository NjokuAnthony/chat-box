const tonySelectorBtn = document.querySelector('#Tony-selector')
const temiSelectorBtn = document.querySelector('#Temi-selector')
const chatHeader = document.querySelector('.chat-header')
const chatMessages = document.querySelector('.chat-messages')
const chatInputForm = document.querySelector('.chat-input-form')
const chatInput = document.querySelector('.chat-input')
const clearChatBtn = document.querySelector('.clear-chat-button') 

const messages = JSON.parse(localStorage.getItem('messages')) || []

const creatChatMessageElement = (message) => `
    <div class="message ${message.sender === 'Tony' ? 'blue-bg' : 'gray-bg'}">
        <div class="message-sender">${message.sender}</div>
        <div class="message-text">${message.text}</div>
        <div class="message-timestamp">${message.timestamp}</div>
    </div>
    `  
    window.onload = () => {
        messages.forEach((message) =>{
            chatMessages.innerHTML += creatChatMessageElement(message)
        })
    }

let messageSender = 'Tony'

const updateMessageSender = (name) => {
    messageSender = name
    chatHeader.innerText = `${messageSender} chatting...`
    chatInput.placeholder = `Type here, ${messageSender}...`


    if (name === 'Tony') { 
        tonySelectorBtn.classList.add('active-person')
        temiSelectorBtn.classList.remove('active-person')
    }
    if (name === 'Temi') { 
        temiSelectorBtn.classList.add('active-person')
        tonySelectorBtn.classList.remove('active-person')
    }
    chatInput.focus()
}



tonySelectorBtn.onclick = () => updateMessageSender('Tony')
temiSelectorBtn.onclick = () => updateMessageSender('Temi')

const sendMessage = (e) =>{
    e.preventDefault()

    const timestamp = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true})
    const message = {
        sender: messageSender,
        text: chatInput.value,
        timestamp,
    }
messages.push(message)
localStorage.setItem('messages', JSON.stringify(messages))
chatMessages.innerHTML += creatChatMessageElement(message)
chatInputForm.requestFullscreen()
chatMessages.scrollTop = chatMessages.scrollHeight

}
chatInputForm.addEventListener('submit', sendMessage) 

clearChatBtn.addEventListener('click', () => {
    localStorage.clear()
    chatMessages.innerHTML = ''
})