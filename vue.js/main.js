var router = new VueRouter();
var mainComponent = Vue.extend({
	components: {
		'bill-component': billComponent
	},
	template: '<bill-component></bill-component>',
	data: function () {
		return {
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
			'/:id/create': {
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
			'/:id/create': {
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