<template>
	<div id="edit-empleado">
		<h3>Editar empleado</h3>
		<div class="row">
			<form @submit.prevent="updateEmpleado" class="col s12">
				<div class="row">
					<div class="input-field col s12">
						<input disabled type="text" v-model="empleado_id" required>
						
					</div>
				</div>
				<div class="row">
					<div class="input-field col s12">
						<input type="text" v-model="nombre" required>
						
					</div>
				</div>
				<div class="row">
					<div class="input-field col s12">
						<input type="text" v-model="departamento" required>
						
					</div>
				</div>
				<div class="row">
					<div class="input-field col s12">
						<input type="text" v-model="posicion" required>
						
					</div>
				</div>
				<button type="submit" class="btn">Submit</button>
				<router-link to="/" class="btn grey">Cancelar</router-link>
			</form>
		</div>
	</div>
</template>

<script>
import db from './firebaseInit'
	export default {
		name: 'edit-empleado',
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
			updateEmpleado() {
				db.collection('empleados').where('empleado_id', '==', this.$route.params.empleado_id).get()
					.then(querySnapshot => {
						querySnapshot.forEach(doc => {
							doc.ref.update({
								empleado_id: this.empleado_id,
								nombre: this.nombre,
								departamento: this.departamento,
								posicion: this.posicion
							})
						})
					})
					.then(() => {
						this.$router.push({name: 'view-empleado',
						params: { empleado_id: this.empleado_id }
						})
					})
			}
		}
	}
</script>