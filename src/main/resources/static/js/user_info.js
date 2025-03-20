import { loadCurrent } from './api.js';
import {logout} from "./utils.js";

$(document).ready(function() {
    loadCurrent()
        .then(renderUserInfo)
        .catch(error => {
            console.error('Ошибка:', error);
            $('#userInfo').html(`
                <div class="alert alert-danger" role="alert">
                    Ошибка загрузки данных: ${error.message}
                </div>
            `);
        });

    $('#logoutBtn').click(() => logout());
});

function renderUserInfo(user) {
    $('#userInfo').html(`
        <ul class="list-group list-group-flush">
            <li class="list-group-item"><strong>ID:</strong> ${user.id}</li>
            <li class="list-group-item"><strong>Имя:</strong> ${user.username}</li>
            <li class="list-group-item"><strong>Фамилия:</strong> ${user.lastName}</li>
            <li class="list-group-item"><strong>Email:</strong> ${user.email}</li>
            <li class="list-group-item"><strong>Роли:</strong> ${user.roles.map(r => r.name).join(', ')}</li>
        </ul>
    `);
}