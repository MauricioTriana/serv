const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: 'admin',
    database: 'sorteoapi',
    port: '5432'
});

const createRedencion = async (req, res) => {
    const { cantidadBoletas, numeroDocumento, sorteoId, tipoDocumento } = req.body;
    try {
        const response = await pool.query('INSERT INTO redimir (cantidadboletas, numerodocumento, sorteoid, tipodocumento) VALUES ($1, $2, $3, $4)', [cantidadBoletas, numeroDocumento, sorteoId, tipoDocumento]);
        res.json({
            message: 'Redencion creada exitosamente',
            body: {
                redencion: { cantidadBoletas, numeroDocumento, sorteoId, tipoDocumento }
            }
        })
    } catch (error) {
        res.status(500).json({
            message: 'No se ha podido realizar la redencion intenta mas tarde',
            data: {}
        })
    }

};

const getRedenciones = async (req, res) => {
    obj = {
        "id": null,
        "cantidadBoletas": null,
        "numeroDocumento": null,
        "sorteoId": null,
        "tipoDocumento": null
    }
    try {
        const response = await pool.query('SELECT * FROM redimir ORDER BY id ASC');
        obj.id = response.rows[0].id;
        obj.cantidadBoletas = response.rows[0].cantidadboletas;
        obj.numeroDocumento = response.rows[0].numerodocumento;
        obj.sorteoId = response.rows[0].sorteoid;
        obj.tipoDocumento = response.rows[0].tipodocumento;

        res.status(200).json({
            body: obj,
            message: "",
            status: 200,

        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'No se ha podido consultar el servicio'
        })
    }
};

const getRedencionId = async (req, res) => {
    const id = parseInt(req.params.id);
    const response = await pool.query('SELECT * FROM redimir WHERE id = $1', [id]);
    res.json(response.rows);
};

const updateRedencion = async (req, res) => {
    const id = parseInt(req.params.id);
    const { cantidadBoletas, numeroDocumento, sorteoId, tipoDocumento } = req.body;

    const response = await pool.query('UPDATE redimir SET cantidadBoletas = $1, numeroDocumento = $2, sorteoId = $3, tipoDocumento = $4 WHERE id = $5', [
        cantidadBoletas,
        numeroDocumento,
        sorteoId,
        tipoDocumento,
        id
    ]);
    res.json('Redencion Actualizada Exitosamente');
};

const deleteRedencion = async (req, res) => {
    const id = parseInt(req.params.id);
    await pool.query('DELETE FROM redimir where id = $1', [
        id
    ]);
    res.json(`User ${id} deleted Successfully`);
};


/**Api para sorteos activos */

const getSorteoActivo = async (req, res) => {
    obj = {
        "activo": null,
        "fechaFinal": null,
        "fechaInicial": null,
        "id": null,
        "nombre": null,
        "valorPuntos": null
    }
/*
parámetro fstr: %Y - año , %m - mes, %d - día, %H - hora, %M - minuto, %S - segundo
parámetro utc: true, calcula la fecha y hora local
*/Date.prototype.format = function (fstr, utc) {
        var that = this;
        utc = utc ? 'getUTC' : 'get';
        return fstr.replace(/%[YmdHMS]/g, function (m) {
            switch (m) {
                case '%Y': return that[utc + 'FullYear']();
                case '%m': m = 1 + that[utc + 'Month'](); break;
                case '%d': m = that[utc + 'Date'](); break;
                case '%H': m = that[utc + 'Hours'](); break;
                case '%M': m = that[utc + 'Minutes'](); break;
                case '%S': m = that[utc + 'Seconds'](); break;
                default: return m.slice(1);
            }
            return ('0' + m).slice(-2);
        });
    };
    try {
        const response = await pool.query('SELECT * FROM sorteo ORDER BY id ASC');
        console.log(response)
        var obj = response.rows.map(item => {
            return {
                activo: item.activo, fechaFinal: item.fechafinal.format('%d/%m/%Y', false),
                fechaInicial: item.fechainicial.format('%d/%m/%Y', false), id: item.id,
                nombre: item.nombre, valorPuntos: item.valorpuntos
            };
        });/*
        obj.activo=response.rows[0].activo;
        obj.fechaFinal=response.rows[0].fechafinal;
        obj.fechaInicial=response.rows[0].fechainicial;
        obj.id=response.rows[0].id;
        obj.nombre=response.rows[0].nombre;
        obj.valorPuntos=response.rows[0].valorpuntos;*/


        res.status(200).json({
            body: obj,
            message: "",
            status: 200,

        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'No se ha podido consultar el servicio'
        })
    }
};

const getMaximoBoletas = async (req, res) => {
    obj = {
        "maximoBoletas": null
    }

    try {
        const response = await pool.query('SELECT * FROM configuracion ORDER BY id ASC');

        obj.maximoBoletas = response.rows[0].maximoboletas;


        res.status(200).json({
            body: obj,
            message: "",
            status: 200,

        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'No se ha podido consultar el servicio'
        })
    }
};

/** Controller proyecto Brilla */

const getContratos = async (req, res) => {
    try {
        if (req.body.idContrato == 123456 && req.body.idDistribuidora === "GDO" && req.body.identificacion == "123456"
            && req.body.numeroTelefono == "1234567") {
            res.status(200).json({
                "apellido": "prueba",
                "cantidadFacturasGeneradas": 1,
                "categoria": "prueba",
                "cliente": "prueba",
                "codigoCategoria": 1,
                "codigoCliente": 1,
                "codigoDepartamento": 1,
                "codigoDireccionCobro": 1,
                "codigoLocalidad": 1,
                "codigoServicio": 1,
                "codigoSubcategoria": 1,
                "departamentoDireccionCobro": "prueba",
                "direccionCobro": "calle 11 #6ae 27",
                "idContrato": 1,
                "identificacion": "123456",
                "localidadDireccionCobro": "prueba",
                "nombre": "prueba",
                "numeroServicio": 1,
                "servicioDescripcion": "prueba",
                "subcategoria": "prueba",
                "telefono": "prueba",
                "tipoIdentificacion": 1
            })
        } else {
            res.status(400).json({
                message: 'Datos de entrada incorrectos.'
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Error inesperado.'
        })
    }

}

const generarOTP = async (req, res) => {
    try {
        res.status(200)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Error inesperado.'
        })
    }

}

module.exports = {
    getRedenciones,
    getRedencionId,
    createRedencion,
    updateRedencion,
    deleteRedencion,
    getSorteoActivo,
    getMaximoBoletas,
    getContratos,
    generarOTP
};