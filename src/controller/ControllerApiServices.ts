namespace controller {
  export class ApiService {
    public static enviarTokenVerificacion(correo: string, telefono: string, tipo: string = "Verificacion"): Promise<any> {
      return fetch(config.ApiConfig.API_GENERAR_TOKEN, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          correo,
          telefono,
          tipo
        })
      })
        .then(async res => {
          const data = await res.json();
          return { ok: res.ok, data };
        });
    }
    public static enviarCorreoVerificacion(email: string): Promise<any> {
      return fetch(config.ApiConfig.API_VERIFICAR_CORREO, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(email)
      })
        .then(async res => {
          const data = await res.json();
          return { ok: res.ok, data };
        });
    }

    public static verificarTokens(userID: number, type: string, tokenCorreo: string, tokenSMS: string): Promise<any> {
      const body = {
        UsuarioId: userID,
        Tipo: type,
        Correo: tokenCorreo,
        Telefono: tokenSMS
      };

      return fetch(config.ApiConfig.API_VERIFICAR_TOKENS, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
        .then(async res => {
          const data = await res.json();
          return { ok: res.ok, data };
        });
    }



  }

}

