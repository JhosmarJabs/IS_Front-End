namespace app {
  export class main {
    private fondo: controller.VentanaBase;
    private contenedor: controller.VentanaContenedor;
    private login: view.LoginVentana;
    private registro: view.Registro | null = null;
    private bienvenida: view.bienvenida | null = null;


    constructor() {
      this.fondo = new controller.VentanaBase();
      this.contenedor = new controller.VentanaContenedor(this.fondo);

      // Login pasa el callback crearRegistro al dar click en "Registrarse"
      this.login = new view.LoginVentana(
        this.contenedor,
        this.crearRegistro.bind(this)
      ); 

      this.fondo.mostrar();
    }

    // Crea la instancia y muestra términos con callback para mostrar bienvenida
    private crearRegistro() {
      this.registro = new view.Registro(
        this.contenedor,
        this.mostrarBienvenida.bind(this),
        this.mostrarLogin.bind(this)  // método para regresar al login
      );
    }

    private mostrarLogin() {
      this.login = new view.LoginVentana(
        this.contenedor, 
        this.crearRegistro.bind(this)
      );
    }

    // Callback para eliminar registro y mostrar bienvenida
    private mostrarBienvenida() {
      // this.registro = null;
      this.bienvenida = new view.bienvenida(this.contenedor);
    }
  }
}

const appMain = new app.main();

