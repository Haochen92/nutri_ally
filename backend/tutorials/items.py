from fastapi import APIRouter

router = APIRouter()

@router.get("/items/", tags=["items"])
async def get_items(item: str):
    return {"message", item }


@router.get("/goods/", tags=["items"])
async def get_items(good: str):
    return {"message", good }
