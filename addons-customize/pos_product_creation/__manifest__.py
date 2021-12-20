# -*- coding: utf-8 -*-
#############################################################################
#
#   Copyright (C) 2021-TODAY Easyboxs(<https://www.easyboxs.com>).
#    Author: Easyboxs A O @easyboxs(comercial@easyboxs.com)
#
#    You can modify it under the terms of the GNU AFFERO
#    GENERAL PUBLIC LICENSE (AGPL v3), Version 3.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU AFFERO GENERAL PUBLIC LICENSE (AGPL v3) for more details.
#
#    You should have received a copy of the GNU AFFERO GENERAL PUBLIC LICENSE
#    (AGPL v3) along with this program.
#    If not, see <http://www.gnu.org/licenses/>.
#
#############################################################################

{
    'name': 'Crear nuevo producto desde POS',
    'version': '14.0.1.0.0',
    'category': 'Point of Sale',
    'summary': 'Crear nuevo producto desde pos',
    'author': 'Easyboxs',
    'company': 'Easyboxs',
    'maintainer': 'Easyboxs',
    'website': 'https://www.easyboxs.com',
    'depends': ['point_of_sale'],
    'data': [
        'views/assets.xml',
    ],
    'qweb': [
        'static/src/xml/product_create_button.xml',
        'static/src/xml/product_create_popup.xml',
    ],
    'images': ['static/description/banner.png'],
    'license': 'AGPL-3',
    'installable': True,
    'auto_install': False,
}
