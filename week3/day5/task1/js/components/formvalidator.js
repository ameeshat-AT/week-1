import { showToast } from "./utils.js";
export function validator(){
    const formElement = document.getElementById('form');
    let error=0;
    let val=1;
    document.addEventListener('DOMContentLoaded', () => {
    const requirements = {
        Name: [
            {
                type: "required", message: "User name is required"
            },{
                type: "minLength", value: 2, message: "minimus 2 entries are needed"
            }
        ],
        Email: [
            {
                type: "required", message: "please enter the email id"
            },
            {
                type: "email", message: "email format is incorrect"
            }
        ],
        Phone: [
            {
                type: "pattern", value: /^\+?[1-9]\d{1,14}$/, message: "not a valid pattern"

            }
        ],
        message: [
            {
                type: "required", message: "this field is required"
            },
            {
                type: "minLength", value: 20, message: "minimus 20 entries are needed"
            }
        ]
    }
    if(formElement){
    new FormValidator(formElement, requirements);
    }
})
class FormValidator {
    constructor(formElements, rules) {
        this.form = formElements;
        this.rules = rules;
        this.start();
    }
    start() {
        //validate individual field using blur
        Object.keys(this.rules).forEach(fieldName => {
            const field = this.form.elements[fieldName];
            if (field) {
                field.addEventListener('blur', () => this.validateField(field));
            }
        });

        //validate the entire field during submission
        this.form.addEventListener('submit', (event) => {
            const valid = this.validateAll();
            if (!valid) {
                event.preventDefault();
            }
        });
    }
    validateField(field) {
        val=0;
        const fieldName = field.name;
        const fieldRule = this.rules[fieldName] || [];
        const value = field.value.trim();
        let errorMsg = "";
        for (const rule of fieldRule) {
            let parent = field.parentNode;
            let span=parent.querySelector('.errorMsg');
            if(span){
                span.classList.remove('errorMsg')
                span.innerText='';
            }
            const isInvalid = this.checkRule(rule, value);
            if (isInvalid) {
                errorMsg = rule.message || "invalid Field"
                break;
            }
            }
        this.updateUI(field, errorMsg);
        return errorMsg === '';
    }
    checkRule(rule, values){
        if (rule.type !== 'required' && values === '') {
            return false;
        }
        switch (rule.type) {
            case 'required':
                return values === '';
            case 'minLength':
                return values.length < rule.value;
            case 'email':{
                const regExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return (!regExp.test(values));
            }
            case 'pattern':
                return !rule.value.test(values);
            default:
                return false;
        }
    }
    validateAll() {
        let isFormValid = true;
        Object.keys(this.rules).forEach(fieldName => {
            const field = this.form.elements[fieldName]
            if (field) {
                const isFieldValid = this.validateField(field);
                if (!isFieldValid) {
                    isFormValid = false;
                }
            }
        });
        return isFormValid;
    }
    updateUI(field, errorMessage) {
        let parent = field.parentNode;
        let span=document.createElement('span');
        span.classList.add('errorMsg')
        parent.appendChild(span)
        if (errorMessage) {
            span.textContent = errorMessage;
            span.style.display = 'block';
            error=1;
            console.log(error)
        }
        else {
            span.textContent = "";
            span.style.display = 'none';
            error=0;
        }
    }
}
const submit=document.getElementById('submit');
if (submit){
submit.addEventListener('click',(e)=>{
    e.preventDefault();
    if(error===0 && val===0){
    let load=document.createElement('div');
    load.classList.add('loader');
    formElement.appendChild(load);
    setTimeout(()=>{
        load.remove('loader');
        showToast("Success");
    },1500)}
    formElement.reset();
});
}
}