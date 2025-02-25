let form = document.querySelector('.form');
let namee = document.querySelector('.name');
let surname = document.querySelector('.surname');
let score = document.querySelector('.score');
let date = document.querySelector('.date')
let card__wrapper = document.querySelector('.card__wrapper');

let allData = [];
function save() {
    localStorage.setItem('allData', JSON.stringify(allData));
}
function dowland() {
    let data = localStorage.getItem('allData');
    if (data) {
        allData = JSON.parse(data);
    }
}

function renderUser() {
    card__wrapper.innerHTML = ''
    allData.sort((a, b) => b.userscore - a.userscore);
    let table = `
        <table class="w-full border-collapse border border-gray-300">
            <thead>
                <tr class="bg-gray-200">
                    <th class="p-2 border-t border-b border-gray-300">Student name</th>
                    <th class="p-2 border-t border-b border-gray-300">Student surname</th>
                    <th class="p-2 border-t border-b border-gray-300">Student score</th>
                    <th class="p-2 border-t border-b border-gray-300">Student date</th>
                    <th class="p-2 border-t border-b border-gray-300">Opportunities</th>
                </tr>
            </thead>
            <tbody>
    `;

    allData.forEach((item, index) => {
        table += `
            <tr>
                <td class="p-3 font-semibold border-b border-gray-300 text-center">${item.username}</td>
                <td class="p-3 font-semibold border-b border-gray-300 text-center">${item.usersname}</td>
                <td class="p-3 font-semibold border-b border-gray-300 text-center">${item.userdate}</td>
                <td class="p-3 font-semibold border-b border-gray-300 text-center">${item.userscore}</td>
                <td class="p-3 border-b border-gray-300 flex items-center justify-center gap-5">
                    <button class="bg-blue-700 w-w-5 text-white px-2 py-1 rounded-md" onclick="editUser(${index})">Tahrirlash</button>
                    <button class="bg-red-700 w-w-5 text-white px-2 py-1 rounded-md" onclick="deleteUser(${index})">O'chirish</button>
                </td>
            </tr>
        `;
    });

    table += `
            </tbody>
        </table>
    `;

    card__wrapper.innerHTML = table;
}

function deleteUser(index) {
    allData.splice(index, 1);
    renderUser(); 
    save(); 
}

function editUser(index) {
    let user = allData[index]; 
    namee.value = user.username;
    surname.value = user.usersname;
    score.value = user.userscore;
    date.value = user.userdate;
    allData.splice(index, 1);
    renderUser();
    save();
}

dowland();
renderUser();
form.addEventListener('submit', function(event) {
    event.preventDefault();
    let user = {
        userid: Date.now(), 
        username: namee.value,
        usersname: surname.value,
        userdate: date.value,
        userscore: +score.value
    };
    allData.push(user);
    renderUser();
    save(); 
    form.reset();
}); 