const nombreCompuesto = value => {
    if (value === undefined || value === null || value === '') {
        return true;
    }

    return /^(?! )(?!.* {2})[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ]+$/.test(value);
}


const Rut = value => {


    var valor = value.replace('.','');
    
    valor = valor.replace('-','');

    
    var cuerpo = valor.slice(0,-1);
    dv = valor.slice(-1).toUpperCase();
    
     value = cuerpo + '-'+ dv
    
    var suma = 0;
    var multiplo = 2;
    
    for(var i = 1;i<=cuerpo.length;i++) {
    
        var index = multiplo * valor.charAt(cuerpo.length - i);
        
        suma = suma + index;

        if(multiplo < 7) { multiplo = multiplo + 1; } else { multiplo = 2; }
  
    }
    
   var dvEsperado = 11 - (suma % 11);
    
    var dv = (dv == 'K')?10:dv;
    dv = (dv == 0)?11:dv;
    
    if(dvEsperado != dv) { return false; }
    else{
        return true;
    }
   

}

export {
    nombreCompuesto,Rut
}