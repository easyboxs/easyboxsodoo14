{
    "name": "recharges_module",
    "version": "14.0.1.0.0",
    "category": "Point of Sale",
    "summary": "Modulo que permite hacer recargas",
    "author": "EasyBox",
    "company": "EasyBox",
    "maintainer": "EasyBox",
    "website": "https://www.easyboxs.com",
    "depends": ["point_of_sale"],
    "data": ["views/assets.xml"],
    "qweb": [
        "static/src/xml/recharges_button.xml",
        "static/src/xml/recharge_create_popup.xml",
        "static/src/xml/sale_form_popup.xml",
        "static/src/xml/informational_popup.xml",
    ],
    "images": ["static/description/banner.png"],
    "license": "AGPL-3",
    "installable": True,
    "aplication": True,
    "auto_install": False,
    "demo": [],
    "test": [],
}
