let array_geral = [];

function salvar_tarefa() {
    let titulo_prin = document.getElementById("titulo_tarefa");
    let desc = document.getElementById("descricao_tarefa");
    let op_select = document.getElementById("prioridade_tarefa");

    let card_tarefa = {
        titulo: titulo_prin.value,
        descricao: desc.value,
        prioridade: op_select.value,
        feita: false  
    };

    array_geral.push(card_tarefa);
    
    atualizar_tarefas();

    titulo_prin.value = "";
    desc.value = "";
    op_select.value = "";
}

function atualizar_tarefas() {
    localStorage.setItem("MIDIAS", JSON.stringify(array_geral));

    let html = "";

    for (let index = 0; index < array_geral.length; index++) {
        let t = array_geral[index];
        let cor = "";

        if (t.feita) {
            cor = "bg-success"; 
        } else {
            if (t.prioridade == "3") {
                cor = "bg-danger";
            } else if (t.prioridade == "2") {
                cor = "bg-warning";
            } else {
                cor = "bg-secondary";
            }
        }

        html += `
        <div class="text-light ${cor} col-3 h-auto p-3 me-1 mt-2 rounded-4 position-relative">
            <div class="d-flex justify-content-between align-items-start">
                <h2 class="border-bottom border-light p-1 flex-grow-1">
                    ${t.feita ? '<i class="bi bi-check-circle-fill me-2"></i>' : ''}${t.titulo}
                </h2>
                <div>
                    <i class="bi bi-check2-circle me-2" style="cursor:pointer" title="Marcar como feita" onclick="marcar_como_feita(${index})"></i>
                    <i class="bi bi-trash" style="cursor:pointer" title="Excluir" onclick="excluir_tarefa(${index})"></i>
                </div>
            </div>
            <p class="text-break">${t.descricao}</p>
        </div>`;
    }

    document.getElementById("saida").innerHTML = html;
}

function excluir_tarefa(index) {
    array_geral.splice(index, 1);
    atualizar_tarefas();
}

function marcar_como_feita(index) {
    array_geral[index].feita = true;
    atualizar_tarefas();
}


window.onload = function () {
    let dados_salvos = localStorage.getItem("MIDIAS");
    if (dados_salvos) {
        array_geral = JSON.parse(dados_salvos);
        atualizar_tarefas();
    }
};

document.getElementById("btn-salvar").addEventListener("click", salvar_tarefa);
