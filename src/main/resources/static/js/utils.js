export function apiFetch(url, options = {}) {
    return fetch(url, {
        headers: {'Accept': 'application/json', ...options.headers},
        cache:'no-store',
        ...options
    })
        .then(response => {
            if (!response.ok) throw new Error('Ошибка: ${response.statusText}');
            return response.json();
        });
}

export function logout(redirectURL = '/login?logout') {
    return apiFetch('/logout', {
        method: 'POST',
        headers: {'Content-Type': '/application/x-www-form-urlencoded'}
    })
        .then(() => {
            window.location.href = redirectURL;
        })
        .catch(error => console.error('Ошибка при входе:', error));
}