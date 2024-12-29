# Anotações importantes sobre conceitos e comandos, e outros importantes no projeto

## Criando um novo projeto em next

Para criar um novo aplicativo next.js, executar o seguinte comando, Este comando usa create-next-app, uma ferramenta de Interface de Linha de Comando (CLI) que configura um aplicativo Next.js para você.

```bash
# criar um projeto next com a versão recente mais estavel
npx create-next-app@latest nome-projeto
```

instalar os pacotes do projeto

```bash
pnpm i
```

para iniciar o servidor de desenvolvimento, `pnpm dev` inicia seu servidor de desenvolvimento Next.js na porta 3000

```bash
pnpm dev
```

## Estrutura de pastas

- **/app:** Contém todas as rotas, componentes e lógica para seu aplicativo. É aqui que você trabalhará principalmente.
- **/app/lib:** Contém funções usadas em seu aplicativo, como funções de utilitário reutilizáveis ​​e funções de busca de dados.
- **/app/ui:** Contém todos os componentes de UI para seu aplicativo, como cards, tabelas e formulários.
- **/public:** Contém todos os ativos estáticos do seu aplicativo, como imagens.
- **Arquivos de configuração:** Você também notará arquivos de configuração como next.config.js na raiz do seu aplicativo. A maioria desses arquivos é criada e pré-configurada quando você inicia um novo projeto usando create-next-app.

## Estilos globais

Se você olhar dentro da /app/ui pasta, verá um arquivo chamado global.css. Você pode usar esse arquivo para adicionar regras CSS a todas as rotas em seu aplicativo - como regras de redefinição CSS, estilos de todo o site para elementos HTML como links e muito mais.

### Módulos CSS

Os módulos CSS permitem que você defina o escopo do CSS para um componente criando automaticamente nomes de classe exclusivos, para que você não precise se preocupar com conflitos de estilo também.

### Usando a clsx biblioteca para alternar nomes de classes

Pode haver casos em que você precise estilizar condicionalmente um elemento com base no estado ou em alguma outra condição.

clsxé uma biblioteca que permite alternar nomes de classes facilmente. Recomendamos dar uma olhada na documentaçãopara mais detalhes.

## Por que otimizar imagens?

Next.js pode servir ativos estáticos , como imagens, sob a pasta de nível superior /public. Arquivos dentro /public podem ser referenciados em seu aplicativo.

Com HTML comum, eu poderia adicionar uma imagem

No entanto, isso significa que você tem que manualmente:

- Garanta que sua imagem seja responsiva em diferentes tamanhos de tela.
- Especifique tamanhos de imagem para diferentes dispositivos.
- Evite a mudança de layout enquanto as imagens são carregadas.
- Carregue lentamente imagens que estejam fora da janela de visualização do usuário.

Otimização de Imagem é um tópico amplo em desenvolvimento web que pode ser considerado uma especialização em si. Em vez de implementar manualmente essas otimizações, você pode usar o next/imagecomponente para otimizar automaticamente suas imagens.

### O `<Image>` componente

O <Image>Componente é uma extensão da <img>tag HTML e vem com otimização automática de imagens, como:

- Evitando a mudança automática de layout quando as imagens estão sendo carregadas.
- Redimensionar imagens para evitar o envio de imagens grandes para dispositivos com uma janela de visualização menor.
- Imagens de carregamento lento por padrão (as imagens são carregadas conforme entram na janela de visualização).
- Servindo imagens em formatos modernos, como WebPe AVIF, quando o navegador suportar.

## Roteamento aninhado

Next.js usa roteamento de sistema de arquivos onde pastas são usadas para criar rotas aninhadas. Cada pasta representa um segmento de rota que mapeia para um segmento de URL.

Você pode criar interfaces de usuário separadas para cada rota usando arquivos `layout.tsx` e `page.tsx`.

`page.tsx` é um arquivo Next.js especial que exporta um componente React, e é necessário para que a rota seja acessível. Em seu aplicativo, você já tem um arquivo de página: `/app/page.tsx` - esta é a home page associada à rota `/`.

Para criar uma rota aninhada, você pode aninhar pastas umas dentro das outras e adicionar `page.tsx` arquivos dentro delas. Por exemplo:

`/app/dashboard/page.tsx` está associado ao /dashboard caminho. Vamos criar a página para ver como funciona!

Ao ter um nome especial para arquivos de página, o Next.js não permite que você coloque componentes de UI, arquivos de teste e outros códigos relacionados com suas rotas. Apenas o conteúdo dentro do arquivo de página será acessível publicamente. Por exemplo, as pastas /ui e /lib são colocadas dentro da pasta /app junto com suas rotas.

## Criando o layout

No Next.js, você pode usar um `layout.tsx` arquivo especial para criar UI que é compartilhada entre várias páginas.

## Por que otimizar a navegação?

Para vincular entre páginas, você tradicionalmente usaria o `<a>` elemento HTML. Há uma atualização de página completa em cada navegação de página!

## O `<Link>` componente

No Next.js, você pode usar o `<Link />` Component para vincular entre páginas no seu aplicativo. `<Link>` permite que você faça navegação do lado do cliente com JavaScript.

### Divisão automática de código e pré-busca

Para melhorar a experiência de navegação, o Next.js divide automaticamente o código do seu aplicativo por segmentos de rota. Isso é diferente de um React SPA tradicional, onde o navegador carrega todo o código do seu aplicativo no carregamento inicial.

Dividir o código por rotas significa que as páginas ficam isoladas. Se uma determinada página lançar um erro, o resto do aplicativo ainda funcionará.

Além disso, na produção, sempre que <Link> componentes aparecem na viewport do navegador, o Next.js automaticamente pré-busca o código para a rota vinculada em segundo plano. No momento em que o usuário clica no link, o código para a página de destino já estará carregado em segundo plano, e é isso que torna a transição da página quase instantânea!