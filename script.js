function reveal() {
    const reveals = document.querySelectorAll(".reveal");
    
    reveals.forEach((element) => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 100;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add("active");
        }
    });
}

window.addEventListener("scroll", reveal);

const drinks = [
    { name: "Absolution Dark", mood: "Час відпустити все зайве." },
    { name: "Catharsis Latte", mood: "Очищення в кожному ковтку." },
    { name: "Respite Cappuccino", mood: "Твоя ідеальна перерва." },
    { name: "Serenity Tea", mood: "Просто дихай і насолоджуйся." },
    { name: "Ethereal Cocoa", mood: "Додасть легкості твоєму дню." },
    { name: "Essence Flat White", mood: "Енергія, що приходить м'яко." }
];

const desserts = [
    { name: "Oblivion Tart", note: "Забудь про буденність." },
    { name: "Mirage Cheesecake", note: "Легкий, наче солодкий сон." },
    { name: "Echo Macarons", note: "Відлуння справжнього смаку." },
    { name: "Solace Brownie", note: "Твоя тепла втіха." }
];

const moodDisplay = document.getElementById('mood-text');
const dessertDisplay = document.getElementById('dessert-text');

function generateDrink() {
    const item = drinks[Math.floor(Math.random() * drinks.length)];
    moodDisplay.style.opacity = 0;
    setTimeout(() => {
        moodDisplay.innerText = `${item.name}. ${item.mood}`;
        dessertDisplay.innerText = ""; 
        moodDisplay.style.opacity = 1;
    }, 300);
}

function generateDessert() {
    const item = desserts[Math.floor(Math.random() * desserts.length)];
    moodDisplay.style.opacity = 0;
    setTimeout(() => {
        moodDisplay.innerText = `${item.name}. ${item.note}`;
        dessertDisplay.innerText = "";
        moodDisplay.style.opacity = 1;
    }, 300);
}

function generatePair() {
    const drink = drinks[Math.floor(Math.random() * drinks.length)];
    const dessert = desserts[Math.floor(Math.random() * desserts.length)];

    const pairMoods = [
        "Твій ідеальний сценарій для паузи.",
        "Коли смаки доповнюють твій спокій.",
        "Маленький ритуал, на який ти заслуговуєш.",
        "Естетика моменту в кожній деталі.",
        "Твоя персональна зона комфорту.",
        "Смак, що зупиняє час."
    ];
    
    const randomPairMood = pairMoods[Math.floor(Math.random() * pairMoods.length)];

    moodDisplay.style.opacity = 0;
    dessertDisplay.style.opacity = 0;
    
    setTimeout(() => {
        moodDisplay.innerText = `${drink.name} & ${dessert.name}`;
        dessertDisplay.innerText = randomPairMood;
        
        moodDisplay.style.opacity = 1;
        dessertDisplay.style.opacity = 1;
    }, 300);
}

reveal();

document.getElementById('orderForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const drink = document.getElementById('drink-selection').value;
    const dessert = document.getElementById('dessert-selection').value;
    const card = document.getElementById('card').value;
    const cvv = document.getElementById('cvv').value;
    const comment = document.getElementById('order-comment').value;
    const response = document.getElementById('orderResponse');
    const cardNumber = card.replace(/\D+/g, '');
    const cvvNumber = cvv.replace(/\D+/g, '');
    response.style.opacity = 0;

    if (!drink && !dessert) {
        setTimeout(() => {
            response.style.display = 'block';
            response.style.color = '#ff6b6b'; 
            response.innerText = `${name}, обери, будь ласка, напій або десерт.`;
            response.style.opacity = 1;
        }, 100);
        return; 
    }

    if (cardNumber.length === 0) { setTimeout(() => {
            response.style.display = 'block';
            response.style.color = '#ff6b6b';
            response.innerText = `${name}, будь ласка, введи номер картки.`;
            response.style.opacity = 1;
        }, 100)
        return;
    }

    if (cardNumber.length !== 16 || cvvNumber.length !== 3) {
        setTimeout(() => {
            response.style.display = 'block';
            response.style.color = '#ff6b6b';
            if (cardNumber.length !== 16) { response.innerText = `${name}, номер картки має складатися з 16 цифр.`}
            else { response.innerText = `${name}, CVV код має складатися з трьох цифр.`; }
            response.style.opacity = 1;
        }, 100);
        return;
    }

    let orderInfo = "";
    if (drink && dessert) orderInfo = `${drink} та ${dessert}`;
    else if (drink) orderInfo = drink;
    else if (dessert) orderInfo = dessert;

    response.style.color = '#daaf84';
    
    setTimeout(() => {
        let finalMessage = `Дякуємо за довіру, ${name}. Оплату підтверджено. Твій вибір (${orderInfo}) вже втілюється у реальність.`;
        
        if (comment) {
            finalMessage += ` Бариста врахує побажання: "${comment}".`;
        }
        
        finalMessage += ` Чекаємо на тебе за 10 хвилин!`;
        
        response.style.display = 'block';
        response.innerText = finalMessage;
        response.style.opacity = 1;
    }, 300);

    this.reset();
    if (typeof tx !== 'undefined') tx.style.height = "auto"; 
});
