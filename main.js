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
            this.contacts.push({
                id: this.contacts.length,
                name: this.name,
                email: this.email,
                telephone: this.telephone});
            this.name = '';
            this.email = '';
            this.telephone = '';
        },
    }
})