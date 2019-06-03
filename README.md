Esse projeto foi criado a partir do [Create React App](https://github.com/facebook/create-react-app).

## Scripts Disponíveis

No diretório do projeto, você pode rodar:

### `npm start`

Executa o aplicativo no modo de desenvolvimento.<br>
Abra [http://localhost:3000](http://localhost:3000) para visualizá-lo no navegador.

A página será recarregada se você fizer edições.<br>
Você também verá quaisquer erros de lint no console.

### `npm test`

Inicia a execução dos testes em tempo real

### `npm run build`

Cria o aplicativo para produção na pasta `build`<br>
Ele agrupa corretamente o React no modo de produção e otimiza o build para obter o melhor desempenho.

## Recursos ES6+ utilizados

### Template String  
Strings que permitem embutir expressões. Com elas, a concatenação de variáveis fica muito mais legível. Utilizei bastante para montar as URLs da API do Github

```js
`https://api.github.com/users/${foo}/repos`
```

### Async / Awai
Trabalhar com funções assíncronas com async/await deixam o código muito mais organizando, evitando o encadeamento de callbacks, dando muito mais flexibilidade de manipulação de dados retornados dessas funções.

```js
const responseRepositories = await fetch(`https://api.github.com/users/${state.userName}/repos`);
const responseRepositoriesJSON = await responseRepositories.json();

console.log(responseRepositoriesJSON) // => {data: {foo: 'test', baa: 'test'}}
```

### Arrow Functions
Uma maneira mais resumida de escrita de funções, permitindo criar soluções em apenas uma linha.

```js
onKeyUp={(target) => filterCommits(target)}
```


## Sobre testes
Não possuo familiaridade com a escrita de testes. Escrevi apenas os testes de renderização de componente que o próprio create-react-app já disponibiliza.