import { Component, h, State, Element } from "@stencil/core";
import "@ionic/core";

interface IPromociones {
  bco_id: number;
  bco_nombre: string;
  bco_img: string;

  tipo_serv_id: number;
  tipo_serv_nombre: string;

  card_id: number;
  card_nombre: string;
  img_card: string;
  cta_cuotas: number;
  cta_interes: number;
  cftna: number;

  alta: Date;
  vencimiento: Date;
  nota_legal: string;
}

interface IBancos {
  bco_img: string;
  bco_nombre: string;
  bco_id: number;
  bco_row: [];
}

@Component({
  tag: "allseasons-promociones",
  styleUrl: "my-component.css",
  shadow: true
})
export class MyComponent {
  /**
   * The first name
   */

  @Element() el: HTMLElement;
  @State() active: boolean = true;
  @State() idBanco: boolean = true;
  @State() promociones: IPromociones[] = [];
  @State() bancos: IBancos[] = [];
  @State() promocionesAll: any[] = [];

  async getPromociones(): Promise<IPromociones[]> {
    try {
      // const response = await fetch("http://asback/api/prueba");
      // const json = await response.json();
      // // console.log(JSON.stringify(json));
      // return json.original;

      const responseData = `
      {"headers":{},"original":[{"bco_id":1,"bco_nombre":"Tarjeta Shopping","bco_img":"https://img.travel-tool.net/entidades/Tarjeta-Shopping.jpg","promocion_id":91,"tipo_serv_id":1,"tipo_serv_nombre":"Todo","card_id":1,"card_nombre":"Visa","img_card":"https://www.mercadopago.com/org-img/MP3/API/logos/visa.gif","cta_cuotas":1,"cta_interes":3.25,"cftna":5.58,"alta":"2019-09-01","vencimiento":"2019-12-31","nota_legal":"visa: promoción vigente en la república argentina del 16/09/19 al 22/09/19 inclusive, abonando la totalidad de la reserva prepaga en hasta 12 cuotas sin interés para vuelos y paquetes a destinos de la red internacional (excepto roma). válida únicamente en vuelos operados por aerolíneas argentinas/austral líneas aéreas. emisiones con tarjeta de crédito visa emitida en argentina, quedando excluidas las siguientes tarjetas visa: visa corporate, visa cuenta central, visa purchasing, visa purchasing agro, visa distribution y visa recargable (tarjeta visa business: consulte con su banco emisor si la tarjeta se encuentra habilitada para operar en cuotas). canales de comercialización: despegar.com, call center o la app de despegar. no acumulable con otras promociones. consulte con su banco emisor otros cargos asociados a la operatoria en cuotas. para más información consulte en www.aerolineas.com. prisma medios de pago s.a., lavarden 247, caba, cuit 30-59891004-5. despegar.com.ar s.a., cuit 30701307115. av. jujuy 2013, caba"},{"bco_id":1,"bco_nombre":"Tarjeta Shopping","bco_img":"https://img.travel-tool.net/entidades/Tarjeta-Shopping.jpg","promocion_id":91,"tipo_serv_id":1,"tipo_serv_nombre":"Todo","card_id":1,"card_nombre":"Visa","img_card":"https://www.mercadopago.com/org-img/MP3/API/logos/visa.gif","cta_cuotas":24,"cta_interes":15,"cftna":20,"alta":"2019-09-01","vencimiento":"2019-12-31","nota_legal":"visa: promoción vigente en la república argentina del 16/09/19 al 22/09/19 inclusive, abonando la totalidad de la reserva prepaga en hasta 12 cuotas sin interés para vuelos y paquetes a destinos de la red internacional (excepto roma). válida únicamente en vuelos operados por aerolíneas argentinas/austral líneas aéreas. emisiones con tarjeta de crédito visa emitida en argentina, quedando excluidas las siguientes tarjetas visa: visa corporate, visa cuenta central, visa purchasing, visa purchasing agro, visa distribution y visa recargable (tarjeta visa business: consulte con su banco emisor si la tarjeta se encuentra habilitada para operar en cuotas). canales de comercialización: despegar.com, call center o la app de despegar. no acumulable con otras promociones. consulte con su banco emisor otros cargos asociados a la operatoria en cuotas. para más información consulte en www.aerolineas.com. prisma medios de pago s.a., lavarden 247, caba, cuit 30-59891004-5. despegar.com.ar s.a., cuit 30701307115. av. jujuy 2013, caba"},{"bco_id":2,"bco_nombre":"Banco Galicia","bco_img":"https://img.travel-tool.net/entidades/Banco-Galicia.jpg","promocion_id":30,"tipo_serv_id":2,"tipo_serv_nombre":"Aereos","card_id":1,"card_nombre":"Visa","img_card":"https://www.mercadopago.com/org-img/MP3/API/logos/visa.gif","cta_cuotas":1,"cta_interes":0,"cftna":0,"alta":"2019-09-01","vencimiento":"2019-12-31","nota_legal":"Nota..."},{"bco_id":3,"bco_nombre":"Citi","bco_img":"https://img.travel-tool.net/entidades/Citi.jpg","promocion_id":31,"tipo_serv_id":1,"tipo_serv_nombre":"Todo","card_id":1,"card_nombre":"Visa","img_card":"https://www.mercadopago.com/org-img/MP3/API/logos/visa.gif","cta_cuotas":1,"cta_interes":10.5,"cftna":5.5,"alta":"2019-09-01","vencimiento":"2019-12-31","nota_legal":"visa: promoción vigente en la república argentina del 16/09/19 al 22/09/19 inclusive, abonando la totalidad de la reserva prepaga en hasta 12 cuotas sin interés para vuelos y paquetes a destinos de la red internacional (excepto roma). válida únicamente en vuelos operados por aerolíneas argentinas/austral líneas aéreas. emisiones con tarjeta de crédito visa emitida en argentina, quedando excluidas las siguientes tarjetas visa: visa corporate, visa cuenta central, visa purchasing, visa purchasing agro, visa distribution y visa recargable (tarjeta visa business: consulte con su banco emisor si la tarjeta se encuentra habilitada para operar en cuotas). canales de comercialización: despegar.com, call center o la app de despegar. no acumulable con otras promociones. consulte con su banco emisor otros cargos asociados a la operatoria en cuotas. para más información consulte en www.aerolineas.com. prisma medios de pago s.a., lavarden 247, caba, cuit 30-59891004-5. despegar.com.ar s.a., cuit 30701307115. av. jujuy 2013, caba"},{"bco_id":3,"bco_nombre":"Citi","bco_img":"https://img.travel-tool.net/entidades/Citi.jpg","promocion_id":32,"tipo_serv_id":3,"tipo_serv_nombre":"Terrestre","card_id":1,"card_nombre":"Visa","img_card":"https://www.mercadopago.com/org-img/MP3/API/logos/visa.gif","cta_cuotas":1,"cta_interes":0,"cftna":0,"alta":"2019-09-01","vencimiento":"2019-12-31","nota_legal":"visa: promoción vigente en la república argentina del 16/09/19 al 22/09/19 inclusive, abonando la totalidad de la reserva prepaga en hasta 12 cuotas sin interés para vuelos y paquetes a destinos de la red internacional (excepto roma). válida únicamente en vuelos operados por aerolíneas argentinas/austral líneas aéreas. emisiones con tarjeta de crédito visa emitida en argentina, quedando excluidas las siguientes tarjetas visa: visa corporate, visa cuenta central, visa purchasing, visa purchasing agro, visa distribution y visa recargable (tarjeta visa business: consulte con su banco emisor si la tarjeta se encuentra habilitada para operar en cuotas). canales de comercialización: despegar.com, call center o la app de despegar. no acumulable con otras promociones. consulte con su banco emisor otros cargos asociados a la operatoria en cuotas. para más información consulte en www.aerolineas.com. prisma medios de pago s.a., lavarden 247, caba, cuit 30-59891004-5. despegar.com.ar s.a., cuit 30701307115. av. jujuy 2013, caba"},{"bco_id":3,"bco_nombre":"Citi","bco_img":"https://img.travel-tool.net/entidades/Citi.jpg","promocion_id":33,"tipo_serv_id":3,"tipo_serv_nombre":"Terrestre","card_id":1,"card_nombre":"Visa","img_card":"https://www.mercadopago.com/org-img/MP3/API/logos/visa.gif","cta_cuotas":1,"cta_interes":0,"cftna":0,"alta":"2019-09-17","vencimiento":"2019-12-31","nota_legal":"visa: promoción vigente en la república argentina del 16/09/19 al 22/09/19 inclusive, abonando la totalidad de la reserva prepaga en hasta 12 cuotas sin interés para vuelos y paquetes a destinos de la red internacional (excepto roma). válida únicamente en vuelos operados por aerolíneas argentinas/austral líneas aéreas. emisiones con tarjeta de crédito visa emitida en argentina, quedando excluidas las siguientes tarjetas visa: visa corporate, visa cuenta central, visa purchasing, visa purchasing agro, visa distribution y visa recargable (tarjeta visa business: consulte con su banco emisor si la tarjeta se encuentra habilitada para operar en cuotas). canales de comercialización: despegar.com, call center o la app de despegar. no acumulable con otras promociones. consulte con su banco emisor otros cargos asociados a la operatoria en cuotas. para más información consulte en www.aerolineas.com. prisma medios de pago s.a., lavarden 247, caba, cuit 30-59891004-5. despegar.com.ar s.a., cuit 30701307115. av. jujuy 2013, caba"},{"bco_id":3,"bco_nombre":"Citi","bco_img":"https://img.travel-tool.net/entidades/Citi.jpg","promocion_id":31,"tipo_serv_id":1,"tipo_serv_nombre":"Todo","card_id":1,"card_nombre":"Visa","img_card":"https://www.mercadopago.com/org-img/MP3/API/logos/visa.gif","cta_cuotas":4,"cta_interes":4,"cftna":0,"alta":"2019-09-01","vencimiento":"2019-12-31","nota_legal":"visa: promoción vigente en la república argentina del 16/09/19 al 22/09/19 inclusive, abonando la totalidad de la reserva prepaga en hasta 12 cuotas sin interés para vuelos y paquetes a destinos de la red internacional (excepto roma). válida únicamente en vuelos operados por aerolíneas argentinas/austral líneas aéreas. emisiones con tarjeta de crédito visa emitida en argentina, quedando excluidas las siguientes tarjetas visa: visa corporate, visa cuenta central, visa purchasing, visa purchasing agro, visa distribution y visa recargable (tarjeta visa business: consulte con su banco emisor si la tarjeta se encuentra habilitada para operar en cuotas). canales de comercialización: despegar.com, call center o la app de despegar. no acumulable con otras promociones. consulte con su banco emisor otros cargos asociados a la operatoria en cuotas. para más información consulte en www.aerolineas.com. prisma medios de pago s.a., lavarden 247, caba, cuit 30-59891004-5. despegar.com.ar s.a., cuit 30701307115. av. jujuy 2013, caba"},{"bco_id":3,"bco_nombre":"Citi","bco_img":"https://img.travel-tool.net/entidades/Citi.jpg","promocion_id":31,"tipo_serv_id":1,"tipo_serv_nombre":"Todo","card_id":1,"card_nombre":"Visa","img_card":"https://www.mercadopago.com/org-img/MP3/API/logos/visa.gif","cta_cuotas":5,"cta_interes":5.5,"cftna":0,"alta":"2019-09-01","vencimiento":"2019-12-31","nota_legal":"visa: promoción vigente en la república argentina del 16/09/19 al 22/09/19 inclusive, abonando la totalidad de la reserva prepaga en hasta 12 cuotas sin interés para vuelos y paquetes a destinos de la red internacional (excepto roma). válida únicamente en vuelos operados por aerolíneas argentinas/austral líneas aéreas. emisiones con tarjeta de crédito visa emitida en argentina, quedando excluidas las siguientes tarjetas visa: visa corporate, visa cuenta central, visa purchasing, visa purchasing agro, visa distribution y visa recargable (tarjeta visa business: consulte con su banco emisor si la tarjeta se encuentra habilitada para operar en cuotas). canales de comercialización: despegar.com, call center o la app de despegar. no acumulable con otras promociones. consulte con su banco emisor otros cargos asociados a la operatoria en cuotas. para más información consulte en www.aerolineas.com. prisma medios de pago s.a., lavarden 247, caba, cuit 30-59891004-5. despegar.com.ar s.a., cuit 30701307115. av. jujuy 2013, caba"},{"bco_id":3,"bco_nombre":"Citi","bco_img":"https://img.travel-tool.net/entidades/Citi.jpg","promocion_id":31,"tipo_serv_id":1,"tipo_serv_nombre":"Todo","card_id":1,"card_nombre":"Visa","img_card":"https://www.mercadopago.com/org-img/MP3/API/logos/visa.gif","cta_cuotas":6,"cta_interes":10.5,"cftna":8.52,"alta":"2019-09-01","vencimiento":"2019-12-31","nota_legal":"visa: promoción vigente en la república argentina del 16/09/19 al 22/09/19 inclusive, abonando la totalidad de la reserva prepaga en hasta 12 cuotas sin interés para vuelos y paquetes a destinos de la red internacional (excepto roma). válida únicamente en vuelos operados por aerolíneas argentinas/austral líneas aéreas. emisiones con tarjeta de crédito visa emitida en argentina, quedando excluidas las siguientes tarjetas visa: visa corporate, visa cuenta central, visa purchasing, visa purchasing agro, visa distribution y visa recargable (tarjeta visa business: consulte con su banco emisor si la tarjeta se encuentra habilitada para operar en cuotas). canales de comercialización: despegar.com, call center o la app de despegar. no acumulable con otras promociones. consulte con su banco emisor otros cargos asociados a la operatoria en cuotas. para más información consulte en www.aerolineas.com. prisma medios de pago s.a., lavarden 247, caba, cuit 30-59891004-5. despegar.com.ar s.a., cuit 30701307115. av. jujuy 2013, caba"},{"bco_id":3,"bco_nombre":"Citi","bco_img":"https://img.travel-tool.net/entidades/Citi.jpg","promocion_id":32,"tipo_serv_id":3,"tipo_serv_nombre":"Terrestre","card_id":2,"card_nombre":"Mastercard","img_card":"https://www.mercadopago.com/org-img/MP3/API/logos/master.gif","cta_cuotas":2,"cta_interes":0,"cftna":0,"alta":"2019-09-01","vencimiento":"2019-12-31","nota_legal":"visa: promoción vigente en la república argentina del 16/09/19 al 22/09/19 inclusive, abonando la totalidad de la reserva prepaga en hasta 12 cuotas sin interés para vuelos y paquetes a destinos de la red internacional (excepto roma). válida únicamente en vuelos operados por aerolíneas argentinas/austral líneas aéreas. emisiones con tarjeta de crédito visa emitida en argentina, quedando excluidas las siguientes tarjetas visa: visa corporate, visa cuenta central, visa purchasing, visa purchasing agro, visa distribution y visa recargable (tarjeta visa business: consulte con su banco emisor si la tarjeta se encuentra habilitada para operar en cuotas). canales de comercialización: despegar.com, call center o la app de despegar. no acumulable con otras promociones. consulte con su banco emisor otros cargos asociados a la operatoria en cuotas. para más información consulte en www.aerolineas.com. prisma medios de pago s.a., lavarden 247, caba, cuit 30-59891004-5. despegar.com.ar s.a., cuit 30701307115. av. jujuy 2013, caba"},{"bco_id":3,"bco_nombre":"Citi","bco_img":"https://img.travel-tool.net/entidades/Citi.jpg","promocion_id":32,"tipo_serv_id":3,"tipo_serv_nombre":"Terrestre","card_id":3,"card_nombre":"American Express","img_card":"https://www.mercadopago.com/org-img/MP3/API/logos/amex.gif","cta_cuotas":3,"cta_interes":0,"cftna":0,"alta":"2019-09-01","vencimiento":"2019-12-31","nota_legal":"visa: promoción vigente en la república argentina del 16/09/19 al 22/09/19 inclusive, abonando la totalidad de la reserva prepaga en hasta 12 cuotas sin interés para vuelos y paquetes a destinos de la red internacional (excepto roma). válida únicamente en vuelos operados por aerolíneas argentinas/austral líneas aéreas. emisiones con tarjeta de crédito visa emitida en argentina, quedando excluidas las siguientes tarjetas visa: visa corporate, visa cuenta central, visa purchasing, visa purchasing agro, visa distribution y visa recargable (tarjeta visa business: consulte con su banco emisor si la tarjeta se encuentra habilitada para operar en cuotas). canales de comercialización: despegar.com, call center o la app de despegar. no acumulable con otras promociones. consulte con su banco emisor otros cargos asociados a la operatoria en cuotas. para más información consulte en www.aerolineas.com. prisma medios de pago s.a., lavarden 247, caba, cuit 30-59891004-5. despegar.com.ar s.a., cuit 30701307115. av. jujuy 2013, caba"},{"bco_id":9,"bco_nombre":"ICBC","bco_img":"https://img.travel-tool.net/entidades/ICBC.jpg","promocion_id":28,"tipo_serv_id":3,"tipo_serv_nombre":"Terrestre","card_id":1,"card_nombre":"Visa","img_card":"https://www.mercadopago.com/org-img/MP3/API/logos/visa.gif","cta_cuotas":1,"cta_interes":9.5,"cftna":0,"alta":"2019-08-01","vencimiento":"2019-11-30","nota_legal":"VISA: PROMOCIÓN VIGENTE EN LA REPÚBLICA ARGENTINA DEL 16/09/19 AL 22/09/19 INCLUSIVE, ABONANDO LA TOTALIDAD DE LA RESERVA PREPAGA EN HASTA 12 CUOTAS SIN INTERÉS PARA VUELOS Y PAQUETES A DESTINOS DE LA RED INTERNACIONAL (EXCEPTO ROMA). VÁLIDA ÚNICAMENTE EN VUELOS OPERADOS POR AEROLÍNEAS ARGENTINAS/AUSTRAL LÍNEAS AÉREAS. EMISIONES CON TARJETA DE CRÉDITO VISA EMITIDA EN ARGENTINA, QUEDANDO EXCLUIDAS LAS SIGUIENTES TARJETAS VISA: VISA CORPORATE, VISA CUENTA CENTRAL, VISA PURCHASING, VISA PURCHASING AGRO, VISA DISTRIBUTION Y VISA RECARGABLE (TARJETA VISA BUSINESS: CONSULTE CON SU BANCO EMISOR SI LA TARJETA SE ENCUENTRA HABILITADA PARA OPERAR EN CUOTAS). CANALES DE COMERCIALIZACIÓN: DESPEGAR.COM, CALL CENTER O LA APP DE DESPEGAR. NO ACUMULABLE CON OTRAS PROMOCIONES. CONSULTE CON SU BANCO EMISOR OTROS CARGOS ASOCIADOS A LA OPERATORIA EN CUOTAS. PARA MÁS INFORMACIÓN CONSULTE EN WWW.AEROLINEAS.COM. PRISMA MEDIOS DE PAGO S.A., LAVARDEN 247, CABA, CUIT 30-59891004-5. Despegar.com.ar S.A., CUIT 30701307115. Av. Jujuy 2013, CABA 1 VISA: PROMOCIÓN VIGENTE EN LA REPÚBLICA ARGENTINA DEL 16/09/19 AL 22/09/19 INCLUSIVE, ABONANDO LA TOTALIDAD DE LA RESERVA PREPAGA EN HASTA 12 CUOTAS SIN INTERÉS PARA VUELOS Y PAQUETES A DESTINOS DE LA RED INTERNACIONAL (EXCEPTO ROMA). VÁLIDA ÚNICAMENTE EN VUELOS OPERADOS POR AEROLÍNEAS ARGENTINAS/AUSTRAL LÍNEAS AÉREAS. EMISIONES CON TARJETA DE CRÉDITO VISA EMITIDA EN ARGENTINA, QUEDANDO EXCLUIDAS LAS SIGUIENTES TARJETAS VISA: VISA CORPORATE, VISA CUENTA CENTRAL, VISA PURCHASING, VISA PURCHASING AGRO, VISA DISTRIBUTION Y VISA RECARGABLE (TARJETA VISA BUSINESS: CONSULTE CON SU BANCO EMISOR SI LA TARJETA SE ENCUENTRA HABILITADA PARA OPERAR EN CUOTAS). CANALES DE COMERCIALIZACIÓN: DESPEGAR.COM, CALL CENTER O LA APP DE DESPEGAR. NO ACUMULABLE CON OTRAS PROMOCIONES. CONSULTE CON SU BANCO EMISOR OTROS CARGOS ASOCIADOS A LA OPERATORIA EN CUOTAS. PARA MÁS INFORMACIÓN CONSULTE EN WWW.AEROLINEAS.COM. PRISMA MEDIOS DE PAGO S.A., LAVARDEN 247, CABA, CUIT 30-59891004-5. Despegar.com.ar S.A., CUIT 30701307115. Av. Jujuy 2013, CABA 2VISA: PROMOCIÓN VIGENTE EN LA REPÚBLICA ARGENTINA DEL 16/09/19 AL 22/09/19 INCLUSIVE, ABONANDO LA TOTALIDAD DE LA RESERVA PREPAGA EN HASTA 12 CUOTAS SIN INTERÉS PARA VUELOS Y PAQUETES A DESTINOS DE LA RED INTERNACIONAL (EXCEPTO ROMA). VÁLIDA ÚNICAMENTE EN VUELOS OPERADOS POR AEROLÍNEAS ARGENTINAS/AUSTRAL LÍNEAS AÉREAS. EMISIONES CON TARJETA DE CRÉDITO VISA EMITIDA EN ARGENTINA, QUEDANDO EXCLUIDAS LAS SIGUIENTES TARJETAS VISA: VISA CORPORATE, VISA CUENTA CENTRAL, VISA PURCHASING, VISA PURCHASING AGRO, VISA DISTRIBUTION Y VISA RECARGABLE (TARJETA VISA BUSINESS: CONSULTE CON SU BANCO EMISOR SI LA TARJETA SE ENCUENTRA HABILITADA PARA OPERAR EN CUOTAS). CANALES DE COMERCIALIZACIÓN: DESPEGAR.COM, CALL CENTER O LA APP DE DESPEGAR. NO ACUMULABLE CON OTRAS PROMOCIONES. CONSULTE CON SU BANCO EMISOR OTROS CARGOS ASOCIADOS A LA OPERATORIA EN CUOTAS. PARA MÁS INFORMACIÓN CONSULTE EN WWW.AEROLINEAS.COM. PRISMA MEDIOS DE PAGO S.A., LAVARDEN 247, CABA, CUIT 30-59891004-5. Despegar.com.ar S.A., CUIT 30701307115. Av. Jujuy 2013, CABA 3 VISA: PROMOCIÓN VIGENTE EN LA REPÚBLICA ARGENTINA DEL 16/09/19 AL 22/09/19 INCLUSIVE, ABONANDO LA TOTALIDAD DE LA RESERVA PREPAGA EN HASTA 12 CUOTAS SIN INTERÉS PARA VUELOS Y PAQUETES A DESTINOS DE LA RED INTERNACIONAL (EXCEPTO ROMA). VÁLIDA ÚNICAMENTE EN VUELOS OPERADOS POR AEROLÍNEAS ARGENTINAS/AUSTRAL LÍNEAS AÉREAS. EMISIONES CON TARJETA DE CRÉDITO VISA EMITIDA EN ARGENTINA, QUEDANDO EXCLUIDAS LAS SIGUIENTES TARJETAS VISA: VISA CORPORATE, VISA CUENTA CENTRAL, VISA PURCHASING, VISA PURCHASING AGRO, VISA DISTRIBUTION Y VISA RECARGABLE (TARJETA VISA BUSINESS: CONSULTE CON SU BANCO EMISOR SI LA TARJETA SE ENCUENTRA HABILITADA PARA OPERAR EN CUOTAS). CANALES DE COMERCIALIZACIÓN: DESPEGAR.COM, CALL CENTER O LA APP DE DESPEGAR. NO ACUMULABLE CON OTRAS PROMOCIONES. CONSULTE CON SU BANCO EMISOR OTROS CARGOS ASOCIADOS A LA OPERATORIA EN CUOTAS. PARA MÁS INFORMACIÓN CONSULTE EN WWW.AEROLINEAS.COM. PRISMA MEDIOS DE PAGO S.A., LAVARDEN 247, CABA, CUIT 30-59891004-5. Despegar.com.ar S.A., CUIT 30701307115. Av. Jujuy 2013, CABA 55 VISA: PROMOCIÓN VIGENTE EN LA REPÚBLICA ARGENTINA DEL 16/09/19 AL 22/09/19 INCLUSIVE, ABONANDO LA TOTALIDAD DE LA RESERVA PREPAGA EN HASTA 12 CUOTAS SIN INTERÉS PARA VUELOS Y PAQUETES A DESTINOS DE LA RED INTERNACIONAL (EXCEPTO ROMA). VÁLIDA ÚNICAMENTE EN VUELOS OPERADOS POR AEROLÍNEAS ARGENTINAS/AUSTRAL LÍNEAS AÉREAS. EMISIONES CON TARJETA DE CRÉDITO VISA EMITIDA EN ARGENTINA, QUEDANDO EXCLUIDAS LAS SIGUIENTES TARJETAS VISA: VISA CORPORATE, VISA CUENTA CENTRAL, VISA PURCHASING, VISA PURCHASING AGRO, VISA DISTRIBUTION Y VISA RECARGABLE (TARJETA VISA BUSINESS: CONSULTE CON SU BANCO EMISOR SI LA TARJETA SE ENCUENTRA HABILITADA PARA OPERAR EN CUOTAS). CANALES DE COMERCIALIZACIÓN: DESPEGAR.COM, CALL CENTER O LA APP DE DESPEGAR. NO ACUMULABLE CON OTRAS PROMOCIONES. CONSULTE CON SU BANCO EMISOR OTROS CARGOS ASOCIADOS A LA OPERATORIA EN CUOTAS. PARA MÁS INFORMACIÓN CONSULTE EN WWW.AEROLINEAS.COM. PRISMA MEDIOS DE PAGO S.A., LAVARDEN 247, CABA, CUIT 30-59891004-5. Despegar.com.ar S.A., CUIT 30701307115. Av. Jujuy 2013, CABA 1 VISA: PROMOCIÓN VIGENTE EN LA REPÚBLICA ARGENTINA DEL 16/09/19 AL 22/09/19 INCLUSIVE, ABONANDO LA TOTALIDAD DE LA RESERVA PREPAGA EN HASTA 12 CUOTAS SIN INTERÉS PARA VUELOS Y PAQUETES A DESTINOS DE LA RED INTERNACIONAL (EXCEPTO ROMA). VÁLIDA ÚNICAMENTE EN VUELOS OPERADOS POR AEROLÍNEAS ARGENTINAS/AUSTRAL LÍNEAS AÉREAS. EMISIONES CON TARJETA DE CRÉDITO VISA EMITIDA EN ARGENTINA, QUEDANDO EXCLUIDAS LAS SIGUIENTES TARJETAS VISA: VISA CORPORATE, VISA CUENTA CENTRAL, VISA PURCHASING, VISA PURCHASING AGRO, VISA DISTRIBUTION Y VISA RECARGABLE (TARJETA VISA BUSINESS: CONSULTE CON SU BANCO EMISOR SI LA TARJETA SE ENCUENTRA HABILITADA PARA OPERAR EN CUOTAS). CANALES DE COMERCIALIZACIÓN: DESPEGAR.COM, CALL CENTER O LA APP DE DESPEGAR. NO ACUMULABLE CON OTRAS PROMOCIONES. CONSULTE CON SU BANCO EMISOR OTROS CARGOS ASOCIADOS A LA OPERATORIA EN CUOTAS. PARA MÁS INFORMACIÓN CONSULTE EN WWW.AEROLINEAS.COM. PRISMA MEDIOS DE PAGO S.A., LAVARDEN 247, CABA, CUIT 30-59891004-5. Despegar.com.ar S.A., CUIT 30701307115. Av. Jujuy 2013, CABA 2VISA: PROMOCIÓN VIGENTE EN LA REPÚBLICA ARGENTINA DEL 16/09/19 AL 22/09/19 INCLUSIVE, ABONANDO LA TOTALIDAD DE LA RESERVA PREPAGA EN HASTA 12 CUOTAS SIN INTERÉS PARA VUELOS Y PAQUETES A DESTINOS DE LA RED INTERNACIONAL (EXCEPTO ROMA). VÁLIDA ÚNICAMENTE EN VUELOS OPERADOS POR AEROLÍNEAS ARGENTINAS/AUSTRAL LÍNEAS AÉREAS. EMISIONES CON TARJETA DE CRÉDITO VISA EMITIDA EN ARGENTINA, QUEDANDO EXCLUIDAS LAS SIGUIENTES TARJETAS VISA: VISA CORPORATE, VISA CUENTA CENTRAL, VISA PURCHASING, VISA PURCHASING AGRO, VISA DISTRIBUTION Y VISA RECARGABLE (TARJETA VISA BUSINESS: CONSULTE CON SU BANCO EMISOR SI LA TARJETA SE ENCUENTRA HABILITADA PARA OPERAR EN CUOTAS). CANALES DE COMERCIALIZACIÓN: DESPEGAR.COM, CALL CENTER O LA APP DE DESPEGAR. NO ACUMULABLE CON OTRAS PROMOCIONES. CONSULTE CON SU BANCO EMISOR OTROS CARGOS ASOCIADOS A LA OPERATORIA EN CUOTAS. PARA MÁS INFORMACIÓN CONSULTE EN WWW.AEROLINEAS.COM. PRISMA MEDIOS DE PAGO S.A., LAVARDEN 247, CABA, CUIT 30-59891004-5. Despegar.com.ar S.A., CUIT 30701307115. Av. Jujuy 2013, CABA 3 VISA: PROMOCIÓN VIGENTE EN LA REPÚBLICA ARGENTINA DEL 16/09/19 AL 22/09/19 INCLUSIVE, ABONANDO LA TOTALIDAD DE LA RESERVA PREPAGA EN HASTA 12 CUOTAS SIN INTERÉS PARA VUELOS Y PAQUETES A DESTINOS DE LA RED INTERNACIONAL (EXCEPTO ROMA). VÁLIDA ÚNICAMENTE EN VUELOS OPERADOS POR AEROLÍNEAS ARGENTINAS/AUSTRAL LÍNEAS AÉREAS. EMISIONES CON TARJETA DE CRÉDITO VISA EMITIDA EN ARGENTINA, QUEDANDO EXCLUIDAS LAS SIGUIENTES TARJETAS VISA: VISA CORPORATE, VISA CUENTA CENTRAL, VISA PURCHASING, VISA PURCHASING AGRO, VISA DISTRIBUTION Y VISA RECARGABLE (TARJETA VISA BUSINESS: CONSULTE CON SU BANCO EMISOR SI LA TARJETA SE ENCUENTRA HABILITADA PARA OPERAR EN CUOTAS). CANALES DE COMERCIALIZACIÓN: DESPEGAR.COM, CALL CENTER O LA APP DE DESPEGAR. NO ACUMULABLE CON OTRAS PROMOCIONES. CONSULTE CON SU BANCO EMISOR OTROS CARGOS ASOCIADOS A LA OPERATORIA EN CUOTAS. PARA MÁS INFORMACIÓN CONSULTE EN WWW.AEROLINEAS.COM. PRISMA MEDIOS DE PAGO S.A., LAVARDEN 247, CABA, CUIT 30-59891004-5. Despegar.com.ar S.A., CUIT 30701307115. Av. Jujuy 2013, CABA 55 VISA: PROMOCIÓN VIGENTE EN LA REPÚBLICA ARGENTINA DEL 16/09/19 AL 22/09/19 INCLUSIVE, ABONANDO LA TOTALIDAD DE LA RESERVA PREPAGA EN HASTA 12 CUOTAS SIN INTERÉS PARA VUELOS Y PAQUETES A DESTINOS DE LA RED INTERNACIONAL (EXCEPTO ROMA). VÁLIDA ÚNICAMENTE EN VUELOS OPERADOS POR AEROLÍNEAS ARGENTINAS/AUSTRAL LÍNEAS AÉREAS. EMISIONES CON TARJETA DE CRÉDITO VISA EMITIDA EN ARGENTINA, QUEDANDO EXCLUIDAS LAS SIGUIENTES TARJETAS VISA: VISA CORPORATE, VISA CUENTA CENTRAL, VISA PURCHASING, VISA PURCHASING AGRO, VISA DISTRIBUTION Y VISA RECARGABLE (TARJETA VISA BUSINESS: CONSULTE CON SU BANCO EMISOR SI LA TARJETA SE ENCUENTRA HABILITADA PARA OPERAR EN CUOTAS). CANALES DE COMERCIALIZACIÓN: DESPEGAR.COM, CALL CENTER O LA APP DE DESPEGAR. NO ACUMULABLE CON OTRAS PROMOCIONES. CONSULTE CON SU BANCO EMISOR OTROS CARGOS ASOCIADOS A LA OPERATORIA EN CUOTAS. PARA MÁS INFORMACIÓN CONSULTE EN WWW.AEROLINEAS.COM. PRISMA MEDIOS DE PAGO S.A., LAVARDEN 247, CABA, CUIT 30-59891004-5. Despegar.com.ar S.A., CUIT 30701307115. Av. Jujuy 2013, CABA 1 VISA: PROMOCIÓN VIGENTE EN LA REPÚBLICA ARGENTINA DEL 16/09/19 AL 22/09/19 INCLUSIVE, ABONANDO LA TOTALIDAD DE LA RESERVA PREPAGA EN HASTA 12 CUOTAS SIN INTERÉS PARA VUELOS Y PAQUETES A DESTINOS DE LA RED INTERNACIONAL (EXCEPTO ROMA). VÁLIDA ÚNICAMENTE EN VUELOS OPERADOS POR AEROLÍNEAS ARGENTINAS/AUSTRAL LÍNEAS AÉREAS. EMISIONES CON TARJETA DE CRÉDITO VISA EMITIDA EN ARGENTINA, QUEDANDO EXCLUIDAS LAS SIGUIENTES TARJETAS VISA: VISA CORPORATE, VISA CUENTA CENTRAL, VISA PURCHASING, VISA PURCHASING AGRO, VISA DISTRIBUTION Y VISA RECARGABLE (TARJETA VISA BUSINESS: CONSULTE CON SU BANCO EMISOR SI LA TARJETA SE ENCUENTRA HABILITADA PARA OPERAR EN CUOTAS). CANALES DE COMERCIALIZACIÓN: DESPEGAR.COM, CALL CENTER O LA APP DE DESPEGAR. NO ACUMULABLE CON OTRAS PROMOCIONES. CONSULTE CON SU BANCO EMISOR OTROS CARGOS ASOCIADOS A LA OPERATORIA EN CUOTAS. PARA MÁS INFORMACIÓN CONSULTE EN WWW.AEROLINEAS.COM. PRISMA MEDIOS DE PAGO S.A., LAVARDEN 247, CABA, CUIT 30-59891004-5. Despegar.com.ar S.A., CUIT 30701307115. Av. Jujuy 2013, CABA 2VISA: PROMOCIÓN VIGENTE EN LA REPÚBLICA ARGENTINA DEL 16/09/19 AL 22/09/19 INCLUSIVE, ABONANDO LA TOTALIDAD DE LA RESERVA PREPAGA EN HASTA 12 CUOTAS SIN INTERÉS PARA VUELOS Y PAQUETES A DESTINOS DE LA RED INTERNACIONAL (EXCEPTO ROMA). VÁLIDA ÚNICAMENTE EN VUELOS OPERADOS POR AEROLÍNEAS ARGENTINAS/AUSTRAL LÍNEAS AÉREAS. EMISIONES CON TARJETA DE CRÉDITO VISA EMITIDA EN ARGENTINA, QUEDANDO EXCLUIDAS LAS SIGUIENTES TARJETAS VISA: VISA CORPORATE, VISA CUENTA CENTRAL, VISA PURCHASING, VISA PURCHASING AGRO, VISA DISTRIBUTION Y VISA RECARGABLE (TARJETA VISA BUSINESS: CONSULTE CON SU BANCO EMISOR SI LA TARJETA SE ENCUENTRA HABILITADA PARA OPERAR EN CUOTAS). CANALES DE COMERCIALIZACIÓN: DESPEGAR.COM, CALL CENTER O LA APP DE DESPEGAR. NO ACUMULABLE CON OTRAS PROMOCIONES. CONSULTE CON SU BANCO EMISOR OTROS CARGOS ASOCIADOS A LA OPERATORIA EN CUOTAS. PARA MÁS INFORMACIÓN CONSULTE EN WWW.AEROLINEAS.COM. PRISMA MEDIOS DE PAGO S.A., LAVARDEN 247, CABA, CUIT 30-59891004-5. Despegar.com.ar S.A., CUIT 30701307115. Av. Jujuy 2013, CABA 3 VISA: PROMOCIÓN VIGENTE EN LA REPÚBLICA ARGENTINA DEL 16/09/19 AL 22/09/19 INCLUSIVE, ABONANDO LA TOTALIDAD DE LA RESERVA PREPAGA EN HASTA 12 CUOTAS SIN INTERÉS PARA VUELOS Y PAQUETES A DESTINOS DE LA RED INTERNACIONAL (EXCEPTO ROMA). VÁLIDA ÚNICAMENTE EN VUELOS OPERADOS POR AEROLÍNEAS ARGENTINAS/AUSTRAL LÍNEAS AÉREAS. EMISIONES CON TARJETA DE CRÉDITO VISA EMITIDA EN ARGENTINA, QUEDANDO EXCLUIDAS LAS SIGUIENTES TARJETAS VISA: VISA CORPORATE, VISA CUENTA CENTRAL, VISA PURCHASING, VISA PURCHASING AGRO, VISA DISTRIBUTION Y VISA RECARGABLE (TARJETA VISA BUSINESS: CONSULTE CON SU BANCO EMISOR SI LA TARJETA SE ENCUENTRA HABILITADA PARA OPERAR EN CUOTAS). CANALES DE COMERCIALIZACIÓN: DESPEGAR.COM, CALL CENTER O LA APP DE DESPEGAR. NO ACUMULABLE CON OTRAS PROMOCIONES. CONSULTE CON SU BANCO EMISOR OTROS CARGOS ASOCIADOS A LA OPERATORIA EN CUOTAS. PARA MÁS INFORMACIÓN CONSULTE EN WWW.AEROLINEAS.COM. PRISMA MEDIOS DE PAGO S.A., LAVARDEN 247, CABA, CUIT 30-59891004-5. Despegar.com.ar S.A., CUIT 30701307115. Av. Jujuy 2013, CABA 55 1980"},{"bco_id":9,"bco_nombre":"ICBC","bco_img":"https://img.travel-tool.net/entidades/ICBC.jpg","promocion_id":28,"tipo_serv_id":3,"tipo_serv_nombre":"Terrestre","card_id":1,"card_nombre":"Visa","img_card":"https://www.mercadopago.com/org-img/MP3/API/logos/visa.gif","cta_cuotas":3,"cta_interes":9.5,"cftna":0,"alta":"2019-08-01","vencimiento":"2019-11-30","nota_legal":"VISA: PROMOCIÓN VIGENTE EN LA REPÚBLICA ARGENTINA DEL 16/09/19 AL 22/09/19 INCLUSIVE, ABONANDO LA TOTALIDAD DE LA RESERVA PREPAGA EN HASTA 12 CUOTAS SIN INTERÉS PARA VUELOS Y PAQUETES A DESTINOS DE LA RED INTERNACIONAL (EXCEPTO ROMA). VÁLIDA ÚNICAMENTE EN VUELOS OPERADOS POR AEROLÍNEAS ARGENTINAS/AUSTRAL LÍNEAS AÉREAS. EMISIONES CON TARJETA DE CRÉDITO VISA EMITIDA EN ARGENTINA, QUEDANDO EXCLUIDAS LAS SIGUIENTES TARJETAS VISA: VISA CORPORATE, VISA CUENTA CENTRAL, VISA PURCHASING, VISA PURCHASING AGRO, VISA DISTRIBUTION Y VISA RECARGABLE (TARJETA VISA BUSINESS: CONSULTE CON SU BANCO EMISOR SI LA TARJETA SE ENCUENTRA HABILITADA PARA OPERAR EN CUOTAS). CANALES DE COMERCIALIZACIÓN: DESPEGAR.COM, CALL CENTER O LA APP DE DESPEGAR. NO ACUMULABLE CON OTRAS PROMOCIONES. CONSULTE CON SU BANCO EMISOR OTROS CARGOS ASOCIADOS A LA OPERATORIA EN CUOTAS. PARA MÁS INFORMACIÓN CONSULTE EN WWW.AEROLINEAS.COM. PRISMA MEDIOS DE PAGO S.A., LAVARDEN 247, CABA, CUIT 30-59891004-5. Despegar.com.ar S.A., CUIT 30701307115. Av. Jujuy 2013, CABA 1 VISA: PROMOCIÓN VIGENTE EN LA REPÚBLICA ARGENTINA DEL 16/09/19 AL 22/09/19 INCLUSIVE, ABONANDO LA TOTALIDAD DE LA RESERVA PREPAGA EN HASTA 12 CUOTAS SIN INTERÉS PARA VUELOS Y PAQUETES A DESTINOS DE LA RED INTERNACIONAL (EXCEPTO ROMA). VÁLIDA ÚNICAMENTE EN VUELOS OPERADOS POR AEROLÍNEAS ARGENTINAS/AUSTRAL LÍNEAS AÉREAS. EMISIONES CON TARJETA DE CRÉDITO VISA EMITIDA EN ARGENTINA, QUEDANDO EXCLUIDAS LAS SIGUIENTES TARJETAS VISA: VISA CORPORATE, VISA CUENTA CENTRAL, VISA PURCHASING, VISA PURCHASING AGRO, VISA DISTRIBUTION Y VISA RECARGABLE (TARJETA VISA BUSINESS: CONSULTE CON SU BANCO EMISOR SI LA TARJETA SE ENCUENTRA HABILITADA PARA OPERAR EN CUOTAS). CANALES DE COMERCIALIZACIÓN: DESPEGAR.COM, CALL CENTER O LA APP DE DESPEGAR. NO ACUMULABLE CON OTRAS PROMOCIONES. CONSULTE CON SU BANCO EMISOR OTROS CARGOS ASOCIADOS A LA OPERATORIA EN CUOTAS. PARA MÁS INFORMACIÓN CONSULTE EN WWW.AEROLINEAS.COM. PRISMA MEDIOS DE PAGO S.A., LAVARDEN 247, CABA, CUIT 30-59891004-5. Despegar.com.ar S.A., CUIT 30701307115. Av. Jujuy 2013, CABA 2VISA: PROMOCIÓN VIGENTE EN LA REPÚBLICA ARGENTINA DEL 16/09/19 AL 22/09/19 INCLUSIVE, ABONANDO LA TOTALIDAD DE LA RESERVA PREPAGA EN HASTA 12 CUOTAS SIN INTERÉS PARA VUELOS Y PAQUETES A DESTINOS DE LA RED INTERNACIONAL (EXCEPTO ROMA). VÁLIDA ÚNICAMENTE EN VUELOS OPERADOS POR AEROLÍNEAS ARGENTINAS/AUSTRAL LÍNEAS AÉREAS. EMISIONES CON TARJETA DE CRÉDITO VISA EMITIDA EN ARGENTINA, QUEDANDO EXCLUIDAS LAS SIGUIENTES TARJETAS VISA: VISA CORPORATE, VISA CUENTA CENTRAL, VISA PURCHASING, VISA PURCHASING AGRO, VISA DISTRIBUTION Y VISA RECARGABLE (TARJETA VISA BUSINESS: CONSULTE CON SU BANCO EMISOR SI LA TARJETA SE ENCUENTRA HABILITADA PARA OPERAR EN CUOTAS). CANALES DE COMERCIALIZACIÓN: DESPEGAR.COM, CALL CENTER O LA APP DE DESPEGAR. NO ACUMULABLE CON OTRAS PROMOCIONES. CONSULTE CON SU BANCO EMISOR OTROS CARGOS ASOCIADOS A LA OPERATORIA EN CUOTAS. PARA MÁS INFORMACIÓN CONSULTE EN WWW.AEROLINEAS.COM. PRISMA MEDIOS DE PAGO S.A., LAVARDEN 247, CABA, CUIT 30-59891004-5. Despegar.com.ar S.A., CUIT 30701307115. Av. Jujuy 2013, CABA 3 VISA: PROMOCIÓN VIGENTE EN LA REPÚBLICA ARGENTINA DEL 16/09/19 AL 22/09/19 INCLUSIVE, ABONANDO LA TOTALIDAD DE LA RESERVA PREPAGA EN HASTA 12 CUOTAS SIN INTERÉS PARA VUELOS Y PAQUETES A DESTINOS DE LA RED INTERNACIONAL (EXCEPTO ROMA). VÁLIDA ÚNICAMENTE EN VUELOS OPERADOS POR AEROLÍNEAS ARGENTINAS/AUSTRAL LÍNEAS AÉREAS. EMISIONES CON TARJETA DE CRÉDITO VISA EMITIDA EN ARGENTINA, QUEDANDO EXCLUIDAS LAS SIGUIENTES TARJETAS VISA: VISA CORPORATE, VISA CUENTA CENTRAL, VISA PURCHASING, VISA PURCHASING AGRO, VISA DISTRIBUTION Y VISA RECARGABLE (TARJETA VISA BUSINESS: CONSULTE CON SU BANCO EMISOR SI LA TARJETA SE ENCUENTRA HABILITADA PARA OPERAR EN CUOTAS). CANALES DE COMERCIALIZACIÓN: DESPEGAR.COM, CALL CENTER O LA APP DE DESPEGAR. NO ACUMULABLE CON OTRAS PROMOCIONES. CONSULTE CON SU BANCO EMISOR OTROS CARGOS ASOCIADOS A LA OPERATORIA EN CUOTAS. PARA MÁS INFORMACIÓN CONSULTE EN WWW.AEROLINEAS.COM. PRISMA MEDIOS DE PAGO S.A., LAVARDEN 247, CABA, CUIT 30-59891004-5. Despegar.com.ar S.A., CUIT 30701307115. Av. Jujuy 2013, CABA 55 VISA: PROMOCIÓN VIGENTE EN LA REPÚBLICA ARGENTINA DEL 16/09/19 AL 22/09/19 INCLUSIVE, ABONANDO LA TOTALIDAD DE LA RESERVA PREPAGA EN HASTA 12 CUOTAS SIN INTERÉS PARA VUELOS Y PAQUETES A DESTINOS DE LA RED INTERNACIONAL (EXCEPTO ROMA). VÁLIDA ÚNICAMENTE EN VUELOS OPERADOS POR AEROLÍNEAS ARGENTINAS/AUSTRAL LÍNEAS AÉREAS. EMISIONES CON TARJETA DE CRÉDITO VISA EMITIDA EN ARGENTINA, QUEDANDO EXCLUIDAS LAS SIGUIENTES TARJETAS VISA: VISA CORPORATE, VISA CUENTA CENTRAL, VISA PURCHASING, VISA PURCHASING AGRO, VISA DISTRIBUTION Y VISA RECARGABLE (TARJETA VISA BUSINESS: CONSULTE CON SU BANCO EMISOR SI LA TARJETA SE ENCUENTRA HABILITADA PARA OPERAR EN CUOTAS). CANALES DE COMERCIALIZACIÓN: DESPEGAR.COM, CALL CENTER O LA APP DE DESPEGAR. NO ACUMULABLE CON OTRAS PROMOCIONES. CONSULTE CON SU BANCO EMISOR OTROS CARGOS ASOCIADOS A LA OPERATORIA EN CUOTAS. PARA MÁS INFORMACIÓN CONSULTE EN WWW.AEROLINEAS.COM. PRISMA MEDIOS DE PAGO S.A., LAVARDEN 247, CABA, CUIT 30-59891004-5. Despegar.com.ar S.A., CUIT 30701307115. Av. Jujuy 2013, CABA 1 VISA: PROMOCIÓN VIGENTE EN LA REPÚBLICA ARGENTINA DEL 16/09/19 AL 22/09/19 INCLUSIVE, ABONANDO LA TOTALIDAD DE LA RESERVA PREPAGA EN HASTA 12 CUOTAS SIN INTERÉS PARA VUELOS Y PAQUETES A DESTINOS DE LA RED INTERNACIONAL (EXCEPTO ROMA). VÁLIDA ÚNICAMENTE EN VUELOS OPERADOS POR AEROLÍNEAS ARGENTINAS/AUSTRAL LÍNEAS AÉREAS. EMISIONES CON TARJETA DE CRÉDITO VISA EMITIDA EN ARGENTINA, QUEDANDO EXCLUIDAS LAS SIGUIENTES TARJETAS VISA: VISA CORPORATE, VISA CUENTA CENTRAL, VISA PURCHASING, VISA PURCHASING AGRO, VISA DISTRIBUTION Y VISA RECARGABLE (TARJETA VISA BUSINESS: CONSULTE CON SU BANCO EMISOR SI LA TARJETA SE ENCUENTRA HABILITADA PARA OPERAR EN CUOTAS). CANALES DE COMERCIALIZACIÓN: DESPEGAR.COM, CALL CENTER O LA APP DE DESPEGAR. NO ACUMULABLE CON OTRAS PROMOCIONES. CONSULTE CON SU BANCO EMISOR OTROS CARGOS ASOCIADOS A LA OPERATORIA EN CUOTAS. PARA MÁS INFORMACIÓN CONSULTE EN WWW.AEROLINEAS.COM. PRISMA MEDIOS DE PAGO S.A., LAVARDEN 247, CABA, CUIT 30-59891004-5. Despegar.com.ar S.A., CUIT 30701307115. Av. Jujuy 2013, CABA 2VISA: PROMOCIÓN VIGENTE EN LA REPÚBLICA ARGENTINA DEL 16/09/19 AL 22/09/19 INCLUSIVE, ABONANDO LA TOTALIDAD DE LA RESERVA PREPAGA EN HASTA 12 CUOTAS SIN INTERÉS PARA VUELOS Y PAQUETES A DESTINOS DE LA RED INTERNACIONAL (EXCEPTO ROMA). VÁLIDA ÚNICAMENTE EN VUELOS OPERADOS POR AEROLÍNEAS ARGENTINAS/AUSTRAL LÍNEAS AÉREAS. EMISIONES CON TARJETA DE CRÉDITO VISA EMITIDA EN ARGENTINA, QUEDANDO EXCLUIDAS LAS SIGUIENTES TARJETAS VISA: VISA CORPORATE, VISA CUENTA CENTRAL, VISA PURCHASING, VISA PURCHASING AGRO, VISA DISTRIBUTION Y VISA RECARGABLE (TARJETA VISA BUSINESS: CONSULTE CON SU BANCO EMISOR SI LA TARJETA SE ENCUENTRA HABILITADA PARA OPERAR EN CUOTAS). CANALES DE COMERCIALIZACIÓN: DESPEGAR.COM, CALL CENTER O LA APP DE DESPEGAR. NO ACUMULABLE CON OTRAS PROMOCIONES. CONSULTE CON SU BANCO EMISOR OTROS CARGOS ASOCIADOS A LA OPERATORIA EN CUOTAS. PARA MÁS INFORMACIÓN CONSULTE EN WWW.AEROLINEAS.COM. PRISMA MEDIOS DE PAGO S.A., LAVARDEN 247, CABA, CUIT 30-59891004-5. Despegar.com.ar S.A., CUIT 30701307115. Av. Jujuy 2013, CABA 3 VISA: PROMOCIÓN VIGENTE EN LA REPÚBLICA ARGENTINA DEL 16/09/19 AL 22/09/19 INCLUSIVE, ABONANDO LA TOTALIDAD DE LA RESERVA PREPAGA EN HASTA 12 CUOTAS SIN INTERÉS PARA VUELOS Y PAQUETES A DESTINOS DE LA RED INTERNACIONAL (EXCEPTO ROMA). VÁLIDA ÚNICAMENTE EN VUELOS OPERADOS POR AEROLÍNEAS ARGENTINAS/AUSTRAL LÍNEAS AÉREAS. EMISIONES CON TARJETA DE CRÉDITO VISA EMITIDA EN ARGENTINA, QUEDANDO EXCLUIDAS LAS SIGUIENTES TARJETAS VISA: VISA CORPORATE, VISA CUENTA CENTRAL, VISA PURCHASING, VISA PURCHASING AGRO, VISA DISTRIBUTION Y VISA RECARGABLE (TARJETA VISA BUSINESS: CONSULTE CON SU BANCO EMISOR SI LA TARJETA SE ENCUENTRA HABILITADA PARA OPERAR EN CUOTAS). CANALES DE COMERCIALIZACIÓN: DESPEGAR.COM, CALL CENTER O LA APP DE DESPEGAR. NO ACUMULABLE CON OTRAS PROMOCIONES. CONSULTE CON SU BANCO EMISOR OTROS CARGOS ASOCIADOS A LA OPERATORIA EN CUOTAS. PARA MÁS INFORMACIÓN CONSULTE EN WWW.AEROLINEAS.COM. PRISMA MEDIOS DE PAGO S.A., LAVARDEN 247, CABA, CUIT 30-59891004-5. Despegar.com.ar S.A., CUIT 30701307115. Av. Jujuy 2013, CABA 55 VISA: PROMOCIÓN VIGENTE EN LA REPÚBLICA ARGENTINA DEL 16/09/19 AL 22/09/19 INCLUSIVE, ABONANDO LA TOTALIDAD DE LA RESERVA PREPAGA EN HASTA 12 CUOTAS SIN INTERÉS PARA VUELOS Y PAQUETES A DESTINOS DE LA RED INTERNACIONAL (EXCEPTO ROMA). VÁLIDA ÚNICAMENTE EN VUELOS OPERADOS POR AEROLÍNEAS ARGENTINAS/AUSTRAL LÍNEAS AÉREAS. EMISIONES CON TARJETA DE CRÉDITO VISA EMITIDA EN ARGENTINA, QUEDANDO EXCLUIDAS LAS SIGUIENTES TARJETAS VISA: VISA CORPORATE, VISA CUENTA CENTRAL, VISA PURCHASING, VISA PURCHASING AGRO, VISA DISTRIBUTION Y VISA RECARGABLE (TARJETA VISA BUSINESS: CONSULTE CON SU BANCO EMISOR SI LA TARJETA SE ENCUENTRA HABILITADA PARA OPERAR EN CUOTAS). CANALES DE COMERCIALIZACIÓN: DESPEGAR.COM, CALL CENTER O LA APP DE DESPEGAR. NO ACUMULABLE CON OTRAS PROMOCIONES. CONSULTE CON SU BANCO EMISOR OTROS CARGOS ASOCIADOS A LA OPERATORIA EN CUOTAS. PARA MÁS INFORMACIÓN CONSULTE EN WWW.AEROLINEAS.COM. PRISMA MEDIOS DE PAGO S.A., LAVARDEN 247, CABA, CUIT 30-59891004-5. Despegar.com.ar S.A., CUIT 30701307115. Av. Jujuy 2013, CABA 1 VISA: PROMOCIÓN VIGENTE EN LA REPÚBLICA ARGENTINA DEL 16/09/19 AL 22/09/19 INCLUSIVE, ABONANDO LA TOTALIDAD DE LA RESERVA PREPAGA EN HASTA 12 CUOTAS SIN INTERÉS PARA VUELOS Y PAQUETES A DESTINOS DE LA RED INTERNACIONAL (EXCEPTO ROMA). VÁLIDA ÚNICAMENTE EN VUELOS OPERADOS POR AEROLÍNEAS ARGENTINAS/AUSTRAL LÍNEAS AÉREAS. EMISIONES CON TARJETA DE CRÉDITO VISA EMITIDA EN ARGENTINA, QUEDANDO EXCLUIDAS LAS SIGUIENTES TARJETAS VISA: VISA CORPORATE, VISA CUENTA CENTRAL, VISA PURCHASING, VISA PURCHASING AGRO, VISA DISTRIBUTION Y VISA RECARGABLE (TARJETA VISA BUSINESS: CONSULTE CON SU BANCO EMISOR SI LA TARJETA SE ENCUENTRA HABILITADA PARA OPERAR EN CUOTAS). CANALES DE COMERCIALIZACIÓN: DESPEGAR.COM, CALL CENTER O LA APP DE DESPEGAR. NO ACUMULABLE CON OTRAS PROMOCIONES. CONSULTE CON SU BANCO EMISOR OTROS CARGOS ASOCIADOS A LA OPERATORIA EN CUOTAS. PARA MÁS INFORMACIÓN CONSULTE EN WWW.AEROLINEAS.COM. PRISMA MEDIOS DE PAGO S.A., LAVARDEN 247, CABA, CUIT 30-59891004-5. Despegar.com.ar S.A., CUIT 30701307115. Av. Jujuy 2013, CABA 2VISA: PROMOCIÓN VIGENTE EN LA REPÚBLICA ARGENTINA DEL 16/09/19 AL 22/09/19 INCLUSIVE, ABONANDO LA TOTALIDAD DE LA RESERVA PREPAGA EN HASTA 12 CUOTAS SIN INTERÉS PARA VUELOS Y PAQUETES A DESTINOS DE LA RED INTERNACIONAL (EXCEPTO ROMA). VÁLIDA ÚNICAMENTE EN VUELOS OPERADOS POR AEROLÍNEAS ARGENTINAS/AUSTRAL LÍNEAS AÉREAS. EMISIONES CON TARJETA DE CRÉDITO VISA EMITIDA EN ARGENTINA, QUEDANDO EXCLUIDAS LAS SIGUIENTES TARJETAS VISA: VISA CORPORATE, VISA CUENTA CENTRAL, VISA PURCHASING, VISA PURCHASING AGRO, VISA DISTRIBUTION Y VISA RECARGABLE (TARJETA VISA BUSINESS: CONSULTE CON SU BANCO EMISOR SI LA TARJETA SE ENCUENTRA HABILITADA PARA OPERAR EN CUOTAS). CANALES DE COMERCIALIZACIÓN: DESPEGAR.COM, CALL CENTER O LA APP DE DESPEGAR. NO ACUMULABLE CON OTRAS PROMOCIONES. CONSULTE CON SU BANCO EMISOR OTROS CARGOS ASOCIADOS A LA OPERATORIA EN CUOTAS. PARA MÁS INFORMACIÓN CONSULTE EN WWW.AEROLINEAS.COM. PRISMA MEDIOS DE PAGO S.A., LAVARDEN 247, CABA, CUIT 30-59891004-5. Despegar.com.ar S.A., CUIT 30701307115. Av. Jujuy 2013, CABA 3 VISA: PROMOCIÓN VIGENTE EN LA REPÚBLICA ARGENTINA DEL 16/09/19 AL 22/09/19 INCLUSIVE, ABONANDO LA TOTALIDAD DE LA RESERVA PREPAGA EN HASTA 12 CUOTAS SIN INTERÉS PARA VUELOS Y PAQUETES A DESTINOS DE LA RED INTERNACIONAL (EXCEPTO ROMA). VÁLIDA ÚNICAMENTE EN VUELOS OPERADOS POR AEROLÍNEAS ARGENTINAS/AUSTRAL LÍNEAS AÉREAS. EMISIONES CON TARJETA DE CRÉDITO VISA EMITIDA EN ARGENTINA, QUEDANDO EXCLUIDAS LAS SIGUIENTES TARJETAS VISA: VISA CORPORATE, VISA CUENTA CENTRAL, VISA PURCHASING, VISA PURCHASING AGRO, VISA DISTRIBUTION Y VISA RECARGABLE (TARJETA VISA BUSINESS: CONSULTE CON SU BANCO EMISOR SI LA TARJETA SE ENCUENTRA HABILITADA PARA OPERAR EN CUOTAS). CANALES DE COMERCIALIZACIÓN: DESPEGAR.COM, CALL CENTER O LA APP DE DESPEGAR. NO ACUMULABLE CON OTRAS PROMOCIONES. CONSULTE CON SU BANCO EMISOR OTROS CARGOS ASOCIADOS A LA OPERATORIA EN CUOTAS. PARA MÁS INFORMACIÓN CONSULTE EN WWW.AEROLINEAS.COM. PRISMA MEDIOS DE PAGO S.A., LAVARDEN 247, CABA, CUIT 30-59891004-5. Despegar.com.ar S.A., CUIT 30701307115. Av. Jujuy 2013, CABA 55 1980"},{"bco_id":9,"bco_nombre":"ICBC","bco_img":"https://img.travel-tool.net/entidades/ICBC.jpg","promocion_id":28,"tipo_serv_id":3,"tipo_serv_nombre":"Terrestre","card_id":1,"card_nombre":"Visa","img_card":"https://www.mercadopago.com/org-img/MP3/API/logos/visa.gif","cta_cuotas":6,"cta_interes":9.5,"cftna":9.5,"alta":"2019-08-01","vencimiento":"2019-11-30","nota_legal":"VISA: PROMOCIÓN VIGENTE EN LA REPÚBLICA ARGENTINA DEL 16/09/19 AL 22/09/19 INCLUSIVE, ABONANDO LA TOTALIDAD DE LA RESERVA PREPAGA EN HASTA 12 CUOTAS SIN INTERÉS PARA VUELOS Y PAQUETES A DESTINOS DE LA RED INTERNACIONAL (EXCEPTO ROMA). VÁLIDA ÚNICAMENTE EN VUELOS OPERADOS POR AEROLÍNEAS ARGENTINAS/AUSTRAL LÍNEAS AÉREAS. EMISIONES CON TARJETA DE CRÉDITO VISA EMITIDA EN ARGENTINA, QUEDANDO EXCLUIDAS LAS SIGUIENTES TARJETAS VISA: VISA CORPORATE, VISA CUENTA CENTRAL, VISA PURCHASING, VISA PURCHASING AGRO, VISA DISTRIBUTION Y VISA RECARGABLE (TARJETA VISA BUSINESS: CONSULTE CON SU BANCO EMISOR SI LA TARJETA SE ENCUENTRA HABILITADA PARA OPERAR EN CUOTAS). CANALES DE COMERCIALIZACIÓN: DESPEGAR.COM, CALL CENTER O LA APP DE DESPEGAR. NO ACUMULABLE CON OTRAS PROMOCIONES. CONSULTE CON SU BANCO EMISOR OTROS CARGOS ASOCIADOS A LA OPERATORIA EN CUOTAS. PARA MÁS INFORMACIÓN CONSULTE EN WWW.AEROLINEAS.COM. PRISMA MEDIOS DE PAGO S.A., LAVARDEN 247, CABA, CUIT 30-59891004-5. Despegar.com.ar S.A., CUIT 30701307115. Av. Jujuy 2013, CABA 1 VISA: PROMOCIÓN VIGENTE EN LA REPÚBLICA ARGENTINA DEL 16/09/19 AL 22/09/19 INCLUSIVE, ABONANDO LA TOTALIDAD DE LA RESERVA PREPAGA EN HASTA 12 CUOTAS SIN INTERÉS PARA VUELOS Y PAQUETES A DESTINOS DE LA RED INTERNACIONAL (EXCEPTO ROMA). VÁLIDA ÚNICAMENTE EN VUELOS OPERADOS POR AEROLÍNEAS ARGENTINAS/AUSTRAL LÍNEAS AÉREAS. EMISIONES CON TARJETA DE CRÉDITO VISA EMITIDA EN ARGENTINA, QUEDANDO EXCLUIDAS LAS SIGUIENTES TARJETAS VISA: VISA CORPORATE, VISA CUENTA CENTRAL, VISA PURCHASING, VISA PURCHASING AGRO, VISA DISTRIBUTION Y VISA RECARGABLE (TARJETA VISA BUSINESS: CONSULTE CON SU BANCO EMISOR SI LA TARJETA SE ENCUENTRA HABILITADA PARA OPERAR EN CUOTAS). CANALES DE COMERCIALIZACIÓN: DESPEGAR.COM, CALL CENTER O LA APP DE DESPEGAR. NO ACUMULABLE CON OTRAS PROMOCIONES. CONSULTE CON SU BANCO EMISOR OTROS CARGOS ASOCIADOS A LA OPERATORIA EN CUOTAS. PARA MÁS INFORMACIÓN CONSULTE EN WWW.AEROLINEAS.COM. PRISMA MEDIOS DE PAGO S.A., LAVARDEN 247, CABA, CUIT 30-59891004-5. Despegar.com.ar S.A., CUIT 30701307115. Av. Jujuy 2013, CABA 2VISA: PROMOCIÓN VIGENTE EN LA REPÚBLICA ARGENTINA DEL 16/09/19 AL 22/09/19 INCLUSIVE, ABONANDO LA TOTALIDAD DE LA RESERVA PREPAGA EN HASTA 12 CUOTAS SIN INTERÉS PARA VUELOS Y PAQUETES A DESTINOS DE LA RED INTERNACIONAL (EXCEPTO ROMA). VÁLIDA ÚNICAMENTE EN VUELOS OPERADOS POR AEROLÍNEAS ARGENTINAS/AUSTRAL LÍNEAS AÉREAS. EMISIONES CON TARJETA DE CRÉDITO VISA EMITIDA EN ARGENTINA, QUEDANDO EXCLUIDAS LAS SIGUIENTES TARJETAS VISA: VISA CORPORATE, VISA CUENTA CENTRAL, VISA PURCHASING, VISA PURCHASING AGRO, VISA DISTRIBUTION Y VISA RECARGABLE (TARJETA VISA BUSINESS: CONSULTE CON SU BANCO EMISOR SI LA TARJETA SE ENCUENTRA HABILITADA PARA OPERAR EN CUOTAS). CANALES DE COMERCIALIZACIÓN: DESPEGAR.COM, CALL CENTER O LA APP DE DESPEGAR. NO ACUMULABLE CON OTRAS PROMOCIONES. CONSULTE CON SU BANCO EMISOR OTROS CARGOS ASOCIADOS A LA OPERATORIA EN CUOTAS. PARA MÁS INFORMACIÓN CONSULTE EN WWW.AEROLINEAS.COM. PRISMA MEDIOS DE PAGO S.A., LAVARDEN 247, CABA, CUIT 30-59891004-5. Despegar.com.ar S.A., CUIT 30701307115. Av. Jujuy 2013, CABA 3 VISA: PROMOCIÓN VIGENTE EN LA REPÚBLICA ARGENTINA DEL 16/09/19 AL 22/09/19 INCLUSIVE, ABONANDO LA TOTALIDAD DE LA RESERVA PREPAGA EN HASTA 12 CUOTAS SIN INTERÉS PARA VUELOS Y PAQUETES A DESTINOS DE LA RED INTERNACIONAL (EXCEPTO ROMA). VÁLIDA ÚNICAMENTE EN VUELOS OPERADOS POR AEROLÍNEAS ARGENTINAS/AUSTRAL LÍNEAS AÉREAS. EMISIONES CON TARJETA DE CRÉDITO VISA EMITIDA EN ARGENTINA, QUEDANDO EXCLUIDAS LAS SIGUIENTES TARJETAS VISA: VISA CORPORATE, VISA CUENTA CENTRAL, VISA PURCHASING, VISA PURCHASING AGRO, VISA DISTRIBUTION Y VISA RECARGABLE (TARJETA VISA BUSINESS: CONSULTE CON SU BANCO EMISOR SI LA TARJETA SE ENCUENTRA HABILITADA PARA OPERAR EN CUOTAS). CANALES DE COMERCIALIZACIÓN: DESPEGAR.COM, CALL CENTER O LA APP DE DESPEGAR. NO ACUMULABLE CON OTRAS PROMOCIONES. CONSULTE CON SU BANCO EMISOR OTROS CARGOS ASOCIADOS A LA OPERATORIA EN CUOTAS. PARA MÁS INFORMACIÓN CONSULTE EN WWW.AEROLINEAS.COM. PRISMA MEDIOS DE PAGO S.A., LAVARDEN 247, CABA, CUIT 30-59891004-5. Despegar.com.ar S.A., CUIT 30701307115. Av. Jujuy 2013, CABA 55 VISA: PROMOCIÓN VIGENTE EN LA REPÚBLICA ARGENTINA DEL 16/09/19 AL 22/09/19 INCLUSIVE, ABONANDO LA TOTALIDAD DE LA RESERVA PREPAGA EN HASTA 12 CUOTAS SIN INTERÉS PARA VUELOS Y PAQUETES A DESTINOS DE LA RED INTERNACIONAL (EXCEPTO ROMA). VÁLIDA ÚNICAMENTE EN VUELOS OPERADOS POR AEROLÍNEAS ARGENTINAS/AUSTRAL LÍNEAS AÉREAS. EMISIONES CON TARJETA DE CRÉDITO VISA EMITIDA EN ARGENTINA, QUEDANDO EXCLUIDAS LAS SIGUIENTES TARJETAS VISA: VISA CORPORATE, VISA CUENTA CENTRAL, VISA PURCHASING, VISA PURCHASING AGRO, VISA DISTRIBUTION Y VISA RECARGABLE (TARJETA VISA BUSINESS: CONSULTE CON SU BANCO EMISOR SI LA TARJETA SE ENCUENTRA HABILITADA PARA OPERAR EN CUOTAS). CANALES DE COMERCIALIZACIÓN: DESPEGAR.COM, CALL CENTER O LA APP DE DESPEGAR. NO ACUMULABLE CON OTRAS PROMOCIONES. CONSULTE CON SU BANCO EMISOR OTROS CARGOS ASOCIADOS A LA OPERATORIA EN CUOTAS. PARA MÁS INFORMACIÓN CONSULTE EN WWW.AEROLINEAS.COM. PRISMA MEDIOS DE PAGO S.A., LAVARDEN 247, CABA, CUIT 30-59891004-5. Despegar.com.ar S.A., CUIT 30701307115. Av. Jujuy 2013, CABA 1 VISA: PROMOCIÓN VIGENTE EN LA REPÚBLICA ARGENTINA DEL 16/09/19 AL 22/09/19 INCLUSIVE, ABONANDO LA TOTALIDAD DE LA RESERVA PREPAGA EN HASTA 12 CUOTAS SIN INTERÉS PARA VUELOS Y PAQUETES A DESTINOS DE LA RED INTERNACIONAL (EXCEPTO ROMA). VÁLIDA ÚNICAMENTE EN VUELOS OPERADOS POR AEROLÍNEAS ARGENTINAS/AUSTRAL LÍNEAS AÉREAS. EMISIONES CON TARJETA DE CRÉDITO VISA EMITIDA EN ARGENTINA, QUEDANDO EXCLUIDAS LAS SIGUIENTES TARJETAS VISA: VISA CORPORATE, VISA CUENTA CENTRAL, VISA PURCHASING, VISA PURCHASING AGRO, VISA DISTRIBUTION Y VISA RECARGABLE (TARJETA VISA BUSINESS: CONSULTE CON SU BANCO EMISOR SI LA TARJETA SE ENCUENTRA HABILITADA PARA OPERAR EN CUOTAS). CANALES DE COMERCIALIZACIÓN: DESPEGAR.COM, CALL CENTER O LA APP DE DESPEGAR. NO ACUMULABLE CON OTRAS PROMOCIONES. CONSULTE CON SU BANCO EMISOR OTROS CARGOS ASOCIADOS A LA OPERATORIA EN CUOTAS. PARA MÁS INFORMACIÓN CONSULTE EN WWW.AEROLINEAS.COM. PRISMA MEDIOS DE PAGO S.A., LAVARDEN 247, CABA, CUIT 30-59891004-5. Despegar.com.ar S.A., CUIT 30701307115. Av. Jujuy 2013, CABA 2VISA: PROMOCIÓN VIGENTE EN LA REPÚBLICA ARGENTINA DEL 16/09/19 AL 22/09/19 INCLUSIVE, ABONANDO LA TOTALIDAD DE LA RESERVA PREPAGA EN HASTA 12 CUOTAS SIN INTERÉS PARA VUELOS Y PAQUETES A DESTINOS DE LA RED INTERNACIONAL (EXCEPTO ROMA). VÁLIDA ÚNICAMENTE EN VUELOS OPERADOS POR AEROLÍNEAS ARGENTINAS/AUSTRAL LÍNEAS AÉREAS. EMISIONES CON TARJETA DE CRÉDITO VISA EMITIDA EN ARGENTINA, QUEDANDO EXCLUIDAS LAS SIGUIENTES TARJETAS VISA: VISA CORPORATE, VISA CUENTA CENTRAL, VISA PURCHASING, VISA PURCHASING AGRO, VISA DISTRIBUTION Y VISA RECARGABLE (TARJETA VISA BUSINESS: CONSULTE CON SU BANCO EMISOR SI LA TARJETA SE ENCUENTRA HABILITADA PARA OPERAR EN CUOTAS). CANALES DE COMERCIALIZACIÓN: DESPEGAR.COM, CALL CENTER O LA APP DE DESPEGAR. NO ACUMULABLE CON OTRAS PROMOCIONES. CONSULTE CON SU BANCO EMISOR OTROS CARGOS ASOCIADOS A LA OPERATORIA EN CUOTAS. PARA MÁS INFORMACIÓN CONSULTE EN WWW.AEROLINEAS.COM. PRISMA MEDIOS DE PAGO S.A., LAVARDEN 247, CABA, CUIT 30-59891004-5. Despegar.com.ar S.A., CUIT 30701307115. Av. Jujuy 2013, CABA 3 VISA: PROMOCIÓN VIGENTE EN LA REPÚBLICA ARGENTINA DEL 16/09/19 AL 22/09/19 INCLUSIVE, ABONANDO LA TOTALIDAD DE LA RESERVA PREPAGA EN HASTA 12 CUOTAS SIN INTERÉS PARA VUELOS Y PAQUETES A DESTINOS DE LA RED INTERNACIONAL (EXCEPTO ROMA). VÁLIDA ÚNICAMENTE EN VUELOS OPERADOS POR AEROLÍNEAS ARGENTINAS/AUSTRAL LÍNEAS AÉREAS. EMISIONES CON TARJETA DE CRÉDITO VISA EMITIDA EN ARGENTINA, QUEDANDO EXCLUIDAS LAS SIGUIENTES TARJETAS VISA: VISA CORPORATE, VISA CUENTA CENTRAL, VISA PURCHASING, VISA PURCHASING AGRO, VISA DISTRIBUTION Y VISA RECARGABLE (TARJETA VISA BUSINESS: CONSULTE CON SU BANCO EMISOR SI LA TARJETA SE ENCUENTRA HABILITADA PARA OPERAR EN CUOTAS). CANALES DE COMERCIALIZACIÓN: DESPEGAR.COM, CALL CENTER O LA APP DE DESPEGAR. NO ACUMULABLE CON OTRAS PROMOCIONES. CONSULTE CON SU BANCO EMISOR OTROS CARGOS ASOCIADOS A LA OPERATORIA EN CUOTAS. PARA MÁS INFORMACIÓN CONSULTE EN WWW.AEROLINEAS.COM. PRISMA MEDIOS DE PAGO S.A., LAVARDEN 247, CABA, CUIT 30-59891004-5. Despegar.com.ar S.A., CUIT 30701307115. Av. Jujuy 2013, CABA 55 VISA: PROMOCIÓN VIGENTE EN LA REPÚBLICA ARGENTINA DEL 16/09/19 AL 22/09/19 INCLUSIVE, ABONANDO LA TOTALIDAD DE LA RESERVA PREPAGA EN HASTA 12 CUOTAS SIN INTERÉS PARA VUELOS Y PAQUETES A DESTINOS DE LA RED INTERNACIONAL (EXCEPTO ROMA). VÁLIDA ÚNICAMENTE EN VUELOS OPERADOS POR AEROLÍNEAS ARGENTINAS/AUSTRAL LÍNEAS AÉREAS. EMISIONES CON TARJETA DE CRÉDITO VISA EMITIDA EN ARGENTINA, QUEDANDO EXCLUIDAS LAS SIGUIENTES TARJETAS VISA: VISA CORPORATE, VISA CUENTA CENTRAL, VISA PURCHASING, VISA PURCHASING AGRO, VISA DISTRIBUTION Y VISA RECARGABLE (TARJETA VISA BUSINESS: CONSULTE CON SU BANCO EMISOR SI LA TARJETA SE ENCUENTRA HABILITADA PARA OPERAR EN CUOTAS). CANALES DE COMERCIALIZACIÓN: DESPEGAR.COM, CALL CENTER O LA APP DE DESPEGAR. NO ACUMULABLE CON OTRAS PROMOCIONES. CONSULTE CON SU BANCO EMISOR OTROS CARGOS ASOCIADOS A LA OPERATORIA EN CUOTAS. PARA MÁS INFORMACIÓN CONSULTE EN WWW.AEROLINEAS.COM. PRISMA MEDIOS DE PAGO S.A., LAVARDEN 247, CABA, CUIT 30-59891004-5. Despegar.com.ar S.A., CUIT 30701307115. Av. Jujuy 2013, CABA 1 VISA: PROMOCIÓN VIGENTE EN LA REPÚBLICA ARGENTINA DEL 16/09/19 AL 22/09/19 INCLUSIVE, ABONANDO LA TOTALIDAD DE LA RESERVA PREPAGA EN HASTA 12 CUOTAS SIN INTERÉS PARA VUELOS Y PAQUETES A DESTINOS DE LA RED INTERNACIONAL (EXCEPTO ROMA). VÁLIDA ÚNICAMENTE EN VUELOS OPERADOS POR AEROLÍNEAS ARGENTINAS/AUSTRAL LÍNEAS AÉREAS. EMISIONES CON TARJETA DE CRÉDITO VISA EMITIDA EN ARGENTINA, QUEDANDO EXCLUIDAS LAS SIGUIENTES TARJETAS VISA: VISA CORPORATE, VISA CUENTA CENTRAL, VISA PURCHASING, VISA PURCHASING AGRO, VISA DISTRIBUTION Y VISA RECARGABLE (TARJETA VISA BUSINESS: CONSULTE CON SU BANCO EMISOR SI LA TARJETA SE ENCUENTRA HABILITADA PARA OPERAR EN CUOTAS). CANALES DE COMERCIALIZACIÓN: DESPEGAR.COM, CALL CENTER O LA APP DE DESPEGAR. NO ACUMULABLE CON OTRAS PROMOCIONES. CONSULTE CON SU BANCO EMISOR OTROS CARGOS ASOCIADOS A LA OPERATORIA EN CUOTAS. PARA MÁS INFORMACIÓN CONSULTE EN WWW.AEROLINEAS.COM. PRISMA MEDIOS DE PAGO S.A., LAVARDEN 247, CABA, CUIT 30-59891004-5. Despegar.com.ar S.A., CUIT 30701307115. Av. Jujuy 2013, CABA 2VISA: PROMOCIÓN VIGENTE EN LA REPÚBLICA ARGENTINA DEL 16/09/19 AL 22/09/19 INCLUSIVE, ABONANDO LA TOTALIDAD DE LA RESERVA PREPAGA EN HASTA 12 CUOTAS SIN INTERÉS PARA VUELOS Y PAQUETES A DESTINOS DE LA RED INTERNACIONAL (EXCEPTO ROMA). VÁLIDA ÚNICAMENTE EN VUELOS OPERADOS POR AEROLÍNEAS ARGENTINAS/AUSTRAL LÍNEAS AÉREAS. EMISIONES CON TARJETA DE CRÉDITO VISA EMITIDA EN ARGENTINA, QUEDANDO EXCLUIDAS LAS SIGUIENTES TARJETAS VISA: VISA CORPORATE, VISA CUENTA CENTRAL, VISA PURCHASING, VISA PURCHASING AGRO, VISA DISTRIBUTION Y VISA RECARGABLE (TARJETA VISA BUSINESS: CONSULTE CON SU BANCO EMISOR SI LA TARJETA SE ENCUENTRA HABILITADA PARA OPERAR EN CUOTAS). CANALES DE COMERCIALIZACIÓN: DESPEGAR.COM, CALL CENTER O LA APP DE DESPEGAR. NO ACUMULABLE CON OTRAS PROMOCIONES. CONSULTE CON SU BANCO EMISOR OTROS CARGOS ASOCIADOS A LA OPERATORIA EN CUOTAS. PARA MÁS INFORMACIÓN CONSULTE EN WWW.AEROLINEAS.COM. PRISMA MEDIOS DE PAGO S.A., LAVARDEN 247, CABA, CUIT 30-59891004-5. Despegar.com.ar S.A., CUIT 30701307115. Av. Jujuy 2013, CABA 3 VISA: PROMOCIÓN VIGENTE EN LA REPÚBLICA ARGENTINA DEL 16/09/19 AL 22/09/19 INCLUSIVE, ABONANDO LA TOTALIDAD DE LA RESERVA PREPAGA EN HASTA 12 CUOTAS SIN INTERÉS PARA VUELOS Y PAQUETES A DESTINOS DE LA RED INTERNACIONAL (EXCEPTO ROMA). VÁLIDA ÚNICAMENTE EN VUELOS OPERADOS POR AEROLÍNEAS ARGENTINAS/AUSTRAL LÍNEAS AÉREAS. EMISIONES CON TARJETA DE CRÉDITO VISA EMITIDA EN ARGENTINA, QUEDANDO EXCLUIDAS LAS SIGUIENTES TARJETAS VISA: VISA CORPORATE, VISA CUENTA CENTRAL, VISA PURCHASING, VISA PURCHASING AGRO, VISA DISTRIBUTION Y VISA RECARGABLE (TARJETA VISA BUSINESS: CONSULTE CON SU BANCO EMISOR SI LA TARJETA SE ENCUENTRA HABILITADA PARA OPERAR EN CUOTAS). CANALES DE COMERCIALIZACIÓN: DESPEGAR.COM, CALL CENTER O LA APP DE DESPEGAR. NO ACUMULABLE CON OTRAS PROMOCIONES. CONSULTE CON SU BANCO EMISOR OTROS CARGOS ASOCIADOS A LA OPERATORIA EN CUOTAS. PARA MÁS INFORMACIÓN CONSULTE EN WWW.AEROLINEAS.COM. PRISMA MEDIOS DE PAGO S.A., LAVARDEN 247, CABA, CUIT 30-59891004-5. Despegar.com.ar S.A., CUIT 30701307115. Av. Jujuy 2013, CABA 55 1980"}],"exception":null}
      `;

      console.log("responseData");
      console.log(JSON.parse(responseData));

      //console.log("responsedata.json");
      // console.log(responsedata);

      const json = JSON.parse(responseData);
      return json.original;
      // return JSON.parse(response);
    } catch (error) {
      // console.log(error);
    }
  }

