// Arquivo: nova-tarefa.js

document.addEventListener('DOMContentLoaded', () => {
    const newTaskForm = document.getElementById('newTaskForm');

    newTaskForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // 1. Capturar os dados do formulário
        const description = document.getElementById('taskDescription').value;
        const materia = document.getElementById('taskMateria').value;
        const dueDate = document.getElementById('taskDueDate').value;
        const priority = document.getElementById('taskPriority').value;

        // 2. Criar o objeto Tarefa
        const newTask = {
            id: Date.now(), // ID único baseado no timestamp
            description,
            materia,
            dueDate,
            priority,
            completed: false // Nova tarefa sempre começa como não concluída
        };

        // 3. Carregar, Adicionar e Salvar no localStorage
        const tasks = JSON.parse(localStorage.getItem('estudopro_tasks')) || [];
        tasks.push(newTask);
        localStorage.setItem('estudopro_tasks', JSON.stringify(tasks));
        
        // 4. Redirecionar para o dashboard
        window.location.href = 'gestao.html';
    });
});