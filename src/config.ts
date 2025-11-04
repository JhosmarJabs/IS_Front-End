namespace config {
    export class ApiConfig {
        public static readonly API_BASE_URL1: string = "http://localhost:5000/auth";
        public static readonly API_BASE_URL: string = "https://is-back-end.onrender.com/auth";
        public static readonly API_GENERAR_TOKEN: string = `${this.API_BASE_URL}/GenerateVerificationToken`;
        public static readonly API_VERIFICAR_TOKENS: string = `${this.API_BASE_URL}/VerifyTokens`;
        public static readonly API_VERIFICAR_CORREO: string = `${this.API_BASE_URL}/CheckEmailExists`;
        public static readonly API_CREAR_USUARIO: string = `${this.API_BASE_URL}/RegisterUser`;
        public static readonly API_METODO_SESION: string = `${this.API_BASE_URL}/GenerateSessionToken`;
        public static readonly API_LOGIN: string = `${this.API_BASE_URL}/login`;
        public static readonly API_SOLICITAR_RECUPERACION: string = `${this.API_BASE_URL}/RequestPasswordRecovery`;
        public static readonly API_VERIFICAR_TOKEN_RECUP: string = `${this.API_BASE_URL}/VerifyRecoveryToken`;
        public static readonly API_RECUPERAR_PASSWORD: string = `${this.API_BASE_URL}/RecoverPassword`;
        public static readonly API_OBTENER_DATOS_USUARIO: string = `${this.API_BASE_URL}/user`;
    }
}