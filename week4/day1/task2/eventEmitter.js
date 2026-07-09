class EventEmitter{
    constructor(){
        this.events={};
    }
    on(event,listener){
        if(!this.events[event])
            this.events[event]=[];
        this.events[event].push(listener);
        // return this;
    }
    emit(event,...args){
        if(this.events[event])
             this.events[event].forEach(listener=>listener(...args));
        if(event!=='*' && this.events['*']){
            this.events['*'].forEach(listener=>listener(event,...args));
        }
        // return this;
    }
    off(event,listener){
        if(!this.events[event])
            return;
        this.events[event]= this.events[event].filter(l=>l!==listener);
        // return this;
    }
    once(event,listener){
        const wrapper=(...args)=>
        {
            this.off(event,wrapper);
            listener(...args);

        };
        this.on(event,wrapper);
        // return this;
    }
}
const emitter=new EventEmitter();
class UserStore extends EventEmitter{
    constructor(){
        super();
        this.users=[];
    }
    addUser(username){
        this.users.push(username);
        this.emit('userAdded',username);
    }
    removeUser(username){
        this.users=this.users.filter(u=>u!==username);
        this.emit('userRemoved',username);
    }
    updateUser(oldName,newName){
        let index=this.users.indexOf(oldName);
        if(index !==-1){
            this.users[index]=newName;
            this.emit('userUpdated',newName);
        }
    }
}
const myUser=new UserStore();
myUser.on('*',(eventName,data)=>{
    console.log(`Event ${eventName}  data=${data}`);
})
myUser.once('userAdded',(name)=>console.log(`${name}is our first user`));
myUser.addUser('geetha');
myUser.updateUser('geetha','Alice');
myUser.removeUser('Alice');
myUser.on('userAdded',(name)=>{
    console.log(`welcome ${name}`);
})
myUser.once('userAdded',(name)=>{
    console.log(`${name} is our first gust`);
})
myUser.on('userRemoved',(name)=>{
    console.log(`thankyou ${name}`);
})
myUser.on('userUpdated',(name)=>{
    console.log(`welcome ${name}`);
})
