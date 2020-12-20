document.addEventListener('DOMContentLoaded', function() {
	
	const myform = document.querySelector("#rock-capacity-form");
	myform.addEventListener("submit", (event) => {
		event.preventDefault();
	const coh = document.querySelector('#ucs').value;
	const shear = document.querySelector('#shear').value;
	const fos = document.querySelector('#fos').value;
	fetch ('/inputs_rock', {
		method:'POST',
		body:JSON.stringify({
			"UCS":coh,
			"Shear_Strength": shear,
			"Factor_of_Safety": fos,
})
})
.then(response => response.json())
.then(result => {
console.log(result);
view_capacity(result.id);

})
})
})


function view_capacity(id){
	
	fetch(`/rock_capacity_one/${id}`)
	.then(response => response.json())
	.then(capacity => {
		console.log(capacity);
			
		Radian = (0.01745329252 * ((capacity.Shear_Strength/2) + 45)).toFixed(2);
		Nq = ((Math.tan(Radian)) * (Math.tan(Radian))).toFixed(2);
		
		
		qu = (capacity.UCS * (Nq + 1)).toFixed(2);
		qall = (qu / capacity.Factor_of_Safety).toFixed(2);
		
		
		
		
		document.querySelector(`#UlBrCa`).textContent = `${qu}`;
		document.querySelector(`#AlBrCa`).textContent = `${qall}`;
		document.querySelector(`#aresult`).textContent = `${qall} MPa`;
		
		})
		}



 

