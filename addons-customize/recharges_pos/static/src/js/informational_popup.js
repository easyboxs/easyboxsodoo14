odoo.define('pos_product_creation.informational_popup', function (require) {
  'use strict'

  const { useState, useRef } = owl.hooks
  const { Gui } = require('point_of_sale.Gui')
  const AbstractAwaitablePopup = require('point_of_sale.AbstractAwaitablePopup')
  const Registries = require('point_of_sale.Registries')

  class InformationalPopup extends AbstractAwaitablePopup {
    constructor() {
      super(...arguments)
      console.log(this.props)
      if (this.props.body.color == 'green') {
        $('.title').css('background-color', 'green !important')
        $('.footer').css('background-color', 'green !important')
      } else {
        $('.title').css('background-color', 'red !important')
        $('.footer').css('background-color', 'red !important')
      }
    }

    clickCancel() {
      // Gui.dontShowPopup('ProductCreatePopup')
    }

    clickRetry() {
      Gui.showPopup('RechargeCreatePopup')
    }
  }
  InformationalPopup.template = 'InformationalPopup'
  InformationalPopup.defaultProps = {
    retryText: 'Reintentar',
    cancelText: 'Cancelar',
    title: 'Error',
  }

  Registries.Component.add(InformationalPopup)

  return InformationalPopup
})
