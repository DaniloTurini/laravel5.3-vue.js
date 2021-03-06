window.billReceiveCreateComponent = Vue.extend({
    template: `
		<form name="form" @submit.prevent="submit">
			<label>Vencimento:</label>
			<input type="text" v-model="bill.date_due"/>
			<br/><br/>
			<label>Nome:</label>
			<select v-model="bill.name">
				<option v-for="o in names" :value="o">{{ o }}</option>
			</select>
			<br/><br/>
			<label>Valor:</label>
			<input type="text" v-model="bill.value"/>
			<br/><br/>
			<label>Recebida?</label>
			<input type="checkbox" v-model="bill.done"/>
			<br/><br/>
			<input type="submit" value="Enviar"/>
		</form>
	`,
    data: function () {
        return {
            formType: 'insert',
            names: [
                'Salário',
                'Venda de Mesa',
                'Venda de Telefone',
                'Prestação de Serviços',
            ],
            bill:  {
                date_due: '',
                name: '',
                value: 0,
                done: false
            }
        };
    },
    created: function () {
        if (this.$route.name == 'bill-receive.update'){
            this.formType = 'update';
            this.getBill(this.$route.params.id);
        }
    },
    created: function () {
        if (this.$route.name == 'bill-receive.update'){
            this.formType = 'update';
            this.getBill(this.$route.params.id);
        }
    },
    methods: {
        submit: function(){
            var self = this;
            if(this.formType == 'insert'){
                BillReceive.save({},this.bill).then(function (response) {
                    self.$dispatch('change-info');
                    self.$router.go({name: 'bill-receive.list'});
                });
            } else {
                BillReceive.update({id: this.bill.id},this.bill).then(function (response) {
                    self.$dispatch('change-info');
                    self.$router.go({name: 'bill-receive.list'});
                });
            }
        },
        getBill: function (id){
            var self = this;
            BillReceive.get({id: id}).then(function (response) {
                self.bill = response.data;
            })
        }
    }
});
