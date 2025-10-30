var view;
(function (view) {
    class LoginVentana {
        constructor(wrapper) {
            this.control = new controller.ControlBuilder();
            this.texto = new controller.TextBuilder();
            this.contenedor = wrapper.contenedor;
            this.render();
        }
        render() {
            this.texto.titulo1(this.contenedor, "Iniciar Sesión");
            this.inputEmail = this.control.input(this.contenedor, {
                type: "text",
                placeholder: "Usuario"
            });
            this.control.button(this.contenedor, {
                label: "Iniciar Sesión",
                onClick: () => this.enviarCorreo()
            });
        }
        enviarCorreo() {
            var _a;
            const email = (_a = this.inputEmail.node()) === null || _a === void 0 ? void 0 : _a.value;
            controller.ApiService.enviarCorreoVerificacion(email)
                .then(result => {
                if (result.ok && result.data.message) {
                    this.contenedor.html("");
                    this.mostrarMetodosLogin(email);
                }
                else if (result.data.error) {
                    alert("Error: " + result.data.error);
                }
            })
                .catch(err => {
                alert("Error en la petición: " + err);
            });
        }
        mostrarMetodosLogin(usuario) {
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
            new controller.LoginOptionsBuilder().render(this.contenedor, opciones, (method) => this.navegarAMetodo(method));
        }
        navegarAMetodo(method) {
            const loginPages = {
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
            }
            else {
                alert("Método de inicio de sesión no disponible");
            }
        }
    }
    view.LoginVentana = LoginVentana;
})(view || (view = {}));
//# sourceMappingURL=login.js.map