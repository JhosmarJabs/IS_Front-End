namespace view {
  export class bienvenida {
    private contenedor: d3.Selection<HTMLDivElement, any, any, any>;

    constructor() {
      this.render();
    }

    private render() {
      this.contenedor = d3.select(".fondo-principal-d3");
      this.contenedor.html("");

      this.contenedor
        .style("position", "relative")
        .style("height", "100vh")
        .style("background", "linear-gradient(135deg, #0f2027, #203a43, #2c5364)")
        .style("font-family", "'Orbitron', sans-serif")
        .style("color", "#00ffea")
        .style("display", "flex")
        .style("justify-content", "center")
        .style("align-items", "center")
        .style("overflow", "hidden");

      // Animación de fondo
      const bgDots = this.contenedor.append("div")
        .style("position", "absolute")
        .style("top", "0")
        .style("left", "0")
        .style("right", "0")
        .style("bottom", "0")
        .style("z-index", "0")
        .style("background-image", "radial-gradient(#00ffe6 2px, transparent 2px)")
        .style("background-size", "50px 50px")
        .style("animation", "dotsMove 10s linear infinite");

      // Keyframes animados
      const style = document.createElement("style");
      style.textContent = `
        @keyframes dotsMove {
          0% {background-position: 0 0;}
          100% {background-position: 50px 50px;}
        }
      `;
      document.head.appendChild(style);

      // Contenedor de bienvenida
      const box = this.contenedor.append("div")
        .style("position", "relative")
        .style("z-index", "1")
        .style("text-align", "center")
        .style("background", "rgba(0, 255, 234, 0.15)")
        .style("border-radius", "15px")
        .style("padding", "40px 60px")
        .style("box-shadow", "0 0 15px #00ffe6, inset 0 0 10px #00ffe6")
        .style("animation", "pulseGlow 3s ease-in-out infinite");

      // Keyframes pulso
      const pulseStyles = document.createElement("style");
      pulseStyles.textContent = `
        @keyframes pulseGlow {
          0%, 100% {
            box-shadow: 0 0 15px #00ffe6, inset 0 0 10px #00ffe6;
          }
          50% {
            box-shadow: 0 0 25px #00ffe6, inset 0 0 15px #00ffe6;
          }
        }
      `;
      document.head.appendChild(pulseStyles);

      box.append("h1")
        .text("¡Bienvenido!")
        .style("font-size", "3rem")
        .style("margin-bottom", "20px")
        .style("text-transform", "uppercase")
        .style("letter-spacing", "3px");

      box.append("p")
        .text("Gracias por confiar en nuestra plataforma " + appMain.gUser.correoGlobal)
        .style("font-size", "1.2rem")
        .style("opacity", "0.7")
        .style("margin-bottom", "40px")
        .style("letter-spacing", "1.5px");

      box.append("button")
        .text("Iniciar")
        .attr("class", "btn")
        .style("padding", "15px 40px")
        .style("border", "2px solid #00ffe6")
        .style("background", "transparent")
        .style("color", "#00ffe6")
        .style("font-size", "1.2rem")
        .style("font-weight", "600")
        .style("letter-spacing", "1.5px")
        .style("text-transform", "uppercase")
        .style("border-radius", "12px")
        .style("cursor", "pointer")
        .style("transition", "0.3s ease")
        .style("box-shadow", "0 0 10px #00ffe6")
        .on("mouseover", function () {
          d3.select(this)
            .style("background", "#00ffe6")
            .style("color", "#022")
            .style("box-shadow", "0 0 20px #00ffe6, 0 0 30px #00ffe6, 0 0 40px #00ffe6");
        })
        .on("mouseout", function () {
          d3.select(this)
            .style("background", "transparent")
            .style("color", "#00ffe6")
            .style("box-shadow", "0 0 10px #00ffe6");
        })
        .on("click", () => {
          alert("¡Comienza tu experiencia!");
        });
    }
  }
}
