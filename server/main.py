# app.py
from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List
from models import SessionLocal, ToDoItemDB  # Import the models

app = FastAPI()

class ToDoItem(BaseModel):
    id: int
    title: str
    description: str = None
    completed: bool = False

# Dependency to get the SQLAlchemy session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/todos/", response_model=ToDoItem)
async def create_todo_item(todo_item: ToDoItem, db: Session = Depends(get_db)):
    db_item = db.query(ToDoItemDB).filter(ToDoItemDB.id == todo_item.id).first()
    if db_item:
        raise HTTPException(status_code=400, detail="Item with this ID already exists")

    db_item = ToDoItemDB(**todo_item.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@app.get("/todos/", response_model=List[ToDoItem])
async def read_todo_items(db: Session = Depends(get_db)):
    return db.query(ToDoItemDB).all()

@app.get("/todos/{item_id}", response_model=ToDoItem)
async def read_todo_item(item_id: int, db: Session = Depends(get_db)):
    item = db.query(ToDoItemDB).filter(ToDoItemDB.id == item_id).first()
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return item

@app.put("/todos/{item_id}", response_model=ToDoItem)
async def update_todo_item(item_id: int, todo_item: ToDoItem, db: Session = Depends(get_db)):
    item = db.query(ToDoItemDB).filter(ToDoItemDB.id == item_id).first()
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")

    for key, value in todo_item.dict().items():
        setattr(item, key, value)

    db.commit()
    db.refresh(item)
    return item

@app.delete("/todos/{item_id}")
async def delete_todo_item(item_id: int, db: Session = Depends(get_db)):
    item = db.query(ToDoItemDB).filter(ToDoItemDB.id == item_id).first()
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")

    db.delete(item)
    db.commit()
    return {"message": "Item deleted"}
