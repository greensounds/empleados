<template>
	<div id="view-empleado">
		<ul class="collection with-header">
			<li class="collection-header"><h4>{{nombre}}</h4></li>
			<li class="collection-item">Número de id: {{empleado_id}}</li>
			<li class="collection-item">Departamento: {{departamento}}</li>
			<li class="collection-item">Posición: {{posicion}}</li>
		</ul>
		<router-link to="/" class="btn grey">Atrás</router-link>
		<button @click="deleteEmpleado" class="btn red">Eliminar</button>
		<div class="fixed-action-btn">
			<router-link v-bind:to="{name: 'edit-empleado', params:{empleado_id: empleado_id}}" class="btn-floating btn-large red">
				<i class="fa fa-pencil"></i>
			</router-link>
		</div>
	</div>
</template>

<script>
	import db from './firebaseInit';
	export default {
		name: 'view-empleado',
		data () {
			return{
				empleado_id: null,
				nombre: null,
				departamento: null,
				posicion: null
			}
		},
		beforeRouteEnter(to, from, next) {
			db.collection('empleados').where('empleado_id',
			'==', to.params.empleado_id).get()
				.then(querySnapshot => {
					querySnapshot.forEach(doc => {
						next(vm => {
							vm.empleado_id = doc.data().empleado_id
							vm.nombre = doc.data().nombre
							vm.departamento = doc.data().departamento
							vm.posicion = doc.data().posicion
						})
					})
				})
		},
		watch: {
			'$route': 'fetchData'
		},
		methods: {
			fetchData () {
				db.collection('empleados').where('empleado_id', '==', this.$route.params.empleado_id).get()
					.then(querySnapshot => {
						querySnapshot.forEach(doc => {
							this.empleado_id = doc.data().empleado_id
							this.nombre = doc.data().nombre
							this.departamento = doc.data().departamento
							this.posicion = doc.data().posicion
						})
					})
			},
			deleteEmpleado() {
				if(confirm('Estás seguro?')) {
					db.collection('empleados').where('empleado_id', '==', this.$route.params.empleado_id).get()
					.then(querySnapshot => {
						querySnapshot.forEach(doc => {
							doc.ref.delete()
							this.$router.push('/')
						})
					})
				}
			}
		}
	}
</script>