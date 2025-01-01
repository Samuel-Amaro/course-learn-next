# Curso de App Router Next.js - Iniciante

Anotações importantes sobre conceitos e comandos, e outros importantes no projeto

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

## Escolhendo como buscar dados

### Camada API

APIs são uma camada intermediária entre o código do seu aplicativo e o banco de dados. Há alguns casos em que você pode usar uma API:

- Se você estiver usando serviços de terceiros que fornecem uma API.
- Se você estiver buscando dados do cliente, você vai querer ter uma camada de API que seja executada no servidor para evitar expor os segredos do seu banco de dados ao cliente.

### Consultas de banco de dados

Ao criar um aplicativo full-stack, você também precisará escrever lógica para interagir com seu banco de dados. Para bancos de dados relacionais como o Postgres, você pode fazer isso com SQL ou com um ORM

Existem alguns casos em que você precisa escrever consultas de banco de dados:

- Ao criar seus endpoints de API, você precisa escrever lógica para interagir com seu banco de dados.
- Se estiver usando o React Server Components (buscando dados no servidor), você pode pular a camada de API e consultar seu banco de dados diretamente, sem correr o risco de expor os segredos do seu banco de dados ao cliente.

### Usando componentes do servidor para buscar dados

Por padrão, os aplicativos Next.js usam React Server Components . Buscar dados com Server Components é uma abordagem relativamente nova e há alguns benefícios em usá-los:

- Os Componentes de Servidor suportam promessas, fornecendo uma solução mais simples para tarefas assíncronas como busca de dados. Você pode usar async/await a sintaxe sem recorrer a useEffect, useState ou bibliotecas de busca de dados.
- Os componentes do servidor são executados no servidor, para que você possa manter buscas de dados e lógica caras no servidor e enviar apenas o resultado ao cliente.
- Como mencionado anteriormente, como os Componentes do Servidor são executados no servidor, você pode consultar o banco de dados diretamente sem uma camada de API adicional.

### Usando SQL

Para seu projeto de painel, você escreverá consultas de banco de dados usando o Vercel Postgres SDKe SQL. Existem algumas razões pelas quais usaremos SQL:

- SQL é o padrão da indústria para consultas em bancos de dados relacionais (por exemplo, ORMs geram SQL internamente).
- Ter um conhecimento básico de SQL pode ajudar você a entender os fundamentos dos bancos de dados relacionais, permitindo que você aplique seu conhecimento a outras ferramentas.
- O SQL é versátil, permitindo que você busque e manipule dados específicos.
- O Vercel Postgres SDK fornece proteção contra injeções de SQL.

Não se preocupe se você nunca usou SQL antes: nós fornecemos as consultas para você.

## O que são cascatas de solicitações(request waterfalls)?

Uma "cascata" se refere a uma sequência de solicitações de rede que dependem da conclusão de solicitações anteriores. No caso de busca de dados, cada solicitação só pode começar quando a solicitação anterior tiver retornado dados.

Esse padrão não é necessariamente ruim. Pode haver casos em que você queira cascatas porque quer que uma condição seja satisfeita antes de fazer a próxima solicitação. Por exemplo, você pode querer buscar o ID de um usuário e as informações do perfil primeiro. Depois de ter o ID, você pode prosseguir para buscar a lista de amigos dele. Nesse caso, cada solicitação é contingente aos dados retornados da solicitação anterior.

No entanto, esse comportamento também pode ser não intencional e afetar o desempenho.

## Busca de dados paralela

Uma maneira comum de evitar cascatas é iniciar todas as solicitações de dados ao mesmo tempo — em paralelo.

Em JavaScript, você pode usar o Promise.all() ou Promise.allSettled() funções para iniciar todas as promessas ao mesmo tempo.

Ao usar este padrão, você pode:

- Comece a executar todas as buscas de dados ao mesmo tempo, o que pode levar a ganhos de desempenho.
- Use um padrão JavaScript nativo que pode ser aplicado a qualquer biblioteca ou estrutura.

Entretanto, há uma desvantagem em confiar apenas neste padrão JavaScript: o que acontece se uma solicitação de dados for mais lenta que todas as outras?

