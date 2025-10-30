namespace controller {
  export class ApiService {
    public static enviarCorreoVerificacion(email: string): Promise<any> {
      return fetch(config.ApiConfig.API_BASE_URL, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(email)
      })
        .then(async res => {
          const data = await res.json();
          return { ok: res.ok, data };
        });
    }
  }
}
