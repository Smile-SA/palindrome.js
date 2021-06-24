import palindrome from "../../src";

export var createPalindrome = ({...args }) => {
    const container = document.createElement('div');
    palindrome(container, JSON.parse(JSON.stringify({...args})));
    return container;
};