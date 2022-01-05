const stringifyDate = (date) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric'};
    const newDate = !date ? 'undefined' :
                    new Date(Date.parse(date)).toLocaleDateString('en-US', options);
    return newDate;
}

const checkName = (name) => {
    let nameRegex = RegExp('^[A-Z]{1}[a-z]{2,}$');
    if (!nameRegex.test(name)) throw "Name is Incorrect";
  }
  
  const checkStartDate = (startDate) => {
    let now = new Date();
    if(startDate>now) throw 'start date is a future date';
    var diff = Math.abs(now.getTime()-startDate.getTime());
    if(diff/(1000*60*69*24)>30)
        throw 'start date is beyond 30days';
  }


