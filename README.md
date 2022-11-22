# Projeto de teste Angular

## Preparação de ambiente de desenvolvimento

### Instalação do node
- 1º opção: Baixar o node e realizar a instalação da versão corrente
- 2º opção: Baixar o nvm (Gerenciador de node) em "https://github.com/coreybutler/nvm-windows/releases", depois executar no pront de comando `nvm install 14.17.0`. Assim a versão do node será a homologada em desenvolvimento.

### Instalação do Visual Studio Code
- Link: https://code.visualstudio.com/download
- Para trabalhar no código basta abrir a pasta do projeto no Visual Studio Code

## Executando projeto
- Baixar projeto em uma pasta
- Abrir pronpt de comando e entrar a pasta do projeto
- Executar comando `npx ng serve` para executar projeto subindo na porta 4200 ou `npx ng serve --port 4201` para alterar a porta

### Executando testes automatizados
- Executar comando `npx ng test`

### Executando cobertura de testes automatizados
- Executar comando `npx ng test --no-watch --code-coverage`

### Executando padronização de código
- Executar comando `npx ng lint`

## Build 
- Executar comando `ng build`
