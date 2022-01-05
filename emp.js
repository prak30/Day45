let isUpdate = false;
let emplopyeePayrollObj = {};

window.addEventListener('DOMContentLoaded', (event) => {
  const name = document.querySelector('#name');
  const textError = document.querySelector('.name-error');
  name.addEventListener('input', function () {
    if (name.value.length == 0) {
      textError.textContent = "";
      return;
    }
    try {
      checkName(name.value);
      textError.textContent = "";
    } catch (e) {
      textError.textContent = e;
    }
  });

  const salary = document.querySelector('#salary');
  const output = document.querySelector('.salary-output');
  salary.addEventListener('input', function () {
    output.textContent = salary.value;
  });

  const month = document.querySelector('#month');
  const year = document.querySelector('#year');
  const day = document.querySelector('#day');
  const dateError = document.querySelector('.date-error');
  month.addEventListener('input', function () {
    try {
      checkStartDate(new Date(document.querySelector('#day').value + ' ' + document.querySelector('#month').value + ' ' +
        document.querySelector('#year').value));
      dateError.textContent = '';
    } catch (e) {
      dateError.textContent = e;
    }
  });
  day.addEventListener('input', function () {
    try {
      checkStartDate(new Date(document.querySelector('#day').value + ' ' + document.querySelector('#month').value + ' ' +
        document.querySelector('#year').value));
      dateError.textContent = '';
    } catch (e) {
      dateError.textContent = e;
    }
  });
  year.addEventListener('input', function () {
    try {
      checkStartDate(new Date(document.querySelector('#day').value + ' ' + document.querySelector('#month').value + ' ' +
        document.querySelector('#year').value));
      dateError.textContent = '';
    } catch (e) {
      dateError.textContent = e;
    }
  });

  checkForUpdate();

});
const save = (event) => {
  try {
    console.log("save invoked")
    setEmployeePayrollObject();
    createAndUpdateStorage();
    window.location.replace(site_properties.home_page);
  } catch (e) {
    console.log(e);
    return;
  }
}

const setEmployeePayrollObject = () => {
  if (!isUpdate && site_properties.use_local_storage.match("true")) {
    emplopyeePayrollObj.id = createNewEmployeeId();
  }
  emplopyeePayrollObj._name = document.querySelector('#name').value;
  emplopyeePayrollObj._profilePic = getSelectedValues('[name=profile]').pop();
  emplopyeePayrollObj._gender = getSelectedValues('[name=gender]').pop();
  emplopyeePayrollObj._department = getSelectedValues('[name=department]');
  emplopyeePayrollObj._salary = document.querySelector('#salary').value;
  emplopyeePayrollObj._note = document.querySelector('#notes').value;
  let date = document.querySelector('#day').value + ' ' + document.querySelector('#month').value + ' ' +
    document.querySelector('#year').value;
  emplopyeePayrollObj._startDate = date;
}

const getSelectedValues = (propertyValue) => {
  let allItems = document.querySelectorAll(propertyValue);
  let selItems = [];
  allItems.forEach(item => {
    if (item.checked) selItems.push(item.value);
  });
  return selItems;
}

function createAndUpdateStorage() {

  let employeePayrollList = JSON.parse(localStorage.getItem('EmployeePayrollList'));
  if (employeePayrollList) {
    let empPayrollData = employeePayrollList
      .find(empData => empData.id == emplopyeePayrollObj.id);
    if (!empPayrollData) {
      employeePayrollList.push(emplopyeePayrollObj);
    } else {
      const index = employeePayrollList
        .map(empData => empData.id)
        .indexOf(empPayrollData.id);
      employeePayrollList.splice(index, 1, emplopyeePayrollObj);
    }
  } else {
    employeePayrollList = [emplopyeePayrollObj];
  }
  localStorage.setItem('EmployeePayrollList', JSON.stringify(employeePayrollList));
}

const resetForm = () => {
  setValue('#name', '');
  setTextValue('.name-error', '');
  unsetSelectedValues('[name=profile]');
  unsetSelectedValues('[name=gender]');
  unsetSelectedValues('[name=department]');
  setValue('#salary', '');
  setTextValue('.salary-output', 400000);
  setValue('#notes', '');
  setValue('#day', '1');
  setValue('#month', 'January');
  setValue('#year', '2020');
  setTextValue('.date-error', '');
}

const unsetSelectedValues = (propertyValue) => {
  let allItems = document.querySelectorAll(propertyValue);
  allItems.forEach(item => {
    item.checked = false;
  });
}

const setTextValue = (id, value) => {
  const element = document.querySelector(id);
  element.textContent = value;
}

const setValue = (id, value) => {
  const element = document.querySelector(id);
  element.value = value;
}

const createNewEmployeeId = () => {
  let empId = localStorage.getItem("empID");
  empId = !empId ? 1 : (parseInt(empId) + 1).toString();
  localStorage.setItem("empID", empId);
  return empId;
}

const checkForUpdate = () => {
  const employeePayrollJson = localStorage.getItem('editEmp');
  isUpdate = employeePayrollJson ? true : false;
  if (!isUpdate) return;
  emplopyeePayrollObj = JSON.parse(employeePayrollJson);
  setForm();
}

const setForm = () => {
  setValue('#name', emplopyeePayrollObj._name);
  setSelectedValues('[name=profile]', emplopyeePayrollObj._profilePic);
  setSelectedValues('[name=gender]', emplopyeePayrollObj._gender);
  setSelectedValues('[name=department]', emplopyeePayrollObj._department);
  setValue('#salary', emplopyeePayrollObj._salary);
  setTextValue('.salary-output', emplopyeePayrollObj._salary);
  setValue('#notes', emplopyeePayrollObj._note);
  let date = emplopyeePayrollObj._startDate.split(" ");
  console.log(date);
  setValue('#day', date[0]);
  setValue('#month', date[1]);
  setValue('#year', date[2]);
}

const setSelectedValues = (propertyValue, value) => {
  let allItems = document.querySelectorAll(propertyValue);
  allItems.forEach(item => {
    if (Array.isArray(value)) {
      if (value.includes(item.value)) {
        item.checked = true;
      }
    }
    else if (item.value === value)
      item.checked = true;
  });
}