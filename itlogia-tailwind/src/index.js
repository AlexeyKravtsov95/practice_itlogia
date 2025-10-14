import './styles.css'

import {LoremIpsum} from 'lorem-ipsum';

const editable = document.getElementById('write-to-chat');
const mainSidebar = document.getElementById('main-sidebar');
const extraToggle = document.getElementById('extra-toggle');
const chatContainer = document.getElementById('chat');
const chatLinksContainer = document.getElementById('chat-links-container');
const sendMessageButton = document.getElementById('send-message');
const overlay = document.getElementById('overlay');

let currentChatId = 0;
const lorem = new LoremIpsum();
const chatLinks = [];
const chats = [
    {
        id: 0,
        name: 'Что такое Tailwind?',
        history: [
            {
                from: "user", text: "Что такое Tailwind?"
            },
            {
                from: "bot",
                text: "Tailwind CSS — это утилитарный CSS-фреймворк, который позволяет быстро создавать адаптивный и\n" +
                    "                современный интерфейс, используя готовые CSS-классы прямо в HTML-разметке.\n" +
                    "                <br><br>\n" +
                    "                В отличие от традиционных фреймворков вроде Bootstrap, где есть готовые компоненты (кнопки, модальные\n" +
                    "                окна и т.п.), Tailwind делает упор на микро-классы, каждый из которых отвечает за одно конкретное\n" +
                    "                CSS-свойство (например, отступ, цвет, размер текста и т.д.).\n" +
                    "                <br><br>\n" +
                    "                Tailwind особенно популярен среди фронтенд-разработчиков, которые используют React, Vue, Next.js и\n" +
                    "                другие современные фреймворки."
            },
            {
                from: "user", text: "Какие популярные сайты сделаны на tailwind? Перечисли простым списком."
            },
            {
                from: "bot", text: "Вот список популярных сайтов и сервисов, использующих Tailwind CSS:\n" +
                    "                <ul class=\"list-disc pl-5\">\n" +
                    "                    <li>GitHub Copilot Docs</li>\n" +
                    "                    <li>Vercel (и их дашборд)</li>\n" +
                    "                    <li>Tailwind UI (официальная библиотека компонентов)</li>\n" +
                    "                    <li>Laravel (оф. сайт фреймворка)</li>\n" +
                    "                    <li>Statamic (CMS на Laravel)</li>\n" +
                    "                    <li>Plausible Analytics</li>\n" +
                    "                    <li>Linear (система управления задачами)</li>\n" +
                    "                    <li>Tailscan (инспектор Tailwind-классов в браузере)</li>\n" +
                    "                    <li>Transistor.fm (подкаст-хостинг)</li>\n" +
                    "                    <li>Refactoring UI (сайт одноимённой книги от авторов Tailwind)</li>\n" +
                    "                </ul>\n" +
                    "                <br>\n" +
                    "                Эти сайты варьируются от документации и панелей управления до SaaS-продуктов и маркетинговых лендингов —\n" +
                    "                Tailwind гибко подходит под любой тип интерфейса."
            }
        ]
    },
    {
        id: 1,
        name: 'Как создаются сайты?',
        history: [
            {
                from: "user", text: "Как создаются сайты?",
            },
            {
                from: "bot", text: "Сайты создаются с помощью HTML, CSS, JS",
            }
        ]
    }
];
editable.addEventListener('input', (e) => {
    if (editable.innerText.trim() === '') {
        editable.innerHTML = '';
    }
});

editable.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessageButton.click();
    }
});

document.getElementById('main-toggle').addEventListener('click', (e) => {
    mainSidebar.classList.add('sidebar-closed');
    extraToggle.classList.remove('sidebar-closed');
});

extraToggle.addEventListener('click', (e) => {
    mainSidebar.classList.remove('sidebar-closed');
    extraToggle.classList.add('hidden');
});