  MontoEs(value: number): string {
    const val = (value / 1).toFixed(2).replace(".", ",");
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  getItemsServicios(rowP) {
    const rowPServicios = this.getUnicos(rowP, "tipo_serv_id").map(item => {
      const {
        tipo_serv_id,
        tipo_serv_nombre,
        alta,
        vencimiento,
        nota_legal
      } = item;
      return {
        tipo_serv_id,
        tipo_serv_nombre,
        nota_legal,
        alta: alta.replace(/(\d+)\D+(\d+)\D+(\d+)/g, "$3-$2-$1"),
        vencimiento: vencimiento.replace(/(\d+)\D+(\d+)\D+(\d+)/g, "$3-$2-$1"),
        row: this.getItemsTarjeta(rowP)
      };
    });
    return rowPServicios;
  }

  getItemsTarjeta(rowTarjeta) {
    const rowAllTarjetas = this.getUnicos(rowTarjeta, "card_id").map(item => {
      const { card_id, card_nombre, img_card } = item;

      return {
        card_id,
        card_nombre,
        img_card,
        row: rowTarjeta
          .filter(e => e.card_id == card_id)
          .map(i => {
            const { cta_cuotas } = i;

            return {
              cta_cuotas,
              cta_interes: this.MontoEs(i.cta_interes),
              cftna: this.MontoEs(i.cftna)
            };
          })
      };
    });
    return rowAllTarjetas;
  }

  async clickbanco(idBanco) {
    this.idBanco = idBanco;
    let rowBancoSel: any = await this.bancos.filter(
      item => item.bco_id == idBanco
    )[0].bco_row;

    const promociones = this.getUnicos(rowBancoSel, "promocion_id").map(
      item => {
        const { promocion_id } = item;
        return {
          promocion_id,
          row: rowBancoSel.filter(e => e.promocion_id == promocion_id)
        };
      }
    );

    const serviciosNew = promociones.map(e => {
      const { promocion_id } = e;
      return {
        promocion_id,
        row: this.getItemsServicios(e.row)
      };
    });

    this.promocionesAll = serviciosNew;

    const selectedAll = this.el.shadowRoot.querySelectorAll(".cls-bancos");
    await selectedAll.forEach(function(item) {
      item.classList.remove("selected");
      if (item.classList.contains(`item-${idBanco}`)) {
        item.classList.add("selected");
      }
    });
    this.active = screen.width <= 767 ? false : true;
  }

  insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  }
  // asldfkjalskdjflkajsdf
  getUnicos(arr, key) {
    let lookup = new Set();
    return arr.filter(obj => !lookup.has(obj[key]) && lookup.add(obj[key]));
  }

