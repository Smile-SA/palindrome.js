import {defaultValues} from '../stories/controls/defaultControls.js';
import {getPalindrome} from "../stories/controls/getPalindrome";
import {palindromes, toggleFields, selectFields} from "./utils/controls";
import palindromeLogo from '../dev/assets/img/Palindrome.js-logo-and-title.png';
import {categories} from "./utils/controls";
import {controls} from "./utils/controls";

/**
 * Main
 */
render();

/**
 * toggles url parameter and reload
 * @param {event} e
 */
function toggle(e) {
    const urlParams = new URLSearchParams(window.location.search);
    console.log(e.target.id);
    if (document.getElementById(e.target.id).checked) {
        urlParams.set(e.target.name, "true");
        location.search = urlParams;
    } else {
        urlParams.set(e.target.name, "false");
        location.search = urlParams;
    }
}

/**
 * update url parameter with the selected value and reload
 * @param {event} e
 */
function onSelect(e) {
    console.log(e.target.value);
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set(e.target.id, e.target.value);
    location.search = urlParams;
}

/**
 * Display Palindromes select menu
 * @param {object} palindromes
 */
function appendPalindromeOptions(palindromes) {
    const palindromesContainer = document.getElementById("data");
    palindromesContainer.addEventListener('change', onSelect, false);
    for (let category in palindromes) {
        let optgroup = document.createElement("optgroup");
        optgroup.label = category.toString();
        for (let palindrome of palindromes[category]) {
            optgroup.appendChild(new Option(palindrome?.name, palindrome?.name));
        }
        palindromesContainer.appendChild(optgroup);
    }
}

/**
 * Applying default configurations
 * @param {object} devConfig
 */
function applyDefaultOptions(devConfig) {
    for (let toggleId of toggleFields) {
        let element = document.getElementById(toggleId);
        element.addEventListener("click", toggle, false);
        const urlParams = new URLSearchParams(window.location.search);
        let toggleParam = urlParams.get(toggleId);
        if (toggleParam == null) {
            toggleParam = defaultValues()[toggleId];
            devConfig[toggleId] = toggleParam;
            document.getElementById(toggleId).checked = toggleParam;
        } else {
            devConfig[toggleId] = (toggleParam === "true");
            document.getElementById(toggleId).checked = (toggleParam === "true");
        }
    }

    for (let selectId of selectFields) {
        let element = document.getElementById(selectId);
        element.addEventListener('change', onSelect, false);
        const urlParams = new URLSearchParams(window.location.search);
        let selectParam = urlParams.get(selectId);
        if (selectParam == null) selectParam = defaultValues()[selectId];
        devConfig[selectId] = selectParam;
        document.getElementById(selectId).value = selectParam;
        if (selectId === "data") {
            let palindromeName = urlParams.get('data');
            if (palindromeName) {
                document.getElementById("data").value = palindromeName;
            } else {
                urlParams.set('data', document.getElementById("data").options[0].value);
                location.search = urlParams;
                palindromeName = document.getElementById("data").options[0].value;
            }
            let category = findCategoryByPalindromeName(palindromeName);
            let palindrome = findPalindromeByCategoryAndName(category, palindromeName);
            if (palindrome) {
                if (palindrome.hasScrapper) {
                    devConfig.hasScrapper = true;
                    devConfig.scrapper = palindrome.scrapper;
                } else {
                    devConfig.data = palindrome["data"]();
                    if (palindrome?.customConfig) {
                        for (let key of Object.keys(palindrome.customConfig)) {
                            devConfig[key] = palindrome.customConfig[key];
                        }
                    }
                }
            }
        }
    }

    //output the configuration in use to the console
    console.log("Palindrome.js : configuration in use");
    console.dir(devConfig);

}

/**
 * returns category name
 * @param {object} data
 */
function findCategoryByPalindromeName(data) {
    for (let category in palindromes) {
        for (let palindrome of palindromes[category]) {
            if (palindrome?.name === data) {
                return category;
            }
        }
    }
    return null;
}

/**
 * returns palindrome object
 * @param category
 * @param name
 */
function findPalindromeByCategoryAndName(category, name) {
    for (let palindrome of palindromes[category]) {
        if (palindrome?.name === name) {
            return palindrome;
        }
    }
    return null;
}

/**
 * Initialize listeners for sidebar
 */
function init() {
    document.getElementById("collapse").addEventListener('click', closeSidebar, false);
    document.getElementById("burgerMenu").addEventListener('click', openSidebar, false);
}

