async function request(url, method = 'GET') {
    const options = {method, headers: {"Content-type": "application/json", "Accept": "application/json"}}

        const response = await fetch(url, options)

    if (!response.ok) {
        alert("Ошибка HTTP: " + response.status)
        throw Error("Ошибка HTTP: " + response.status)
    }
    return await response.json()
}

async function renderUserList(users) {
    const currentUser = await request('http://localhost:8080/api/user')
    const temp = `
                <tr>
                    <td>${currentUser.id}</td>
                    <td>${currentUser.username}</td>
                    <td>${currentUser.password}</td>
                    <td>${currentUser.email}</td>
                    <td>${currentUser.city}</td>
                    <td>${currentUser.roles.map(role => role.role).map(s => s.substring(s.indexOf('_') + 1)).join(', ')}</td>
                </tr>
            `
    document.getElementById('users-table').innerHTML = temp
}

function renderCurrentUser(user) {
    document.getElementById('current-user-name').innerText = user.username
    document.getElementById('current-user-role').innerText = user.roles.map(role => role.role).map(s => s.substring(s.indexOf('_') + 1)).join(', ')
}

async function getUsers() {
    const users = await request('http://localhost:8080/api/users')
    await renderUserList(users)
}

window.onload = async function () {
    const currentUser = await request('http://localhost:8080/api/user')
    renderCurrentUser(currentUser)
    await getUsers()
}
