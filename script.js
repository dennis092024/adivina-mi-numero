// 1. Obtener referencias a los elementos HTML

const guessInput = document.getElementById('guessInput');
const checkBtn = document.getElementById('checkBtn');
const resetBtn = document.getElementById('resetBtn');
const messageDisplay = document.getElementById('message');
const attemptsDisplay = document.getElementById('attempts');

// Variables del juego 

let secretNumber;
let  attempts = 0;
const MAX_ATTEMPTS = 10; // Puedes limitar los intentos si quieres 

// Función para inicializar o reiniciar el juego 

function  initializeGame(){
    // Generar un nuevo número secreto entre 1 y 100
    secretNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    attemptsDisplay.textContent = attempts; // Actualizar el contador de intentos en el HTML


messageDisplay.textContent = '¡Empieza a adivinar!'; // Reiniciar mensaje
messageDisplay.classList.remove('error');  // Quitar clase de error si la tenía 
messageDisplay.style.color = '#4CAF50'; // Restablecer color de mensaje por defecto 

guessInput.value = ''; // Limpiar el input
guessInput.disabled = false; // Habilitar el input
checkBtn.disabled = false; // Habilitar el botón de comprobar 

resetBtn.classList.add('hidden');  // Ocultar el botón de "Jugar de Nuevo" 
}

// Función para mostrar mensajes al usuario 

function displayMessage(msg, isError = false){
    messageDisplay.textContent = msg;

    if(isError){
        messageDisplay.classList.add('error');
    }else{
        messageDisplay.classList.remove('error');
        messageDisplay.style.color = '#4CAF50'; // Color por defecto si no es error
    }
}

// Función principal para comprobar la adivinanza 

function checkGuess () {
    const userGuess = parseInt(guessInput.value); // ConverƟr el valor del input a número entero

// ConverƟr el valor del input a número entero
if(isNaN(userGuess) || userGuess < 1 || userGuess > 100){
    displayMessage('Por favor, introduce un número válido entre 1 y 100.',true);
    return;  // Salir de la función si la entrada es inválida 
}
attempts++;  // Incrementar el contador de intentos 
attemptsDisplay.textContent = attempts; // Actualizar el HTML 

if(userGuess === secretNumber){
    // El usuario adivinó correctamente
    displayMessage(`¡Felicidades! Adivinaste el número ${secretNumber} en ${attempts} intentos.`);
    messageDisplay.style.color = '#2196F3';// Color azul para éxito 

    // Deshabilitar input y botón de comprobar para evitar más intentos
    guessInput.disabled = true;
    checkBtn.disabled = true;
    resetBtn.classList.remove('hidden'); // Mostrar el botón de reiniciar 
}else if(userGuess < secretNumber){
    // El número es demasiado bajo 
    displayMessage('Demasiado bajo.¡Intenta de nuevo!',false);
}else{
    // El número es demasiado alto 
    displayMessage('Demasiado alto. ¡Intenta de nuevo!',false);
}
// Opcional: Límite de intentos 
 // if (aƩempts >= MAX_ATTEMPTS && userGuess !== secretNumber) {
 // displayMessage(`¡Te quedaste sin intentos! El número era ${secretNumber}.`, true);
 // guessInput.disabled = true;
 // checkBtn.disabled = true;
 // resetBtn.classList.remove('hidden');
 // } 

 guessInput.value = ''; // Limpiar el input después de cada intento 
 guessInput.focus(); // Enfocar el input para el siguiente intento 


}
 // 4. Asignar las funciones a los eventos 
 checkBtn.addEventListener('click', checkGuess);
 resetBtn.addEventListener('click', initializeGame); // Para el botón de reiniciar 

 // Opcional: PermiƟr comprobar adivinanza presionando Enter en el input
guessInput.addEventListener('keypress', function(event){
    if(event.key === 'Enter'){
        checkGuess();
    }
}
);

// Inicializar el juego cuando la página carga 
initializeGame();
