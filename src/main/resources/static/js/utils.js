export function apiFetch(url, options = {}) {
    return fetch(url, {
        headers: {'Accept': 'application/json', ...options.headers},
        cache: 'no-store',
        ...options
    })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => {
                    throw new Error(`Ошибка ${response.status}: ${text || response.statusText}`);
                });
            }
            return response.text().then(text => {
                console.log('Ответ от сервера:', text);
                return text ? JSON.parse(text) : null;
            });
        })
        .catch(error => {
            console.error('Ошибка в apiFetch:', error);
            throw error;
        });
}

export function logout(redirectURL = '/login') {
    return apiFetch('/logout', {
        method: 'POST',
        headers: {'Content-Type': '/application/x-www-form-urlencoded'}
    })
        .then(() => {
            window.location.href = redirectURL;
        })
        .catch(error => console.error('Ошибка при входе:', error));
}