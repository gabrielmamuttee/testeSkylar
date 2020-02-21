const STORAGE_KEY = 'contactList';
var app = new Vue({
    el: '#app',
    data: {
        errorMsg: '',
        successMsg: '',
        showAddModal: false,
        showEditModal: false,
        showDeleteModal: false,
        uid: '',
        name: '',
        email: '',
        telephone: '',
        contacts: [],
    },
    mounted(){
        if(localStorage.getItem(STORAGE_KEY)){
            try{
                this.contacts = JSON.parse(localStorage.getItem(STORAGE_KEY))
            } catch(e) {
                app.errorMsg = e;
                localStorage.removeItem(STORAGE_KEY);
            }
        }
    },
    watch: {
        contacts: {
            //Keep watching for changes in the contacts array, if anything changes, it automatically updates the contactList JSON array
            handler(){
                console.log('Contacts changed');
                localStorage.setItem(STORAGE_KEY, JSON.stringify(this.contacts))
            },
            deep: true,
        },
    },
    methods: {
        getContact(contactId){
            this.uid = contactId;
            this.name = this.contacts[contactId].name;
            this.email = this.contacts[contactId].email;
            this.telephone = this.contacts[contactId].telephone;
        },
        clearCurrentContact(){
            this.uid = '';
            this.name = '';
            this.email = '';
            this.telephone = '';
        },
        addContact(){
            //If the contact array is null id = 0, if not, search the last item in array and sum + 1 into the id
            var identifier = '';
            if(this.contacts.length == '0'){
                identifier = '0';
            } else {
                identifier = parseInt((this.contacts[this.contacts.length - 1].id + 1));
            }
            this.contacts.push({
                id: identifier,
                name: this.name,
                email: this.email,
                telephone: this.telephone});
            app.clearCurrentContact();
            app.successMsg = 'Contact added successfully!';
        },
        removeContact(contactId){
            if(confirm('Do you really want to delete ' + this.contacts[contactId].name + '?')){
                this.$delete(this.contacts, contactId);
                app.successMsg = 'Contact removed successfully!';
            } else {
                app.errorMsg = 'Delete canceled';
            }
            app.clearCurrentContact();
        },
        editContact(){
            this.contacts[this.uid].name = this.name;
            this.contacts[this.uid].email = this.email;
            this.contacts[this.uid].telephone = this.telephone;
            app.clearCurrentContact();
        }
    }
})