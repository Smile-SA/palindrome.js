import palindrome from "../../src";
import {previousPalindrome} from "../../src/utils/destructionUtils";

export var createPalindrome = ({...args}) => {
    //delete previous palindrome
    if (previousPalindrome) {
        let [renderer, scene, meshes, parentElement, frameId] = previousPalindrome;
        console.log("Destroying previous palindrome...");
        cancelAnimationFrame(frameId);
        for (let key in meshes) {
            meshes[key].geometry.dispose();
            meshes[key].material.dispose();
            delete meshes[key];
        }
        meshes = undefined;
        renderer.dispose()

        scene.traverse(object => {
            if (!object?.isMesh) return
            object?.geometry?.dispose()
            object.geometry = undefined;
            if (object?.material?.isMaterial) {
                object?.material.dispose()
                object.material = undefined;
            } else {
                // an array of materials
                if (object.material) {
                    for (let material of object?.material) {
                        material?.dispose();
                        material = undefined;
                    }
                }
            }
            object = undefined;
        })
        while (parentElement?.lastChild) parentElement.removeChild(parentElement.lastChild);
        renderer = undefined;
        scene = undefined;
        parentElement = undefined;
        //document.location.reload();
    }
    //create new palindrome
    const container = document.createElement('div');
    palindrome(container, JSON.parse(JSON.stringify({...args})));
    return container;
};
