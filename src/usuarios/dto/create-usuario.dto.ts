import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUsuarioDto {
    @IsNotEmpty({ message: 'El nombre es obligatorio.' })
    @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres.' })
    nombre: string;

    @IsEmail({}, { message: 'El correo no tiene un formato válido.' })
    email: string;

    @IsNotEmpty({ message: 'La contraseña es obligatoria.' })
    @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres.' })
    password: string;
}
