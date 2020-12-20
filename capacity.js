document.addEventListener('DOMContentLoaded', function() {
	const myform = document.querySelector("#soil-capacity-form");
	myform.addEventListener("submit", (event) => {
		event.preventDefault();
  const coh = document.querySelector('#cohesion').value;
  const shear = document.querySelector('#shearing').value;
  const length = document.querySelector('#length').value;
  const depth = document.querySelector('#depth').value;
  const width = document.querySelector('#width').value;
  const inclination = document.querySelector('#inclination').value;
  const wateruw= document.querySelector('#uw_water').value;
  const gwd = document.querySelector('#gw_depth').value;
  const dsouw= document.querySelector('#duw_soil').value;
  const sasuw= document.querySelector('#suw_soil').value;
  const uwbf = document.querySelector('#uw_below_fnd').value;
  const fos = document.querySelector('#fos').value;
  fetch ('/inputs', {
  	method: 'POST',
  body: JSON.stringify({
  	"Cohesion": coh,
  "Shear_Strength": shear,
  "Length": length,
  "Depth": depth,
  "Width": width,
  "Inclination": inclination,
  "Water_Unit_Weight": wateruw,
  "Ground_Water_Depth": gwd,
  "Dry_Soil_Unit_Weight": dsouw,
  "Saturated_Soil_Unit_Weight": sasuw,
  "Unit_Weight_Below_Foundation": uwbf,
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
	fetch(`/all_capacity_one/${id}`)
	.then(response => response.json())
	.then(capacity => {
		console.log(capacity);
		
		
		Shearing_Resistance_in_Radian = (0.01745329252 * capacity.Shear_Strength).toFixed(2);
		rad = 0.01745329252 * ((capacity.Shear_Strength/2) + 45);
		Nq = ((Math.tan(rad)) * (Math.tan(rad)) * (2.71 ** (3.41 *  Shearing_Resistance_in_Radian))).toFixed(2);
		Nc = ((Nq - 1) / (Math.tan(Shearing_Resistance_in_Radian))).toFixed(2);
		Ng = (2 * (Nq + 1) * (Math.tan(Shearing_Resistance_in_Radian))).toFixed(2);
		
		
	
		
		Fcs = (1 + (( capacity.Width/capacity.Length) * (Nq/Nc))).toFixed(2);
		Fqs = (1 + (( capacity.Width/capacity.Length) * (Math.tan(Shearing_Resistance_in_Radian)))).toFixed(2);
		Fgs = (1- (0.4 * ( capacity.Width/capacity.Length))).toFixed(2);
		Fcd = 1 + (0.4*(capacity.Depth/capacity.Width)).toFixed(2);
		Fqd = 1 + ((2 * Math.tan(Shearing_Resistance_in_Radian)) * (1 - Math.sin(Shearing_Resistance_in_Radian)) * (1 - Math.sin(Shearing_Resistance_in_Radian)) * (capacity.Depth/capacity.Length)).toFixed(2);
		Fgd = 1;
		Fci = (1 - (capacity.Inclination/90)) * (1 - (capacity.Inclination/90)).toFixed(2);
		Fqi = (1 - (capacity.Inclination/90)) * (1 - (capacity.Inclination/90)).toFixed(2);
		Fgi = (1 - (capacity.Inclination/Shearing_Resistance_in_Radian)) * (1 - (capacity.Inclination/Shearing_Resistance_in_Radian)).toFixed(2);
		
		
		q1 = ((capacity.Dry_Soil_Unit_Weight * capacity.Ground_Water_Depth) + ((capacity.Saturated_Soil_Unit_Weight - capacity.Water_Unit_Weight)*(capacity.Depth - capacity.Ground_Water_Depth))).toFixed(2);
		qu1 = ((capacity.Cohesion * Nc * Fcs * Fcd * Fci) + (q1 * Nq * Fqs *Fqd *Fqi) + (0.5 * capacity.Unit_Weight_Below_Foundation * capacity.Length * Ng * Fgs * Fgd *Fgi)).toFixed(2);
		qall1 = (qu1 / capacity.Factor_of_Safety).toFixed(2);
		qall_net1 = ((qu1 - q1) / capacity.Factor_of_Safety).toFixed(2);
		
		
		q2 =(((capacity.Saturated_Soil_Unit_Weight - capacity.Water_Unit_Weight)+(((capacity.Ground_Water_Depth - capacity.Depth)/capacity.Length)*(capacity.Dry_Soil_Unit_Weight - capacity.Saturated_Soil_Unit_Weight + capacity.Water_Unit_Weight ))) * capacity.Depth).toFixed(2);
		qu2 = ((capacity.Cohesion * Nc * Fcs * Fcd * Fci) + (q2 * Nq * Fqs *Fqd *Fqi) + (0.5 * capacity.Unit_Weight_Below_Foundation * capacity.Length * Ng * Fgs * Fgd *Fgi)).toFixed(2);
		qall2 = (qu2 / capacity.Factor_of_Safety).toFixed(2);
		qall_net2 = ((qu2 - q2) / capacity.Factor_of_Safety).toFixed(2);
		
		
		
		q3 = (capacity.Dry_Soil_Unit_Weight * capacity.Depth).toFixed(2);
		qu3 = ((capacity.Cohesion * Nc * Fcs * Fcd * Fci) + (q3 * Nq * Fqs *Fqd *Fqi) + (0.5 * capacity.Unit_Weight_Below_Foundation * capacity.Length * Ng * Fgs * Fgd * Fgi)).toFixed(2);
		qall3 = (qu3 / capacity.Factor_of_Safety).toFixed(2);
		qall_net3 = ((qu3 - q3) / capacity.Factor_of_Safety).toFixed(2);
		
    
     if (capacity.Ground_Water_Depth < capacity.Depth){
 	
     
     document.querySelector(`#fdepth`).textContent = `${capacity.Depth}`;
     document.querySelector(`#fwidth`).textContent = `${capacity.Width}`;
     document.querySelector(`#UlBrCa`).textContent = `${qu1}`;
     document.querySelector(`#AlBrCa`).textContent = `${qall1}`;
     document.querySelector(`#NtBrCa`).textContent = `${qall_net1}`;
     document.querySelector(`#aresult`).textContent = `${qall_net1} kPa`;
     document.querySelector(`#bresult`).textContent = `${qall_net1 - 30} kPa`;
     document.querySelector(`#cresult`).textContent = `${capacity.Depth} m`;
     
 } else if ((capacity.Depth < capacity.Ground_Water_Depth) && (capacity.Ground_Water_Depth < (capacity.Depth + capacity.Width))){
 	
     
     document.querySelector(`#fdepth`).textContent = `${capacity.Depth}`;
     document.querySelector(`#fwidth`).textContent = `${capacity.Width}`;
     document.querySelector(`#UlBrCa`).textContent = `${qu2}`;
     document.querySelector(`#AlBrCa`).textContent = `${qall2}`;
     document.querySelector(`#NtBrCa`).textContent = `${qall_net2}`;
     document.querySelector(`#aresult`).textContent = `${qall_net2} kPa`;
     document.querySelector(`#bresult`).textContent = `${qall_net2 - 30} kPa`;
     document.querySelector(`#cresult`).textContent = `${capacity.Depth} m`;
    
 } else if(capacity.Depth_Ground_Water_Table > (capacity.Depth + capacity.Width)){
 	
     
     document.querySelector(`#fdepth`).textContent = `${capacity.Depth}`;
     document.querySelector(`#fwidth`).textContent = `${capacity.Width}`;
     document.querySelector(`#UlBrCa`).textContent = `${qu3}`;
     document.querySelector(`#AlBrCa`).textContent = `${qall3}`;
     document.querySelector(`#NtBrCa`).textContent = `${qall_net3}`;
     document.querySelector(`#aresult`).textContent = `${qall_net3} kPa`;
     document.querySelector(`#bresult`).textContent = `${qall_net3 - 30} kPa`;
     document.querySelector(`#cresult`).textContent = `${capacity.Depth} m`;
     
 }
    
    })
    }



    












 


