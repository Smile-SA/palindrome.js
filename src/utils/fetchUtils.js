/**
 * Returning "fetching data..." span that can be displayed while data is being fetched
 */
export const loadingText = () => {
    let loading = document.createElement("span");
    loading.setAttribute("id", "remote-data-source-loader");
    loading.textContent = "Fetching data...";
    loading.style.position = "absolute";
    loading.style.top = window.innerHeight / 2 + "px";
    loading.style.left = window.innerWidth / 2 + "px";
    return loading;
}