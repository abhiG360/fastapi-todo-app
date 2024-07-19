from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List

app = FastAPI()

class ToDoItem(BaseModel):
    id: int
    title: str
    description: str = None
    completed: bool = False

todo_list = []

@app.post("/todos/", response_model=ToDoItem)
async def create_todo_item(todo_item: ToDoItem):
    for item in todo_list:
        if item.id == todo_item.id:
            raise HTTPException(status_code=400, detail="Item with this ID already exists")
    
    todo_list.append(todo_item)
    return todo_item

@app.get("/todos/", response_model=List[ToDoItem])
async def read_todo_items():
    return todo_list

@app.get("/todos/{item_id}", response_model=ToDoItem)
async def read_todo_item(item_id: int):
    for item in todo_list:
        if item.id == item_id:
            return item
    raise HTTPException(status_code=404, detail="Item not found")

@app.put("/todos/{item_id}", response_model=ToDoItem)
async def update_todo_item(item_id: int, todo_item: ToDoItem):
    for index, item in enumerate(todo_list):
        if item.id == item_id:
            todo_list[index] = todo_item
            return todo_item
    raise HTTPException(status_code=404, detail="Item not found")

@app.delete("/todos/{item_id}")
async def delete_todo_item(item_id: int):
    for index, item in enumerate(todo_list):
        if item.id == item_id:
            del todo_list[index]
            return {"message": "Item deleted"}
    raise HTTPException(status_code=404, detail="Item not found")
