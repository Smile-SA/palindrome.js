import {defaultValues} from '../stories/controls/defaultControls.js';
import {getPalindrome} from "../stories/controls/getPalindrome";
import {palindromes, toggleFields, selectFields, radioFields} from "./utils/controls";
import {categories} from "./utils/controls";
import {controls} from "./utils/controls";

const palindromeLogo = "data:image/png;base64,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";
const palindromeType = process.env.PALINDROME_TYPE || 'basic';
const isBenchmark = process.env.IS_BENCHMARK;
const testDuration = process.env.BENCHMARK_DURATION;
const ressourcesLevel = process.env.WORKERS_RESOURCES_LEVEL;
const useCaseName = process.env.USE_CASE_NAME;
const fileName = process.env.OUTPUT_FILENAME;
console.log("env:",{palindromeType, isBenchmark, testDuration, ressourcesLevel, useCaseName, fileName});
/**
 * Main
 */
if (process.env.PALINDROME_TYPE==="basic" || process.env.PALINDROME_TYPE==="dev") {
    renderDev();
}

/**
 * toggles url parameter and reload
 * @param {event} e
 */
function toggle(e) {
    const urlParams = new URLSearchParams(window.location.search);
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

function onRadioChange(e) {
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
            toggleParam = devConfig[toggleId];
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
        if (selectParam == null) selectParam = devConfig[selectId];
        let isUserDefinedConfig = false;
        if (selectId === "data" && typeof(devConfig.data) === 'object') {
            isUserDefinedConfig = true;
        }
        if (!isUserDefinedConfig) {
            devConfig[selectId] = selectParam;
            document.getElementById(selectId).value = selectParam;
        }
        
        if (selectId === "data" && !isUserDefinedConfig) {
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
                if (palindrome.isRemoteDataSource) {
                    devConfig.isRemoteDataSource = true;
                    devConfig.fetchFunction = palindrome.fetchFunction;
                    if(palindrome.remoteDataFetchPace) {
                        devConfig.remoteDataFetchPace = palindrome.remoteDataFetchPace;
                    }
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
    logo.style.overflow = "hidden";
    logo.style.fontSize = "10px";
    logo.style.position = "absolute";
    logo.style.left = "140px";
    logo.style.top = "58px";
    logo.style.transform = "scale(2.5)";
    logo.style.cursor = "auto";

    burgerMenu.appendChild(logo);
    aside.appendChild(burgerMenu);
    if (palindromeType === 'basic' || palindromeType === 'basic-build') {
        aside.style.display = "none";
    }
    let body = document.getElementsByTagName("body")[0];
    body.insertBefore(aside, body.firstChild);
}

/**
 * Fills sidebar with logo
 */
function createSideBarContent() {
    let sideBarContent = document.createElement("div");
    sideBarContent.setAttribute("id", "sidebar");
    sideBarContent.setAttribute("class", "h-screen overflow-y-auto py-4 px-4 bg-indigo-50 rounded dark:bg-gray-600");
    sideBarContent.style.zIndex = "1";
    sideBarContent.style.width = "30rem";
    sideBarContent.style.marginLeft = "0";
    sideBarContent.style.transition = "0.4s ease-in-out";
    sideBarContent.style.resize = "horizontal";
    sideBarContent.style.overflow = "auto";

    let close = document.createElement("div");
    close.innerText = "×";
    close.setAttribute("id", "collapse");
    close.style.cssText = "text-align: right; cursor: pointer; font-size: 16pt; font-weight: bold; display:flex; position: absolute; right:20px; z-index:1";

    let image = document.createElement("img");
    let imageDark = document.createElement("img");

    let logoContainer = document.createElement("div");
    let lightLogoContainer = document.createElement("div");

    logoContainer.setAttribute("class", "dark:hidden");
    lightLogoContainer.setAttribute("class", "hidden dark:block");

    image.setAttribute("src", palindromeLogo);
    image.setAttribute("alt", "Palindrome.js Logo");
    image.style.cssText = "transform: scale(0.5); margin-right: absolute";
    image.style.cursor = "auto";
    logoContainer.appendChild(image);

    imageDark.setAttribute("src", palindromeLightLogo);
    imageDark.setAttribute("alt", "Palindrome.js Logo");
    imageDark.style.cssText = "transform: scale(0.5); margin-right: absolute";
    imageDark.style.cursor = "auto";
    lightLogoContainer.appendChild(imageDark);

    sideBarContent.appendChild(close);
    sideBarContent.appendChild(logoContainer);
    sideBarContent.appendChild(lightLogoContainer);
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
        button.setAttribute("class", "mt-2 transition-all flex items-center bg-slate-200 p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-300 dark:hover:bg-gray-700");
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
        span.setAttribute("class", "font-semibold flex-1 text-left whitespace-nowrap group-hover:text-gray-200");
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
        if (controls[nameId].hidden) {
            continue;
        }
        let ul = document.createElement("ul");
        ul.setAttribute("class", "space-y-2");
        ul.style.zIndex = 1;

        let li = document.createElement("li");
        li.setAttribute("class", "flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white");
        li.style.zIndex = 1;

        let label = document.createElement("label");
        label.setAttribute("for", nameId);400
        label.style.zIndex = 1;

        let labelContainer = document.createElement("div");
        labelContainer.setAttribute("style", "width: 600px; white-space: nowrap; text-overflow: ellipsis; overflow: hidden;");

        if (controls[nameId].control === "boolean") {
            label.setAttribute("class", "inline-flex relative items-center cursor-pointer");
            labelContainer.appendChild(label);
            let span = document.createElement("span");
            span.setAttribute("class", "text-sm font-bold text-gray-900 dark:text-gray-300");
            span.innerText = controls[nameId].name;

            let input = document.createElement("input");
            input.setAttribute("name", nameId);
            input.setAttribute("type", "checkbox");
            input.setAttribute("id", nameId);
            input.setAttribute("class", "sr-only peer");

            let div = document.createElement("div");
            div.setAttribute("class", "absolute ml-60 w-11 h-6 bg-gray-400 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[22px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600");
            div.setAttribute("id", nameId + "-toggle-design");

            label.appendChild(span);
            label.appendChild(input);
            label.appendChild(div);

            li.appendChild(labelContainer);

            ul.appendChild(li);
            document.getElementById(controls[nameId].category).append(ul);

        } else if (controls[nameId].control === "text") {
            label.setAttribute("class", "mr-9 text-sm font-bold text-gray-900 dark:text-gray-300");
            label.innerText = nameId;
            labelContainer.appendChild(label);
            let input = document.createElement("input");
            input.setAttribute("id", nameId);
            input.setAttribute("value", defaultValues()[nameId] ?? "");
            input.setAttribute("class", "ml-2 relative  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500");
            li.appendChild(labelContainer);
            li.appendChild(input);
            ul.appendChild(li);
            document.getElementById(controls[nameId].category).append(ul);
        } else if (controls[nameId].control === "select") {
            label.setAttribute("class", "mr-9 text-sm font-bold text-gray-900 dark:text-gray-300");
            label.innerText = controls[nameId].name;
            labelContainer.appendChild(label);
            let select = document.createElement("select");
            select.setAttribute("id", nameId);
            select.setAttribute("class", "ml-2 relative  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500");
            if (controls[nameId].type === "static") {
                for (let option of controls[nameId].options) {
                    select.appendChild(new Option(option, option));
                }
            }

            li.appendChild(labelContainer);
            li.appendChild(select);
            ul.appendChild(li);
            document.getElementById(controls[nameId].category).append(ul);

            if (controls[nameId].type === "dynamic") {
                appendPalindromeOptions(controls[nameId].options);
            }
        } else if (controls[nameId].control === "radio") {
            label.setAttribute("class", "mr-9 text-sm font-bold text-gray-900 dark:text-gray-300");
            label.innerText = controls[nameId].name;
            labelContainer.appendChild(label);
            
            const radioContainer = document.createElement("div");
            radioContainer.setAttribute("class", "flex");
            for (const option of controls[nameId].options) {
                const optionContainer = document.createElement("div");
                optionContainer.setAttribute("class", "flex items-center ml-2 relative");
                
                const radio = document.createElement("input");
                radio.setAttribute("id", nameId);
                radio.setAttribute("type", "radio");
                radio.setAttribute("name", nameId);
                radio.setAttribute("value", option);
                radio.setAttribute("class","ml-2 relative text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600");

                const radioLabel = document.createElement("label");
                radioLabel.setAttribute("for", option);
                radioLabel.setAttribute("class", "ml-2 relative text-sm font-medium text-gray-900 dark:text-gray-300");
                radioLabel.innerHTML = option;

                optionContainer.appendChild(radio);
                optionContainer.appendChild(radioLabel);
                radioContainer.appendChild(optionContainer);
            }
            
            li.appendChild(labelContainer);
            li.appendChild(radioContainer);
            ul.appendChild(li);
            document.getElementById(controls[nameId].category).append(ul);
            
        }


    }
}

/**
 * Applies if condition to boolean controls
 */
function applyConditionsToControls() {
    for(const id of Object.keys(controls)) {
        const condition = controls[id]?.if;
        const value = condition?.value ?? true;
        if (!condition) {
            continue;
        }
        const otherId = controls[id].if.control;
        const element = document.getElementById(id);
        const otherElement = document.getElementById(otherId);
        if (controls[id].control !== 'boolean' || controls[otherId].control !== 'boolean') {
            console.warn('Condition not supported yet for this type of control!');
            return;
        }
        const toggleDesign = document.getElementById(id + '-toggle-design');

        if (otherElement.checked === value) {
            element.disabled = true;
            console.log(toggleDesign)
            toggleDesign.setAttribute("class", toggleDesign.getAttribute("class") + " opacity-30");
        }
    }
}

/**
 * Renders Palindrome with config
 */
export function renderDev() {
    createSideBar();
    createSideBarContent();
    createCategories();
    appendControlsToCategories();
    init();
    const devConfig = defaultValues();
    applyDefaultOptions(devConfig);
    if (process.env.PALINDROME_TYPE==="basic" || process.env.PALINDROME_TYPE==="dev") {
        getPalindrome(devConfig);
    }
    return devConfig;
}