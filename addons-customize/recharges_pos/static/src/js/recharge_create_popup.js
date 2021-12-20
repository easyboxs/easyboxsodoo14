odoo.define('pos_product_creation.recharge_create_popup', function (require) {
  'use strict'

  const { useState, useRef } = owl.hooks
  const { Gui } = require('point_of_sale.Gui')
  const AbstractAwaitablePopup = require('point_of_sale.AbstractAwaitablePopup')
  const Registries = require('point_of_sale.Registries')

  class RechargeCreatePopup extends AbstractAwaitablePopup {
    productos = []

    constructor() {
      super(...arguments)
      this.productos = [
        { code: 1, image: '/recharges_pos/static/src/img/claro.jpg' },
        { code: 24, image: '/recharges_pos/static/src/img/etb.jpg' },
        { code: 23, image: '/recharges_pos/static/src/img/movil-exito.jpg' },
        { code: 2, image: '/recharges_pos/static/src/img/movistar.jpg' },
        { code: 3, image: '/recharges_pos/static/src/img/tigo.jpg' },
        { code: 21, image: '/recharges_pos/static/src/img/virgin.jpg' },
        { code: 142, image: '/recharges_pos/static/src/img/wom.jpg' },
      ]
      const token = JSON.parse(sessionStorage.getItem('loginData')).dato.token
      let config = {
        baseURL: 'http://pruebas.ptm.com.co/ptmapi/',
        timeout: 20000,
      }
      if (token) {
        config.headers = { Authorization: `Bearer ${token}` }
      }
      this.service = axios.create(config)
      //this.SaleExecute()
    }

    showSaleForm(product) {
      Gui.showPopup('SaleFormPopup', {
        title: this.env._t('Datos de Recarga'),
        body: this.env._t(product),
      })
    }

    async SaleExecute() {
      const headers = {
        hash: '97c2a8a48301363f2b8baade7c0b1f0b',
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        responseType: 'json',
      }
      let response = []
      await this.service
        .post(`/venta/servicios/consultaProductos`, {}, { headers })
        .then((res) => {
          console.log(res)
          if (res.data.dato && res.data.dato.listaProductos) {
            const PRODUCT_TYPE = 'RECARGAS/PAQUETES'
            const PAQUETES = 'PAQUETES'
            response = res.data.dato.listaProductos
              .filter(
                (producto) =>
                  producto.nombreTipoServicio == PRODUCT_TYPE &&
                  !producto.nombre.includes(PAQUETES),
              )
              .map((product) => {
                return {
                  nombre: product.nombre,
                  codigo: product.codigo,
                  codigoTipoServicio: product.codigoTipoServicio,
                  valorMaxVenta: product.valorMaxVenta,
                  valorMinVenta: product.valorMinVenta,
                }
              })
          }
        })
        .catch((error) => {
          if (error && error.response) {
            response = error.response.data
            Gui.showPopup('InformationalPopup', {
              title: this.env._t('Error Consultando Productos'),
              body: this.env._t(),
            })
          }
        })
      this.listaProductos = response
    }
  }
  RechargeCreatePopup.template = 'RechargeCreatePopup'
  RechargeCreatePopup.defaultProps = {
    confirmText: 'Recargar',
    cancelText: 'Cancelar',
    title: 'Recarga de Productos',
  }

  Registries.Component.add(RechargeCreatePopup)

  return RechargeCreatePopup
})
