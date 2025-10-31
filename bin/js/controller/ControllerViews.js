var controller;
(function (controller) {
    class VentanaContenedor {
        constructor(base) {
            // Caja blanca centrada, solo clase
            this.contenedor = base.root.append("div")
                .attr("class", "ventana-contenedor-d3");
        }
        limpiar() {
            this.contenedor.html("");
        }
    }
    controller.VentanaContenedor = VentanaContenedor;
    class VentanaBase {
        constructor() {
            this.fondoUrl = "media/fondoPrincipal.jpg";
            this.root = d3.select("body")
                .append("div")
                .attr("class", "fondo-principal-d3") // solo la clase, no estilos inline
                .style("background-image", `url(${this.fondoUrl})`); // Este sí dinámico, puede quedar
        }
        cambiarFondo(url) {
            this.root.style("background-image", `url(${url})`);
        }
        ocultar() {
            this.root.style("display", "none");
        }
        mostrar() {
            this.root.style("display", "flex");
        }
    }
    controller.VentanaBase = VentanaBase;
})(controller || (controller = {}));
