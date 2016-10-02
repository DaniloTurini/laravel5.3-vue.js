window.dashboardComponent = Vue.extend({
    template: `
        <h1>{{ title }}</h1>
        <h2>
            <small>A receber</small> <br>
            {{ totalReceive | currency 'R$ ' }}
        </h2>
        <h2>
            <small>A pagar</small> <br>
            {{ totalPay | currency 'R$ ' }}
        </h2>

        <menu-component></menu-component>
        <router-view></router-view>
    `,
    data: function() {
        return {
            title: 'Dashboard',
            totalReceive: 0,
            totalPay: 0
        };
    },
    created: function() {
        this.statusBillsReceive();
        this.statusBillsPay();
    },
    methods: {
        statusBillsReceive: function() {
            var self = this;
            BillReceive.total().then(function (response) {
                self.totalReceive = response.data.total;
            });
        },
        statusBillsPay: function() {
            var self = this;
            Bill.total().then(function (response) {
                self.totalPay = response.data.total;
            });
        }
    }
});
