# hetbsg.nl

Website with simple content management system for Wageningen student association **Het Brabants Studenten Gilde van Onze Lieve Vrouw (BSG)**. Built with **SvelteKit** (Svelte 5), **Tailwind CSS v4 / DaisyUI**, and **PocketBase**.

## Features

- **Public website (`/`)**:
  - Association overview and history pages
  - Password-protected photo album portal (`/fotos`).
  - Card game competition standings, rules, and hall of fame for _Rikken_ and _Stiefelen_ (`/competities`).
- **Admin panel (`/admin`)**:
  - Manage general settings (board contacts, member/committee counts, mailing list URL, photo album password) and downloadable PDFs/files (committee list, _Rikken_ rules & standings).
  - Create and delete boards, example committees, activities, photo album links, merchandise products, _Landdagen_ tiles, chapels, and competition winners.

## Prerequisites

- **Node.js** 20+
- **PocketBase**

## Local Setup

1. **Install dependencies:**

   ```bash
   npm install
   ```
