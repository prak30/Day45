let empPayrollList;
window.addEventListener('DOMContentLoaded', (event) => {
    empPayrollList = getEmployeePayrollDataFromStorage();
    document.querySelector(".emp-count").textContent = empPayrollList.length;
    createInnerHtml();
    localStorage.removeItem('editEmp');
});

const getEmployeePayrollDataFromStorage = () => {
    return localStorage.getItem('EmployeePayrollList') ?
                        JSON.parse(localStorage.getItem('EmployeePayrollList')) : [];
}

const createInnerHtml = () => {
    const headerHtml = "<th></th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th><th>Start Date</th><th>Actions</th>";
    if(empPayrollList.length == 0) return;
    let innerHtml = `${headerHtml}`;
    for(const empPayrollData of empPayrollList){
        innerHtml = `${innerHtml}
            <tr>
                <td><img class="profile" alt="" src="${empPayrollData._profilePic}"</td>
                <td>${empPayrollData._name}</td>
                <td>${empPayrollData._gender}</td>
                <td>${getDeptHtml(empPayrollData._department)}</td>            
                <td>${empPayrollData._salary}</td>
                <td>${empPayrollData._startDate}</td>
                <td>
                    <img id="${empPayrollData._id}" onclick="remove(this)" alt="delete" src="delete-black-18dp.png">
                    <img id="${empPayrollData._id}" alt="edit" onclick="update(this)" src="create-black-18dp.jpg">
                </td>
            </tr>
        `;
    }
    document.querySelector("#table-display").innerHTML = innerHtml;
}
const getDeptHtml = (deptList) => {
    let deptHtml = '';
    for(const dept of deptList) {
        deptHtml = `${deptHtml} <div class='dept-label'>${dept}</div>`
    }
    return deptHtml;
}
// const createEmployeePayrollJSON = () => {
//     let empPayrollListLocal = [
//         {
//             _name: 'Narayan Mahadevan',
//             _gender: 'male',
//             _department: [
//                 'Engineering',
//                 'Finance'
//             ],
//             _salary: '500000',
//             _startDate: '29 Oct 2019',
//             _note: ' ',
//             _id: new Date().getTime(),
//             _profilePic: 'Ellipse -2.png'
//         },
//         {
//             _name: 'Amarpa Shashanka Keerthi Kumar',
//             _gender: 'female',
//             _department: [
//                 'Sales',
//                 'HR'
//             ],
//             _salary: '400000',
//             _startDate: '29 Oct 2019',
//             _note: '',
//             _id: new Date().getTime() + 1,
//             _profilePic: 'Ellipse -1.png'
//         }
//     ];
//     return empPayrollListLocal;
// }

const remove = (node) => {
    let empPayrollData = empPayrollList.find(empData => empData._id == node.id);
    if(!empPayrollData) return;
    const index = empPayrollList
                    .map(empData => empData._id)
                    .indexOf(empPayrollData._id);
    empPayrollList.splice(index, 1);
    localStorage.setItem("EmployeePayrollList", JSON.stringify(empPayrollList));
    document.querySelector(".emp-count").textContent = empPayrollList.length;
    createInnerHtml();                
}

const update = (node) => {
    let empPayrollData = empPayrollList.find(empData => empData._id == node.id)
    if(!empPayrollData) return;
    localStorage.setItem('editEmp',JSON.stringify(empPayrollData))
    window.location.replace(site_properties.add_emp_payroll_page);
}