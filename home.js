window.addEventListener('DOMContentLoaded', (event) => {
    createInnerHtml();
});

//Template litrals Es6 Features.

const createInnerHtml = () => {
    const innerHtml = `
    <tr>
        <th>Image</th>
        <th>Name</th>
        <th>Gender</th>
        <th>Department</th>
        <th>Salary</th>
        <th>Start Date</th>
        <th>Action</th>
    </tr>
    <tr>
        <td><img class="profile" alt="img" src="Ellipse -2.png" </td>
        <td>Pranav Katkar</td>
        <td>Male</td>
        <td>
        <div class="dept-label">HR</div>
        <div class="dept-label">Engineering</div>
        </td>
        <td>300000</td>
        <td>1 Nov 2020</td>
        <td>
            <img name="1" onclick="remove(this)" alt="delete" src="delete-black-18dp.png">
            <img name="1" alt="edit" onclick="update(this)" src="create-black-18dp.jpg">
        </td>
    </tr>
`;
document.querySelector('#table-display').innerHTML=innerHtml;
}      