document.getElementById('mobile-toggle').addEventListener('click', (e) => {
   if(mainSidebar.classList.contains('hidden')){
       mainSidebar.classList.remove('hidden');
       mainSidebar.classList.add('flex');
       overlay.classList.remove('hidden');
   }
});

document.getElementById('close-toggle').addEventListener('click', (e) => {
    mainSidebar.classList.add('hidden');
    mainSidebar.classList.remove('flex');
    overlay.classList.add('hidden');
})

function renderChat(chatId) {
    chatContainer.innerHTML = '';

    const chat = chats.find((chat) => chat.id === chatId);
    if (!chat) return;

    if (chat.history.length === 0) {
        const emptyChat = document.createElement('div');
        emptyChat.innerText = "Готов ответить на ваши вопросы!";
        emptyChat.className = "flex items-center justify-center h-full text-center text-base font-bold";

        chatContainer.appendChild(emptyChat);
    } else {
        chat.history.forEach((elem) => {
            addMessageToContainer(elem.text, elem.from);
        });
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
}

function addMessageToContainer(message, from = 'user', addTypingEffect = false) {
    const wrapper = document.createElement('article');
    wrapper.className = from === 'user'
        ? 'flex justify-end w-full'
        : 'pb-9 mt-5';

    const bubble = document.createElement('div');
    bubble.className = from === 'user'
        ? 'max-w-full px-4 py-3 rounded-3xl bg-(--chat-user-message-color) md:max-w-[70%]'
        : '';

    if (addTypingEffect) {
        typeText(bubble, message);
    } else {
        bubble.innerHTML = message;
    }

    wrapper.appendChild(bubble);
    chatContainer.appendChild(wrapper);
}

function typeText(targetElement, text) {
    let index = 0;
    targetElement.innerHTML = '';
    const interval = setInterval(() => {
        if(index < text.length) {
            targetElement.innerHTML += text[index];
            index++;
            chatContainer.scrollTop = chatContainer.scrollHeight;
        } else {
            clearInterval(interval);
        }
    }, 5);
}

function populateChatLinks(activeChatId) {
    chats.forEach(chat => {
        const li = document.createElement('li');

        const a = document.createElement('a');
        a.className = chat.id === activeChatId
            ? 'block p-3 rounded-lg truncate leading-none bg-neutral-700':
            'block p-3 rounded-lg truncate leading-none hover:bg-neutral-700 cursor-pointer';
        a.innerText = chat.name;
        a.href = '#';
        a.addEventListener('click', (e) => {
            currentChatId = chat.id;
            renderChat(chat.id);
            chatLinks.forEach(link => {
                link.classList.remove('bg-neutral-700');
                e.target.classList.add('bg-neutral-700');
            })
        });

        li.appendChild(a);
        chatLinksContainer.appendChild(li);
        chatLinks.push(a);
    })
}

document.querySelectorAll('[data-new-chat]').forEach(chat => {
    chat.addEventListener('click', (e) => {
        const newId = chats.length;
        const name = `Новый чат ${newId + 1}`;
        currentChatId = newId;
        chatLinksContainer.innerHTML = '';
        chats.unshift({id: newId, name, history: []});
        populateChatLinks(newId);
        renderChat(newId);
    });
})

sendMessageButton.addEventListener('click', (e) => {
    const text = editable.innerText.trim();
    if (!text) return;

    const chat = chats.find((chat) => chat.id === currentChatId);
    if (!chat) return;

    if (chat.history.length === 0) {
        chatContainer.innerHTML = '';
        const link = document.querySelector('nav ul li:first-child a');
        if (link) {
            link.textContent = text;
        }
        chat.name = text;
    }

    chat.history.push({from: "user", text});
    editable.innerText = '';
    addMessageToContainer(text);

    const response = lorem.generateParagraphs(4);
    chat.history.push({from: "bot", text: response});
    addMessageToContainer(response, 'bot', true);
});

populateChatLinks(currentChatId)
renderChat(currentChatId)