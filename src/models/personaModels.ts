namespace models {
  export class Persona {
    Nombre: string;
    ApellidoPaterno: string;
    ApellidoMaterno: string;
    CorreoElectronico: string;
    NumeroTelefono: string;
    Sexo: string;
    FechaNacimiento: string;
    HuellaDactilar?: string | null;
    FaceID?: number[] | null;
    PasswordHash: string;
  }

  export class variables{
    correoGlobal: string;
    usuarioGlobal: string;
    telefonoGlobal: string;
    idGlobal: number;
    rolGlobal: string;
    sesionTokenGlobal: string;
    sexoGlobal: string;
    APaternoGlobal: string;
    AMaternoGlobal: string;
  }
}