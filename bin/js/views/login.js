var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var view;
(function (view) {
    class LoginVentana {
        constructor(wrapper, onRegistro, onBienvenida) {
            this.correoUsuario = "";
            this.control = new controller.ControlBuilder();
            this.texto = new controller.TextBuilder();
            this.contenedor = wrapper.contenedor;
            this.onRegistro = onRegistro || null;
            this.onBienvenida = onBienvenida || null;
            this.render();
        }
        render() {
            this.texto.titulo1(this.contenedor, "Iniciar Sesión");
            this.inputEmail = this.control.input(this.contenedor, {
                type: "text",
                value: "",
                placeholder: "Usuario"
            });
            this.control.button(this.contenedor, {
                label: "Iniciar Sesión",
                onClick: () => this.enviarCorreo()
            });
            this.contenedor.append("div")
                .style("margin", "8px 0 16px 0")
                .style("font-size", "14px")
                .html('¿Todavía no tienes una cuenta?&nbsp;<a href="#" class="custom-link" id="link-registrarse">Registrarse</a>');
            d3.select("#link-registrarse").on("click", (event) => {
                event.preventDefault();
                this.contenedor.html("");
                if (this.onRegistro)
                    this.onRegistro();
            });
        }
        enviarCorreo() {
            var _a, _b;
            this.correoUsuario = ((_b = (_a = this.inputEmail.node()) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.trim()) || "";
            if (!this.correoUsuario) {
                alert("Por favor ingresa un correo.");
                return;
            }
            controller.ApiService.verificarExistenciaUsuario(this.correoUsuario, (success, result) => {
                if (success && (result === null || result === void 0 ? void 0 : result.usuario)) {
                    const user = result.usuario;
                    appMain.gUser.idGlobal = user.id,
                        appMain.gUser.usuarioGlobal = user.nombre,
                        appMain.gUser.correoGlobal = user.correoElectronico,
                        appMain.gUser.telefonoGlobal = user.numeroTelefono,
                        appMain.gUser.APaternoGlobal = user.apellidoPaterno,
                        appMain.gUser.AMaternoGlobal = user.apellidoMaterno,
                        appMain.gUser.sexoGlobal = user.sexo,
                        this.contenedor.html("");
                    this.mostrarMetodosLogin(this.correoUsuario);
                }
                else if (result === null || result === void 0 ? void 0 : result.error) {
                    alert(result.error);
                }
                else {
                    alert("Error desconocido al verificar el usuario.");
                }
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
            new controller.ControlBuilder().CasillasBuilder(this.contenedor, opciones, (method) => this.navegarAMetodo(method));
        }
        navegarAMetodo(method) {
            if (method === "password") {
                this.mostrarLoginPassword();
            }
            else if (method === "face-id") {
                this.mostrarFaceID();
            }
            else if (method === "sms") {
                this.mostrarLoginSMS();
                controller.ApiService.enviarToken(appMain.gUser.idGlobal, this.correoUsuario, appMain.gUser.telefonoGlobal, "telefono", (secces, data) => {
                    console.log("sms");
                });
            }
            else if (method === "whatsapp") {
                this.mostrarLoginWhatsApp();
                controller.ApiService.enviarToken(appMain.gUser.idGlobal, this.correoUsuario, appMain.gUser.telefonoGlobal, "whatsapp", (secces, data) => {
                    console.log("WhatsApp");
                });
            }
            else if (method === "email-token") {
                this.mostrarLoginEmailToken();
                controller.ApiService.enviarToken(appMain.gUser.idGlobal, this.correoUsuario, appMain.gUser.telefonoGlobal, "correo", (success, data) => {
                    console.log("correo");
                });
            }
            else {
                alert("Método de inicio de sesión no disponible aún");
            }
        }
        mostrarLoginPassword() {
            this.contenedor.html(""); // limpiar contenedor principal
            this.texto.titulo1(this.contenedor, "Iniciar Sesión con Contraseña");
            // Input de contraseña usando ControlBuilder
            const inputPassword = this.control.input(this.contenedor, {
                type: "password",
                placeholder: "Contraseña",
                marginBottom: "20px"
            });
            const inputBox = inputPassword.node().parentNode;
            const iconToggle = d3.select(inputBox).append("i")
                .attr("class", "bx bxs-show password-toggle")
                .style("cursor", "pointer")
                .on("click", () => {
                const el = inputPassword.node();
                if (el.type === "password") {
                    el.type = "text";
                    iconToggle.attr("class", "bx bxs-hide password-toggle");
                }
                else {
                    el.type = "password";
                    iconToggle.attr("class", "bx bxs-show password-toggle");
                }
            });
            // Botones de navegación (Iniciar Sesión y Retroceder) usando navDobleBotones
            this.control.navDobleBotones(this.contenedor, {
                backLabel: "regresar",
                onBack: () => {
                    this.mostrarMetodosLogin(this.correoUsuario);
                },
                nextLabel: "Iniciar Sesión",
                onNext: () => {
                    const pwd = inputPassword.node().value.trim();
                    if (!pwd) {
                        alert("Por favor, ingresa tu contraseña.");
                        return;
                    }
                    controller.ApiService.loginCorreoPassword(this.correoUsuario, pwd, (success, result) => {
                        if (success) {
                            console.log("Inicio de sesión exitoso.");
                            appMain.gUser.correoGlobal = this.correoUsuario;
                            if (this.onBienvenida)
                                this.onBienvenida();
                        }
                        else {
                            alert("Error al iniciar sesión: " + ((result === null || result === void 0 ? void 0 : result.message) || "Credenciales incorrectas"));
                        }
                    });
                },
                nextDisabled: false
            });
            const backLink = this.contenedor.append("div")
                .attr("class", "back-link")
                .style("text-align", "center")
                .style("margin-top", "20px");
            backLink.append("a")
                .style("color", "#fff")
                .style("cursor", "pointer")
                .html("<i class='bx bx-help-circle'></i> Presiona aquí para recuperar contraseña")
                .on("click", () => {
                alert("Funcionalidad para recuperar contraseña no implementada aún.");
                // Aquí el formulario/modal de recuperación
            });
        }
        mostrarFaceID() {
            this.contenedor.html(""); // Limpiar contenedor para nuevo contenido
            // Contenedor estilo container
            this.contenedor
                .attr("class", "container")
                .style("max-width", "450px")
                .style("width", "100%")
                .style("border", "2px solid rgba(255, 255, 255, 0.2)")
                .style("border-radius", "10px")
                .style("padding", "30px 40px")
                .style("backdrop-filter", "blur(20px)")
                .style("box-shadow", "0 0 10px rgba(0, 0, 0, 0.2)")
                .style("position", "relative")
                .style("color", "#fff")
                .style("text-align", "center");
            // Título
            this.texto.titulo1(this.contenedor, "Iniciar Sesión con Face ID");
            // Icono de rostro
            const faceIcon = this.contenedor.append("div")
                .attr("class", "face-icon")
                .style("width", "10rem")
                .style("height", "10rem")
                .style("margin", "0 auto 30px auto")
                .style("display", "flex")
                .style("align-items", "center")
                .style("justify-content", "center")
                .style("font-size", "10rem")
                .style("color", "#fff")
                .style("background", "transparent")
                .style("transition", "box-shadow 0.2s")
                .html("<i class='bx bx-face'></i>");
            // Instrucción
            this.contenedor.append("div")
                .attr("class", "instruction")
                .style("margin-bottom", "30px")
                .style("font-size", "1.1rem")
                .append("p")
                .text("Posiciona tu rostro frente a la cámara para iniciar sesión");
            // Estado
            const status = this.contenedor.append("div")
                .attr("id", "status")
                .style("margin-top", "20px")
                .style("font-weight", "bold")
                .text("");
            // Video cámara
            const video = this.contenedor.append("video")
                .attr("id", "video")
                .attr("width", "320")
                .attr("height", "240")
                .style("border-radius", "10px")
                .style("border", "2px solid #fff")
                .property("autoplay", true)
                .property("muted", true)
                .style("display", "block")
                .style("margin", "0 auto 30px");
            // Back link
            const backLink = this.contenedor.append("div")
                .attr("class", "back-link")
                .style("text-align", "center")
                .style("margin-top", "20px");
            backLink.append("a")
                .attr("href", "login.html")
                .style("color", "#fff")
                .html("<i class='bx bx-arrow-back'></i> Volver a métodos de inicio de sesión");
            // Botón reintentar oculto inicialmente
            const retryBtn = this.contenedor.append("button")
                .attr("class", "retry-btn")
                .style("display", "none")
                .style("align-items", "center")
                .style("gap", "6px")
                .style("margin-top", "16px")
                .style("padding", "12px 24px")
                .style("font-size", "1.1em")
                .style("border-radius", "26px")
                .style("background", "#ff4444")
                .style("color", "#fff")
                .style("border", "none")
                .style("cursor", "pointer")
                .html('<i class="bx bx-refresh"></i> Reintentar')
                .on("click", () => {
                status.text("");
                faceIcon.html('<i class="bx bx-face"></i>');
                faceIcon.classed("success", false);
                faceIcon.classed("vibrate", false);
                scanFace();
                retryBtn.style("display", "none");
            });
            let intentos = 0;
            const maxIntentos = 5;
            let peticionEnCurso = false;
            const scanFace = () => __awaiter(this, void 0, void 0, function* () {
                if (peticionEnCurso)
                    return; // Ignorar si ya hay petición en curso
                status.text(`Analizando rostro... intento ${intentos + 1} de ${maxIntentos}`);
                const detection = yield faceapi.detectSingleFace(video.node(), new faceapi.TinyFaceDetectorOptions())
                    .withFaceLandmarks()
                    .withFaceDescriptor();
                if (!detection) {
                    intentos++;
                    status.text(`No se detectó rostro, intento ${intentos} de ${maxIntentos}`);
                    if (intentos < maxIntentos) {
                        setTimeout(scanFace, 1000);
                    }
                    else {
                        status.text("Demasiados intentos. Puedes reintentar.");
                        retryBtn.style("display", "inline-flex");
                    }
                    return;
                }
                peticionEnCurso = true; // Bloquea nueva petición mientras se procesa
                const descriptor = Array.from(detection.descriptor);
                console.log("Enviando petición...", descriptor);
                controller.ApiService.loginBiometrico(this.correoUsuario, descriptor, (success, result) => {
                    console.log("Respuesta recibida...", result);
                    peticionEnCurso = false;
                    if (success && result && result.token) {
                        // Cambia el icono a círculo check, color verde y ejecuta la animación CSS
                        faceIcon
                            .classed("success", true)
                            .style("color", "#2fd966") // verde
                            .html('<i class="bx bx-check-circle"></i>');
                        // Forzar animación: elimina y re-agrega la clase para reiniciar si fuera necesario
                        const iconElement = faceIcon.node();
                        iconElement.classList.remove("success");
                        void iconElement.offsetWidth; // trigger reflow
                        iconElement.classList.add("success");
                        // Espera ~900ms a que termine la animación antes de cambiar de vista
                        setTimeout(() => {
                            if (this.onBienvenida)
                                this.onBienvenida();
                        }, 900);
                    }
                    else {
                        intentos++;
                        status.text(`El rostro no coincide, intento ${intentos} de ${maxIntentos}`);
                        if (intentos < maxIntentos) {
                            setTimeout(scanFace, 1000);
                        }
                        else {
                            status.text("Demasiados intentos. Puedes reintentar.");
                            retryBtn.style("display", "inline-flex");
                        }
                    }
                });
            });
            Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri('lib/modelsFaceID'),
                faceapi.nets.faceLandmark68Net.loadFromUri('lib/modelsFaceID'),
                faceapi.nets.faceRecognitionNet.loadFromUri('lib/modelsFaceID')
            ]).then(() => navigator.mediaDevices.getUserMedia({ video: true }))
                .then(stream => {
                video.node().srcObject = stream;
                video.node().onloadedmetadata = () => scanFace();
            })
                .catch(() => {
                alert("No tienes la cámara prendida o no está accesible.");
                status.text("No se pudo acceder a la cámara");
            });
        }
        mostrarLoginSMS() {
            this.contenedor.html("");
            this.contenedor
                .classed("container", true)
                .classed("sms-login-container", true)
                .style("max-width", "450px")
                .style("width", "100%")
                .style("padding", "30px 40px")
                .style("text-align", "center");
            this.texto.titulo1(this.contenedor, "Iniciar Sesión con SMS")
                .classed("sms-title", true);
            this.contenedor.append("div")
                .attr("class", "sms-icon")
                .html("<i class='bx bx-message-dots'></i>");
            this.texto.texto(this.contenedor, "Hemos enviado un código de 6 dígitos a tu teléfono")
                .classed("instruction-text", true);
            const inputCode = this.control.input(this.contenedor, {
                type: "text",
                placeholder: "000000",
                marginBottom: "36px",
                onInput: (e) => {
                    const val = e.target.value;
                    inputCode.node().value = val.replace(/\D/g, '').slice(0, 6);
                    btnNext.property("disabled", val.length !== 6);
                }
            });
            inputCode
                .attr("maxlength", "6")
                .attr("inputmode", "numeric")
                .classed("input-code", true)
                .style("text-align", "center")
                .style("font-size", "1.5em")
                .style("letter-spacing", "0.5em")
                .style("padding-left", "0.5em");
            const status = this.contenedor.append("div")
                .style("margin-top", "10px")
                .style("min-height", "1.2em")
                .style("font-size", "0.9em")
                .style("color", "#4ecdc4");
            const btnNext = this.control.navDobleBotones(this.contenedor, {
                backLabel: "Volver",
                onBack: () => this.mostrarMetodosLogin(this.correoUsuario),
                nextLabel: "Verificar",
                onNext: () => {
                    var _a;
                    const code = (_a = inputCode.node()) === null || _a === void 0 ? void 0 : _a.value.trim();
                    if (!code || code.length !== 6) {
                        status.text("Ingresa 6 dígitos").style("color", "#ff6b6b");
                        return;
                    }
                    status.text("Verificando...").style("color", "#4ecdc4");
                    controller.ApiService.loginConToken(this.correoUsuario, "sms", code, (success, data) => {
                        if (success && (data === null || data === void 0 ? void 0 : data.token)) {
                            status.text("¡Éxito!").style("color", "#2fd966");
                            setTimeout(() => {
                                if (this.onBienvenida)
                                    this.onBienvenida();
                            }, 800);
                        }
                        else {
                            status.text((data === null || data === void 0 ? void 0 : data.message) || "Código incorrecto").style("color", "#ff6b6b");
                        }
                    });
                },
                nextDisabled: true
            }).classed("btn-verify-sms", true);
            // Reenviar usando enviarToken
            this.contenedor.append("div")
                .style("margin-top", "20px")
                .style("font-size", "0.9em")
                .append("a")
                .style("color", "#4ecdc4")
                .style("cursor", "pointer")
                .style("text-decoration", "underline")
                .text("¿No recibiste el código? Reenviar")
                .on("click", () => {
                status.text("Enviando...").style("color", "#4ecdc4");
                controller.ApiService.enviarToken(appMain.gUser.idGlobal, this.correoUsuario, "", "sms", (success, data) => {
                    status.text(success ? "Código reenviado" : "Error al reenviar")
                        .style("color", success ? "#2fd966" : "#ff6b6b");
                });
            });
        }
        mostrarLoginWhatsApp() {
            this.contenedor.html("");
            this.contenedor
                .classed("container", true)
                .classed("whatsapp-login-container", true)
                .style("max-width", "450px")
                .style("width", "100%")
                .style("padding", "30px 40px")
                .style("text-align", "center");
            this.texto.titulo1(this.contenedor, "Iniciar Sesión con WhatsApp")
                .classed("whatsapp-title", true);
            this.contenedor.append("div")
                .attr("class", "whatsapp-icon")
                .html("<i class='bx bxl-whatsapp'></i>");
            this.texto.texto(this.contenedor, "Hemos enviado un código de 6 dígitos a tu WhatsApp")
                .classed("instruction-text-text", true);
            const inputCode = this.control.input(this.contenedor, {
                type: "text",
                placeholder: "000000",
                marginBottom: "36px",
                onInput: (e) => {
                    const val = e.target.value;
                    inputCode.node().value = val.replace(/\D/g, '').slice(0, 6);
                    btnNext.property("disabled", val.length !== 6);
                }
            });
            inputCode
                .attr("maxlength", "6")
                .attr("inputmode", "numeric")
                .classed("input-code", true)
                .style("text-align", "center")
                .style("font-size", "1.5em")
                .style("letter-spacing", "0.5em")
                .style("padding-left", "0.5em");
            const status = this.contenedor.append("div")
                .style("margin-top", "10px")
                .style("min-height", "1.2em")
                .style("font-size", "0.9em")
                .style("color", "#25d366");
            const btnNext = this.control.navDobleBotones(this.contenedor, {
                backLabel: "Volver",
                onBack: () => this.mostrarMetodosLogin(this.correoUsuario),
                nextLabel: "Verificar",
                onNext: () => {
                    var _a;
                    const code = (_a = inputCode.node()) === null || _a === void 0 ? void 0 : _a.value.trim();
                    if (!code || code.length !== 6) {
                        status.text("Ingresa 6 dígitos").style("color", "#ff6b6b");
                        return;
                    }
                    status.text("Verificando...").style("color", "#25d366");
                    controller.ApiService.loginConToken(this.correoUsuario, "whatsapp", code, (success, data) => {
                        if (success && (data === null || data === void 0 ? void 0 : data.token)) {
                            status.text("¡Conectado!").style("color", "#25d366");
                            setTimeout(() => {
                                if (this.onBienvenida)
                                    this.onBienvenida();
                            }, 800);
                        }
                        else {
                            status.text((data === null || data === void 0 ? void 0 : data.message) || "Código incorrecto").style("color", "#ff6b6b");
                        }
                    });
                },
                nextDisabled: true
            }).classed("btn-verify-whatsapp", true);
            // Reenviar
            this.contenedor.append("div")
                .style("margin-top", "20px")
                .style("font-size", "0.9em")
                .append("a")
                .style("color", "#25d366")
                .style("cursor", "pointer")
                .style("text-decoration", "underline")
                .text("¿No llegó? Reenviar por WhatsApp")
                .on("click", () => {
                status.text("Enviando...").style("color", "#25d366");
                controller.ApiService.enviarToken(appMain.gUser.idGlobal, this.correoUsuario, "", "whatsapp", (success, data) => {
                    status.text(success ? "Reenviado" : "Error")
                        .style("color", success ? "#25d366" : "#ff6b6b");
                });
            });
        }
        mostrarLoginEmailToken() {
            this.contenedor.html("");
            this.contenedor
                .classed("container", true)
                .classed("email-token-container", true)
                .style("max-width", "460px")
                .style("width", "100%")
                .style("padding", "32px 40px")
                .style("text-align", "center");
            this.texto.titulo1(this.contenedor, "Token por Correo")
                .classed("email-title", true);
            this.contenedor.append("div")
                .attr("class", "email-icon")
                .html("<i class='bx bx-envelope'></i>");
            this.texto.texto(this.contenedor, `Código enviado a ${this.correoUsuario}`)
                .classed("instruction-text", true)
                .style("word-break", "break-word");
            const inputToken = this.control.input(this.contenedor, {
                type: "text",
                placeholder: "000000",
                marginBottom: "36px",
                onInput: (e) => {
                    const val = e.target.value;
                    inputToken.node().value = val.replace(/\D/g, '').slice(0, 6);
                    btnNext.property("disabled", val.length !== 6);
                }
            });
            inputToken
                .attr("maxlength", "6")
                .attr("inputmode", "numeric")
                .classed("input-token", true)
                .style("text-align", "center")
                .style("font-size", "1.5em")
                .style("letter-spacing", "0.5em")
                .style("padding-left", "0.5em");
            const status = this.contenedor.append("div")
                .style("margin-top", "10px")
                .style("min-height", "1.2em")
                .style("font-size", "0.9em")
                .style("color", "#4a90e2");
            const btnNext = this.control.navDobleBotones(this.contenedor, {
                backLabel: "Volver",
                onBack: () => this.mostrarMetodosLogin(this.correoUsuario),
                nextLabel: "Verificar",
                onNext: () => {
                    var _a;
                    const token = (_a = inputToken.node()) === null || _a === void 0 ? void 0 : _a.value.trim();
                    if (!token || token.length !== 6) {
                        status.text("Ingresa 6 dígitos").style("color", "#e74c3c");
                        return;
                    }
                    status.text("Verificando...").style("color", "#4a90e2");
                    controller.ApiService.loginConToken(this.correoUsuario, "correo", token, (success, data) => {
                        if (success && (data === null || data === void 0 ? void 0 : data.token)) {
                            status.text("¡Verificado!").style("color", "#2ecc71");
                            setTimeout(() => {
                                if (this.onBienvenida)
                                    this.onBienvenida();
                            }, 800);
                        }
                        else {
                            status.text((data === null || data === void 0 ? void 0 : data.message) || "Token incorrecto").style("color", "#e74c3c");
                        }
                    });
                },
                nextDisabled: true
            }).classed("btn-verify-email", true);
            // Reenviar
            this.contenedor.append("div")
                .style("margin-top", "22px")
                .style("font-size", "0.9em")
                .append("a")
                .style("color", "#4a90e2")
                .style("cursor", "pointer")
                .style("text-decoration", "underline")
                .text("¿No llegó? Reenviar token")
                .on("click", () => {
                status.text("Enviando...").style("color", "#4a90e2");
                controller.ApiService.enviarToken(appMain.gUser.idGlobal, this.correoUsuario, "", "email", (success, data) => {
                    status.text(success ? "Reenviado" : "Error")
                        .style("color", success ? "#2ecc71" : "#e74c3c");
                });
            });
        }
    }
    view.LoginVentana = LoginVentana;
})(view || (view = {}));
