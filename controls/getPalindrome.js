import palindrome from "../src";

export var getPalindrome = ({...args }) => {
    const container = document.getElementById('palindrome');
    palindrome(container, JSON.parse(JSON.stringify({...args})));
    return container;
};