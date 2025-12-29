from sqlmodel import Field, SQLModel, create_engine, select

class UserData(SQLModel, table=True):
    name: str | None = Field(default=None, primary_key=True)
    password: str 
    refresh_token: str | None 
    
sqlite_fpath = "database.db"
sqlite_url = f"sqlite:///{sqlite_fpath}"
engine = create_engine(sqlite_url, echo=True)
SQLModel.metadata.create_all(engine)

