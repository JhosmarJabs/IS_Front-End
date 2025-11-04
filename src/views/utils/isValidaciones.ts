namespace utils {
  export class Validator {
    // Validar si nombre o texto solo contenga letras y espacios
    public static validarNombre(nombre: string): boolean {
      const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
      return regex.test(nombre.trim());
    }

    // Validar correo electrónico
    public static validarCorreo(email: string): boolean {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email.trim());
    }

    // Validar teléfono (solo dígitos, longitud 10)
    public static validarTelefono(telefono: string): boolean {
      const regex = /^\d{10}$/;
      return regex.test(telefono.trim());
    }

    // Validar token (ejemplo formatos alfanuméricos, longitud variable)
    public static validarToken(token: string): boolean {
      const regex = /^[a-zA-Z0-9\-_.]+$/;
      return regex.test(token.trim());
    }

    public static imputarValidaciones(type: string, value: string): boolean {
      switch (type) {
        case "nombre":
        case "apellido":
          return this.validarNombre(value);
        case "correo":
          return this.validarCorreo(value);
        case "telefono":
          return this.validarTelefono(value);
        case "token":
          return this.validarToken(value);
        default:
          return value.trim().length > 0;
      }
    }
  }
}