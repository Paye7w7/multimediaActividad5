const escena = new THREE.Scene();
const camara = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderizar = new THREE.WebGLRenderer();
renderizar.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderizar.domElement);

const textureLoader = new THREE.TextureLoader();
const backgroundTexture = textureLoader.load('../img/gta.jpg');
escena.background = backgroundTexture;

const svgTexture = textureLoader.load('../img/perrito.svg');

const geometry = new THREE.PlaneGeometry(2, 2); 
const material = new THREE.MeshBasicMaterial({ map: svgTexture, transparent: true });
const perrito = new THREE.Mesh(geometry, material);
escena.add(perrito);

camara.position.z = 3;

const translateX = document.getElementById('translateX');
const rotateY = document.getElementById('rotateY');
const scale = document.getElementById('scale');

function animate() {
  requestAnimationFrame(animate);

  perrito.position.x = parseFloat(translateX.value); 
  perrito.rotation.y = THREE.MathUtils.degToRad(parseFloat(rotateY.value)); 
  perrito.scale.set(scale.value, scale.value, scale.value); 

  renderizar.render(escena, camara);
}

animate();

window.addEventListener('resize', () => {
    camara.aspect = window.innerWidth / window.innerHeight;
    camara.updateProjectionMatrix();
    renderizar.setSize(window.innerWidth, window.innerHeight);
});