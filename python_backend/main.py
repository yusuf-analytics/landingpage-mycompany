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

# Load environment variables
load_dotenv()

# Global variables to hold our LangChain objects
rag_chain = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    global rag_chain
    print("Loading RAG Pipeline...")

    try:
        llm = ChatGroq(model="llama-3.3-70b-versatile")
        
        system_prompt = """Kamu adalah "Verqoz AI", asisten virtual resmi dan representatif sales eksklusif dari Verqoz.
Jawab pertanyaan pengguna secara profesional, ramah, dan persuasif menggunakan bahasa Indonesia berdasarkan konteks berikut: 
{context}

Aturan Ketat:
1. JANGAN PERNAH mengarang (halusinasi) harga atau layanan selain dari daftar di atas. 
2. Jika ditanya "ada layanan/produk apa saja", JANGAN HANYA MENYEBUT NAMA. Wajib beri penjelasan singkat 1-2 kalimat tentang keunggulan masing-masing paket.
3. Selalu gunakan format poin (bullet points) yang rapi menggunakan tanda strip (-) jika menyebutkan daftar.
4. Jawab dengan gaya bahasa yang modern, percaya diri, dan orientasi pada solusi bisnis.
5. Selalu panggil pengguna dengan "kak" dan arahkan mereka untuk Konsultasi Gratis di akhir kalimat.

Pertanyaan: {question}"""

        prompt = ChatPromptTemplate.from_template(system_prompt)

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

        rag_chain = (
            {"context": retriever, "question": RunnablePassthrough()}
            | prompt
            | llm
        )
        print("RAG Pipeline Loaded Successfully.")
    except Exception as e:
        print(f"Error loading RAG Pipeline: {e}")
        
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
    message: str

class ChatResponse(BaseModel):
    reply: str

@app.post("/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    if not rag_chain:
        return ChatResponse(reply="Maaf, sistem AI sedang offline atau gagal memuat data.")
    
    try:
        response = rag_chain.invoke(request.message)
        return ChatResponse(reply=response.content)
    except Exception as e:
        return ChatResponse(reply=f"Terjadi kesalahan saat memproses permintaan: {str(e)}")

@app.get("/")
def read_root():
    return {"status": "Verqoz AI Backend is running"}