/**
 * Collapses the sidebar
 */
function closeSidebar() {
    document.getElementsByTagName("aside")[0].removeAttribute("class");
    document.getElementsByTagName("aside")[0].style.overflowX = "visible";
    document.getElementById("sidebar").style.width = "0rem";
    document.getElementById("sidebar").style.marginLeft = "-30rem";
    document.getElementById("burgerMenu").style.opacity = "1";
}

/**
 * Opens the sidebar
 */
function openSidebar() {
    document.getElementById("sidebar").style.width = "30rem";
    document.getElementById("sidebar").style.marginLeft = "0px";
    document.getElementById("burgerMenu").style.opacity = "0";
    document.getElementsByTagName("aside")[0].setAttribute("class", "h-screen overflow-y-auto");
}

/**
 * Creates empty sideBar
 */
function createSideBar() {
    let aside = document.createElement("aside");
    aside.setAttribute("aria-label", "Sidebar");
    aside.setAttribute("class", "h-screen overflow-y-auto");
    aside.style.position = "absolute";
    aside.style.zIndex = "1";
    aside.style.overflowX = "hidden";

    let burgerMenu = document.createElement("div");
    burgerMenu.setAttribute("id", "burgerMenu");
    burgerMenu.style.position = "absolute";
    burgerMenu.style.color = "#3f007b";
    burgerMenu.style.fontWeight = "bold";
    burgerMenu.style.fontSize = "32px";
    burgerMenu.style.paddingTop = "40px";
    burgerMenu.style.paddingLeft = "50px";
    burgerMenu.style.cursor = "pointer";
    burgerMenu.style.opacity = "0";
    burgerMenu.style.transition = "0.4s ease-in-out";
    burgerMenu.innerText = "≣";
    let logo = document.createElement("img");
    logo.setAttribute("src", palindromeLogo);
    logo.setAttribute("alt", "Palindrome.js Logo");
    logo.style.position = "absolute";
    logo.style.left = "140px";
    logo.style.top = "58px";
    logo.style.transform = "scale(2.5)";
    logo.style.cursor = "auto";

    burgerMenu.appendChild(logo);
    aside.appendChild(burgerMenu);
    let body = document.getElementsByTagName("body")[0];
    body.insertBefore(aside, body.firstChild);
}

/**
 * Fills sidebar with logo
 */
function createSideBarContent() {
    let sideBarContent = document.createElement("div");
    sideBarContent.setAttribute("id", "sidebar");
    sideBarContent.setAttribute("class", "h-screen overflow-y-auto py-4 px-4 bg-indigo-50 rounded dark:bg-gray-800");
    sideBarContent.style.zIndex = "1";
    sideBarContent.style.width = "30rem";
    sideBarContent.style.marginLeft = "0";
    sideBarContent.style.transition = "0.4s ease-in-out";
    sideBarContent.style.resize = "horizontal";
    sideBarContent.style.overflow = "auto";

    let close = document.createElement("div");
    close.innerText = "×";
    close.setAttribute("id", "collapse");
    close.style.cssText = "text-align: right; cursor: pointer; font-size: 16pt; font-weight: bold; display:inline; position: absolute; right:20px";

    let image = document.createElement("img");
    image.setAttribute("src", palindromeLogo);
    image.setAttribute("alt", "Palindrome.js Logo");
    image.style.cssText = "transform: scale(0.5); margin-right: absolute";
    image.style.cursor = "auto";

    sideBarContent.appendChild(close);
    sideBarContent.appendChild(image);
    let body = document.getElementsByTagName("aside")[0];
    body.appendChild(sideBarContent);
}

/**
 * Adding sidebar categories
 */