  async cargarPromociones() {
    const rowAll = await this.getPromociones();
    this.bancos = this.getUnicos(rowAll, "bco_id").map(item => {
      const { bco_id, bco_nombre, bco_img } = item;
      return {
        bco_id,
        bco_nombre,
        bco_img,
        bco_row: rowAll.filter(item => item.bco_id == bco_id)
      };
    });
  }

  async componentWillLoad() {
    await this.cargarPromociones();
    this.clickbanco(this.bancos[0].bco_id);
  }

  componentDidLoad() {
    const idBanco = this.bancos[0].bco_id;
    const selectedAll = this.el.shadowRoot.querySelectorAll(".cls-bancos");
    selectedAll.forEach(function(item) {
      if (item.classList.contains(`item-${idBanco}`)) {
        item.classList.add("selected");
      }
    });
  }

  componentDidRender() {
    // veriifcar si se esta visualizando en el cel de la contrario se sale de la function
    if (!(screen.width <= 767)) return;

    // verificar si existe
    const pruebaElement = this.el.shadowRoot.querySelector(
      ".lis-bancos .body-promo"
    );

    // Varificar si existe el elemento
    if (pruebaElement) {
      // Por default elimina el element
      pruebaElement.remove();

      // Verificar si el que está es el mismo banco
      const classContain = pruebaElement.classList.contains(
        `item-${this.idBanco}`
      );
      // Si es el mismo, se sale de la function.
      if (classContain) return;
    }

    // Pintar el nuevo elemento seleccionado
    const bodyPromoOriginal = this.el.shadowRoot.getElementById("body-promo");
    const newDetalleClon = bodyPromoOriginal.cloneNode(true);
    const sp2 = this.el.shadowRoot.getElementById(`id-${this.idBanco}`);
    this.insertAfter(newDetalleClon, sp2);
  }

