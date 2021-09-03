import palindrome from "../../src/index";

export var getPalindrome = ({...args }) => {
    const container = document.getElementById('palindrome');
    palindrome(container, {...args});
    return container;
};