function createCategories() {
    for (let category of categories) {
        let ul = document.createElement("ul");
        ul.style.zIndex = "1";
        ul.setAttribute("class", "space-y-2");
        let li = document.createElement("li");

        let button = document.createElement("button");
        button.setAttribute("aria-expanded", "true");
        button.setAttribute("type", "button");
        button.setAttribute("class", "mt-2 transition-all flex items-center bg-slate-200 p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-300 dark:text-white dark:hover:bg-gray-700");
        button.setAttribute("aria-controls", category);
        button.setAttribute("data-collapse-toggle", category);

        let svg = document.createElement("svg");
        svg.setAttribute("aria-hidden", "true");
        svg.setAttribute("class", "flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-whit");
        svg.setAttribute("fill", "currentColor");
        svg.setAttribute("viewBox", "0 0 20 20");
        svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        button.appendChild(svg);

        let span = document.createElement("span");
        span.setAttribute("sidebar-toggle-item", "");
        span.setAttribute("class", "flex-1 text-left whitespace-nowrap");
        span.style.fontWeight = "bold";
        span.innerText = category;
        button.appendChild(span);

        let svg2 = document.createElement("svg");
        svg2.setAttribute("sidebar-toggle-item", "");
        svg2.setAttribute("class", "w-6 h-6");
        svg2.setAttribute("fill", "currentColor");
        svg2.setAttribute("viewBox", "0 0 20 20");
        svg2.setAttribute("xmlns", "http://www.w3.org/2000/svg");

        let path = document.createElement("path");
        path.setAttribute("fill-rule", "evenodd");
        path.setAttribute("d", "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z");
        path.setAttribute("clip-rule", "evenodd");
        svg2.appendChild(path);
        button.appendChild(svg2)

        li.appendChild(button);

        let elements = document.createElement("ul");
        elements.setAttribute("id", category);
        elements.setAttribute("class", "ml-8 transition-all py-2 space-y-2");

        li.appendChild(elements);
        ul.appendChild(li);
        document.getElementById("sidebar").appendChild(ul);
    }
}

/**
 * Append controls to each category
 */
function appendControlsToCategories() {
    for (let nameId of Object.keys(controls)) {
        let ul = document.createElement("ul");
        ul.setAttribute("class", "space-y-2");
        ul.style.zIndex = 1;

        let li = document.createElement("li");
        li.setAttribute("class", "flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white");
        li.style.zIndex = 1;

        let label = document.createElement("label");
        label.setAttribute("for", nameId);
        label.style.zIndex = 1;

        if (controls[nameId].control === "boolean") {
            label.setAttribute("class", "inline-flex relative items-center cursor-pointer");
            let span = document.createElement("span");
            span.setAttribute("class", "text-sm font-bold text-gray-900 dark:text-gray-300");
            span.innerText = controls[nameId].name;

            let input = document.createElement("input");
            input.setAttribute("name", nameId);
            input.setAttribute("type", "checkbox");
            input.setAttribute("id", nameId);
            input.setAttribute("class", "sr-only peer");

            let div = document.createElement("div");
            div.setAttribute("class", "absolute ml-56 w-11 h-6 bg-gray-400 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[22px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600");

            label.appendChild(span);
            label.appendChild(input);
            label.appendChild(div);

            li.appendChild(label);

            ul.appendChild(li);
            document.getElementById(controls[nameId].category).append(ul);

        } else if (controls[nameId].control === "text") {
            label.setAttribute("class", "mr-9 text-sm font-bold text-gray-900 dark:text-gray-300");
            label.innerText = nameId;
            let input = document.createElement("input");
            input.setAttribute("id", nameId);
            input.setAttribute("value", defaultValues()[nameId] ?? "");
            input.setAttribute("class", "absolute ml-56 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500");
            input.style.width = "38%";

            li.appendChild(label);
            li.appendChild(input);
            ul.appendChild(li);
            document.getElementById(controls[nameId].category).append(ul);
        } else if (controls[nameId].control === "select") {
            label.setAttribute("class", "mr-9 text-sm font-bold text-gray-900 dark:text-gray-300");
            label.innerText = controls[nameId].name;
            let select = document.createElement("select");
            select.setAttribute("id", nameId);
            select.style.width = "50%";
            select.setAttribute("class", "ml-24 relative  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500");
            if (controls[nameId].name === "spheresBehavior" || controls[nameId].name === "sidesDisplayMode" || controls[nameId].name === "layerDisplayMode") select.setAttribute("class", "ml-20 relative  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500");
            if (controls[nameId].type === "static") {
                for (let option of controls[nameId].options) {
                    select.appendChild(new Option(option, option));
                }
            }

            li.appendChild(label);
            li.appendChild(select);
            ul.appendChild(li);
            document.getElementById(controls[nameId].category).append(ul);

            if (controls[nameId].type === "dynamic") {
                appendPalindromeOptions(controls[nameId].options);
            }
        }


    }
}

/**
 * Renders Palindrome with config
 */
function render() {
    createSideBar();
    createSideBarContent();
    createCategories();
    appendControlsToCategories();
    init();
    const devConfig = defaultValues();
    applyDefaultOptions(devConfig);
    getPalindrome(devConfig);
}

