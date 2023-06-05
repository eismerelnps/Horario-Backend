const XLSX = require('xlsx');
const _ = require('lodash');

class Tabla {
    constructor() {
        this.columnas = [];
    }

    agregarColumna(columna) {
        this.columnas.push(columna);
    }

    obtenerColumnas() {
        return this.columnas;
    }
}

class Columna {
    constructor(nombre) {
        this.nombre = nombre;
        this.celdas = [];
    }

    agregarCelda(celda) {
        this.celdas.push(celda);
    }

    obtenerCeldas() {
        return this.celdas;
    }
}

// Caché para almacenar las hojas del archivo
const sheetCache = {};

function getSheetNames(filePath) {
    const workbook = XLSX.readFile(filePath);
    return workbook.SheetNames;
}

function getSheetByName(filePath, sheetName) {
    if (sheetCache[sheetName]) {
        return sheetCache[sheetName];
    }

    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets[sheetName];

    if (!sheet) {
        throw new Error(`No se encontró la hoja "${sheetName}" en el archivo.`);
    }

    // Almacenar la hoja en la caché
    sheetCache[sheetName] = sheet;

    return sheet;
}

function extraerValorCelda(sheet, celda) {
    const cellAddress = XLSX.utils.decode_cell(celda);
    const cell = sheet?.[XLSX.utils.encode_cell(cellAddress)];

    return cell?.v || null;
}

function extraerColumnaFromExcel(sheet, celdaInicio) {
    const range = XLSX.utils.decode_range(sheet['!ref']);
    const { r: startRow, c: startCol } = XLSX.utils.decode_cell(celdaInicio);

    const celdasExtraidas = _.range(startRow, startRow + 12)
        .map(row => {
            const cellAddress = XLSX.utils.encode_cell({ r: row, c: startCol });
            const cell = sheet[cellAddress];
            return cell ? cell.v : null;
        });

    return celdasExtraidas;
}

function mapearColumna(filePath, sheetName, inicioColumna, nombreColumna) {
    const sheet = getSheetByName(filePath, sheetName);
    const celdas = extraerColumnaFromExcel(sheet, inicioColumna);
    const valorNombre = extraerValorCelda(sheet, nombreColumna);

    const nuevaColumna = new Columna(valorNombre);
    nuevaColumna.celdas = celdas.map(celda => celda);

    return nuevaColumna;
}

function generarTabla(filePath, rangoInicio, rangoFin) {
    const letras = _.range(65, 91).map(code => String.fromCharCode(code));

    const regex = /\d+/; // Expresión regular para extraer el número del rango
    const inicioNumero = parseInt(rangoInicio.match(regex)[0], 10);
    const finNumero = parseInt(rangoFin.match(regex)[0], 10);

    const columnaInicio = letras.indexOf(rangoInicio[0]);
    const columnaFin = letras.indexOf(rangoFin[0]);

    const columnas = _.range(columnaInicio, columnaFin + 1)
        .map(columna => mapearColumna(filePath, sheetName, `${letras[columna]}${inicioNumero + 1}`, `${letras[columna]}${inicioNumero}`));

    const tabla = new Tabla();
    columnas.forEach(columna => tabla.agregarColumna(columna));

    return tabla;
}

const filePath = '../excel_files/Horario_FTE_CRD_050623-090623.xlsx';
const sheetNames = getSheetNames(filePath);
const sheetName = sheetNames[3];

let tabla1 = generarTabla(filePath, "C6", "I6");
//let tabla2 = generarTabla(filePath, "C21", "I21");
console.log(tabla1.obtenerColumnas());
//console.log(tabla2.obtenerColumnas());


