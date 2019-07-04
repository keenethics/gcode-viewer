import * as THREE from 'three';

var imageCanvas = document.createElement( "canvas" ),
context = imageCanvas.getContext( "2d" );
imageCanvas.width = imageCanvas.height = 64;
context.fillStyle = "#f5f5f5";
context.fillRect( 0, 0, 64, 64 );
context.fillStyle = "#fff";
context.fillRect( 0, 0, 32, 32 );
context.fillRect( 32, 32, 32, 32 );
var textureCanvas = new THREE.CanvasTexture( imageCanvas );
textureCanvas.repeat.set( 1000, 1000 );
textureCanvas.wrapS = THREE.RepeatWrapping;
textureCanvas.wrapT = THREE.RepeatWrapping;
var	materialCanvas = new THREE.MeshBasicMaterial( { map: textureCanvas } );
var geometry = new THREE.PlaneBufferGeometry( 100, 100 );
var meshCanvas = new THREE.Mesh( geometry, materialCanvas );
meshCanvas.rotation.x = - Math.PI / 2;
meshCanvas.scale.set( 100, 100, 100 );

export default meshCanvas;
