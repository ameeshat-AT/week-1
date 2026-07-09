function createUser({name,email,role='viewer',createdAt=Date.now()}){
    if(!name||typeof name!=='string')
        throw new Error("valid name string is required");
    if(!email||typeof email!="string"||!email.includes('@'))
        throw new Error('valid mail required');
    user={
        name:name,email:email,role:role,createdAt:createdAt,id:crypto.randomUUID()
    };
    return Object.freeze(user)
}
const freezedUser=createUser({name:"Akhil",email:"akhi@gmail.com"});
console.log(freezedUser);
freezedUser[name]="anu";
console.log(freezedUser);

class QueryBuilder{
    constructor(){
        this.table='';
        this.condition=[];
        this.fields='*';
        this.l=null;
    }
    form(table){
        this.table=table;
        return this;
    }
    select(field){
        this.fields=Array.isArray(field)?field.join(', '):field;
        return this;
    }
    where(cond){
        this.condition.push(cond);
        return this;
    }
    limit(val){
        this.l=val;
        return this;
    }
    bind(){
        let query=`Select ${this.fields} from ${this.table}`;
        if(this.condition.length>0){
            query+=` where ${this.condition.join('AND')}`;
        }
        if(this.l!==null)
            query+=` limit ${this.l}`;

        return query+';'
    }
}
const User=new QueryBuilder();
console.log(User.form("user").select(['salary','age']).where('salary>500').limit(5).bind());

function createNotification({type="info",message="systemUpdate",duration=3000,dismissible='true'}={}){
    return{
        type,
        message,
        duration,
        dismissible,
        show(){
            console.log(`${type} Notification:${message} Duration:${duration} dismissible:${dismissible}`);
        }
    };
}
const initialCall=createNotification();
initialCall.show();
const secondCall=createNotification({type:"error",message:"Failed to save",duration:300,dismissible:'false'})
secondCall.show();