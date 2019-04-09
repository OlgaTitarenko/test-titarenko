const form = document.getElementById('my-form');
const list = document.getElementById('users');
let users = [];
render();
getUsers();
form.onsubmit = (event) => {
    event.preventDefault();
    console.log(form.elements.comment.value);

    const elems = form.elements;
    const user = {
        surName: elems.surname.value,
        name: elems.name.value,
        age: elems.age.value,
        birthDay: elems.birthDay.value,
        acception: elems.acception.checked,
        email: elems.email.value,
        password: elems.password.value,
        cats: elems.cats.value,
        color: elems.color.value,
        sleepTime: elems.sleepTime.value,
        car: elems.cars.options[elems.cars.options.selectedIndex].value,
        rating: elems.rating.value,
        comment: elems.comment.value
    };
    createUser(user)
};
function createUser(user) {
    fetch('http://127.0.0.1:3000/users', {
        method: 'POST',
        body: JSON.stringify(user),
    })
        .then(res => res.json())
        .then(data => {
            users = data;
            render();
        });
}
function getUsers() {
    fetch('http://127.0.0.1:3000/users')
        .then(res => res.json())
        .then(data => {
            users = data;
            render();
        });
}
function render() {
    list.innerHTML = `
      <h3>Users</h3>
      <ul>
        ${ users.map(user => `
          <li>${user.surName} ${user.name}</li>
        `).join('') }
      </ul>
    `;
}