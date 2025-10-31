namespace config {
    export class ApiConfig {
        private static readonly API_BASE_URL: string = "http://localhost:5000/auth";
        private static readonly API_BASE_URL1: string = "https://is-back-end.onrender.com/auth";
        public static readonly API_GENERAR_TOKEN: string = `${this.API_BASE_URL}/GenerateVerificationToken`;
        public static readonly API_VERIFICAR_TOKENS: string = `${this.API_BASE_URL}/VerifyTokens`;
        public static readonly API_VERIFICAR_CORREO: string = `${this.API_BASE_URL}/CheckEmailExists`;




        // public static readonly API_PERSONAS: string = `${ApiConfig.API_BASE_URL}/GetPersonas`;
        // public static readonly API_CREATE_PERSONA: string = `${ApiConfig.API_BASE_URL}/CreatePersona`;
        // public static readonly API_UPDATE_PERSONA: string = `${ApiConfig.API_BASE_URL}/UpdatePersona`;
        // public static readonly API_DELETE_PERSONA: string = `${ApiConfig.API_BASE_URL}/DeletePersona`;
        
        // public static readonly API_EMPRESAS: string = `${ApiConfig.API_BASE_URL}/GetEmpresas`;
    }
}