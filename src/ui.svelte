<script>
  import * as THREE from "three";

  import GCodeLoader from "./loaders/GCodeLoader";
  import STLLoader from "./loaders/STLLoader";
  import OrbitControls from "./controls/OrbitControls";

  import meshCanvas from "./floor";

  function addShadowedLight(x, y, z, color, intensity) {
    var directionalLight = new THREE.DirectionalLight(color, intensity);
    directionalLight.position.set(x, y, z);
    scene.add(directionalLight);
    directionalLight.castShadow = true;
    var d = 1;
    directionalLight.shadow.camera.left = -d;
    directionalLight.shadow.camera.right = d;
    directionalLight.shadow.camera.top = d;
    directionalLight.shadow.camera.bottom = -d;
    directionalLight.shadow.camera.near = 1;
    directionalLight.shadow.camera.far = 4;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    directionalLight.shadow.bias = -0.002;
  }

  let a = null;

  let minLayer = 0;
  let maxLayer = 1000;
  let drawPath = true;

  const gcodeLoader = new THREE.GCodeLoader();
  const stlLoader = new THREE.STLLoader();

  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    10000
  );
  camera.position.set(0, 40, 100);
  const controls = new THREE.OrbitControls(camera);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);

  gcodeLoader.load(
    "assets/models/test2_3.gcode",
    object => {
      a = object;
      object.position.set(0, 0, 0);

      scene.add(object);
    },
    null,
    null,
    {
      minLayer,
      maxLayer,
      drawPath
    }
  );

  stlLoader.load("assets/models/test2.stl", geometry => {

    var material = new THREE.MeshPhongMaterial({
      color: 0x2a6dba,
      specular: 0x000000,
      shininess: 100,
      transparent: true,
      opacity: 0.7
    });
    geometry.computeBoundingBox()

    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, -geometry.boundingBox.min.y, 0);
    mesh.rotation.set(0, 0, 0);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    scene.add(mesh);
  });

  const renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById("canvas").appendChild(renderer.domElement);

  scene.add(meshCanvas);
  scene.add(new THREE.HemisphereLight(0x443333, 0x111122));
  addShadowedLight(1, 1, 1, 0xffffff, 1.35);
  addShadowedLight(0.5, 1, -1, 0xffffff, 1);

  const animate = () => {
    renderer.render(scene, camera);

    requestAnimationFrame(animate);
  };

  animate();

  const onChange = ({ currentTarget }) => {
    a.position.set(-150, 10, 87);

    minLayer = currentTarget.value;

    renderer.render(scene, camera);
  };
</script>

