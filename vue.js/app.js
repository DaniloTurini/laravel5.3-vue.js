Vue.filter('doneLabel', function(value){
	if(value == 0){
		return "Não Paga"
	}else{
		return "Paga";
	}
});

Vue.filter('statusGeneral', function(value){
	if (value === false) {
		return "Nenhuma conta cadastrada";
	}

	if (!value) {
		return "Nenhuma conta a pagar";
	}else{
		return "Existem " + value + " contas a serem pagas";
	}
});

var app = new Vue({
	el: "#app",
	data: {
		title: "Contas a pagar",
		menus: [
			{id: 0, name: "Listar contas"},
			{id: 1, name: "Criar conta"}
		],
		activedView: 0,
		formType: 'insert',
		bill: {
			date_due: '',
			name: '',
			value: 0,
			done: false
		},
		names: [
			'Conta de luz',
			'Conta de água',
			'Conta de telefone',
			'Supermercado',
			'Cartão de crédito',
			'Empréstimo',
			'Gasolina'
		],
		bills: [
			{date_due: '20/08/2016', name: 'Conta de luz', value: 70.99, done:true},
			{date_due: '21/08/2016', name: 'Conta de água', value: 55.99, done:false},
			{date_due: '22/08/2016', name: 'Conta de telefone', value: 55.99, done:false},
			{date_due: '23/08/2016', name: 'Supermercado', value: 625.99, done:false},
			{date_due: '24/08/2016', name: 'Cartão de crédito', value: 1500.99, done:false},
			{date_due: '25/08/2016', name: 'Empréstimo', value: 2000.99, done:false},
			{date_due: '26/08/2016', name: 'Gasolina', value: 200, done:false},
		]
	},
	computed: {
		status: function(){
			if(!this.bills.length){
				return false;
			}
			var count = 0;
			for (var i in this.bills) {
				if (!this.bills[i].done){
					count++;
				}
			}
			return count;
		}
	},
	methods: {
		showView: function(id){
			this.activedView = id;
			if(id == 1){
				this.formType = 'insert';
			}
		},
		submit: function(){
			if(this.formType == 'insert'){
				this.bills.push(this.bill);	
			}

			this.bill =  {
				date_due: '',
				name: '',
				value: 0,
				done: false
			};
			
			this.activedView = 0;
		},
		loadBill: function(bill){
			this.bill = bill;
			this.activedView = 1;
			this.formType = 'update';
		},
		deleteBill: function(bill){
			if(confirm('Deseja excluir esta conta?')){
				this.bills.$remove(bill);
			}
		}
	}
});

