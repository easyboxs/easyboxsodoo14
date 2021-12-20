odoo.define('recargas.recharges_button', function (require) {
  'use strict'
  const { Gui } = require('point_of_sale.Gui')
  const PosComponent = require('point_of_sale.PosComponent')
  const ProductScreen = require('point_of_sale.ProductScreen')
  const Registries = require('point_of_sale.Registries')
  const { useState, useRef } = owl.hooks

  class RechargesButton extends PosComponent {
    constructor() {
      super(...arguments)
    }

    callService() {
      const data = {
        idCliente: '901359837',
        pwdCliente: 'p3$2t6n1P#srR1nk2k$pH4',
        codigo: '901359837-8',
        clave: '5rcxeisu',
        terminal: '1',
      }
      $.ajax({
        url: 'http://pruebas.ptm.com.co/ptmapi/auth/getToken',
        type: 'POST',
        contentType: 'application/json',
        headers: { hash: '5af1c02878ba7a086b529714b44f5f39' },
        crossDomain: true,
        data: JSON.stringify(data),
        success: (response) => {
          console.log(JSON.stringify(response))
          sessionStorage.setItem('loginData', JSON.stringify(response))
          Gui.showPopup('RechargeCreatePopup', {
            title: this.env._t('Recarga de Productos'),
            body: this.env._t('Welcome to OWL'),
          })
        },
        error: function () {
          alert('error')
        },
      })
    }
  }
  RechargesButton.template = 'RechargesButton'
  ProductScreen.addControlButton({
    component: RechargesButton,
    condition: function () {
      return this.env.pos
    },
  })
  Registries.Component.add(RechargesButton)
  return RechargesButton
})
