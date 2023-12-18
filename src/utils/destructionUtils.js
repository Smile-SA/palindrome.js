let previousPalindrome;

/**
 * Saves privious palindrome, so we can destroy it
 * @param {*} renderer 
 * @param {*} scene 
 * @param {*} meshes 
 * @param {*} parentElement 
 * @param {*} frameId 
 */
const setPreviousPalindrome = (renderer, scene, meshes, parentElement, frameId) => {
    previousPalindrome = [renderer, scene, meshes, parentElement, frameId];
}

export {previousPalindrome, setPreviousPalindrome}
