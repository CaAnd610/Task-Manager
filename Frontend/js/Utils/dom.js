export const showError = (element, message) => {
    const container = element.parentElement;

    if (container.querySelector(".error")){
        return;
    }

    const error = document.createElement("span");

    error.classList.add("error");
    error.textContent = message;

    container.appendChild(error);
}

export const clearError = (element) => {
    const error = element.parentElement.querySelector(".error");

    if (error) {
        error.remove();
    }
}

export const showDashboardEventCard = (container, event = {}) => {
    const tittle = event.title;
    const subject = event.subject_name;
    const advice = event.advice;
    const type = event.event_type;
    const dueDate = event.due_date;

    const card = document.createElement("section");
    card.classList.add("dashboard-events__event");
    card.innerHTML =  `
        <h3 class="dashboard-events__event-tittle">${tittle}</h3>
        <p class="dashboard-events__event-subject">${subject}</p>
        <p class="dashboard-events__event-advice">${advice}</p>
        <p class="dashboard-events__event-type">${type}</p>
        <time class="dashboard-events__event-finish-date" datetime="2026-09-15">${dueDate}</time>
        <div class="dashboard-events__event-button-container">
            <button class="btn dashboard-events__edit-event">Editar</button>
        </div>
    `;

    container.appendChild(card);
}
