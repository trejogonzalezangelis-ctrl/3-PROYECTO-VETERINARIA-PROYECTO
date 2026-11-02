const testimonios = [
  { nombre: "María Pérez", comentario: "¡Excelente atención! Mi perrito salió feliz y saludable. 🐶❤️", foto: "https://randomuser.me/api/portraits/women/10.jpg" },
  { nombre: "Juan Rodríguez", comentario: "Muy profesionales y amables. Recomendados 100%. ⭐⭐⭐⭐⭐", foto: "https://randomuser.me/api/portraits/men/12.jpg" },
  { nombre: "Laura Sánchez", comentario: "La peluquería dejó a mi gata preciosa. 😻✨", foto: "https://randomuser.me/api/portraits/women/22.jpg" },
  { nombre: "Pedro Martínez", comentario: "Atención rápida y muy humana. Gracias AGEL. 🐾", foto: "https://randomuser.me/api/portraits/men/33.jpg" },
  { nombre: "Sofía Herrera", comentario: "Mi conejo fue atendido con mucho cuidado. 🐰💚", foto: "https://randomuser.me/api/portraits/women/35.jpg" },
  { nombre: "Carlos Jiménez", comentario: "Buen precio y excelente servicio. Muy satisfecho. 👍", foto: "https://randomuser.me/api/portraits/men/44.jpg" },
  { nombre: "Daniela Cruz", comentario: "El equipo veterinario es muy responsable. 🏥🐾", foto: "https://randomuser.me/api/portraits/women/50.jpg" },
  { nombre: "Luis Fernández", comentario: "Llevo a mis mascotas desde hace años. Confío totalmente. 🐕❤️", foto: "https://randomuser.me/api/portraits/men/55.jpg" },
  { nombre: "Valeria Reyes", comentario: "La consulta fue muy completa y clara. Muy recomendada. 🌟", foto: "https://randomuser.me/api/portraits/women/60.jpg" },
  { nombre: "José Peña", comentario: "Mi gato fue atendido con paciencia y cariño. 🐱💙", foto: "https://randomuser.me/api/portraits/men/65.jpg" }
];

const contenedor = document.getElementById("contenedorTestimonios");

testimonios.forEach((cliente) => {
  const tarjeta = document.createElement("div");
  tarjeta.className = "tarjeta-testimonio";
  tarjeta.innerHTML = `
    <article class="contenido-testimonio">
      <img src="${cliente.foto}" alt="Foto de ${cliente.nombre}" class="foto-cliente">
      <h3 class="h6 mt-3">${cliente.nombre}</h3>
      <p class="small">${cliente.comentario}</p>
      <i class="fa-solid fa-star text-warning"></i>
      <i class="fa-solid fa-star text-warning"></i>
      <i class="fa-solid fa-star text-warning"></i>
      <i class="fa-solid fa-star text-warning"></i>
      <i class="fa-solid fa-star text-warning"></i>
    </article>`;
  contenedor.appendChild(tarjeta);
});

let posicion = 0;

function moverCarrusel(direccion) {
  const tarjetas = document.querySelectorAll(".tarjeta-testimonio");
  const visibles = window.innerWidth <= 575 ? 1 : window.innerWidth <= 991 ? 2 : 4;
  const maximo = tarjetas.length - visibles;
  posicion += direccion;
  if (posicion < 0) posicion = 0;
  if (posicion > maximo) posicion = maximo;
  const anchoTarjeta = tarjetas[0].offsetWidth;
  contenedor.style.transform = `translateX(-${posicion * anchoTarjeta}px)`;
}

document.getElementById("btnAnterior").addEventListener("click", () => moverCarrusel(-1));
document.getElementById("btnSiguiente").addEventListener("click", () => moverCarrusel(1));

const formulario = document.getElementById("formularioContacto");

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const email = document.getElementById("email").value.trim();
  const mensaje = document.getElementById("mensaje").value.trim();

  const errorNombre = document.getElementById("errorNombre");
  const errorEmail = document.getElementById("errorEmail");
  const errorMensaje = document.getElementById("errorMensaje");

  let valido = true;

  if (nombre === "") { errorNombre.textContent = "Por favor, escribe tu nombre."; valido = false; }
  else { errorNombre.textContent = ""; }

  const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email === "") { errorEmail.textContent = "Por favor, escribe tu correo electrónico."; valido = false; }
  else if (!formatoEmail.test(email)) { errorEmail.textContent = "Escribe un correo electrónico válido."; valido = false; }
  else { errorEmail.textContent = ""; }

  if (mensaje === "") { errorMensaje.textContent = "Por favor, escribe un mensaje."; valido = false; }
  else { errorMensaje.textContent = ""; }

  if (!valido) return;

  localStorage.setItem("mensajeAGEL", JSON.stringify({ nombre, email, mensaje }));

  const asunto = encodeURIComponent("Consulta desde la página de Clínica AGEL");
  const cuerpo = encodeURIComponent(`Nombre: ${nombre}\nCorreo: ${email}\n\nMensaje:\n${mensaje}`);

  window.location.href = `mailto:clinicageltarea@gmail.com?subject=${asunto}&body=${cuerpo}`;

  const modal = new bootstrap.Modal(document.getElementById("modalConfirmacion"));
  modal.show();
  formulario.reset();
});

document.querySelectorAll('a[href^="#"]').forEach((enlace) => {
  enlace.addEventListener("click", function (evento) {
    evento.preventDefault();
    const destino = document.querySelector(this.getAttribute("href"));
    destino.scrollIntoView({ behavior: "smooth" });
  });
});
