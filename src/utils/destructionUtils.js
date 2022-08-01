let previousPalindrome;

function setPreviousPalindrome(renderer, scene, meshes, parentElement, frameId) {
    previousPalindrome = [renderer, scene, meshes, parentElement, frameId];
}

export {previousPalindrome, setPreviousPalindrome}
