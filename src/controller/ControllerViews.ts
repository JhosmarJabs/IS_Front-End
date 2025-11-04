namespace controller {
  export class VentanaBase {
    public root: d3.Selection<HTMLDivElement, any, any, any>;
    protected fondoUrl: string = "media/fondoPrincipal.jpg";

    constructor() {
      // Crea el fondo principal
      this.root = d3.select("body")
        .append("div")
        .attr("class", "fondo-principal-d3")
        .style("background-image", `url(${this.fondoUrl})`);
    }

    public cambiarFondo(url: string) {
      this.root.style("background-image", `url(${url})`);
    }

    public ocultar() {
      this.root.style("display", "none");
    }

    public mostrar() {
      this.root.style("display", "flex");
    }

    public limpiar() {
      // Borra todo el contenido UI, pero conserva el div y scripts a salvo
      this.root.html("");
      this.cambiarFondo("");
      this.root.style("display", null);
      this.root.style("background-color", null);
    }
  }

  export class VentanaContenedor {
    public contenedor: d3.Selection<HTMLDivElement, any, any, any>;
    constructor(base: VentanaBase) {
      // Crea el contenedor centrado para pantallas de login/registro/bienvenida
      this.contenedor = base.root.append("div")
        .attr("class", "ventana-contenedor-d3");
    }

    public limpiar() {
      // Borra solo su contenido, no el nodo
      this.contenedor.html("");
    }
  }
}
