var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var controller;
(function (controller) {
    class ApiService {
        static enviarToken(id, correo, telefono, tipo, callback) {
            fetch(config.ApiConfig.API_GENERAR_TOKEN, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, correo, telefono, tipo })
            })
                .then((res) => __awaiter(this, void 0, void 0, function* () {
                const data = yield res.json();
                callback(res.ok, data);
            }))
                .catch(() => callback(false));
        }
        static verificarExistenciaUsuario(email, callback) {
            fetch(config.ApiConfig.API_VERIFICAR_CORREO, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(email)
            })
                .then((res) => __awaiter(this, void 0, void 0, function* () {
                const data = yield res.json();
                callback(res.ok, data);
            }))
                .catch(() => callback(false));
        }
        static crearUsuario(persona, callback) {
            fetch(config.ApiConfig.API_CREAR_USUARIO, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(persona)
            })
                .then((res) => __awaiter(this, void 0, void 0, function* () {
                const data = yield res.json();
                callback(res.ok, data);
            }))
                .catch(() => callback(false));
        }
        static verificarTokens(userID, type, tokenCorreo, tokenSMS, callback) {
            const body = { UsuarioId: userID, Tipo: type, Correo: tokenCorreo, Telefono: tokenSMS };
            fetch(config.ApiConfig.API_VERIFICAR_TOKENS, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            })
                .then((res) => __awaiter(this, void 0, void 0, function* () {
                const data = yield res.json();
                callback(res.ok, data);
            }))
                .catch(() => callback(false));
        }
        static generarSesion(usuarioId, metodo, callback) {
            const body = { UsuarioId: usuarioId, Metodo: metodo };
            fetch(config.ApiConfig.API_METODO_SESION, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            })
                .then((res) => __awaiter(this, void 0, void 0, function* () {
                const data = yield res.json();
                callback(res.ok, data);
            }))
                .catch(() => callback(false));
        }
        static loginCorreoPassword(correo, password, callback) {
            const body = { Correo: correo, TipoAuth: "password", Password: password };
            fetch(config.ApiConfig.API_LOGIN, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            })
                .then((res) => __awaiter(this, void 0, void 0, function* () {
                const data = yield res.json();
                callback(res.ok, data);
            }))
                .catch(() => callback(false));
        }
        static loginConToken(correo, typeToken, token, callback) {
            const body = { idUsuario: appMain.gUser.idGlobal, Correo: correo, TipoAuth: "token", TypeToken: typeToken, Token: token };
            fetch(config.ApiConfig.API_LOGIN, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            })
                .then((res) => __awaiter(this, void 0, void 0, function* () {
                const data = yield res.json();
                callback(res.ok, data);
            }))
                .catch(() => callback(false));
        }
        static loginBiometrico(correo, faceID, callback) {
            const body = { Correo: correo, TipoAuth: "biometrico", FaceID: faceID };
            fetch(config.ApiConfig.API_LOGIN, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            })
                .then((res) => __awaiter(this, void 0, void 0, function* () {
                const data = yield res.json();
                callback(res.ok, data);
            }))
                .catch(() => callback(false));
        }
        static solicitarRecuperacionPassword(correo, tipo, callback) {
            const body = { Correo: correo, Tipo: tipo };
            fetch(config.ApiConfig.API_SOLICITAR_RECUPERACION, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            })
                .then((res) => __awaiter(this, void 0, void 0, function* () {
                const data = yield res.json();
                callback(res.ok, data);
            }))
                .catch(() => callback(false));
        }
        static verificarTokenRecuperacion(correo, token, callback) {
            const body = { Correo: correo, Token: token };
            fetch(config.ApiConfig.API_VERIFICAR_TOKEN_RECUP, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            })
                .then((res) => __awaiter(this, void 0, void 0, function* () {
                const data = yield res.json();
                callback(res.ok, data);
            }))
                .catch(() => callback(false));
        }
        static recuperarPassword(correo, nuevaPassword, callback) {
            const body = { Correo: correo, NuevaPassword: nuevaPassword };
            fetch(config.ApiConfig.API_RECUPERAR_PASSWORD, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            })
                .then((res) => __awaiter(this, void 0, void 0, function* () {
                const data = yield res.json();
                callback(res.ok, data);
            }))
                .catch(() => callback(false));
        }
        static enviarPeticionSinDatos(callback) {
            fetch(config.ApiConfig.API_BASE_URL, {
                method: "POST"
            })
                .then((res) => __awaiter(this, void 0, void 0, function* () {
                const data = yield res.json();
                callback(res.ok, data);
            }))
                .catch(() => callback(false));
        }
    }
    controller.ApiService = ApiService;
})(controller || (controller = {}));
