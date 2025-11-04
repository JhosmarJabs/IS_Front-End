var controller;
(function (controller) {
    class VentanaBase {
        constructor() {
            this.fondoUrl = "media/fondoPrincipal.jpg";
            // Crea el fondo principal
            this.root = d3.select("body")
                .append("div")
                .attr("class", "fondo-principal-d3")
                .style("background-image", `url(${this.fondoUrl})`);
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
        limpiar() {
            // Borra todo el contenido UI, pero conserva el div y scripts a salvo
            this.root.html("");
            this.cambiarFondo("");
            this.root.style("display", null);
            this.root.style("background-color", null);
        }
    }
    controller.VentanaBase = VentanaBase;
    class VentanaContenedor {
        constructor(base) {
            // Crea el contenedor centrado para pantallas de login/registro/bienvenida
            this.contenedor = base.root.append("div")
                .attr("class", "ventana-contenedor-d3");
        }
        limpiar() {
            // Borra solo su contenido, no el nodo
            this.contenedor.html("");
        }
    }
    controller.VentanaContenedor = VentanaContenedor;
})(controller || (controller = {}));
