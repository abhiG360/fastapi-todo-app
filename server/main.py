from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List
from models import SessionLocal, ToDoItemDB  # Import the models
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS settings
origins = ["http://localhost:5173", "https://tadaa-abhimanyu.netlify.app"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class ToDoItemCreate(BaseModel):
    title: str
    description: str = None
    completed: bool = False

class ToDoItem(BaseModel):
    id: int
    title: str
    description: str = None
    completed: bool = False

    class Config:
        orm_mode = True

# Dependency for DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Endpoint to create a todo item
@app.post("/todos/", response_model=ToDoItem)
async def create_todo_item(todo_item: ToDoItemCreate, db: Session = Depends(get_db)):
    # Create a new todo item
    db_item = ToDoItemDB(**todo_item.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)

    return db_item

# Endpoint to get all todo items
@app.get("/todos/", response_model=List[ToDoItem])
async def read_todo_items(db: Session = Depends(get_db)):
    # Fetch all todos
    todos = db.query(ToDoItemDB).all()
    return todos

# Endpoint to read a specific todo item
@app.get("/todos/{item_id}", response_model=ToDoItem)
async def read_todo_item(item_id: int, db: Session = Depends(get_db)):
    # Fetch the todo item by ID
    item = db.query(ToDoItemDB).filter(ToDoItemDB.id == item_id).first()
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")

    return item

# Endpoint to update a todo item
@app.put("/todos/{item_id}", response_model=ToDoItem)
async def update_todo_item(item_id: int, todo_item: ToDoItem, db: Session = Depends(get_db)):
    # Fetch and update the todo item
    item = db.query(ToDoItemDB).filter(ToDoItemDB.id == item_id).first()
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")

    for key, value in todo_item.dict().items():
        setattr(item, key, value)

    db.commit()
    db.refresh(item)
    return item

# Endpoint to delete a todo item
@app.delete("/todos/{item_id}")
async def delete_todo_item(item_id: int, db: Session = Depends(get_db)):
    # Fetch and delete the todo item
    item = db.query(ToDoItemDB).filter(ToDoItemDB.id == item_id).first()
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")

    db.delete(item)
    db.commit()
    return {"message": "Item deleted"}
