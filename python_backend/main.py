import os
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from langchain_community.document_loaders import TextLoader
from langchain_community.vectorstores import FAISS
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_core.runnables import RunnablePassthrough
from langchain_core.prompts import MessagesPlaceholder
from langchain_community.chat_message_histories import RedisChatMessageHistory
from langchain_core.chat_history import InMemoryChatMessageHistory
from langchain_core.runnables.history import RunnableWithMessageHistory
import redis

# Load environment variables
load_dotenv()

# Global variables to hold our LangChain objects
rag_chain = None
rag_error = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    global rag_chain, rag_error
    print("Loading RAG Pipeline...")

    try:
        llm = ChatGroq(model="llama-3.3-70b-versatile")
        
        system_prompt = """Kamu adalah "Verqoz AI", asisten virtual pintar dan representatif sales eksklusif dari Verqoz.
Berbicaralah dengan pengguna secara sopan, ramah, dan profesional menggunakan bahasa Indonesia.
Gunakan **konteks berikut** sebagai satu-satunya dasar pengetahuan layanan dan aturan harga Verqoz:
{context}

ATURAN WAJIB (System Guardrails):
1. **Sapaan & Ngobrol Biasa (Chit-Chat):** Jika pengguna hanya menyapa (misal: "Halo", "Selamat Pagi") atau sekadar ngobrol, JANGAN langsung berjualan atau membeberkan daftar produk. Cukup balas sapaan dengan hangat dan tanyakan bagaimana kamu bisa membantu bisnis mereka.
2. **Pertanyaan Spesifik:** Jika pengguna bertanya satu solusi spesifik (misal: "bisa bikin landing page?"), HANYA jelaskan paket yang relevan (Web Bisnis Cerdas). JANGAN menyebutkan AI Customer Service atau Custom Enterprise jika tidak diminta.
3. **Di Luar Konteks (Out-of-Scope IT Services):** Jika pengguna menanyakan produk IT yang TIDAK ADA di konteks (misal aplikasi mobile, desain logo, jaringan server fisik):
   - Jawab jujur bahwa Verqoz tidak menyediakan layanan tersebut.
   - JANGAN MENGARANG NAMA PAKET ATAU HARGA.
   - Segera **berikan rekomendasi** paket Verqoz lain yang paling relevan (misal sarankan Web Mobile-Responsive atau Custom Enterprise) sebagai alternatif.
4. **Pertanyaan Sama Sekali Di Luar Topik (Strictly Business Only):** Jika pengguna bertanya tentang hal-hal umum yang TIDAK berhubungan dengan IT atau Verqoz (misal: "apa itu pancasila", "siapa presiden indonesia", soal matematika, sejarah, dll):
   - **TOLAK DENGAN TEGAS DAN SOPAN**. JANGAN PERNAH memberikan jawaban, penjelasan, atau definisi apa pun terkait pertanyaan di luar topik tersebut.
   - Cukup beritahu bahwa kamu adalah asisten bisnis Verqoz dan hanya dapat menjawab pertanyaan terkait layanan kami, lalu arahkan kembali ke penawaran kita.
5. **Permintaan Seluruh Layanan:** HANYA sebutkan keempat layanan secara singkat jika pengguna secara eksplisit bertanya "ada layanan apa saja?" atau "apa daftar paketnya?".
6. **Gaya Bahasa & Tampilan Berbalas (Formatting):** 
   - Gunakan format teks yang sangat rapi dan *eye-catching*.
   - **Penting:** Jawaban TIDAK BOLEH TERLALU PANJANG dan TIDAK BOLEH TERLALU PENDEK. Berikan penjelasan yang langsung pada intinya (maksimal 2-3 paragraf pendek) agar klien merasa puas tanpa perlu membaca teks yang bertele-tele.
   - Saat membuat daftar layanan, gunakan **TULISAN TEBAL (Bold)** untuk nama layanan, diikuti titik dua (:), lalu penjelasannya. JANGAN PERNAH gunakan tanda pisah/strip panjang (—).
   - Pastikan ada jarak spasi antar baris (*line break*) agar setiap produk pada list mudah dibaca dan tidak menumpuk.
   - Saat memberikan informasi kontak secara list atau paragraf, pastikan SELALU menjadi **Hyperlink Markdown yang bisa diklik**. Contoh: `[Email Kami](mailto:email@...com)` atau `[WhatsApp Consultant](https://wa.me/...)`
7. Selalu panggil pengguna dengan sebutan "kak" dan arahkan ke Konsultasi Gratis untuk negosiasi atau info lebih lanjut."""

        prompt = ChatPromptTemplate.from_messages([
            ("system", system_prompt),
            MessagesPlaceholder(variable_name="history"),
            ("human", "{question}"),
        ])

        # Build an absolute path to document.txt to prevent "file not found" errors in production
        current_dir = os.path.dirname(os.path.abspath(__file__))
        doc_path = os.path.join(current_dir, "document.txt")
        
        loader = TextLoader(doc_path, encoding="utf-8")
        documents = loader.load()

        from langchain_community.retrievers import TFIDFRetriever
        
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=1500, chunk_overlap=200)
        docs = text_splitter.split_documents(documents)
        
        retriever = TFIDFRetriever.from_documents(docs)
        retriever.k = 5

        base_chain = (
            RunnablePassthrough.assign(context=lambda x: retriever.invoke(x["question"]))
            | prompt
            | llm
        )

        memory_store = {}

        def get_message_history(session_id: str):
            redis_url = os.environ.get("REDIS_URL", "redis://localhost:6379")
            try:
                # Fast ping to check if Redis is alive
                client = redis.Redis.from_url(redis_url, socket_timeout=1)
                client.ping()
                return RedisChatMessageHistory(session_id, url=redis_url)
            except Exception as e:
                print(f"Redis offline for {session_id}, falling back to memory. Error: {e}")
                if session_id not in memory_store:
                    memory_store[session_id] = InMemoryChatMessageHistory()
                return memory_store[session_id]

        rag_chain = RunnableWithMessageHistory(
            base_chain,
            get_message_history,
            input_messages_key="question",
            history_messages_key="history",
        )
        print("RAG Pipeline Loaded Successfully.")
        rag_error = None
    except Exception as e:
        print(f"Error loading RAG Pipeline: {e}")
        rag_error = str(e)
        
    yield
    print("Shutting down...")

app = FastAPI(lifespan=lifespan)

# Allow CORS so Next.js frontend can communicate with FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    session_id: str
    message: str

class ChatResponse(BaseModel):
    reply: str

@app.post("/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    if not rag_chain:
        error_msg = f"Sistem AI sedang offline. Detail Error: {rag_error}" if rag_error else "Maaf, sistem AI sedang offline atau gagal memuat data."
        return ChatResponse(reply=error_msg)
    
    try:
        response = rag_chain.invoke(
            {"question": request.message},
            config={"configurable": {"session_id": request.session_id}}
        )
        return ChatResponse(reply=response.content)
    except Exception as e:
        return ChatResponse(reply=f"Terjadi kesalahan saat memproses permintaan: {str(e)}")

@app.get("/")
def read_root():
    return {"status": "Verqoz AI Backend is running"}
