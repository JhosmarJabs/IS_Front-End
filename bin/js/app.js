var app;
(function (app) {
    class main {
        constructor() {
            this.gUser = {
                correoGlobal: "",
                telefonoGlobal: "",
                usuarioGlobal: "",
                idGlobal: null,
                rolGlobal: "",
                sesionTokenGlobal: "",
                sexoGlobal: "",
                APaternoGlobal: "",
                AMaternoGlobal: ""
            };
            this.registro = null;
            this.bienvenida = null;
            this.inicio();
            this.fondo = new controller.VentanaBase();
            this.contenedor = new controller.VentanaContenedor(this.fondo);
            this.login = new view.LoginVentana(this.contenedor, this.crearRegistro.bind(this), this.mostrarBienvenida.bind(this));
            this.fondo.mostrar();
        }
        crearRegistro() {
            this.registro = new view.Registro(this.contenedor, this.mostrarBienvenida.bind(this), this.mostrarLogin.bind(this));
        }
        mostrarLogin() {
            this.login = new view.LoginVentana(this.contenedor, this.crearRegistro.bind(this));
        }
        mostrarBienvenida() {
            // Limpia fondo y contenedor, pero NO scripts ni estructura
            this.fondo.limpiar();
            this.contenedor.limpiar();
            this.bienvenida = new view.bienvenida();
        }
        inicio() {
            controller.ApiService.enviarPeticionSinDatos((success, data) => {
                if (success) {
                    console.log("Conexión exitosa");
                }
                else {
                    console.log("Error en la conexión");
                }
            });
        }
    }
    app.main = main;
})(app || (app = {}));
const appMain = new app.main();
