import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

//Aqui você está inicializando NextAuth.js com o authConfig objeto e exportando a auth propriedade. Você também está usando a matcher opção do Middleware para especificar que ele deve ser executado em caminhos específicos.
//A vantagem de empregar o Middleware para essa tarefa é que as rotas protegidas nem começarão a ser renderizadas até que o Middleware verifique a autenticação, melhorando a segurança e o desempenho do seu aplicativo.

export default NextAuth(authConfig).auth;

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
