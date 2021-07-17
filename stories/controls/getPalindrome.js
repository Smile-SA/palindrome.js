import palindrome from "../../src/index";

export var getPalindrome = ({...args }) => {
    const container = document.getElementById('palindrome');
    palindrome(container, JSON.parse(JSON.stringify({...args})));
    return container;
};