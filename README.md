# Projeto de Pontos Turísticos

Este repositório contém o **Front-end** do teste prático. Embora o repositório principal seja para o Front-end, incluí instruções completas para configurar e rodar tanto o Front-end quanto a API (Back-end) para facilitar o teste e desenvolvimento.

---

## ⚙️ Tecnologias Utilizadas

### API (.NET 8)
O back-end é uma API RESTful desenvolvida em ASP.NET 8:
* **ASP.NET 8**
* **C#** (com Entity Framework Core para acesso a dados)
* **SQL Server**

### Front-end (React)
A interface de usuário é uma aplicação web construída com ReactJS:
* **ReactJS**
* **JavaScript**
* **HTML** e **CSS**
* **Bootstrap** (para estilização)
* **Axios** (para requisições HTTP)

---

## 🔧 Requisitos de Instalação

Para rodar este projeto, você precisará ter os seguintes softwares instalados em sua máquina:

* [.NET 8.0 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)
* **SQL Server** (instalado e configurado)
* [Node.js 18.8.0+](https://nodejs.org/) (já inclui o npm)
* **Git**

---

## 🚀 Como Rodar o Projeto

Siga os passos abaixo para configurar e executar tanto a API quanto o Front-end.

---

### 1. Rodando a API (.NET 8)

A API é o back-end que gerencia os dados dos pontos turísticos.

1.  **Clone o repositório da API:**
    Primeiro, clone o repositório da API em uma pasta de sua escolha:
    ```bash
    git clone https://github.com/ViniciusMendonca12/teste_sinqia_api.git
    ```

2.  **Acesse a pasta do projeto da API:**
    Navegue até o diretório do projeto da API:
    ```bash
    cd teste_sinqia_api
    ```

3.  **Restaure os pacotes do projeto:**
    Execute este comando para baixar todas as dependências do .NET:
    ```bash
    dotnet restore
    ```

4.  **Configure a string de conexão no `appsettings.json`:**
    Abra o arquivo `appsettings.json` na pasta da API e configure a string de conexão com seu SQL Server. Lembre-se de substituir `SEU_USUARIO` e `SUA_SENHA` pelas suas credenciais reais do banco de dados.

    ```json
    {
      "ConnectionStrings": {
        "DataBase": "Server=localhost;Database=PontoTuristico;User Id=SEU_USUARIO;Password=SUA_SENHA;"
      }
    }
    ```

5.  **(Opcional) Rode as migrations para criar as tabelas no banco de dados:**
   Execute as migrations para criar o esquema das tabelas:
    ```bash
    dotnet ef database update
    ```

6.  **Execute o projeto (com HTTPS):**
    Inicie a API. Verifique se ela esta rodando em `https://localhost:7057`. Essa é a porta que o React espera, se for diferente, altere o .env do projeto React.
    ```bash
    dotnet run
    ```
    Mantenha este terminal aberto enquanto estiver usando o Front-end.

---

### 2. Rodando o Front-end (React)

O Front-end é a interface de usuário que interage com a API.

1.  **Clone o repositório do Front-end:**
    Clone este repositório (o Front-end) em uma pasta separada:
    ```bash
    git clone https://github.com/ViniciusMendonca12/teste-sinqia-frontend.git
    ```

2.  **Acesse a pasta do projeto do Front-end:**
    Navegue até o diretório do projeto do Front-end:
    ```bash
    cd teste-sinqia-frontend
    ```

3.  **Instale as dependências do projeto:**
    Instale todas as dependências do Node.js:
    ```bash
    npm install
    ```

4.  **(Opcional) Configure a URL da API caso necessário:**
    Verifique no arquivo `.env` uma constante no código chamada "REACT_APP_API_URL". Se a porta da sua API for diferente desse ENV, atualize esta URL para o endereço correto onde sua API está rodando.

5.  **Inicie o servidor de desenvolvimento:**
    Execute este comando para iniciar a aplicação React:
    ```bash
    npm run start
    ```
    A aplicação será aberta automaticamente em seu navegador, geralmente em `http://localhost:3000`.

---

## 📌 Observações Importantes

* **API Primeiro:** Certifique-se de que a **API esteja rodando** antes de iniciar o Front-end, para que o Front-end possa consumir os dados corretamente.
* **Endpoint da API:** Se você alterou a URL da API, não se esqueça de **atualizar o endpoint correspondente no código do Front-end** para garantir a comunicação entre as duas partes do sistema.
* **Configuração do SQL Server:** Garanta que seu **SQL Server esteja rodando** e que as credenciais e a string de conexão no `appsettings.json` da API estejam corretas para evitar erros de conexão com o banco de dados.

---
