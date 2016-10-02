window.billReceiveListComponent = Vue.extend({
    template: `
		<style type="text/css">
			.recebido{
				color: green;
			}
			.receber{
				color: red;
			}
		</style>
		<table border="1" cellpadding="10">
			<thead>
				<tr>
					<th>#</th>
					<th>Vencimento</th>
					<th>Nome</th>
					<th>Valor</th>
					<th>Recebida?</th>
					<th>Ações</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(index,o) in bills">
					<td>{{ index + 1 }}</td>
					<td>{{ o.date_due }}</td>
					<td>{{ o.name }}</td>
					<td>{{ o.value  | currency 'R$ ' 2}}</td>
					<td class="minha-classe" :class="{'recebido': o.done, 'receber': !o.done}">
						{{ o.done | doneReceiveLabel }}
					</td>
					<td>
						<a v-link="{ name: 'bill-receive.update', params: {id: o.id}}">Editar</a> |
						<a href="#" @click.prevent="deleteBill(o)">Excluir</a>
					</td>
				</tr>
			</tbody>
		</table>
	`,
    data: function () {
        return {
            bills: []
        };
    },
    created: function () {
        var self = this;
        BillReceive.query().then(function (response) {
            self.bills = response.data;
        })
    },
    methods: {
        deleteBill: function(bill){
            if(confirm('Deseja excluir esta conta?')){
                var self = this;
                BillReceive.delete({id: bill.id}).then(function (response) {
                    self.bills.$remove(bill);
                    self.$dispatch('change-info');
                });
            }
        }
    }
});
