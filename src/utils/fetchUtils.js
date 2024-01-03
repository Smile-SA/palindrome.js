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
 * Creates input modal for remote data source url
 * @param {*} parentElement the Palindrome.js container
 */
export const createInputUrlModal = (parentElement) => {
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
    modalContent.style.width = "80%";
    modalContent.style.height = "30%";
    modalContent.style.overflow = "auto";
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
    title.innerHTML = 'Oops... It looks like there is something wrong. Please fill out your remote data source URL:';
    title.style = 'margin-left: 20px;';
    modalContent.appendChild(title);

    const urlInput = document.createElement('input');
    urlInput.setAttribute('placeholder', 'http://example.com');
    urlInput.setAttribute('id', 'remoteDataSourceURL');
    modalContent.appendChild(urlInput);

    const errorMessage = document.createElement('p');
    errorMessage.innerHTML = 'Invalid URL or the returned response does not adhere to the specifications outlined in Palindrome.js documentation.<br/>Please refer to the documentation for detailed information.';
    errorMessage.style.color = "red";
    errorMessage.style.fontSize = '11px';
    errorMessage.style.marginLeft = '20px';
    errorMessage.setAttribute('id', 'url-error-message');
    errorMessage.style.visibility = 'hidden';
    modalContent.appendChild(errorMessage);

    const submit = document.createElement('button');
    submit.innerHTML = 'Submit';
    submit.setAttribute('id', 'submit-button');
    modalContent.appendChild(submit);


    let style = document.createElement('style');
    style.innerHTML = `
        .close:hover, .close:focus {
            color: black;
            text-decoration: none;
            cursor: pointer;
        }
        #remoteDataSourceURL {
            width: 80%;
            transition: 0.4s ease-in-out;
            margin-left: 20px;
            margin-top: 20px;
            height: 20%; outline: none; border: none; border-bottom: 2px solid grey;
        }
        #remoteDataSourceURL:focus {
            width: 90%;
            transform: scale(1.05);
            border-bottom: 2px solid #7625a8;
            transition: 0.4s ease-in-out;
            margin-left: 30px;
        }
        #submit-button{
            display: block;
            margin-top: 20px;
            margin-left: 85%;
            outline: none;
            border: none;
            height: 30px;
            width: 100px;
            border-radius: 5px;
            transition: 0.3s ease-in-out;
            background-color: #ebebeb;
        }
        #submit-button:hover{
            background-color: #7625a8;
            color: white;
            cursor: pointer;
            transform: scale(1.1);
            transition: 0.3s ease-in-out;

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