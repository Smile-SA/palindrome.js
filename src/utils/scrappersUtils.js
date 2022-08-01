import {getWeatherData} from "../webCollectors/api.open-meteo.com";

/**
 * We declare all our webCollectors
 */
export let scrappers = {getWeatherData};

/**
 * Returning "fetching data..." span that can be displayed while data is being fetched
 */
export function loadingText() {
    let loading = document.createElement("span");
    loading.textContent = "Fetching data...";
    loading.style.position = "absolute";
    loading.style.top = window.innerHeight / 2 + "px";
    loading.style.left = window.innerWidth / 2 + "px";
    return loading;
}