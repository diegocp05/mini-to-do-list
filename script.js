// Elementos da interface
const input = document.getElementById('novaTarefa');
const btnAdicionar = document.getElementById('adicionarBtn');
const lista = document.getElementById('listaTarefas');
const msgVazia = document.getElementById('msgVazia');

// Carrega tarefas do localStorage ou array vazio
let tarefas = carregarTarefas();

// Renderiza as tarefas na tela
renderizarTarefas();

// Eventos
btnAdicionar.addEventListener('click', adicionarTarefa);
input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') adicionarTarefa();
});

// Funções

function carregarTarefas() {
  try {
    return JSON.parse(localStorage.getItem('tarefas')) || [];
  } catch (e) {
    console.error('Erro ao carregar tarefas:', e);
    return [];
  }
}

function salvarTarefas() {
  localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function renderizarTarefas() {
  lista.innerHTML = '';
  if (tarefas.length === 0) {
    msgVazia.textContent = 'Nenhuma tarefa cadastrada.';
    return;
  }
  msgVazia.textContent = ''; // Limpa mensagem

  tarefas.forEach((tarefa, index) => {
    const li = document.createElement('li');
    li.textContent = tarefa.texto;
    li.className = tarefa.concluida ? 'concluida' : '';

    li.addEventListener('click', () => alternarConclusao(index));

    const btnRemover = document.createElement('button');
    btnRemover.textContent = '❌';
    btnRemover.addEventListener('click', (e) => {
      e.stopPropagation();
      removerTarefa(index);
    });

    li.appendChild(btnRemover);
    lista.appendChild(li);
  });
}

function adicionarTarefa() {
  const texto = input.value.trim();
  if (!texto) {
    alert('Digite uma tarefa!');
    return;
  }

  tarefas.push({ texto, concluida: false });
  salvarTarefas();
  renderizarTarefas();
  input.value = '';
  input.focus();
}

function removerTarefa(index) {
  if (confirm('Deseja realmente remover esta tarefa?')) {
    tarefas.splice(index, 1);
    salvarTarefas();
    renderizarTarefas();
  }
}

function alternarConclusao(index) {
  tarefas[index].concluida = !tarefas[index].concluida;
  salvarTarefas();
  renderizarTarefas();
}
