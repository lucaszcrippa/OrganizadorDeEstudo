document.addEventListener('DOMContentLoaded', () => {
    // --- Variáveis do DOM ---
    const tasksList = document.getElementById('tasksList');
    const pendingTasksCount = document.getElementById('pendingTasksCount');
    
    // --- Lógica de Funções Auxiliares ---

    const calculateDueDateText = (dueDate) => {
        const today = new Date();
        const due = new Date(dueDate);
        today.setHours(0, 0, 0, 0);
        due.setHours(0, 0, 0, 0);

        const diffTime = due - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Vence hoje';
        if (diffDays === 1) return 'Vence amanhã';
        if (diffDays > 1) return `Vence em ${diffDays} dias`;
        if (diffDays < 0) return 'Atrasado';
        return 'Data indefinida';
    };

    // Função para criar o HTML da tarefa (ADICIONADO O BOTÃO DE EXCLUIR)
    const createTaskElement = (task) => {
        const priorityClass = `${task.priority}-priority`;
        const dateText = calculateDueDateText(task.dueDate);
        const isCompletedClass = task.completed ? 'completed' : '';
        
        return `
            <div class="task-item ${priorityClass} ${isCompletedClass}" data-id="${task.id}">
                <div class="task-content">
                    <input type="checkbox" id="task-${task.id}" data-task ${task.completed ? 'checked' : ''}>
                    <label for="task-${task.id}">${task.description} **(${task.materia})**</label>
                </div>
                
                <div class="task-actions">
                    <span class="due-date">${dateText}</span>
                    <button class="btn-delete" data-id="${task.id}">🗑️</button> 
                </div>
            </div>
        `;
    };

    // --- Lógica Principal de Renderização e Contagem ---

    const renderTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('estudopro_tasks')) || [];
        tasksList.innerHTML = ''; // Limpa a lista

        if (tasks.length === 0) {
            tasksList.innerHTML = '<p class="empty-list-msg">Nenhuma tarefa adicionada ainda. Clique em "➕ Nova Tarefa/Estudo" para começar!</p>';
        } else {
            // Ordena e renderiza (pendentes primeiro)
            const pendingTasks = tasks.filter(t => !t.completed);
            const completedTasks = tasks.filter(t => t.completed);

            [...pendingTasks, ...completedTasks].forEach(task => {
                tasksList.insertAdjacentHTML('beforeend', createTaskElement(task));
            });
        }
        updateTaskCount(tasks);
    };

    const updateTaskCount = (tasks) => {
        const pendingCount = tasks.filter(t => !t.completed).length;
        pendingTasksCount.textContent = pendingCount;
    };

    // --- Lógica de Interação (Marcar como Concluída) ---

    const handleTaskCompletion = (event) => {
        const checkbox = event.target;
        if (checkbox.matches('[data-task]')) {
            const taskItem = checkbox.closest('.task-item');
            const taskId = parseInt(taskItem.getAttribute('data-id'));
            
            let tasks = JSON.parse(localStorage.getItem('estudopro_tasks')) || [];
            const taskIndex = tasks.findIndex(t => t.id === taskId);

            if (taskIndex > -1) {
                // Atualiza o status no objeto e salva no localStorage
                tasks[taskIndex].completed = checkbox.checked;
                localStorage.setItem('estudopro_tasks', JSON.stringify(tasks));
            }
            
            // Re-renderiza para atualizar a lista e a contagem
            renderTasks();
        }
    };
    
    // --- Lógica de Exclusão (NOVA FUNÇÃO) ---
    const deleteTask = (taskId) => {
        // 1. Carrega as tarefas
        let tasks = JSON.parse(localStorage.getItem('estudopro_tasks')) || [];
        
        // 2. Filtra, removendo a tarefa com o ID correspondente
        const updatedTasks = tasks.filter(t => t.id !== taskId);
        
        // 3. Salva a nova lista no localStorage
        localStorage.setItem('estudopro_tasks', JSON.stringify(updatedTasks));
        
        // 4. Re-renderiza a lista para atualizar o DOM e a contagem
        renderTasks();
    };

    // Listener para todos os cliques dentro da lista
    tasksList.addEventListener('click', (event) => {
        // Verifica se o elemento clicado é o botão de exclusão
        if (event.target.matches('.btn-delete')) {
            const taskId = parseInt(event.target.getAttribute('data-id'));
            
            // Confirmação para evitar exclusões acidentais
            if (confirm('Tem certeza que deseja remover esta tarefa?')) {
                 deleteTask(taskId);
            }
        }
    });

    // Listener para o checkbox (marcar/desmarcar)
    tasksList.addEventListener('change', handleTaskCompletion);

    // Inicializa a renderização das tarefas ao carregar a página
    renderTasks();
});