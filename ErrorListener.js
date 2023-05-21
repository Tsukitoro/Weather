window.addEventListener('unhandledrejection', function(event) {
    // объект события имеет два специальных свойства:
    alert(`Сбой ${event.promise}`); // [object Promise] - промис, который сгенерировал ошибку
    alert(`Возможная причина ${event.reason}`); // Error: Ошибка! - объект ошибки, которая не была обработана
});