  render() {
    return (
      <div>
        <ion-grid>
          <ion-row>
            <ion-col size-xs="12" size-md="4" size-lg="3" class="lis-bancos">
              <ion-list-header>
                <ion-title>Entidades financieras</ion-title>
              </ion-list-header>

              {this.bancos.map(item => (
                <ion-item
                  id={`id-${item.bco_id}`}
                  class={`pointer cls-bancos item-${item.bco_id}`}
                  onClick={() => this.clickbanco(item.bco_id)}
                >
                  <ion-thumbnail slot="start">
                    <img class="fil-bancos" src={item.bco_img}></img>
                  </ion-thumbnail>
                  <ion-label>
                    <h2>{item.bco_nombre} </h2>
                  </ion-label>
                </ion-item>
              ))}
            </ion-col>

            <ion-col
              class={`${this.active ? "ver " : "ver-oculto "}`}
              size-xs="12"
              size-md="8"
              size-lg="9"
            >
              <div id="body-promo" class={`item-${this.idBanco} body-promo`}>
                {this.promocionesAll.map(item => (
                  <section>
                    {item.row.map(y => (
                      <div class={`list card`}>
                        <br />
                        <div class="item item-divider">
                          <h2>Promociones que aplica a {y.tipo_serv_nombre}</h2>
                        </div>

                        {y.row.map(e => (
                          <div>
                            <ion-item>
                              <ion-thumbnail slot="start">
                                <img class="fil-bancos" src={e.img_card}></img>
                              </ion-thumbnail>

                              <ion-label>
                                <p>
                                  Aplica solo para las tarjetas {e.card_nombre}
                                </p>
                                <p>Vigente hasta {y.vencimiento}</p>
                              </ion-label>
                            </ion-item>

                            <section>
                              <table class="features-table">
                                <thead>
                                  <tr>
                                    <td>Cuotas</td>
                                    <td>Interes %</td>
                                    <td>CFTNA</td>
                                  </tr>
                                </thead>

                                <tbody>
                                  {e.row.map(t => (
                                    <tr>
                                      <td class="detalle">{t.cta_cuotas}</td>
                                      <td class="detalle">{t.cta_interes}</td>
                                      <td class="detalle">{t.cftna}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </section>
                            <br />
                          </div>
                        ))}

                        <div class="item item-body nota-legal">
                          <p>{y.nota_legal}</p>
                        </div>
                        <hr class="sep-tip-servicio" />
                      </div>
                    ))}
                  </section>
                ))}
              </div>
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
    );
  }
}
