const form = document.getElementById("novoItem")   //Informaçoes no form passadas pelo usuário
const lista = document.getElementById("lista")   //Lista no HTML que tem os itens
const itens = JSON.parse(localStorage.getItem("itens")) || []   //Lista dos elementos LS (caso houver) || (ou) lista vazia

itens.forEach( (elemento) => {
    criaElemento(elemento)
});
//Passa pela array itens e o elemento da vez vira parâmetro de criaElemento()

form.addEventListener("submit", (evento) => {
    evento.preventDefault()   //Impede o comportamento padrão

    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']
    //Cria uma constante com os inputs nomes e quantidade 

    const existe = itens.find( elemento => elemento.nome === nome.value)
    //O elemento são todos os objetos da array itens existentes até o momento
    //O .find verifica se existe algum elemento com o mesmo nome. Caso exista, ele guarda o objeto na constante, ou undefined se não existir

    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }
    //Criação de um objeto com os valores do nome e quantidade que o usuário passou

    if (existe) {
        itemAtual.id = existe.id   //O item em questao fica com o id igual do item existente

        atualizaElemento(itemAtual)

        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual   //Sobreescreve o elemento na posição igual o número do id do elemento existente   
    } else {
        itemAtual.id = itens[itens.length - 1] ? (itens[itens.length - 1]).id + 1 : 0
    //Adicionando id => Se  isso existir     então            isto          senão aquilo
    //Caso o tamanho do array -1 não for negativo então o id será igual ao do último elemento +1 senão será 0

        criaElemento(itemAtual)
        itens.push(itemAtual)   //Adiciona o novo objeto à array de objetos
    }

    localStorage.setItem("itens", JSON.stringify(itens))   //transforma a array em uma string sobreescrevendo a existente

    nome.value = ""
    quantidade.value = ""
    //Limpa os campos dos inputs
})

function criaElemento(item) {
    const novoItem = document.createElement('li')   //Cria uma li
    novoItem.classList.add("item")   //Adiciona a classe "item" na li

    const numeroItem = document.createElement('strong')   //Cria uma tag strong
    numeroItem.innerHTML = item.quantidade   //Adiciona ao strong a quantidade
    numeroItem.dataset.id = item.id   //Iguala o id da tag com o id do item

    novoItem.appendChild(numeroItem)   //Afilia o strong a li
    novoItem.innerHTML += item.nome   //Afilia o nome ao li
    novoItem.appendChild(botaoDeleta(item.id))

    lista.appendChild(novoItem)   //Adiciona a li a lista no HTML
}

function atualizaElemento(item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
    //[data-id='id do item']
    //Atualiza a quantidade se o elemento for existente
}

function botaoDeleta(id) {
    const elementoBotao = document.createElement("button")   //Cria um botao
    elementoBotao.classList.add("botao-remover")   //Adiciona uma classe
    elementoBotao.innerText = "X"   //Adiciona um texto

    elementoBotao.addEventListener("click", function() {
        deletaElemento(this.parentNode, id)
        console.log(this.parentNode, id)
    })

    return elementoBotao   //Quando a função for chamada retornará o elementoBotao
}

function deletaElemento(tag, id) {
    tag.remove()   //remove o elemento li do HTML

    itens.splice(itens.findIndex(elemento => elemento.id === id), 1)
    console.log(itens)

    localStorage.setItem("itens", JSON.stringify(itens))
}