import { loadUsers, deleteUser, loadRoles, saveUser, getUser } from "./api.js";
import { logout } from "./utils.js";

$(document).ready(function() {
    loadUsers().then(renderUsers).catch(error => console.error('Ошибка загрузки пользователей:', error));
    loadRoles().then(renderRoles).catch(error => console.error('Ошибка загрузки ролей:', error));

    $('#addUserBtn').click(() => {
        $('#userForm')[0].reset();
        $('#userId').val('');
        $('#modalTitle').text('Добавить пользователя');
        $('#userModal').modal('show');
    });

    $('#saveUser').click(() => {
        const user = {
            id: $('#userId').val() || null,
            username: $('#username').val(),
            lastName: $('#lastName').val(),
            email: $('#email').val(),
            password: $('#password').val(),
            roles: $('#roles').val().map(id => ({ id }))
        };
        saveUser(user)
            .then(() => {
                $('#userModal').modal('hide');
                loadUsers().then(renderUsers);
            })
            .catch(error => console.error('Ошибка сохранения:', error));
    });

    $('#logoutBtn').click(() => {
        console.log('Кнопка "Выйти" нажата');
        logout();
    });
});

function renderUsers(users) {
    const tbody = $('#usersTable');
    tbody.empty();
    users.forEach(user => {
        tbody.append(`
            <tr>
                <td>${user.id}</td>
                <td>${user.username}</td>
                <td>${user.lastName}</td>
                <td>${user.email}</td>
                <td>${user.roles.map(r => r.name).join(', ')}</td>
                <td>
                    <button class="btn btn-sm btn-primary edit-btn" data-id="${user.id}">Изменить</button>
                    <button class="btn btn-sm btn-danger delete-btn" data-id="${user.id}">Удалить</button>
                </td>
            </tr>
        `);
    });
    $('.edit-btn').click(function() { editUser($(this).data('id')); });
    $('.delete-btn').click(function() {
        if (confirm('Вы уверены?')) {
            deleteUser($(this).data('id')).then(() => loadUsers().then(renderUsers));
        }
    });
}

function renderRoles(roles) {
    const select = $('#roles');
    select.empty();
    roles.forEach(role => select.append(`<option value="${role.id}">${role.name}</option>`));
}

function editUser(id) {
    getUser(id)
        .then(user => {
            $('#userId').val(user.id);
            $('#username').val(user.username);
            $('#lastName').val(user.lastName);
            $('#email').val(user.email);
            $('#password').val('');
            $('#roles').val(user.roles.map(r => r.id));
            $('#modalTitle').text('Изменить пользователя');
            $('#userModal').modal('show');
        })
        .catch(error => console.error('Ошибка загрузки пользователя:', error));
}

