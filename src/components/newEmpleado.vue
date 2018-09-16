<template>
	<div id="new-empleado">
		<h3>Nuevo empleado</h3>
		<div class="row">
			<form @submit.prevent="saveEmpleado" class="col s12">
				<div class="row">
					<div class="input-field col s12">
						<input type="text" v-model="empleado_id" required>
						<label>Empleado ID#</label>
					</div>
				</div>
				<div class="row">
					<div class="input-field col s12">
						<input type="text" v-model="nombre" required>
						<label>Nombre</label>
					</div>
				</div>
				<div class="row">
					<div class="input-field col s12">
						<input type="text" v-model="departamento" required>
						<label>Departamento</label>
					</div>
				</div>
				<div class="row">
					<div class="input-field col s12">
						<input type="text" v-model="posicion" required>
						<label>Posición</label>
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
		name: 'new-empleado',
		data () {
			return{
				empleado_id: null,
				nombre: null,
				departamento: null,
				posicion: null
			}
		},
		methods: {
			saveEmpleado() {
				db.collection('empleados').add({
					empleado_id: this.empleado_id,
					nombre: this.nombre,
					departamento: this.departamento,
					posicion: this.posicion
				})
				.then(docRef => {
					this.$router.push('/')
				})
				.catch(err => console.log(err))
			}
		}
	}
</script>