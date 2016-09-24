var router = new VueRouter();
var mainComponent = Vue.extend({
	components: {
		'bill-component': billComponent
	},
	template: '<bill-component></bill-component>',
	data: function () {
		return {
			billsPay: [
				{date_due: '20/08/2016', name: 'Conta de luz', value: 70.99, done: true},
				{date_due: '21/08/2016', name: 'Conta de água', value: 55.99, done: false},
				{date_due: '22/08/2016', name: 'Conta de telefone', value: 55.99, done: false},
				{date_due: '23/08/2016', name: 'Supermercado', value: 625.99, done: false},
				{date_due: '24/08/2016', name: 'Cartão de crédito', value: 1500.99, done: false},
				{date_due: '25/08/2016', name: 'Empréstimo', value: 2000.99, done: false},
				{date_due: '26/08/2016', name: 'Gasolina', value: 200, done: false},
			],
			billsReceive: [
				{date_due: '20/10/2016', name: 'Salário', value: 3000.00, done: true},
				{date_due: '21/10/2016', name: 'Venda de Mesa', value: 650.50, done: false},
				{date_due: '22/10/2016', name: 'Venda de Telefone', value: 325.00, done: false},
				{date_due: '23/10/2016', name: 'Prestação de Serviços', value: 1500.00, done: false}
			]
		}
	}
});

router.map({
	'/bill-pays': {
		component: billPayComponent,
		subRoutes: {
			'/': {
				name: 'bill-pay.list',
				component: billPayListComponent
			},
			'/create': {
				name: 'bill-pay.create',
				component: billPayCreateComponent
			},
			'/:index/create': {
				name: 'bill-pay.update',
				component: billPayCreateComponent
			}
		}
	},
	'/bill-receive': {
		name: 'bill-receive',
		component: billReceiveComponent,
		subRoutes: {
			'/': {
				name: 'bill-receive.list',
				component: billReceiveListComponent
			},
			'/create': {
				name: 'bill-receive.create',
				component: billReceiveCreateComponent
			},
			'/:index/create': {
				name: 'bill-receive.update',
				component: billReceiveCreateComponent
			}
		}
	},
	'/dashboard':{
		component: dashboardComponent,
		name: 'dashboard'
	},
	'*': {
		component: dashboardComponent
	}
});

router.start({
	components: {
		'main-component': mainComponent
	}
}, '#app');

router.redirect({
	'*': '/dashboard'
});