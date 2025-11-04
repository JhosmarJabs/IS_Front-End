var config;
(function (config) {
    var _a;
    class ApiConfig {
    }
    _a = ApiConfig;
    ApiConfig.API_BASE_URL1 = "http://localhost:5000/auth";
    ApiConfig.API_BASE_URL = "https://is-back-end.onrender.com/auth";
    ApiConfig.API_GENERAR_TOKEN = `${_a.API_BASE_URL}/GenerateVerificationToken`;
    ApiConfig.API_VERIFICAR_TOKENS = `${_a.API_BASE_URL}/VerifyTokens`;
    ApiConfig.API_VERIFICAR_CORREO = `${_a.API_BASE_URL}/CheckEmailExists`;
    ApiConfig.API_CREAR_USUARIO = `${_a.API_BASE_URL}/RegisterUser`;
    ApiConfig.API_METODO_SESION = `${_a.API_BASE_URL}/GenerateSessionToken`;
    ApiConfig.API_LOGIN = `${_a.API_BASE_URL}/login`;
    ApiConfig.API_SOLICITAR_RECUPERACION = `${_a.API_BASE_URL}/RequestPasswordRecovery`;
    ApiConfig.API_VERIFICAR_TOKEN_RECUP = `${_a.API_BASE_URL}/VerifyRecoveryToken`;
    ApiConfig.API_RECUPERAR_PASSWORD = `${_a.API_BASE_URL}/RecoverPassword`;
    ApiConfig.API_OBTENER_DATOS_USUARIO = `${_a.API_BASE_URL}/user`;
    config.ApiConfig = ApiConfig;
})(config || (config = {}));
