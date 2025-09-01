from fastapi import FastAPI, HTTPException, Query
from models import Produto, ProdutoCreate, ProdutoUpdate, CATEGORIAS_VALIDAS
from datetime import datetime
from typing import List, Optional

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="CampusTrade API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000","https://happy-pond-052e5bf0f.2.azurestaticapps.net"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Base de dados temporária (em memória)
produtos_db = []
next_id = 1

@app.get("/")
def root():
    return {"message": "CampusTrade API - Marketplace Universitário"}

@app.get("/produtos", response_model=List[Produto])
def listar_produtos():
    return produtos_db

@app.post("/produtos", response_model=Produto)
def criar_produto(produto: ProdutoCreate):
    global next_id
    
    # Validar categoria
    if produto.categoria not in CATEGORIAS_VALIDAS:
        raise HTTPException(
            status_code=422, 
            detail=f"Categoria inválida. Use uma destas: {', '.join(CATEGORIAS_VALIDAS)}"
        )
    
    novo_produto = Produto(
        id=next_id,
        titulo=produto.titulo,
        descricao=produto.descricao,
        preco=produto.preco,
        categoria=produto.categoria,
        vendedor=produto.vendedor,
        data_criacao=datetime.now()
    )
    produtos_db.append(novo_produto)
    next_id += 1
    return novo_produto

@app.get("/produtos/{produto_id}", response_model=Produto)
def buscar_produto(produto_id: int):
    produto = next((p for p in produtos_db if p.id == produto_id), None)
    if not produto:
        raise HTTPException(status_code=404, detail="Produto não encontrado")
    return produto

@app.put("/produtos/{produto_id}", response_model=Produto)
def atualizar_produto(produto_id: int, produto_atualizado: ProdutoCreate):
    """Atualizar produto completo"""
    # Buscar produto existente
    produto_index = None
    for i, produto in enumerate(produtos_db):
        if produto.id == produto_id:
            produto_index = i
            break
    
    if produto_index is None:
        raise HTTPException(status_code=404, detail="Produto não encontrado")
    
    # Validar categoria
    if produto_atualizado.categoria not in CATEGORIAS_VALIDAS:
        raise HTTPException(
            status_code=422, 
            detail=f"Categoria inválida. Use uma destas: {', '.join(CATEGORIAS_VALIDAS)}"
        )
    
    # Atualizar produto mantendo ID e data de criação
    produto_original = produtos_db[produto_index]
    produto_novo = Produto(
        id=produto_original.id,
        titulo=produto_atualizado.titulo,
        descricao=produto_atualizado.descricao,
        preco=produto_atualizado.preco,
        categoria=produto_atualizado.categoria,
        vendedor=produto_atualizado.vendedor,
        data_criacao=produto_original.data_criacao
    )
    
    produtos_db[produto_index] = produto_novo
    return produto_novo

@app.delete("/produtos/{produto_id}")
def deletar_produto(produto_id: int):
    """Remover produto"""
    global produtos_db
    
    # Buscar produto
    produto_existe = False
    for i, produto in enumerate(produtos_db):
        if produto.id == produto_id:
            produtos_db.pop(i)
            produto_existe = True
            break
    
    if not produto_existe:
        raise HTTPException(status_code=404, detail="Produto não encontrado")
    
    return {"message": "Produto removido com sucesso"}

@app.get("/produtos/buscar", response_model=List[Produto])
def buscar_produtos(
    categoria: Optional[str] = Query(None, description="Filtrar por categoria"),
    termo: Optional[str] = Query(None, min_length=2, description="Buscar no título ou descrição"),
    preco_min: Optional[float] = Query(None, ge=0, description="Preço mínimo"),
    preco_max: Optional[float] = Query(None, ge=0, description="Preço máximo")
):
    """Buscar produtos com filtros"""
    resultados = produtos_db.copy()
    
    # Filtrar por categoria
    if categoria:
        if categoria not in CATEGORIAS_VALIDAS:
            raise HTTPException(
                status_code=422, 
                detail=f"Categoria inválida. Use uma destas: {', '.join(CATEGORIAS_VALIDAS)}"
            )
        resultados = [p for p in resultados if p.categoria == categoria]
    
    # Filtrar por termo de busca
    if termo:
        termo_lower = termo.lower()
        resultados = [
            p for p in resultados 
            if termo_lower in p.titulo.lower() or termo_lower in p.descricao.lower()
        ]
    
    # Filtrar por preço mínimo
    if preco_min is not None:
        resultados = [p for p in resultados if p.preco >= preco_min]
    
    # Filtrar por preço máximo
    if preco_max is not None:
        resultados = [p for p in resultados if p.preco <= preco_max]
    
    return resultados

@app.get("/categorias")
def listar_categorias():
    """Listar categorias disponíveis"""
    return {
        "categorias": CATEGORIAS_VALIDAS,
        "total": len(CATEGORIAS_VALIDAS)
    }

@app.get("/produtos/estatisticas")
def estatisticas_produtos():
    """Estatísticas simples dos produtos"""
    if not produtos_db:
        return {
            "total_produtos": 0,
            "preco_medio": 0,
            "categoria_mais_popular": None
        }
    
    # Calcular estatísticas
    total = len(produtos_db)
    preco_medio = sum(p.preco for p in produtos_db) / total
    
    # Categoria mais popular
    categorias_count = {}
    for produto in produtos_db:
        categorias_count[produto.categoria] = categorias_count.get(produto.categoria, 0) + 1
    
    categoria_popular = max(categorias_count, key=categorias_count.get) if categorias_count else None
    
    return {
        "total_produtos": total,
        "preco_medio": round(preco_medio, 2),
        "categoria_mais_popular": categoria_popular,
        "produtos_por_categoria": categorias_count
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
