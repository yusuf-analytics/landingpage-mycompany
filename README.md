# Verqoz AI - Landing Page & Dashboard

This is the primary repository for the Verqoz AI website. The project consists of two separate components that must run simultaneously for the AI Chatbot to work:

## 1. Menjalankan Website (Frontend)
Bagian depan website dibangun menggunakan **Next.js**.

1. Buka Terminal / CMD baru.
2. Pastikan berada di folder `c:\Coding\Landing Page`.
3. Jalankan perintah ini:
```bash
npm run dev
```
4. Buka `http://localhost:3000` di Google Chrome.

## 2. Menjalankan AI Server (Backend)
Bagian otak AI *Chatbot* dibangun menggunakan **Python (FastAPI)** yang terletak di dalam folder `python_backend`.

1. Buka Terminal / CMD **kedua** (biarkan layar terminal pertama tadi tetap berjalan).
2. Masuk ke folder backend dengan perintah:
```bash
cd python_backend
```
3. Nyalakan server AI dengan perintah ini:
```bash
python -m uvicorn main:app --reload
```
4. Biarkan terminal ini menyala agar robot AI di web bisa membalas pesan.

---
**Catatan Penting:** 
Kedua terminal (Terminal 1 untuk web, Terminal 2 untuk AI) harus selalu dalam keadaan menyala bersamaan. Jika salah satu di-*close* (X), website mungkin tidak bisa dibuka atau chatbot AI akan berhenti merespons.
