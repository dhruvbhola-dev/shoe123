import * as THREE from "three";

import {GLTFLoader} from "https://cdn.jsdelivr.net/npm/three@0.152.0/examples/jsm/loaders/GLTFLoader.js";

const video = document.getElementById("video");
const canvas = document.getElementById("threeCanvas");

const scene = new THREE.Scene();

const camera3d = new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
1000
);

const renderer = new THREE.WebGLRenderer({
canvas:canvas,
alpha:true
});

renderer.setSize(window.innerWidth,window.innerHeight);

camera3d.position.z=2;

const light = new THREE.HemisphereLight(0xffffff,0x444444,1);

scene.add(light);

let shoe;

const loader = new GLTFLoader();

function loadShoe(file){

if(shoe) scene.remove(shoe);

loader.load(file,(gltf)=>{

shoe = gltf.scene;

shoe.scale.set(0.5,0.5,0.5);

scene.add(shoe);

});

}

loadShoe("shoe.glb");

function animate(){

requestAnimationFrame(animate);

renderer.render(scene,camera3d);

}

animate();

document.getElementById("start").onclick=async()=>{

const stream = await navigator.mediaDevices.getUserMedia({video:true});

video.srcObject = stream;

const pose = new Pose({

locateFile:(file)=>{
return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
}

});

pose.setOptions({

modelComplexity:1,
smoothLandmarks:true

});

pose.onResults(results=>{

if(!results.poseLandmarks) return;

const foot = results.poseLandmarks[32];   // right foot
const knee = results.poseLandmarks[26];   // knee

if(shoe){

shoe.position.x = (foot.x-0.5)*2;
shoe.position.y = -(foot.y-0.5)*2;

// rotation based on leg angle
const dx = foot.x - knee.x;
const dy = foot.y - knee.y;

const angle = Math.atan2(dy,dx);

shoe.rotation.z = angle;

}

});

const camera = new Camera(video,{

onFrame: async()=>{

await pose.send({image:video});

},

width:640,
height:480

});

camera.start();

};

document.getElementById("capture").onclick=()=>{

const link=document.createElement("a");

link.download="tryon.png";

link.href=renderer.domElement.toDataURL();

link.click();

};