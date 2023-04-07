export class UnauthorizatedError extends Error {
  constructor(message = "Usuário não autorizado") {
    super(message);
    this.name = "UnauthorizatedError";
  }
}
