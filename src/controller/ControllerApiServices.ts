namespace controller {
  export class ApiService {
    public static enviarToken(id: number,correo: string, telefono: string, tipo: string, callback: (success: boolean, data?: any) => void): void {
      fetch(config.ApiConfig.API_GENERAR_TOKEN, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({id, correo, telefono, tipo })
      })
        .then(async res => {
          const data = await res.json();
          callback(res.ok, data);
        })
        .catch(() => callback(false));
    }

    public static verificarExistenciaUsuario(email: string, callback: (success: boolean, data?: any) => void): void {
      fetch(config.ApiConfig.API_VERIFICAR_CORREO, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(email)
      })
        .then(async res => {
          const data = await res.json();
          callback(res.ok, data);
        })
        .catch(() => callback(false));
    }

    public static crearUsuario(persona: models.Persona, callback: (success: boolean, data?: any) => void): void {
      fetch(config.ApiConfig.API_CREAR_USUARIO, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(persona)
      })
        .then(async res => {
          const data = await res.json();
          callback(res.ok, data);
        })
        .catch(() => callback(false));
    }

    public static verificarTokens(userID: number, type: string, tokenCorreo: string, tokenSMS: string, callback: (success: boolean, data?: any) => void): void {
      const body = { UsuarioId: userID, Tipo: type, Correo: tokenCorreo, Telefono: tokenSMS };
      fetch(config.ApiConfig.API_VERIFICAR_TOKENS, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
        .then(async res => {
          const data = await res.json();
          callback(res.ok, data);
        })
        .catch(() => callback(false));
    }

    public static generarSesion(usuarioId: number, metodo: string, callback: (success: boolean, data?: any) => void): void {
      const body = { UsuarioId: usuarioId, Metodo: metodo };
      fetch(config.ApiConfig.API_METODO_SESION, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
        .then(async res => {
          const data = await res.json();
          callback(res.ok, data);
        })
        .catch(() => callback(false));
    }

    public static loginCorreoPassword(correo: string, password: string, callback: (success: boolean, data?: any) => void): void {
      const body = { Correo: correo, TipoAuth: "password", Password: password };
      fetch(config.ApiConfig.API_LOGIN, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
        .then(async res => {
          const data = await res.json();
          callback(res.ok, data);
        })
        .catch(() => callback(false));
    }

    public static loginConToken(correo: string, typeToken: string, token: string, callback: (success: boolean, data?: any) => void): void {
      const body = {idUsuario: appMain.gUser.idGlobal, Correo: correo, TipoAuth: "token", TypeToken: typeToken, Token: token };
      fetch(config.ApiConfig.API_LOGIN, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
        .then(async res => {
          const data = await res.json();
          callback(res.ok, data);
        })
        .catch(() => callback(false));
    }

    public static loginBiometrico(correo: string, faceID: number[], callback: (success: boolean, data?: any) => void): void {
      const body = { Correo: correo, TipoAuth: "biometrico", FaceID: faceID };
      fetch(config.ApiConfig.API_LOGIN, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
        .then(async res => {
          const data = await res.json();
          callback(res.ok, data);
        })
        .catch(() => callback(false));
    }

    public static solicitarRecuperacionPassword(correo: string, tipo: string, callback: (success: boolean, data?: any) => void): void {
      const body = { Correo: correo, Tipo: tipo };
      fetch(config.ApiConfig.API_SOLICITAR_RECUPERACION, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
        .then(async res => {
          const data = await res.json();
          callback(res.ok, data);
        })
        .catch(() => callback(false));
    }

    public static verificarTokenRecuperacion(correo: string, token: string, callback: (success: boolean, data?: any) => void): void {
      const body = { Correo: correo, Token: token };
      fetch(config.ApiConfig.API_VERIFICAR_TOKEN_RECUP, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
        .then(async res => {
          const data = await res.json();
          callback(res.ok, data);
        })
        .catch(() => callback(false));
    }

    public static recuperarPassword(correo: string, nuevaPassword: string, callback: (success: boolean, data?: any) => void): void {
      const body = { Correo: correo, NuevaPassword: nuevaPassword };
      fetch(config.ApiConfig.API_RECUPERAR_PASSWORD, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
        .then(async res => {
          const data = await res.json();
          callback(res.ok, data);
        })
        .catch(() => callback(false));
    }

    public static enviarPeticionSinDatos(callback: (success: boolean, data?: any) => void): void {
      fetch(config.ApiConfig.API_BASE_URL, {
        method: "POST"
      })
        .then(async res => {
          const data = await res.json();
          callback(res.ok, data);
        })
        .catch(() => callback(false));
    }
  }
}