## O que é renderização estática?

Sempre que um usuário visita seu aplicativo, o resultado em cache é servido. Há alguns benefícios da renderização estática:

- Sites **mais rápidos** - Conteúdo pré-renderizado pode ser armazenado em cache e distribuído globalmente. Isso garante que usuários ao redor do mundo possam acessar o conteúdo do seu site de forma mais rápida e confiável.
- **Carga reduzida do servidor** - Como o conteúdo é armazenado em cache, seu servidor não precisa gerar conteúdo dinamicamente para cada solicitação do usuário.
- **SEO** - Conteúdo pré-renderizado é mais fácil para rastreadores de mecanismos de busca indexarem, pois o conteúdo já está disponível quando a página carrega. Isso pode levar a classificações aprimoradas em mecanismos de busca.

A renderização estática é útil para UI sem dados ou dados compartilhados entre usuários , como uma postagem de blog estática ou uma página de produto. Pode não ser uma boa opção para um painel que tenha dados personalizados que sejam atualizados regularmente.

O oposto da renderização estática é a renderização dinâmica.

## O que é renderização dinâmica?

Com a renderização dinâmica, o conteúdo é renderizado no servidor para cada usuário no momento da solicitação (quando o usuário visita a página). Há alguns benefícios da renderização dinâmica:

- Dados em Tempo Real - A renderização dinâmica permite que seu aplicativo exiba dados em tempo real ou atualizados com frequência. Isso é ideal para aplicativos em que os dados mudam com frequência.
- Conteúdo específico do usuário - É mais fácil fornecer conteúdo personalizado, como painéis ou perfis de usuário, e atualizar os dados com base na interação do usuário.
- Informações sobre o tempo de solicitação - A renderização dinâmica permite que você acesse informações que só podem ser conhecidas no momento da solicitação, como cookies ou parâmetros de pesquisa de URL.

## O que é streaming?

Streaming é uma técnica de transferência de dados que permite dividir uma rota em "pedaços" menores e transmiti-los progressivamente do servidor para o cliente à medida que ficam prontos.

Ao fazer streaming, você pode evitar que solicitações lentas de dados bloqueiem sua página inteira. Isso permite que o usuário veja e interaja com partes da página sem esperar que todos os dados sejam carregados antes que qualquer UI possa ser mostrada ao usuário.

O streaming funciona bem com o modelo de componentes do React, pois cada componente pode ser considerado um bloco.

Há duas maneiras de implementar streaming no Next.js:

1. No nível da página, com o `loading.tsx` arquivo.
2. Para componentes específicos, com `<Suspense>`.

loading.tsx é um arquivo Next.js especial criado sobre o Suspense, que permite criar uma interface de usuário de fallback para ser exibida como uma substituição enquanto o conteúdo da página é carregado.

O usuário não precisa esperar a página terminar de carregar antes de navegar (isso é chamado de navegação interrompível).

### Adicionando esqueletos de carregamento

Um esqueleto de carregamento é uma versão simplificada da IU. Muitos sites os usam como um espaço reservado (ou fallback) para indicar aos usuários que o conteúdo está sendo carregado. Qualquer IU que você adicionar loading.tsxserá incorporada como parte do arquivo estático e enviada primeiro. Então, o restante do conteúdo dinâmico será transmitido do servidor para o cliente.

## Grupo de rotas

Os grupos de rotas permitem que você organize arquivos em grupos lógicos sem afetar a estrutura do caminho da URL. Quando você cria uma nova pasta usando parênteses (), o nome não será incluído no caminho da URL. Então `/dashboard/(overview)/page.tsx` se torna `/dashboard.`

Aqui, você está usando um grupo de rotas para garantir que loading.tsx se aplique somente à sua página de visão geral do painel. No entanto, você também pode usar grupos de rotas para separar seu aplicativo em seções (por exemplo, (marketing) rotas e (shop) rotas) ou por equipes para aplicativos maiores.

### Transmitindo um componente

Até agora, você está transmitindo uma página inteira. Mas você também pode ser mais granular e transmitir componentes específicos usando React Suspense.

