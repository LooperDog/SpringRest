import { apiFetch } from './utils.js';

export function loadUsers() {
    return apiFetch('/api/admin/users');
}

export function loadRoles() {
    return apiFetch('/api/admin/roles');
}

export function getUser(id) {
    return apiFetch(`/api/admin/users/${id}`);
}

export function saveUser(user) {
    const method = user.id ? 'PUT' : 'POST';
    const url = user.id ? `/api/admin/users/${user.id}` : '/api/admin/users';
    return apiFetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    });
}

export function deleteUser(id) {
    return apiFetch(`/api/admin/users/${id}`, { method: 'DELETE' });
}

export function loadCurrentUser() {
    return apiFetch('/api/users/current_user');
}

export function logout() {
    return fetch('/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        redirect: 'follow',
        cache: 'no-store'
    }).then(response => {
        if (response.ok || response.redirected) {
            window.location.replace('/login?logout');
        } else {
            throw new Error('Ошибка выхода');
        }
    }).catch(error => console.error('Ошибка при выходе:', error));
}