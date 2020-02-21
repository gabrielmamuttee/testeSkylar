const STORAGE_KEY = 'contactList';
var app = new Vue({
    el: '#app',
    data: {
        errorMsg: '',
        successMsg: '',
        showAddModal: false,
        showEditModal: false,
        showDeleteModal: false,
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
                errorMsg = e;
                localStorage.removeItem(STORAGE_KEY);
            }
        }
    },
    watch: {
        contacts: {
            handler(){
                console.log('Contacts changed');
                localStorage.setItem(STORAGE_KEY, JSON.stringify(this.contacts))
            },
            deep: true,
        },
    },
    methods: {
        addContact(){
            //If the contact array is null id = 0, if not, search the last item in array and sum + 1 into the id
            var identifier = '';
            if(this.contacts.length == '0'){
                identifier = '0';
            } else {
                identifier = parseInt((this.contacts[this.contacts.length - 1].id + 1));
            }
            console.log(identifier);
            this.contacts.push({
                id: identifier,
                name: this.name,
                email: this.email,
                telephone: this.telephone});
            this.name = '';
            this.email = '';
            this.telephone = '';
        },
        removeContact(contactId){
            this.$delete(this.contacts, contactId);
        },
    }
})