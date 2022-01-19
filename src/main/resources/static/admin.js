//формируем реквест

async function request(url, method = 'GET', payload) {
    const options = {method, headers: {"Content-type": "application/json", "Accept": "application/json"}}
    if (payload) options.body = JSON.stringify(payload)

    const response = await fetch(url, options)

    if (!response.ok) {
        alert("Ошибка HTTP: " + response.status)
        throw Error("Ошибка HTTP: " + response.status)
    }

    if (method === 'DELETE') return

    return await response.json()
}

// заполняем данные для формы редактрования/удаления пользователя

function writeDataForForm(user, form) {
    document.querySelector(`${form} input[name="id"]`).value = user.id
    document.querySelector(`${form} input[name="username"]`).value = user.username
    document.querySelector(`${form} input[name="city"]`).value = user.city
    document.querySelector(`${form} input[name="email"]`).value = user.email
    document.querySelector(`${form} input[name="password"]`).value = user.password

    Array.from(document.querySelectorAll(`${form} select[name="role"] option`)).forEach(option => {
        if (user.roles.find(role => role.role === option.value)) option.selected = true
    })

    document.getElementById(form.slice(1,)).style.display = 'block'
}

//получаем данные из формы

function getDataFromForm(form) {
    const data = {
        username: document.querySelector(`${form} input[name="username"]`).value,
        city: document.querySelector(`${form} input[name="city"]`).value,
        email: document.querySelector(`${form} input[name="email"]`).value,
        password: document.querySelector(`${form} input[name="password"]`).value,
        roles: Array.from(
            document.querySelectorAll(`${form} select[name="role"] option`)
        ).filter(option => option.selected).map(option => ({role: option.value, id: option.dataset.id}))
    }

    const id = document.querySelector(`${form} input[name="id"]`)
    if (id) data.id = id.value

    return data
}


// таблица пользователей

function getUsersTable(users) {
    const usersList = users.map(user => `
                <tr>
                    <td>${user.id}</td>
                    <td>${user.username}</td>
                    <td>${user.password}</td>
                    <td>${user.email}</td>
                    <td>${user.city}</td>
                    <td>${user.roles.map(role => role.role).map(s => s.substring(s.indexOf('_') + 1)).join(', ')}</td>
                    <td><button id="user-edit-button-${user.id}" class="btn btn-info btn-sm" style="color:white">Edit</button></td>
                    <td><button id="user-delete-button-${user.id}" class="btn btn-danger btn-sm" style="color:white">Delete</button></td>
                </tr>
            `).join('')
    document.getElementById('users-table').innerHTML = usersList

    users.forEach(user => {
        document.getElementById(`user-edit-button-${user.id}`).addEventListener('click', () => writeDataForForm(user, '#edit-user-form'))
        document.getElementById(`user-delete-button-${user.id}`).addEventListener('click', () => writeDataForForm(user, '#delete-user-form'))
    })
}

//отрисовываем таблицу пользователей

async function getUsers() {
    const users = await request('http://localhost:8080/api/users')
    getUsersTable(users)
}

function showPrincipal(user) {
    document.getElementById('current-user-name').innerText = user.username
    document.getElementById('current-user-role').innerText = user.roles.map(role => role.role).map(s => s.substring(s.indexOf('_') + 1) + " ").join(', ')
}

// получаем список всех ролей

function allRoles(roles) {

    function opt(id, role) {

        let option = new Option(role.substring(role.indexOf('_') + 1), role)
        option.setAttribute("data-id", id)
        return option
    }

    document.querySelectorAll(`select[name="role"]`)
        .forEach(select => {
            roles.forEach(
                role => select.append(opt(role.id, role.role))
            )
        })


}

// добавляем пользователя

async function saveNewUser() {
    try {
        await request('http://localhost:8080/api/users', 'POST', getDataFromForm('#new-user-form'))
    } catch (e) {
        alert('Не удалось создать пользователя')
        throw e
    }

    getUsers()

}

// редактируем пользователя

async function editUser() {
    try {
        const data = getDataFromForm('#edit-user-form')
        await request('http://localhost:8080/api/users', 'PUT', data)
    } catch (e) {
        alert('Не удалось отредактировать пользователя')
        throw e
    }

    getUsers()

    document.getElementById('edit-user-form').style.display = 'none'
}

//удаляем пользователя

async function deleteUser() {
    try {
        const data = getDataFromForm('#delete-user-form')
        await request('http://localhost:8080/api/users/' + data.id, 'DELETE')
    } catch (e) {
        alert('Не удалось удалить пользователя')
        throw e
    }

    getUsers()

    document.getElementById('delete-user-form').style.display = 'none'
}

window.onload = async function () {
    const currentUser = await request('http://localhost:8080/api/user')
    showPrincipal(currentUser)

    const getAllRoles = await request('http://localhost:8080/api/roles')
    allRoles(getAllRoles)

    await getUsers()
    document.getElementById('save-new-user').addEventListener('click', saveNewUser)
    document.getElementById('updateButton').addEventListener('click', editUser)
    document.getElementById('delete-user-button').addEventListener('click', deleteUser)

    // скрыть форму редактирования пользователя

    Array.from(document.getElementsByClassName('close-edit-user-from')).forEach(close => {
        close.addEventListener('click', () => document.getElementById('edit-user-form').style.display = 'none')
    })
    // скрыть форму удаления пользователя

    Array.from(document.getElementsByClassName('close-delete-user-from')).forEach(close => {
        close.addEventListener('click', () => document.getElementById('delete-user-form').style.display = 'none')
    })
}