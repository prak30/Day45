let isUpdate = false;
let employeePayrollObj = {};

window.addEventListener('DOMContentLoaded', (event) => {
    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input', function () {
        if (name.value.length == 0) {
            textError.textContent = "";
            return;
        }
        try {
            (new EmployeePayrollData()).name = name.value;
            textError.textContent = " ";
        } catch (e) {
            console.log(e)
            textError.textContent = e;
        }
    });


    /*
    *UC8 
    *Event Listener on Salary Range to display appropriate value
    */
    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    output.textContent = salary.value;
    salary.addEventListener('input', function () {
    output.textContent = salary.value;
    });
    checkForUpdate();
});

const save = () => {
    console.log("calling save")
    try{
        let employeePayrollData = createEmployeePayroll();
        console.log(employeePayrollData)
        createAndUpdateStorage(employeePayrollData);
        window.location.replace("home.html");
    } catch (e){
        return;
    }
}

function createAndUpdateStorage(employeePayrollData){
    console.log("create and update method ")
    console.log(employeePayrollData)
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if(employeePayrollList != undefined){
        employeePayrollList.push(employeePayrollData);
    }else {
        employeePayrollList = [employeePayrollData];
    }
    alert(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
}

const createEmployeePayroll = (id) => {
    console.log("calling createEmployeePayroll")
    let employeePayrollData = new EmployeePayrollData();
    if(!id)employeePayrollData.id = createNewEmployeeId();
    else employeePayrollData.id = id;
    try{
        employeePayrollData.name = getInputValueById('#name');
    } catch (e){
        setTextValue('.text-error', e);
        throw e;
    }
    employeePayrollData.profilePic = getSelectedValues('[name=profile]').pop();
    employeePayrollData.gender = getSelectedValues('[name=gender]').pop();
    employeePayrollData.department = getSelectedValues('[name=Department]');
    employeePayrollData.salary = getInputValueById('#salary');
    employeePayrollData.note = getInputValueById('#notes');
    let date = getInputValueById('#day')+" "+getInputValueById('#month')+" "+getInputValueById('#year');
    employeePayrollData.date = Date.parse(date);
    alert(employeePayrollData.toString());
    return employeePayrollData;
}

const getSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let selItems = [];
    allItems.forEach(item => {
        if(item.checked) selItems.push(item.value);
    });
    return selItems;
}

const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}

const setForm = () => {
    setValue('#name', employeePayrollObj._name);
    setSelectedValues('[name = profile]', employeePayrollObj._profilePic);
    setSelectedValues('[name = gender]', employeePayrollObj._gender);
    setSelectedValues('[name = department]',employeePayrollObj._department);
    setValue('#salary',employeePayrollObj._salary);
    setTextValue('.salary-output', employeePayrollObj._salary);
    setValue('#notes',employeePayrollObj._note);
    let date = stringifyDate(employeePayrollObj._startDate).split(" ");
    setValue('#day', date[0]);
    setValue('#month',date[1]);
    setValue('#year',date[2]);
}

const setSelectedValues = (propertyValue, value) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        if(Array.isArray(value)){
            if(value.includes(item.value)){
                item.checked = true;

            }
        }
        else if (item.value === value)
            item.checked = true;
    });
}
 
const resetForm = () => {
    setValue('#name', '');
    unsetSelectedValues('[name=profile]');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name=department]');
    getSelectedValues('#salary', '');
    setValue('#salary', '');
    setValue('#note', '');
    setValue('#day', '1');
    setValue('#month', 'January');
    setValue('#year', '2020');
}

const unsetSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        item.checked = false;
    });
}

const checkForUpdate = () => {
    const employeePayrollJson = localStorage.getItem('editEmp');
    isUpdate = employeePayrollJson ? true : false;
    if(!isUpdate) return;
    employeePayrollObj = JSON.parse(employeePayrollJson);
    setForm();
}

const createNewEmployeeId = () => {
    let empId = localStorage.getItem("empID");
    empId = !empId ? 1 : (parseInt(empId) + 1).toString();
    localStorage.setItem("empID", empId);
    return empId;
  }

