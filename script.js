const strengthMeter = document.getElementById('strength-meter')
const passwordInput = document.getElementById('password-input')
const reasonContainer = document.getElementById('reasons')

passwordInput.addEventListener('input',updateStrengthMeter)
updateStrengthMeter()
function updateStrengthMeter(){
    const weaknesses = calculatePasswordStrength
    (passwordInput.value)
    let strength = 100
    reasonContainer.innerHTML =''
    weaknesses.forEach(weaknesses => {
        if(weaknesses == null) return
        strength -= weaknesses.deduction
        const messageElement = document.createElement('div')
        messageElement.innerText = weaknesses.message
        reasonContainer.appendChild(messageElement)
    })
    strengthMeter.style.setProperty('--strength', strength)


    if(strength<=0){
        document.querySelector('#type').innerHTML = "";
    }
    else{
    if(strength < 35){
        document.querySelector('#type').innerHTML = "Weak";
        document.querySelector('#strength-meter #before').style.backgroundColor = "red";
    }else if(strength < 50){
        document.querySelector('#type').innerHTML = "Medium";
        document.querySelector('#strength-meter #before').style.backgroundColor = "rgb(255, 94, 0)";
    }else if(strength < 75){
        document.querySelector('#type').innerHTML = "Medium";
        document.querySelector('#strength-meter #before').style.backgroundColor = "rgb(255, 247, 0)";
    }else if(strength < 100){
        document.querySelector('#type').innerHTML = "Strong";
        document.querySelector('#strength-meter #before').style.backgroundColor = "rgb(0, 255, 0)";
        }
    else if(strength === 100){
        document.querySelector('#box').style.backgroundColor = "transparent";        
        document.querySelector('#box').innerHTML = "Now you have a Strongest Password";
    }}
    // console.log(strength);

    var inpLength = document.querySelector('.password-input').value;
    console.log(inpLength.length);
     
    if(inpLength.length > 0){
        document.querySelector('#strength-meter span').innerHTML = strength + "%";
    }else if(inpLength.length < 0){
        document.querySelector('#strength-meter span').innerHTML = "0%";
    }

    if(inpLength.length<=0){
        document.querySelector("#box").style.display="none";
}
else{
    document.querySelector("#box").style.display="initial";
    
}  
}




function calculatePasswordStrength(password){ 
    const weaknesses = []
    weaknesses.push(lengthWeakness(password))
    weaknesses.push(numberWeakness(password))
    weaknesses.push(specialCharacterWeakness(password))
    weaknesses.push(repeatCharactersWeakness(password))
    weaknesses.push(lowercaseWeakness(password))
    weaknesses.push(uppercaseWeakness(password))

    return weaknesses
}
function lengthWeakness(password){
    const length = password.length

    if(length <= 5){
        return{
            message: '* Your password is too short',
            deduction:40 
        }
    }

    if(length <= 9){
        return{
            message: '* Your password could be longer',
            deduction:15 
        }
    }
}

function lowercaseWeakness(password){ 
    const matches = password.match(/[a-z]/g ) || []

    if (matches.length === 0){
        return{
            message : '* Your password has no lowercase characters',
            deduction:20
        }         
    }

    if( matches.length <= 2){
        return{
            message : ' * Your password could use more lowercase characters',
            deduction:5
        }
    }

      
}

function uppercaseWeakness(password){ 
    const matches = password.match(/[A-Z]/g ) || []

    if (matches.length === 0){
        return{
            message : '* Your password has no UPPERCASE characters',
            deduction:20
        }         
    }

    if( matches.length <= 1){
        return{
            message : '* Your password could use more UPPERCASE characters',
            deduction:5
        }
    }

      
}

function numberWeakness(password){ 
    const matches = password.match(/[0-9]/g ) || []

    if (matches.length === 0){
        return{
            message : '* Your password has no Numbers',
            deduction:20
        }         
    }

    if( matches.length <= 2){
        return{
            message : '* Your password could use more Numbers',
            deduction:5
        }
    }

      
}

function specialCharacterWeakness(password){ 
    const matches = password.match(/[^0-9a-zA-Z\s]/g ) || []

    if (matches.length === 0){
        return{
            message : '* Your password has no Special Characters',
            deduction:20
        }         
    }

    if( matches.length <= 1){
        return{
            message : ' * Your password could use more Special Characters',
            deduction:5
        }
    }

      
}

function repeatCharactersWeakness(password){
    const matches = password.match(/(.)\1/g) || []
    if (matches.length >0){
        return{
            message : '* Your  password has repeated characters',
            deduction: matches.length * 10
        }
    }
}

