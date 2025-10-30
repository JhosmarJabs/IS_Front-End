namespace controller {
  export class VentanaContenedor {
    public contenedor: d3.Selection<HTMLDivElement, any, any, any>;
    constructor(base: VentanaBase) {
      // Caja blanca centrada, solo clase
      this.contenedor = base.root.append("div")
        .attr("class", "ventana-contenedor-d3");
    }

    public limpiar() {
      this.contenedor.html("");
    }
  }
  export class VentanaBase {
    public root: d3.Selection<HTMLDivElement, any, any, any>;
    protected fondoUrl: string = "media/fondoPrincipal.jpg";
    constructor() {
      this.root = d3.select("body")
        .append("div")
        .attr("class", "fondo-principal-d3") // solo la clase, no estilos inline
        .style("background-image", `url(${this.fondoUrl})`); // Este sí dinámico, puede quedar
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
  }

}
