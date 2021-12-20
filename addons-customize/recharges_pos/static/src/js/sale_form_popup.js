odoo.define('pos_product_creation.sale_form_popup', function (require) {
  'use strict'

  const { useState, useRef } = owl.hooks
  const { Gui } = require('point_of_sale.Gui')
  const AbstractAwaitablePopup = require('point_of_sale.AbstractAwaitablePopup')
  const Registries = require('point_of_sale.Registries')

  class SaleFormPopup extends AbstractAwaitablePopup {
    listaProductos = []

    constructor() {
      super(...arguments)
      console.log('linead', this.props)
      const token = JSON.parse(sessionStorage.getItem('loginData')).dato.token
      let config = {
        baseURL: 'http://pruebas.ptm.com.co/ptmapi/',
        timeout: 20000,
      }
      if (token) {
        config.headers = { Authorization: `Bearer ${token}` }
      }
      this.service = axios.create(config)
    }

    clickCancel() {
      Gui.showPopup('RechargeCreatePopup', {
        title: this.env._t('Recarga de Productos'),
        body: this.env._t('Seleccione el producto a recargar'),
      })
    }

    async executeSale() {
      const rechargeData = {
        phone: $('#phone').val(),
        value: $('#cash').val(),
        transactionId: this.makeId(15),
      }

      let bodyRequest = {
        producto: this.props.body.code,
        valor: rechargeData.value,
        txCliente: rechargeData.transactionId,
        fechaPlana: moment().format('YYYY-MM-DD HH:mm:ss'),
        datosEntrada: [
          {
            codigo: 'contratoVenta',
            valor: rechargeData.phone,
          },
          {
            codigo: 'valorVenta',
            valor: rechargeData.value,
          },
        ],
      }

      console.log(rechargeData)

      const headers = this.buildHeader(rechargeData)
      await this.service
        .post(`/venta/servicios/venta`, bodyRequest, { headers })
        .then((res) => {
          console.log('respuesta de la recarga' + JSON.stringify(res))
          if (res.data.exito) {
            Gui.showPopup('InformationalPopup', {
              title: this.env._t('Venta satisfactoria'),
              retryText: this.env._t('Nueva recarga'),
              description: this.env._t(res.data.msg),
              body: this.env._t({
                color: 'green',
              }),
            })
          } else {
            Gui.showPopup('InformationalPopup', {
              title: this.env._t('Error en la venta'),
              description: this.env._t(res.data.msg),
              body: this.env._t({
                color: 'red',
              }),
            })
          }
        })
        .catch((error) => {
          if (error && error.response) {
            response = error.response.data
            Gui.showPopup('InformationalPopup', {
              title: this.env._t('Error en la venta'),
              description: this.env._t(response.msg),
              body: this.env._t({
                color: 'green',
              }),
            })
          }
        })
    }

    makeId(length) {
      let transactionId = ''
      let characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      let charactersLength = characters.length
      for (var i = 0; i < length; i++) {
        transactionId += characters.charAt(
          Math.floor(Math.random() * charactersLength),
        )
      }
      return transactionId
    }

    buildHeader(stringCompose) {
      const idCliente = '901359837'
      const pwdCliente = 'p3$2t6n1P#srR1nk2k$pH4'
      const userCode = '901359837-8'
      const userPass = '5rcxeisu'
      const concatVal = ']]'
      const { phone, value, transactionId } = stringCompose
      const key = 'ctHTTUr31k31Yp4rtPr5$yEu'
      const concatString =
        idCliente +
        concatVal +
        pwdCliente +
        concatVal +
        userCode +
        concatVal +
        userPass +
        concatVal +
        1 +
        concatVal +
        transactionId +
        concatVal +
        this.props.body.code +
        concatVal +
        phone +
        concatVal +
        value +
        concatVal
      const hashGenerated = md5(concatString, key)

      //901359837]]p3$2t6n1P#srR1nk2k$pH4]]901359837-8]]5rcxeisu]]1]]PPPPPTTTTTT]]142]]3006000725]]10000]]

      return {
        hash: hashGenerated,
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        responseType: 'json',
      }
    }
  }
  SaleFormPopup.template = 'SaleFormPopup'
  SaleFormPopup.defaultProps = {
    confirmText: 'Recargar',
    cancelText: 'Cancelar',
    array: [],
    title: 'Crear ?',
    body: '',
    startingValue: '',
    priceValue: 1,
    list: [],
  }

  Registries.Component.add(SaleFormPopup)

  return SaleFormPopup
})
