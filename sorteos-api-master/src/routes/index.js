const { Router } = require('express');
const router = Router();

const { getRedenciones, getRedencionId, createRedencion, updateRedencion, deleteRedencion, getSorteoActivo, getMaximoBoletas, getContratos, generarOTP, validarOtp, generarPagare, validatePagare, validaFactura, getCupoCliente, registroCliente, getContratosCliente, setContratosCliente,solicitaCambioContrasena } = require('../controllers/index.controller');

router.get('/redenciones', getRedenciones);
router.get('/redenciones/:id', getRedencionId);
router.post('/wps/gateway/redenciones/api/v1/sorteos/admin/redimir-boletas', createRedencion);
router.put('/redenciones/:id', updateRedencion)
router.delete('/redenciones/:id', deleteRedencion);
//router.get('/redenciones/api/v1/sorteos/activo',getSorteoActivo);
router.get('/wps/gateway/redenciones/api/v1/sorteos/todos',getSorteoActivo);
router.get('/wps/gateway/redenciones/api/v1/sorteos/configuracion',getMaximoBoletas);


/** Rutas para proyecto Brilla */
router.post('/gestion-cliente-gas/v1.0/clientegas/contrato', getContratos);
router.post('/gestion-identidad/v1.0/codigo/generar', generarOTP);
router.post('/gestion-identidad/v1.0/codigo/validar', validarOtp);
router.post("/gestion-pagare-desmaterializado/v1.0/pagare/generar",generarPagare);
router.post("/gestion-pagare-desmaterializado/v1.0/pagare/firmar",validatePagare);
router.post("/gestion-cliente-gas/v1.0/clientegas/factura",validaFactura);
router.post("/gestion-cliente-gas/v1.0/clientegas/contrato/cupo",getCupoCliente);
router.post("/gestion-enrolamiento/v1.0/gestion/enrolamiento",registroCliente);
router.get("/gestion-enrolamiento/v1.0/gestion/contratos-cliente",getContratosCliente);
router.post("/gestion-enrolamiento/v1.0/gestion/crear-contratos-cliente",setContratosCliente);
router.post("/SolicitaCambioContrasena",solicitaCambioContrasena);

module.exports = router;