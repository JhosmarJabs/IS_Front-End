namespace app {
  export class main {
    public gUser: models.variables = {
      correoGlobal: "",
      telefonoGlobal: "",
      usuarioGlobal: "",
      idGlobal: null,
      rolGlobal: "",
      sesionTokenGlobal: "",
      sexoGlobal: "",
      APaternoGlobal: "",
      AMaternoGlobal: ""
    }
    private fondo: controller.VentanaBase;
    private contenedor: controller.VentanaContenedor;
    private login: view.LoginVentana;
    private registro: view.Registro | null = null;
    private bienvenida: view.bienvenida | null = null;

    constructor() {
      this.inicio();
      this.fondo = new controller.VentanaBase();
      this.contenedor = new controller.VentanaContenedor(this.fondo);
      this.login = new view.LoginVentana(
        this.contenedor,
        this.crearRegistro.bind(this),
        this.mostrarBienvenida.bind(this)
      );
      this.fondo.mostrar();
    }

    private crearRegistro() {
      this.registro = new view.Registro(
        this.contenedor,
        this.mostrarBienvenida.bind(this),
        this.mostrarLogin.bind(this)
      );

    }

    private mostrarLogin() {
      this.login = new view.LoginVentana(
        this.contenedor,
        this.crearRegistro.bind(this)
      );
    }

    private mostrarBienvenida() {
      // Limpia fondo y contenedor, pero NO scripts ni estructura
      this.fondo.limpiar();
      this.contenedor.limpiar();
      this.bienvenida = new view.bienvenida();
    }

    private inicio() {
      controller.ApiService.enviarPeticionSinDatos((success, data) => {
        if (success) {
          console.log("Conexión exitosa");
        } else {
          console.log("Error en la conexión");
        }
      });
    }
  }
}

const appMain = new app.main();
