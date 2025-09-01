
const KEY = 'process_data'

data = [
    {id: 1, name: "Process 1", totalStages: 3, currentStage: 1},
    {id: 2, name: "Process 2", totalStages: 3, currentStage: 1}
]

// funcao para pegar os dados do LocalStorage
function read() {
    try {
        const storedData = localStorage.getItem(KEY)
        return storedData ? JSON.parse(storedData) : null
    } catch (error) {
        console.error("Erro ao ler os dados do LocalStorage:", error)
        return null
    }
}

// funcao para escrever o dado no localStorage
function write(data) {
    try {
        localStorage.setItem(KEY, JSON.stringify(data))
    } catch (error) {
        console.error("Erro ao escrever os dados no LocalStorage:", error)
    }
}

// funcao para inicializar os dados no LocalStorage
function init() {
    const dataAtual = read()
    if (!dataAtual) {
        write(data)
    }
}