O Suspense permite que você adie a renderização de partes do seu aplicativo até que alguma condição seja atendida (por exemplo, dados são carregados). Você pode encapsular seus componentes dinâmicos no Suspense. Então, passe a ele um componente fallback para mostrar enquanto o componente dinâmico carrega.

## Decidindo onde colocar os limites do Suspense

O local onde você coloca os limites do seu Suspense dependerá de algumas coisas:

1. Como você quer que o usuário experimente a página enquanto ela é transmitida.
2. Qual conteúdo você deseja priorizar.
3. Se os componentes dependem da busca de dados.

Dê uma olhada na sua página do painel. Há algo que você teria feito diferente?

Não se preocupe. Não há uma resposta certa.

- Você pode transmitir a página inteira como fizemos com loading.tsx..., mas isso pode levar a um tempo de carregamento maior se um dos componentes tiver uma busca de dados lenta.
- Você pode transmitir cada componente individualmente... mas isso pode fazer com que a interface do usuário apareça na tela quando estiver pronta.
- Você também pode criar um efeito escalonado por meio de streaming de seções de página . Mas você precisará criar componentes wrapper.

Onde você coloca seus limites de suspense irá variar dependendo do seu aplicativo. Em geral, é uma boa prática mover suas buscas de dados para os componentes que precisam delas e, então, encapsular esses componentes em Suspense. Mas não há nada de errado em transmitir as seções ou a página inteira se for isso que seu aplicativo precisa.

Não tenha medo de experimentar o Suspense e ver o que funciona melhor. É uma API poderosa que pode ajudar você a criar experiências de usuário mais agradáveis.

## Olhando para o futuro

Os componentes de streaming e servidor nos oferecem novas maneiras de lidar com a busca de dados e estados de carregamento, com o objetivo final de melhorar a experiência do usuário final.

## Pré-renderização parcial Partial Prerendering (PPR)

A pré-renderização parcial é um recurso experimental introduzido no Next.js 14.

### Rotas estáticas vs. dinâmicas

Para a maioria dos aplicativos web criados hoje, você escolhe entre renderização estática e dinâmica para todo o seu aplicativo ou para uma rota específica . E no Next.js, se você chamar uma função dinâmica em uma rota (como consultar seu banco de dados), a rota inteira se torna dinâmica.

No entanto, a maioria das rotas não são totalmente estáticas ou dinâmicas. Por exemplo, considere um site de comércio eletrônico. Talvez você queira renderizar estaticamente a maior parte da página de informações do produto, mas talvez queira buscar o carrinho do usuário e os produtos recomendados dinamicamente, o que permite que você mostre conteúdo personalizado aos seus usuários.

## O que é pré-renderização parcial?

O Next.js 14 introduziu uma versão experimental do Partial Prerendering – um novo modelo de renderização que permite combinar os benefícios da renderização estática e dinâmica na mesma rota.

Quando um usuário visita uma rota:

- Um shell de rota estática que inclui a barra de navegação e informações do produto é servido, garantindo um carregamento inicial rápido.
- O shell deixa buracos onde conteúdo dinâmico, como o carrinho e produtos recomendados, serão carregados de forma assíncrona.
- Os furos assíncronos são transmitidos em paralelo, reduzindo o tempo geral de carregamento da página.

## Como funciona a pré-renderização parcial?

Pré-renderização parcial usa o Suspense do React(que você aprendeu no capítulo anterior) para adiar a renderização de partes do seu aplicativo até que alguma condição seja atendida (por exemplo, os dados são carregados).

O fallback Suspense é incorporado ao arquivo HTML inicial junto com o conteúdo estático. No momento da construção (ou durante a revalidação), o conteúdo estático é pré-renderizado para criar um shell estático. A renderização do conteúdo dinâmico é adiada até que o usuário solicite a rota.

Envolver um componente em Suspense não torna o componente em si dinâmico, mas o Suspense é usado como um limite entre seu código estático e dinâmico.

É isso. Você pode não ver uma diferença em seu aplicativo em desenvolvimento, mas deve notar uma melhora de desempenho em produção. O Next.js pré-renderizará as partes estáticas de sua rota e adiará as partes dinâmicas até que o usuário as solicite.

