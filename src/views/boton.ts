namespace view {
  export class botonEjecutar {
    constructor(private registro: Registro) {
      // Crear el botón discreto
      const btn = document.createElement("button");
      btn.innerText = "."; // Solo un punto, minimalista
      btn.style.position = "fixed";
      btn.style.top = "8px";
      btn.style.left = "8px";
      btn.style.zIndex = "99999";
      btn.style.fontSize = "16px";
      btn.style.width = "24px";
      btn.style.height = "24px";
      btn.style.opacity = "0.6";
      // opcional: visualizar solo al pasar el mouse
      btn.onmouseenter = () => btn.style.opacity = "1";
      btn.onmouseleave = () => btn.style.opacity = "0.6";

      btn.onclick = () => {
        // Aquí llamas el método de imprimir en consola
        // this.registro.getPersona();
      };

      document.body.appendChild(btn);
    }
  }
}
