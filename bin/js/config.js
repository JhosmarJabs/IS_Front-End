var config;
(function (config) {
    var _a;
    class ApiConfig {
    }
    _a = ApiConfig;
    ApiConfig.API_BASE_URL = "http://localhost:5000/auth";
    ApiConfig.API_BASE_URL1 = "https://is-back-end.onrender.com/auth";
    ApiConfig.API_GENERAR_TOKEN = `${_a.API_BASE_URL}/GenerateVerificationToken`;
    ApiConfig.API_VERIFICAR_TOKENS = `${_a.API_BASE_URL}/VerifyTokens`;
    ApiConfig.API_VERIFICAR_CORREO = `${_a.API_BASE_URL}/CheckEmailExists`;
    config.ApiConfig = ApiConfig;
})(config || (config = {}));
