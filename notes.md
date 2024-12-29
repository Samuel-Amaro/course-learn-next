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