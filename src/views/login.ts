namespace view {

  export class LoginVentana {
    private control: controller.ControlBuilder;
    private texto: controller.TextBuilder;
    private contenedor: d3.Selection<HTMLDivElement, any, any, any>;
    private inputEmail: d3.Selection<HTMLInputElement, any, any, any>;
    private onRegistro: (() => void) | null;

    constructor(wrapper: controller.VentanaContenedor, onRegistro?: () => void) {
      this.control = new controller.ControlBuilder();
      this.texto = new controller.TextBuilder();
      this.contenedor = wrapper.contenedor;
      this.onRegistro = onRegistro || null;
      this.render();
    }

    render() {
      this.texto.titulo1(this.contenedor, "Iniciar Sesión");

      this.inputEmail = this.control.input(this.contenedor, {
        type: "text",
        placeholder: "Usuario"
      }) as d3.Selection<HTMLInputElement, any, any, any>;

      this.control.button(this.contenedor, {
        label: "Iniciar Sesión",
        onClick: () => this.enviarCorreo()
      });
      // Aquí se agrega el texto debajo del input
      this.contenedor.append("div")
        .style("margin", "8px 0 16px 0")
        .style("font-size", "14px")
        .html('¿Todavía no tienes una cuenta?&nbsp;<a href="#" class="custom-link" id="link-registrarse">Registrarse</a>');

      d3.select("#link-registrarse").on("click", (event) => {
        event.preventDefault();
        this.contenedor.html(""); // Limpia el login

        // Llama el callback si fue proporcionado
        if (this.onRegistro) this.onRegistro();
      });
    }

    private enviarCorreo() {
      const email = this.inputEmail.node()?.value;
      controller.ApiService.enviarCorreoVerificacion(email)
        .then(result => {
          if (result.ok && result.data.message) {
            this.contenedor.html("");
            this.mostrarMetodosLogin(email);
          } else if (result.data.error) {
            alert("Error: " + result.data.error);
          }
        })
        .catch(err => {
          alert("Error en la petición: " + err);
        });
    }

    private mostrarMetodosLogin(usuario: string) {
      this.contenedor.html("");
      this.texto.titulo1(this.contenedor, "¡Bienvenido de nuevo!");
      this.texto.titulo3(this.contenedor, usuario);
      this.texto.titulo2(this.contenedor, "Elige el método de autenticación");
      const opciones = [
        { icon: "bx bx-lock-alt", label: "Contraseña", method: "password" },
        { icon: "bx bx-message-dots", label: "SMS", method: "sms" },
        { icon: "bx bx-face", label: "Face ID", method: "face-id" },
        { icon: "bx bx-envelope", label: "Token por Correo", method: "email-token" },
        { icon: "bx bxl-whatsapp", label: "WhatsApp", method: "whatsapp" },
        { icon: "bx bx-fingerprint", label: "Huella Dactilar", method: "fingerprint", disabled: true }
      ];
      new controller.ControlBuilder().CasillasBuilder(
        this.contenedor,
        opciones,
        (method: string) => this.navegarAMetodo(method)
      );
    }

    private navegarAMetodo(method: string) {
      const loginPages: Record<string, string> = {
        'password': 'password.html',
        'fingerprint': 'fingerprint.html',
        'face-id': 'faceid.html',
        'email-token': 'email-token.html',
        'sms': 'sms.html',
        'whatsapp': 'whatsapp.html'
      };
      if (loginPages[method]) {
        // window.location.href = loginPages[method];
        alert("Método de inicio de sesión disponible");
      } else {
        alert("Método de inicio de sesión no disponible");
      }
    }
  }
}
