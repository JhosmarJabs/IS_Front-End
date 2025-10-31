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
}