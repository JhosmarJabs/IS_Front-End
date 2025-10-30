var app;
(function (app) {
    class main {
        constructor() {
            // 1. Crea el fondo de pantalla (ajustado a fondo completo)
            this.fondo = new controller.VentanaBase();
            // 2. Crea el contenedor central para las vistas de login/registros, etc.
            this.contenedor = new controller.VentanaContenedor(this.fondo);
            // 3. Pinta el formulario de login dentro del contenedor
            this.login = new view.LoginVentana(this.contenedor);
            // 4. Si quieres controlar visibilidad:
            this.fondo.mostrar();
        }
    }
    app.main = main;
})(app || (app = {}));
const appMain = new app.main();
//# sourceMappingURL=app.js.map