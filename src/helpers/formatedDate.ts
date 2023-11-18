function fortmateDate() {
    // Crear un objeto Date para obtener la fecha actual
    const fechaActual = new Date();
  
    // Obtener los componentes de la fecha
    const año = fechaActual.getFullYear();
    const mes = fechaActual.getMonth() + 1; // Los meses en JavaScript van de 0 a 11
    const dia = fechaActual.getDate();
    const horas = fechaActual.getHours();
    const minutos = fechaActual.getMinutes();
    const segundos = fechaActual.getSeconds();
  
    // Formatear la fecha como una cadena
    const fechaFormateada = `${año}-${mes < 10 ? '0' : ''}${mes}-${dia < 10 ? '0' : ''}${dia} ${horas}:${minutos}:${segundos}`;
  
    return fechaFormateada;
  }
  
export default fortmateDate
  