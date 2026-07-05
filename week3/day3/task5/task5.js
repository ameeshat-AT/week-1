document.addEventListener('DOMContentLoaded',()=>{
    const formElement=document.getElementById('form');
    const requirements={
    Name:[
        {
            type:"required" ,message:"User name is required"
        }
    ],
    Age:[
        {
            type:"required",message:"please fill the age field"
        },
        {
            type:"custom" ,
            value:(val)=>Number(val)>=0,
            message: 'Age cannot be negative.' 
        }
    ],
    Email:[
        {
            type:"required",message:"please enter the email id"
        },
        {
            type:"email" ,message:"email format is incorrect"
        }
    ],
    Password:[
        {
            type:"required",message:"this field is required"
        },
        {
            type:"pattern" ,value:/^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).+$/,message:"password aontain an uppercase,an lowercase and a number"

        },{
            type:"minLength", value:8,message:"minimus 8 entries are needed"
        },
        {
            type:"maxLength", value:20,message:"only 20 charectors are allowed"
        }
    ],
    conformPassword:[
         {
            type:"required",message:"this field is required"
        },
        {
            type:"match" ,value:"Password",message:"Password doesn't match"

        }
    ]
}
const validator=new FormValidator(formElement,requirements);
})
class FormValidator{
    constructor(formElements,rules){
        this.form=formElements;
        this.rules=rules;
        this.start();
    }
    start()
    {
        //validate individual field using blur
        Object.keys(this.rules).forEach(fieldName=>{
            const field=this.form.elements[fieldName];
            if(field)
            {
                field.addEventListener('blur',()=>this.validateField(field));
            }
        });

        //validate the entire field during submission
        this.form.addEventListener('submit',(event)=>{
            const valid=this.validateAll();
            if(!valid){
                event.preventDefault();
            }
        });
    }
    validateField(field){
        const fieldName=field.name;
        const fieldRule=this.rules[fieldName]||[];
        const value=field.value.trim();
        console.log(value);
        let errorMsg="";
        for(const rule of fieldRule){
            const isInvalid=this.checkRule(rule,value);
            if(isInvalid){
                errorMsg=rule.message||"invalid Field"
                break;
            }
        }
    this.updateUI(field,errorMsg);
    return errorMsg ==='';
    }
    checkRule(rule,values){
        if(rule.type!=='required' && values==='')
        {
            return false;
        }
        switch(rule.type){
            case 'required':
                return values==='';
            case 'minLength':
                return values.length<rule.value;
            case 'maxLength':
                return values.length>rule.value;
            case 'email':
                const regExp=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return(!regExp.test(values));
            case 'pattern':
                return !rule.value.test(values);
            case 'custom':
                return !rule.value(values);
            case 'match':
                const otherField=this.form.elements[rule.value];
                return otherField?values!==otherField.value.trim():true;
            default:
                return false;
        }
    }
    validateAll(){
        let isFormValid=true;
        Object.keys(this.rules).forEach(fieldName=>{
            const field=this.form.elements[fieldName]
            if(field){
                const isFieldValid=this.validateField(field);
                if(!isFieldValid){
                    isFormValid=false;
                }
            }
        });
        return isFormValid;
    }
    updateUI(field,errorMessage){
        let errorSpan=field.parentNode.querySelector('span');
        if(!errorSpan){
            errorSpan=document.createElement('span');
            errorSpan.className='error';
            field.parentNode.appendChild(errorSpan)
        }
        console.log(errorSpan);
        if(errorMessage){
            field.classList.add('isInvalid');
            field.classList.remove('isValid');
            errorSpan.textContent=errorMessage;
            errorSpan.style.display='block';
        }
        else{
            field.classList.remove('isInvalid');
            field.classList.add('isValid');
            errorSpan.textContent="";
            errorSpan.style.display='none';
        }
    }
}

