# Teste da Empresa Company Hero

Trata-se de um catálogo de animes com ordenação e utiliza dados da API pública [Kitsu](https://kitsu.docs.apiary.io/#).
Este teste faz uso de tecnologias, como:
- ReactJs
- NextJs
- Ant.Design
- LESS CSS
- Deploy utilizando Vercel

<h4 align="center">
	<a href="https://teste-company-hero.vercel.app/">Demo</a>
</h4>

## ⚙️ Como utilizar (dev)

```
yarn
yarn next
```


## 💻 Abordagem do teste

- Primeiramente utilizei um boilerplate de NextJs com Antd e Less já que não achei suporte nativo, depois
fiz a busca dos dados para saber se estava tudo ok com a API pública e ao receber os dados normalmente
eu os mapeei para que fossem mostrados em listagem, essa foi a primeira grande etapa.
- Depois fiz a página de item específico mandando os dados para ela, pela minha falta de experiência com o Next,
demorei um pouco para saber o esquema de pastas, mas consegui implementar e conseguir os dados específicos.
- Depois resolvi criar uma página inicial com um carrocel, pois achei que ficaria melhor e mais bonito.
- Com a página inicial desenvolvida resolvi implementar o contexto para tornar a navbar compartilhada,
desta forma tive que reformular a busca implementada inicialmente.
- Depois reparei que a API retornava mais resultados do que os que eu estava mostrando, então implementei os botões de Próximo e Anterior, ou seja, implementei a paginação na página de buscas. Da mesma forma, implementei o caso onde não há resultados para a busca.

## Autor

<a href="https://github.com/feliperucunha">
 <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/51034888?s=400&u=d957f24c0607b08051d57bd562e17db9cf811421&v=4" width="100px;" alt=""/>
 <br />
 <sub><b>Felipe Cunha</b></sub></a>
 <br />

---

## 📝 Licença

Este projeto esta sobe a licença [MIT](./LICENSE).

Feito por Felipe Cunha 👋 [Entre em contato!](https://www.linkedin.com/in/feliperubencunha/)