A grande vantagem do Partial Prerendering é que você não precisa alterar seu código para usá-lo. Desde que você esteja usando o Suspense para encapsular as partes dinâmicas da sua rota, o Next.js saberá quais partes da sua rota são estáticas e quais são dinâmicas.

Acreditamos que o PPR tem o potencial de se tornar o modelo de renderização padrão para aplicativos da web, reunindo o melhor do site estático e da renderização dinâmica. No entanto, ainda é experimental. Esperamos estabilizá-lo no futuro e torná-lo a maneira padrão de construir com Next.js.

## Por que usar parâmetros de pesquisa de URL?

Conforme mencionado acima, você usará parâmetros de pesquisa de URL para gerenciar o estado da pesquisa. Esse padrão pode ser novo se você estiver acostumado a fazer isso com o estado do lado do cliente.

Há alguns benefícios em implementar a pesquisa com parâmetros de URL:

- URLs que podem ser marcadas e compartilhadas : como os parâmetros de pesquisa estão na URL, os usuários podem marcar o estado atual do aplicativo, incluindo suas consultas de pesquisa e filtros, para referência futura ou compartilhamento.
- Renderização do lado do servidor e carregamento inicial : os parâmetros de URL podem ser consumidos diretamente no servidor para renderizar o estado inicial, facilitando o manuseio da renderização do servidor.
- Análise e rastreamento : ter consultas de pesquisa e filtros diretamente na URL facilita o rastreamento do comportamento do usuário sem exigir lógica adicional do lado do cliente.

## Adicionando a funcionalidade de pesquisa

Estes são os ganchos do cliente Next.js que você usará para implementar a funcionalidade de pesquisa:

- **useSearchParams** - Permite que você acesse os parâmetros da URL atual. Por exemplo, os parâmetros de busca para esta URL `/dashboard/invoices?page=1&query=pending` ficariam assim: {page: '1', query: 'pending'}.
- **usePathname** - Permite que você leia o nome do caminho da URL atual. Por exemplo, para a rota `/dashboard/invoices`,
- **useRouter** - Habilita a navegação entre rotas dentro de componentes do cliente programaticamente. Há vários métodos que você pode usar.

### Quando usar o useSearchParams() gancho ou o searchParams suporte(prop)?

Você pode ter notado que usou duas maneiras diferentes de extrair parâmetros de pesquisa. Se você usa uma ou outra depende se está trabalhando no cliente ou no servidor.

- `<Search>` é um componente cliente, então você usou o useSearchParams() gancho para acessar os parâmetros do cliente.
- `<Table>` é um componente de servidor que busca seus próprios dados, para que você possa passar a searchParams propriedade da página para o componente.

Como regra geral, se você quiser ler os parâmetros do cliente, use o useSearchParams() hook, pois isso evita ter que voltar ao servidor.

## Melhor prática: Debouncing

Você está atualizando a URL a cada pressionamento de tecla e, portanto, consultando seu banco de dados a cada pressionamento de tecla! Isso não é um problema, pois nosso aplicativo é pequeno, mas imagine se seu aplicativo tivesse milhares de usuários, cada um enviando uma nova solicitação ao seu banco de dados a cada pressionamento de tecla.

Debouncing é uma prática de programação que limita a taxa na qual uma função pode disparar. No nosso caso, você só quer consultar o banco de dados quando o usuário tiver parado de digitar.

Como funciona o Debouncing:

- Evento de gatilho(trigger event): quando um evento que deve ser eliminado (como um pressionamento de tecla na caixa de pesquisa) ocorre, um cronômetro é iniciado.
- Aguardar(await): se um novo evento ocorrer antes que o cronômetro expire, o cronômetro será zerado.
- Execução(execution): Se o cronômetro atingir o fim da contagem regressiva, a função debounced será executada.

## Adicionando paginação

Adicionar paginação permite que os usuários naveguem pelas diferentes páginas para visualizar todas as faturas. Vamos ver como você pode implementar paginação usando parâmetros de URL, assim como você fez com a pesquisa.