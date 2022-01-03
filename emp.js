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
    const month = document.querySelector('#month');
    const year = document.querySelector('#year');
    const day = document.querySelector('#day');
    const dateError = document.querySelector('.date-error');
    // month.addEventListener('input', function () {
    //   // try {
    //     new EmployeePayrollData().startDate = new Date(document.querySelector('#day').value + ' ' + document.querySelector('#month').value + ' ' +
    //       document.querySelector('#year').value);
    //     dateError.textContent = '';
    //   } catch (e) {
    //     dateError.textContent = e;
    //   }
    // });
    // day.addEventListener('input', function () {
    //   try {
    //     new EmployeePayrollData().startDate = new Date(document.querySelector('#day').value + ' ' + document.querySelector('#month').value + ' ' +
    //       document.querySelector('#year').value);
    //     dateError.textContent = '';
    //   } catch (e) {
    //     dateError.textContent = e;
    //   }
    // });
    // year.addEventListener('input', function () {
     
//  try {
//         new EmployeePayrollData().startDate = new Date(document.querySelector('#day').value + ' ' + document.querySelector('#month').value + ' ' +
//           document.querySelector('#year').value);
//         dateError.textContent = '';
      // } catch (e) {
      //   dateError.textContent = e;
      // }
    // });
    checkForUpdate();
});

const save = () => {
    console.log("calling save")
    try{
        setEmployeePayrollObject();
        // console.log(employeePayrollData)
        createAndUpdateStorage(employeePayrollObj);
        window.location.replace("home.html");
    } catch (e){
        return;
    }
}

const setEmployeePayrollObject = () => {
    employeePayrollObj._name = document.querySelector('#name').value;
    employeePayrollObj._profilePic = getSelectedValues('[name=profile]').pop();
    employeePayrollObj._gender = getSelectedValues('[name=gender]').pop();
    employeePayrollObj._department = getSelectedValues('[name=department]');
    employeePayrollObj._salary = document.querySelector('#salary').value;
    employeePayrollObj._note = document.querySelector('#notes').value;
    let date = document.querySelector('#day').value + ' ' + document.querySelector('#month').value + ' ' +
                document.querySelector('#year').value;
    employeePayrollObj._startDate = date;
    console.log(employeePayrollObj);
  }

function createAndUpdateStorage(employeePayrollData){
  console.log(employeePayrollObj);
    let employeePayrollList = JSON.parse(localStorage.getItem('EmployeePayrollList'));
    console.log(employeePayrollList);
  if (employeePayrollList) {
    let empPayrollData = employeePayrollList
                          .find(empData => empData._id == employeePayrollObj._id);
                          console.log(empPayrollData);
    if (!empPayrollData){
      employeePayrollList.push(createEmployeePayroll());
    }else {
      const index = employeePayrollList
                    .map(empData => empData._id)
                    .indexOf(empPayrollData._id);
      employeePayrollList.splice(index,1,createEmployeePayroll(empPayrollData._id));
    }
  } else {
    employeePayrollList = [createEmployeePayroll()];
  }
  localStorage.setItem('EmployeePayrollList', JSON.stringify(employeePayrollList));
}

const createEmployeePayroll = (id) => {
    console.log("calling createEmployeePayroll")
    let employeePayrollData = new EmployeePayrollData();
    if(!id)employeePayrollData.id = createNewEmployeeId();
    else employeePayrollData.id = id;
    try{
        employeePayrollData._name = getInputValueById('#name');
    } catch (e){
        setTextValue('.text-error', e);
        throw e;
    }
    employeePayrollData._profilePic = getSelectedValues('[name=profile]').pop();
    employeePayrollData._gender = getSelectedValues('[name=gender]').pop();
    employeePayrollData._department = getSelectedValues('[name=Department]');
    employeePayrollData._salary = getInputValueById('#salary');
    employeePayrollData._note = getInputValueById('#notes');
    let date = getInputValueById('#day')+" "+getInputValueById('#month')+" "+getInputValueById('#year');
    employeePayrollData._date = date;
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

