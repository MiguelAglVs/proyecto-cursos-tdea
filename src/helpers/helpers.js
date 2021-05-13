const hbs = require('hbs');

hbs.registerHelper('listar', (cursos) => {
	let texto = ''
	cursos.forEach(cur => {
		texto = texto +
			'<tr>' +
			'<td>' + cur.idcurso + '</td>' +
			'<td>' + cur.nombre + '</td>' +
			'<td>' + cur.modalidad + '</td>' +
			'<td>' + cur.valor + '</td>' +
			'<td>' + cur.intencidad + '</td>' +
			'<td>' + cur.descripcion + '</td>' +
			'<td>' + cur.estado + '</td></tr>'
	});
	texto = texto + '<tbody><table>';
	return texto;
})

hbs.registerHelper('verCursos', (cursos) => {
	let texto = ''
	cursos.forEach(cur => {
		texto = texto +
			`<tr>
			<td>${cur.idcurso}</td>
			<td>${cur.nombre}</td>
			<td>${cur.modalidad}</td>
			<td>${cur.valor}</td>
			<td>${cur.intencidad}</td>
			<td>${cur.descripcion}</td>
			<td>${cur.estado}</td>
			<td><button type="submit" class="form-control btn btn-success btn-sm" name="idcurso" value="${cur.idcurso}"><i class="fas fa-pen"></i></button></td></tr>`
	});
	texto = texto + '<tbody><table>';
	return texto
})

//------
hbs.registerHelper('listarInscritos', (inscritos) => {
	let texto = ''
	inscritos.forEach(insc => {
		let texto2 = ''
		insc.nomCurso.forEach(curso=>{
			texto = texto +
			`<tr>
			<td>${insc.documento}</td>
			<td>${insc.nombre}</td>
			<td>${insc.correo}</td>
			<td>${insc.telefono}</td>
			<td>${curso.nombre}</td>`
		})
	});
	texto = texto + '<tbody><table>';
	return texto;
})

hbs.registerHelper('verIns', (inscritos) => {
	let texto = ''
	inscritos.forEach(insc => {
		texto = texto +
			`<tr>
			<td>${insc.documento}</td>
			<td>${insc.nombre}</td>
			<td>${insc.correo}</td>
			<td>${insc.telefono}</td>
			<td><button type="submit" class="form-control btn btn-danger btn-sm" name="documento" value="${insc.documento}"><i class='fas fa-trash'></i></button></td></tr>`
	});
	texto = texto + '<tbody><table>';
	return texto;
})

hbs.registerHelper('listacursos', (cursos) => {
	let texto = '<select name="nomCurso" class="form-control"><option selected disabled>--SELECIONAR--</option>';
	cursos.forEach(encontrar => {
		texto = `${texto} <option value='${encontrar._id}'>${encontrar.nombre}</option>`
	})
	texto = texto + '</select>'
	return texto
})

hbs.registerHelper('listar2', (cursos) => {
	let texto = "<div class='accordion' id='accordionExample'>";
	i = 1;
	cursos.forEach(cur => {
		texto = texto +
			`<div class="accordion" id="accordionExample">
				<div class="accordion-item">
					<h2 class="accordion-header" id="heading${i}">
						<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${i}" aria-expanded="false" aria-controls="collapse${i}">
						${cur.nombre}
						</button>
					</h2>
					<div id="collapse${i}" class="accordion-collapse collapse" aria-labelledby="heading${i}" data-bs-parent="#accordionExample">
						<div class="accordion-body">
							<div class="table-responsive">
								<table class="table table-striped table-hover">
									<thead class="thead-color">
										<th>Id</th>
										<th>Nombre</th>
										<th>Modalidad</th>
										<th>Valor</th>
										<th>Intencidad</th>
										<th>Descripción</th>
										<th>Estado</th>
									</thead>
									<tbody>
										<tr>
											<td>${cur.idcurso}</td>
											<td> ${cur.nombre}</td>
											<td> ${cur.modalidad}</td>
											<td> ${cur.valor}</td>
											<td> ${cur.intencidad}</td>
											<td> ${cur.descripcion}</td>
											<td> ${cur.estado}</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>`
		i++;
	})
	texto = texto + '</div>';
	return texto;
})

hbs.registerHelper('eliminar', () => {
})