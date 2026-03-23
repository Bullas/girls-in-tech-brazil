<div align="center">

<img src="https://img.shields.io/badge/Girls_in_Tech-Brazil-8b5cf6?style=for-the-badge&labelColor=1a1a2e" alt="Girls in Tech Brazil" />

<h1>Girls in Tech Brazil 🇧🇷</h1>

<p><strong>Descubra quem está construindo o futuro tech no Brasil.</strong></p>

<p>Vitrine curada de criadoras brasileiras de conteúdos técnicos sobre tecnologia —<br/>com perfis editoriais, filtros por categoria, busca e página de descoberta animada.</p>
<p>🌐 <strong><a href="https://bullas.github.io/girls-in-tech-brazil/">bullas.github.io/girls-in-tech-brazil</a></strong> — site publicado</p>

<!-- Tecnologias -->
<p>
  <img src="https://img.shields.io/badge/Next.js_15-000000?style=flat-square&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript_5-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/Zod_4-3E67B1?style=flat-square&logo=zod&logoColor=white" alt="Zod" />
  <img src="https://img.shields.io/badge/Node.js_22-339933?style=flat-square&logo=nodedotjs&logoColor=white" alt="Node.js" />
</p>

<!-- Status -->
<p>
  <img src="https://github.com/bullas/girls-in-tech-brazil/actions/workflows/ci.yml/badge.svg" alt="CI" />
  <img src="https://github.com/bullas/girls-in-tech-brazil/actions/workflows/deploy-pages.yml/badge.svg" alt="Deploy Workflow" />
  <img src="https://img.shields.io/badge/deploy-GitHub_Pages-222222?style=flat-square&logo=githubpages&logoColor=white" alt="Deploy" />
  <img src="https://img.shields.io/badge/páginas_estáticas-27-8b5cf6?style=flat-square" alt="27 páginas" />
  <img src="https://img.shields.io/badge/criadoras-23-f43f5e?style=flat-square" alt="23 criadoras" />
  <img src="https://img.shields.io/badge/PRs-bem--vindos-f59e0b?style=flat-square" alt="PRs welcome" />
</p>

</div>

---

## ✨ Sobre o projeto

O **Girls in Tech Brazil** amplifica vozes femininas na tecnologia brasileira. Qualquer pessoa pode contribuir adicionando ou atualizando perfis via Pull Request — sem banco de dados, sem backend, tudo em arquivos JSON validados.

| Info | O que foi feito |
|---|---|
| 🗺️ **5 rotas estáticas** | geradas com Next.js App Router |
| 🎨 **Design system Pulso BR Tech** | paleta violeta / rosa / dourado, fonte Outfit |
| 🎬 **Framer Motion** | parallax, tilt 3D, contadores animados, scroll reveals |
| 🚀 **GitHub Pages** | deploy estático, sem servidor |

---

## 🚀 Início rápido

**Pré-requisitos:** Node.js >= 22 e npm >= 10

```bash
# 1. Clone o repositório
git clone https://github.com/bullas/girls-in-tech-brazil.git
cd girls-in-tech-brazil

# 2. Instale as dependências
npm install

# 3. Suba o ambiente local
npm run dev
```

Aplicação disponível em `http://localhost:3000`

---

## 🗂️ Rotas

| Rota | Descrição |
|---|---|
| `/` | Homepage com hero, métricas e destaque de criadoras |
| `/criadoras` | Listagem completa com busca e filtros por categoria |
| `/criadoras/[slug]` | Perfil individual da criadora |
| `/sobre` | Sobre o projeto |
| `/contribuir` | Como contribuir |

---

## 🛠️ Scripts

```bash
npm run dev          # sobe o ambiente local
npm run build        # gera o build estático para produção
npm run validate     # valida todos os perfis em src/data/creators/
npm run validate:ci  # valida o dataset no modo CI (sem output interativo)
npm run lint         # executa o lint
npm run type-check   # verifica tipagem sem emitir arquivos
npm run format       # formata os arquivos com Prettier
```

---

## 🚀 Deploy

O deploy é automático via GitHub Actions. Todo merge na `main` publica o site no GitHub Pages em menos de 5 minutos.

- **Workflow de CI:** `.github/workflows/ci.yml` (roda em todo PR para `main`)
- **Workflow de Deploy:** `.github/workflows/deploy-pages.yml` (roda em todo merge/push para `main`)
- **URL publicada:** `https://bullas.github.io/girls-in-tech-brazil/`

> Maintainers: além dos workflows versionados, o repositório oficial precisa de setup em
> `Settings -> Pages` (Source: GitHub Actions) e branch protection da `main`.

---

## 📁 Estrutura de diretórios

```text
src/
  app/             # rotas do App Router (Next.js)
  components/      # 16 componentes React reutilizáveis
  data/creators/   # perfis em JSON — fonte de verdade
  lib/             # utilitários de dados, animação e hooks
  schemas/         # schema Zod do perfil de criadora
  styles/          # CSS global e tokens do design system
public/
  images/creators/ # avatares locais (opcional)
scripts/
  validate-data.ts # validação do dataset via Zod
```

---

## ➕ Como adicionar uma criadora de conteúdo

Conhece uma mulher incrível na tech brasileira que deveria estar aqui? O processo é simples:

**1. Faça um fork e clone o repositório**

```bash
git clone https://github.com/<seu-usuario>/girls-in-tech-brazil.git
cd girls-in-tech-brazil
git checkout -b add/nome-da-criadora
```

**2. Crie o arquivo de perfil**

Copie o template e renomeie com o slug da criadora:

```bash
cp src/data/creators/_example.json src/data/creators/nome-da-criadora.json
```

**3. Preencha o perfil**

```jsonc
{
  "slug": "nome-da-criadora",        // kebab-case, único no dataset
  "name": "Nome Público",
  "headline": "Frase curta de até 80 caracteres",
  "bio": "Biografia entre 50 e 500 caracteres.",
  "region": "SP",                    // sigla de UF (opcional)
  "categories": ["Frontend"],        // veja categorias disponíveis abaixo
  "tags": ["JavaScript", "React"],   // até 8 tags (opcional)
  "links": {
    "youtube": "https://youtube.com/@...",
    "github":  "https://github.com/...",
    "linkedin": "https://linkedin.com/in/..."
  },
  "avatar": "https://...",           // URL HTTPS ou /images/creators/... (opcional)
  "featured": false
}
```

<details>
<summary>📋 Categorias disponíveis</summary>

`Frontend` · `Backend` · `Full Stack` · `Mobile` · `Data` · `AI` · `Cloud` · `DevOps` · `Security` · `UX/UI` · `Career` · `Community` · `Open Source` · `Education` · `Product` · `Engineering Leadership`

</details>

**4. Valide e abra o PR**

```bash
npm install
npm run validate   # valida o JSON contra o schema Zod
npm run lint
npm run type-check
npm run build
```

Se tudo passar, faça push e abra um Pull Request usando o template do projeto. O CI vai revalidar automaticamente.

> Guia completo com todas as regras dos campos em [CONTRIBUTING.md](CONTRIBUTING.md).

---

## 🤝 Contribuindo com código

Encontrou um bug ou quer melhorar a plataforma? Abra uma issue ou um PR.

Antes de submeter, rode localmente:

```bash
npm run validate && npm run lint && npm run type-check && npm run build
```

> O histórico original da comunidade está preservado em [`README-legacy.md`](README-legacy.md).
