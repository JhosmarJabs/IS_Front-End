var app;
(function (app) {
    class main {
        constructor() {
            this.registro = null;
            this.bienvenida = null;
            this.fondo = new controller.VentanaBase();
            this.contenedor = new controller.VentanaContenedor(this.fondo);
            // Login pasa el callback crearRegistro al dar click en "Registrarse"
            this.login = new view.LoginVentana(this.contenedor, this.crearRegistro.bind(this));
            this.fondo.mostrar();
        }
        // Crea la instancia y muestra términos con callback para mostrar bienvenida
        crearRegistro() {
            this.registro = new view.Registro(this.contenedor, this.mostrarBienvenida.bind(this), this.mostrarLogin.bind(this) // método para regresar al login
            );
        }
        mostrarLogin() {
            this.login = new view.LoginVentana(this.contenedor, this.crearRegistro.bind(this));
        }
        // Callback para eliminar registro y mostrar bienvenida
        mostrarBienvenida() {
            // this.registro = null;
            this.bienvenida = new view.bienvenida(this.contenedor);
        }
    }
    app.main = main;
})(app || (app = {}));
const appMain = new app.main();
