import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  //Você pode usar a pagesopção para especificar a rota para páginas de login, logout e erro personalizadas. Isso não é obrigatório, mas ao adicionar signIn: '/login'em nossa pagesopção, o usuário será redirecionado para nossa página de login personalizada, em vez da página padrão do NextAuth.js.
  pages: {
    signIn: "/login",
  },
  //O authorized retorno de chamada(callback) é usado para verificar se a solicitação está autorizada a acessar uma página via Next.js Middleware . Ele é chamado antes que uma solicitação(request) seja concluída e recebe um objeto com as propriedades auth e request. A auth propriedade contém a sessão do usuário e a request propriedade contém a solicitação de entrada.
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }
      return true;
    },
  },
  //A providersopção é um array onde você lista diferentes opções de login. Por enquanto, é um array vazio para satisfazer a configuração do NextAuth.
  providers: [],
} as NextAuthConfig;
