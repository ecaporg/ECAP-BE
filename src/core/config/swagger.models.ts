import { Type } from '@nestjs/common';

// Auth models
import { AuthTokensDTO } from '@/auth/dtos/auth-tokens.dto';
import { EmailDTO } from '@/auth/dtos/email.dto';
import { LoginResponseDTO } from '@/auth/dtos/login-response.dto';
import { PasswordDTO } from '@/auth/dtos/password.dto';
import { ResetPasswordDTO } from '@/auth/dtos/reset-password.dto';
import { SignInDTO } from '@/auth/dtos/sign-in.dto';
import { AuthUser } from '@/auth/types/auth-user';
// User models
import { CreateUserDTO } from '@/users/dtos/create-user.dto';
import { UpdateUserDTO } from '@/users/dtos/update-user.dto';

// Core models
import { ErrorResponseDto } from '../dto/error-response.dto';

/**
 * Registry of all models used in Swagger documentation
 * Add all your DTOs, entities, and other models here
 */
export const SWAGGER_API_MODELS: Type<any>[] = [
  // Core
  ErrorResponseDto,

  // Auth
  AuthTokensDTO,
  LoginResponseDTO,
  AuthUser,
  EmailDTO,
  PasswordDTO,
  ResetPasswordDTO,
  SignInDTO,

  // Users
  CreateUserDTO,
  UpdateUserDTO,

  // Add more models here as needed, organized by module
  // School
  // ...

  // Students
  // ...

  // Staff
  // ...

  // Track
  // ...
];
