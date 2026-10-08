import { getEvents } from "../API/events.api.js";
import { getToken } from "../Auth/auth.js";
import { showDashboardEventCard } from "../Utils/dom.js";

const dayFilter = document.querySelector(".day-filter");
const weekFilter = document.querySelector(".week-filter");
const monthFilter = document.querySelector(".month-filter");

const dashboardEventsContainer = document.querySelector(".dashboard-events__events-container");

const getUserEvents = async () => {
    const token = getToken();

    try {
        const events = await getEvents(token);

        return events.events;
    } catch (error) {
        if (error.message === "No events found") {
            console.log("No events found for the user");

        } else if (error.message === "Invalid token") {
            window.localStorage.removeItem("token");

            window.location.href = "../index.html";
        } else {
            console.log(error.message);
        }
    }
}

const userEvents = await getUserEvents();

const renderEvents = (events) => {
    dashboardEventsContainer.innerHTML = "";

    if (events.length === 0){
        dashboardEventsContainer.innerHTML = "<p class='dashboard-events__empty-advice'>No hay eventos</p>";

        return;
    }

    events.forEach(event => showDashboardEventCard(dashboardEventsContainer, event));
}

const showTodayEvents = () => {
    const today = new Date();

    const todayString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

    let todayEvents = userEvents.filter(event => event.due_date === todayString);

    todayEvents.forEach(event => {
        if (event.event_status === 0){
            event.advice = "Vence hoy!";
        } else {
            event.advice = "Completado";
        }
    })

    renderEvents(todayEvents);
}

const showWeekEvents = () => {
    const today = new Date();

    const todayString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

    const nextWeekString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate() + 7).padStart(2, "0")}`;

    let weekEvents = userEvents.filter(event => event.due_date > todayString && event.due_date <= nextWeekString);

    weekEvents.forEach(event => {
        if (event.event_status === 0){
            event.advice = "Pendiente";
        } else {
            event.advice = "Completado";
        }
    })

    renderEvents(weekEvents);
}

const showMonthEvents = () => {
    const today = new Date();

    const nextWeekString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate() + 7).padStart(2, "0")}`

    const nextMonthString = `${today.getFullYear()}-${String(today.getMonth() + 2).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;;

    let monthEvents = userEvents.filter(event => event.due_date > nextWeekString && event.due_date <= nextMonthString);

    monthEvents.forEach(event => {
        if (event.event_status === 0){
            event.advice = "Pendiente";
        } else {
            event.advice = "Completado";
        }
    })

    renderEvents(monthEvents);
}

if (userEvents) {
    showTodayEvents();
} else {
    dashboardEventsContainer.innerHTML = "<p class='dashboard-events__empty-advice'>No hay eventos</p>";
}


dayFilter.addEventListener("click", () => {
    let selectedFilter = document.querySelector(".selected-filter");

    selectedFilter.classList.remove("selected-filter");
    dayFilter.classList.add("selected-filter");

    showTodayEvents();
});

weekFilter.addEventListener("click", () => {
    let selectedFilter = document.querySelector(".selected-filter");

    selectedFilter.classList.remove("selected-filter");
    weekFilter.classList.add("selected-filter");

    showWeekEvents();
});

monthFilter.addEventListener("click", () => {
    let selectedFilter = document.querySelector(".selected-filter");

    selectedFilter.classList.remove("selected-filter");
    monthFilter.classList.add("selected-filter");

    showMonthEvents();
});