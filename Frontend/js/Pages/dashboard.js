

const dayFilter = document.querySelector(".day-filter");
const weekFilter = document.querySelector(".week-filter");
const monthFilter = document.querySelector(".month-filter");

dayFilter.addEventListener("click", () => {
    let selectedFilter = document.querySelector(".selected-filter");
    selectedFilter.classList.remove("selected-filter");
    dayFilter.classList.add("selected-filter");
});

weekFilter.addEventListener("click", () => {
    let selectedFilter = document.querySelector(".selected-filter");
    selectedFilter.classList.remove("selected-filter");
    weekFilter.classList.add("selected-filter");
});

monthFilter.addEventListener("click", () => {
    let selectedFilter = document.querySelector(".selected-filter");
    selectedFilter.classList.remove("selected-filter");
    monthFilter.classList.add("selected-filter");
});