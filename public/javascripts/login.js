function login() {
    const form = document.loginForm;
    const chkName = checkValidname(form);
    const chkID = checkValidID(form);
    const chkPW = checkValidPW(form);


    if (chkName) {
        document.getElementById('alertName').innerText = "";
        form.name.style.border = '2px solid';
        form.name.style.borderColor = '#00D000';
    } else {
        form.name.style.border = '2px solid';
        form.name.style.borderColor = '#FF0000';
        document.getElementById('alertName').style.color = '#FF0000';
    }

    if (chkID) {
        document.getElementById('alertID').innerText = "";
        form.studentID.style.border = '2px solid';
        form.studentID.style.borderColor = '#00D000';
    } else {
        form.studentID.style.border = '2px solid';
        form.studentID.style.borderColor = '#FF0000';
        document.getElementById('alertID').style.color = '#FF0000';
    }

    if (chkPW) {
        document.getElementById('alertPassword').innerText = "";
        form.password.style.border = '2px solid';
        form.password.style.borderColor = '#00D000';
    } else {
        form.password.style.border = '2px solid';
        form.password.style.borderColor = '#FF0000';
        document.getElementById('alertPassword').style.color = '#FF0000';
    }

    if (chkID && chkName && chkPW) {
        alert('complete. form.submit();');
        //form.submit();
    }
}

function checkValidname(form) {
    if (form.name.value == "") {
        document.getElementById('alertName').innerText = "Please enter name.";
        //form.name.focus();
        return false;
    }
    return true;
}


function checkValidID(form) {
    const id = form.studentID.value;
    if (id.length < 8 && id.length != 0) {
        //최소 8글자
        document.getElementById('alertID').innerText = "Please enter student ID correctly.";
        //form.ID.focus();
        return false;
    } else if (id.length == 0) {
        document.getElementById('alertID').innerText = "Please enter student ID.";
        return false;
    }
    return true;
}

function checkValidPW(form) {
    if (form.password.value == "") {
        document.getElementById('alertPassword').innerText = "Please enter password.";
        //form.name.focus();
        return false;
    }
    return true;
}
