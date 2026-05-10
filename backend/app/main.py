from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from contextlib import asynccontextmanager
from app.database import engine, Base
from app.api import auth_router, book_router, video_router, tag_router, audio_router
from app import settings
from fastapi.middleware.cors import CORSMiddleware
import os
from pathlib import Path

FRONTEND_DIST = Path(__file__).resolve().parent.parent.parent / "frontend" / "dist"

print(f"Looking for frontend at: {FRONTEND_DIST}")
print(f"Exists: {FRONTEND_DIST.exists()}")

@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    settings.UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
    settings.COVER_DIR.mkdir(parents=True, exist_ok=True)
    from app.database import SessionLocal
    from app.models.role import Role
    db = SessionLocal()
    try:
        for name in ["admin", "teacher", "student"]:
            if not db.query(Role).filter(Role.name == name).first():
                db.add(Role(name=name))
        db.commit()
    finally:
        db.close()
    yield
    engine.dispose()

app = FastAPI(title="Jirani Offline Library Backend", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

os.makedirs(settings.UPLOAD_DIR / "covers", exist_ok=True)
app.mount("/static/covers", StaticFiles(directory=str(settings.COVER_DIR)), name="covers")

app.include_router(auth_router.router)
app.include_router(book_router.router)
app.include_router(video_router.router)
app.include_router(tag_router.router)
app.include_router(audio_router.router)

if FRONTEND_DIST.exists():
    app.mount("/assets", StaticFiles(directory=str(FRONTEND_DIST / "assets")), name="assets")

    @app.get("/{full_path:path}")
    async def serve_react(full_path: str):
        file = FRONTEND_DIST / full_path
        if file.exists() and file.is_file():
            return FileResponse(file)
        return FileResponse(FRONTEND_DIST / "index.html")
else:
    print(f"WARNING: Frontend not found at {FRONTEND_DIST}")