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

/**
 * Creates popup for remote data source url
 * @param {*} parentElement the Palindrome.js container
 */
export const createBadUrlPopup = (parentElement) => {
    let modalDiv = document.createElement("div");
    modalDiv.setAttribute("id", "url-input");
    modalDiv.style.fontFamily = "sans-serif";
    modalDiv.style.display = "block";
    modalDiv.style.position = "fixed";
    modalDiv.style.zIndex = "1";
    modalDiv.style.paddingTop = "100px";
    modalDiv.style.paddingBottom = "100px";
    modalDiv.style.left = "0";
    modalDiv.style.top = "0";
    modalDiv.style.width = "100%";
    modalDiv.style.height = "100%";
    modalDiv.style.overflow = "auto";
    modalDiv.style.backgroundColor = "rgb(0,0,0)";
    modalDiv.style.backgroundColor = "rgba(0,0,0,0.4)";

    let modalContent = document.createElement("div");
    modalContent.style.backgroundColor = "#fefefe";
    modalContent.style.margin = "auto";
    modalContent.style.padding = "20px";
    modalContent.style.border = "1px solid #888";
    modalContent.style.width = "30%";
    modalContent.style.height = "20%";
    modalContent.style.borderRadius = "25px";

    const span = document.createElement("span");
    span.setAttribute("class", "close");
    span.innerHTML = "&times;";
    span.style.color = "#aaaaaa";
    span.style.float = "right";
    span.style.fontSize = "28px";
    span.style.fontWeight = "bold";

    modalContent.appendChild(span);

    const title = document.createElement('p');
    title.innerHTML = "❌ Sorry, we couldn't find any external data from <a src='http://localhost:3000'>http://localhost:3000</a>.";
    title.style = 'margin-left: 10%; margin-right: 10%; margin-top: 4.5%; font-size: 16px; align-text: center';
    modalContent.appendChild(title);


    let style = document.createElement('style');
    style.innerHTML = `
        .close:hover, .close:focus {
            color: black;
            text-decoration: none;
            cursor: pointer;
        }
    `;

    window.onclick = function (event) {
        if (event.target === modalDiv) {
            modalDiv.style.display = "none";
        }
    }

    span.onclick = function () {
        modalDiv.style.display = "none";
    }

    modalDiv.appendChild(modalContent);
    parentElement.appendChild(style);
    parentElement.appendChild(modalDiv);

}