window.dashboardComponent = Vue.extend({
    template: `
        <h1>{{ title }}</h1>
        <h2>
            <small>A receber</small> <br>
            R$ {{ statusBillsReceive }}
        </h2>
        <h2>
            <small>A pagar</small> <br>
            R$ {{ statusBillsPay }}
        </h2>

        <menu-component></menu-component>
        <router-view></router-view>
    `,
    data: function() {
        return {
            title: 'Dashboard',
        };
    },
    computed: {
        statusBillsReceive: function() {
            var bills = this.$root.$children[0].billsReceive;
            var total = 0;

            for (var i in bills) {
                if (bills[i].done == false){
                    total = total + bills[i].value;
                }
            }
            return total.toFixed(2).replace('.',',');
        },
        statusBillsPay: function() {
            var bills = this.$root.$children[0].billsPay;
            var total = 0;

            for (var i in bills) {
                if (bills[i].done == false){
                    total = total + bills[i].value;
                }
            }
            return total.toFixed(2).replace('.',',');
        }
    }
});
